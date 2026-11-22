import {decimalToCents} from './moneyInputAdapter.mjs';
export const CATEGORIES = ['Food', 'Transport', 'Study', 'Other'];
export function amountToCents(value) {
  return decimalToCents(value);
}
export function addExpense(entries, input) {
  const cents = amountToCents(input.amount);
  if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 100000000) throw new Error('Enter an amount from 0.01 to 1,000,000.00.');
  if (typeof input.title !== 'string' || !input.title.trim() || input.title.trim().length > 80) throw new Error('Use a title of 1-80 characters.');
  if (!CATEGORIES.includes(input.category)) throw new Error('Choose a supported category.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) throw new Error('Choose a date.');
  return [...entries, { id: entries.reduce((n,e)=>Math.max(n,e.id),0)+1, title: input.title.trim(), category: input.category, date: input.date, cents }];
}
export function summarize(entries, month, budgetCents) {
  const selected=entries.filter(e=>e.date.slice(0,7)===month);
  const spent=selected.reduce((sum,e)=>sum+e.cents,0);
  return {entries:selected, spent, remaining:budgetCents-spent, categories:Object.fromEntries(CATEGORIES.map(c=>[c,selected.filter(e=>e.category===c).reduce((n,e)=>n+e.cents,0)]))};
}
export function removeExpense(entries,id) { return entries.filter(e=>e.id!==id); }
export function formatMoney(cents) { return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100); }
