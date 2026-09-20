const baseUrl = new URL(process.argv[2] || 'https://qadamawe.github.io/Profitpro-os/');
const failures = [];
const results = {};

function requireCheck(condition, message) {
  if (!condition) failures.push(message);
}

async function getText(path) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, {
    headers: { 'user-agent': 'ProfitPro-OS-health-check/1.0' },
    signal: AbortSignal.timeout(15000)
  });
  requireCheck(response.ok, `${url} returned ${response.status}`);
  return response.text();
}

try {
  const [html, app, config, styles, jobsText] = await Promise.all([
    getText('./'),
    getText('app.js'),
    getText('checkout-config.js'),
    getText('style.css'),
    getText('data/jobs.json')
  ]);

  const requiredHtml = [
    'id="quoteForm"',
    'id="jobType"',
    'id="quoteRange"',
    'id="leadForm"',
    'name="email"',
    'id="coreCheckout"',
    'Get ProfitPro OS Core – $59',
    'checkout-config.js'
  ];
  requiredHtml.forEach(marker => requireCheck(html.includes(marker), `homepage missing ${marker}`));
  requireCheck((html.match(/Coming Soon/g) || []).length === 2, 'expected exactly two Coming Soon products');

  const mailerLiteEndpoint = 'https://assets.mailerlite.com/jsonp/2626892/forms/198482543148794968/subscribe';
  requireCheck(html.includes(mailerLiteEndpoint), 'MailerLite form endpoint changed or is missing');
  requireCheck(app.includes('subscribeWithMailerLite'), 'MailerLite async submission logic is missing');
  requireCheck(!app.includes('localStorage'), 'email capture must not use localStorage');
  requireCheck(app.includes('configureCheckout()'), 'checkout routing initializer is missing');

  const provider = config.match(/provider:\s*['"]([^'"]+)['"]/)?.[1];
  const coreUrl = config.match(/coreUrl:\s*['"]([^'"]+)['"]/)?.[1];
  requireCheck(Boolean(provider), 'checkout provider is missing');
  requireCheck(Boolean(coreUrl), 'Core checkout URL is missing');
  if (coreUrl) requireCheck(new URL(coreUrl).protocol === 'https:', 'Core checkout URL must use HTTPS');

  const jobs = JSON.parse(jobsText);
  requireCheck(Array.isArray(jobs) && jobs.length > 0, 'job pricing data is empty or invalid');
  requireCheck(styles.includes('@media(max-width:820px)'), 'mobile breakpoint is missing');

  results.homepage = 'reachable';
  results.calculatorJobs = Array.isArray(jobs) ? jobs.length : 0;
  results.leadPlatform = 'mailerlite';
  results.checkoutProvider = provider || null;
  results.checkoutUrlConfigured = Boolean(coreUrl);
  results.mobileBreakpoint = '820px';
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

if (failures.length) {
  console.error(JSON.stringify({ ok: false, baseUrl: baseUrl.toString(), failures, results }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, baseUrl: baseUrl.toString(), results }, null, 2));

