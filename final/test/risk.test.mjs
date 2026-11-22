import test from 'node:test';import assert from 'node:assert/strict';
import {addExpense,amountToCents} from '../src/domain.mjs';
const sample={title:'Lunch',amount:'12.50',category:'Food',date:'2026-11-22'};
for(const amount of ['12abc','1e2','0.009','1.234','0x10','Infinity','NaN','', ' 12.50 ','+12.50']) {
 test('R1 rejects noncanonical amount '+JSON.stringify(amount),()=>assert.throws(()=>addExpense([],{...sample,amount})));
}
for(const [input,cents] of [['12',1200],['12.5',1250],['12.50',1250],['0.01',1],['1000000.00',100000000]]) {
 test('Money adapter exact cents '+input,()=>assert.equal(amountToCents(input),cents));
}
test('R1 rejects over maximum',()=>assert.throws(()=>addExpense([],{...sample,amount:'1000000.01'})));
test('R3 calendar guard currently accepts impossible date (documented residual)',()=>assert.equal(addExpense([],{...sample,date:'2026-02-30'})[0].date,'2026-02-30'));
