const state = { jobs: [] };
const $ = s => document.querySelector(s);
const money = n => '$' + Math.round(n).toLocaleString();
const round5 = n => Math.ceil(n / 5) * 5;

async function loadJobs(){
  try { state.jobs = await fetch('data/jobs.json').then(r=>r.json()); }
  catch(e){ state.jobs = [{id:'custom',name:'Custom / Other Job',base_hours:2,difficulty:1,min_price:100,category:'Other'}]; }
  const select = $('#jobType');
  const groups = {};
  state.jobs.forEach(j => (groups[j.category] ||= []).push(j));
  Object.entries(groups).forEach(([cat,jobs])=>{
    const g=document.createElement('optgroup');g.label=cat;
    jobs.forEach(j=>{const o=document.createElement('option');o.value=j.id;o.textContent=j.name;g.appendChild(o)});
    select.appendChild(g);
  });
  select.value='dresser'; syncHours(); calculate();
}
function currentJob(){ return state.jobs.find(j=>j.id===$('#jobType').value) || state.jobs[0]; }
function syncHours(){ const j=currentJob(); if(j) $('#hours').value=j.base_hours; }
function calculate(){
  const job=currentJob(); if(!job) return;
  const hours=Math.max(.5,Number($('#hours').value)||job.base_hours);
  const rate=Math.max(20,Number($('#rate').value)||75);
  const miles=Math.max(0,Number($('#miles').value)||0);
  const mileCost=Math.max(0,Number($('#mileCost').value)||0);
  const expenses=Math.max(0,Number($('#expenses').value)||0);
  const diff=Number($('#difficulty').value)||1;
  const helperRate=Number($('#helper').value)||0;
  const rush=$('#rush').checked ? 1.12 : 1;
  const mileageCost=miles*mileCost;
  const helperCost=helperRate*hours;
  const directCost=expenses+mileageCost+helperCost;
  const laborTarget=rate*hours;
  const riskMultiplier=(job.difficulty||1)*diff*rush;
  const raw=(laborTarget+directCost)*riskMultiplier;
  const floor=round5(Math.max(job.min_price||0,(laborTarget+directCost)*1.02));
  const target=round5(Math.max(floor,raw));
  const low=round5(Math.max(floor,target*.95));
  const high=round5(Math.max(low+5,target*1.12));
  const expected=(low+high)/2;
  const profit=expected-directCost;
  const perHour=profit/hours;
  const confidence=(diff<=1 && !$('#rush').checked) ? 'High' : (diff<=1.18 ? 'Medium' : 'Cautious');
  $('#quoteRange').textContent=`${money(low)}–${money(high)}`;
  $('#quoteNote').textContent=`For ${job.name.toLowerCase()} at about ${hours} labor hour${hours===1?'':'s'}.`;
  $('#floorPrice').textContent=money(floor);
  $('#targetPrice').textContent=money(target);
  $('#jobCost').textContent=money(directCost);
  $('#profit').textContent=money(profit);
  $('#profitHour').textContent=money(perHour);
  $('#confidence').textContent=confidence;
  $('#customerText').textContent=`Hi! Based on the job details, my quote for ${job.name.toLowerCase()} is ${money(low)}–${money(high)}, subject to the item/site matching the information provided. That includes labor and normal setup/cleanup. If the scope changes, I’ll let you know before doing any additional work.`;
}
$('#quoteForm').addEventListener('submit',e=>{e.preventDefault();calculate()});
$('#jobType').addEventListener('change',()=>{syncHours();calculate()});
['hours','rate','miles','mileCost','expenses','difficulty','helper','rush'].forEach(id=>$('#'+id).addEventListener('input',calculate));
$('#copyText').addEventListener('click',async()=>{await navigator.clipboard.writeText($('#customerText').textContent);$('#copyText').textContent='Copied ✓';setTimeout(()=>$('#copyText').textContent='Copy message',1400)});
$('#leadForm').addEventListener('submit',e=>{e.preventDefault();const email=$('#email').value.trim();if(!email)return;localStorage.setItem('profitpro_lead',email);$('#leadStatus').textContent='Saved for V1. Email automation connects at deployment.';});
loadJobs();
