import {addExpense, summarize, removeExpense, formatMoney, amountToCents} from './domain.mjs';
const $=id=>document.getElementById(id);
let entries=[{id:1,title:'Weekly groceries',category:'Food',date:'2026-11-18',cents:4250},{id:2,title:'Bus pass',category:'Transport',date:'2026-11-19',cents:1500},{id:3,title:'Course notebook',category:'Study',date:'2026-11-20',cents:1275}];
let budget=25000;
function feedback(text, isError = false) {
 const message=$('message');message.setAttribute('role',isError?'alert':'status');
 message.classList.toggle('error',isError);message.textContent=(isError?'Error: ':'')+text;
}
function render() {
 const s=summarize(entries,$('month').value,budget);
 $('spent').textContent=formatMoney(s.spent);$('remaining').textContent=formatMoney(s.remaining);$('budget-value').textContent=formatMoney(budget);
 $('remaining').classList.toggle('negative',s.remaining<0);
 $('count').textContent=s.entries.length+' expenses';
 $('list').replaceChildren();
 for(const entry of s.entries) {
  const row=document.createElement('li'); row.className='expense';
  const info=document.createElement('div');
  const title=document.createElement('strong');title.textContent=entry.title;
  const detail=document.createElement('small');detail.textContent=entry.category+' · '+entry.date;
  info.append(title,detail);
  const value=document.createElement('b');value.textContent=formatMoney(entry.cents);
  const button=document.createElement('button');button.type='button';button.className='delete';button.textContent='Remove';button.setAttribute('aria-label','Remove '+entry.title);
  button.addEventListener('click',()=>{entries=removeExpense(entries,entry.id);render();});
  row.append(info,value,button);$('list').append(row);
 }
 $('empty').hidden=s.entries.length>0;
 $('categories').replaceChildren();
 for(const [category,cents] of Object.entries(s.categories)) {
  const row=document.createElement('div');row.className='category';
  const label=document.createElement('span');label.textContent=category;
  const value=document.createElement('b');value.textContent=formatMoney(cents);row.append(label,value);$('categories').append(row);
 }
}
$('expense-form').addEventListener('submit',event=>{
 event.preventDefault();
 try {entries=addExpense(entries,{title:$('title').value,amount:$('amount').value,category:$('category').value,date:$('date').value});feedback('Expense added.');$('title').value='';$('amount').value='';render();}
 catch(error){feedback(error.message,true);}
});
$('budget-form').addEventListener('submit',event=>{
 event.preventDefault();const next=amountToCents($('budget').value);
 if(!Number.isSafeInteger(next)||next<0||next>100000000){feedback('Enter a valid budget from 0.00 to 1,000,000.00.',true);return;}
 budget=next;feedback('Budget updated.');render();
});
$('month').addEventListener('change',render);render();
