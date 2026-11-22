import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const domain=readFileSync('src/domain.mjs','utf8').replace(/^import .*;\n/gm,'').replace(/^export /gm,'');
const adapter=(()=>{try{return readFileSync('src/moneyInputAdapter.mjs','utf8').replace(/^export /gm,'')}catch{return ''}})();
const app=readFileSync('src/app.mjs','utf8').replace(/^import .*;\n/gm,'');
let html=readFileSync('index.html','utf8').replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+readFileSync('style.css','utf8')+'</style>');
html=html.replace('<script type="module" src="src/app.mjs"></script>',()=>'<script type="module">'+[adapter,domain,app].join('\n').replace(/<\/script/gi,'<\\/script')+'</script>');
mkdirSync('dist',{recursive:true});writeFileSync('dist/Pocket_Ledger.html',html);console.log('Built dist/Pocket_Ledger.html (no external dependencies).');
