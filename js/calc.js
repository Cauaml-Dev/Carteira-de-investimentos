/* Motor de cálculo: preço médio, posições, lucro realizado, dividendos e previsão. */
// ---- motor de cálculo ----
function calc(list,upto){ // posições por preço médio ponderado
  const p={};let real=0;
  for(const o of list){if(upto&&o.date>upto)break;if(o.type!=='buy'&&o.type!=='sell')continue;
    const a=p[o.tk]=p[o.tk]||{tk:o.tk,qty:0,cost:0,real:0,divs:0,buys:0};
    if(o.type==='buy'){a.qty+=o.qty;a.cost+=o.qty*o.price+(o.fee||0);a.buys+=o.qty*o.price+(o.fee||0)}
    else{const pm=a.qty?a.cost/a.qty:0,q=Math.min(o.qty,a.qty),r=q*o.price-(o.fee||0)-q*pm;a.real+=r;real+=r;a.cost-=q*pm;a.qty-=q}}
  for(const o of list)if(o.type==='div'&&p[o.tk]&&(!upto||o.date<=upto))p[o.tk].divs+=o.qty*o.price;
  return{p,real}}
function price(tk,d){ // último preço conhecido até a data (cotações + preços de operações)
  let best=null;const pts=[...(S.q[tk]?.h||[]),...S.ops.filter(o=>o.tk===tk&&o.type!=='div').map(o=>({d:o.date,p:o.price}))].sort((a,b)=>a.d.localeCompare(b.d));
  for(const x of pts){if(x.d<=d)best=x.p}return best??(pts[0]?.p||0)}
function pos(){const{p,real}=calc(ops());let tot=0;const L=Object.values(p).filter(a=>a.qty>1e-9).map(a=>{const cur=S.q[a.tk]?.p??price(a.tk,today()),val=a.qty*cur;tot+=val;
  return{...a,cat:S.as[a.tk]?.cat||'Outro',nome:S.as[a.tk]?.nome||a.tk,pm:a.cost/a.qty,cur,val,lucro:val-a.cost,rent:a.cost?(val-a.cost)/a.cost*100:0,qd:S.q[a.tk]?.d}});
  L.forEach(a=>a.part=tot?a.val/tot*100:0);return{L,tot,real,cost:L.reduce((s,a)=>s+a.cost,0)}}
const divs=()=>S.ops.filter(o=>o.type==='div').map(o=>({...o,tot:o.qty*o.price}));
const fOp=o=>(!F.y||o.date.slice(0,4)===F.y)&&(!F.m||o.date.slice(5,7)===F.m)&&(!F.t||o.tk===F.t)&&(!F.c||(S.as[o.tk]?.cat)===F.c);
function divMes(ym){return divs().filter(d=>d.date.slice(0,7)===ym).reduce((s,d)=>s+d.tot,0)}
function addM(ym,n){let[y,m]=ym.split('-').map(Number);m+=n;y+=Math.floor((m-1)/12);m=(m-1)%12+1;return y+'-'+String(m).padStart(2,'0')}
function forecast(){ // estimativa: soma de proventos/cota nos últimos 12 meses ÷ meses com histórico × quantidade atual
  const{L}=pos(),D=divs(),lim=addM(today().slice(0,7),-11);let m1=0;
  for(const a of L){const d=D.filter(x=>x.tk===a.tk&&x.date.slice(0,7)>=lim);if(!d.length)continue;
    const first=d.map(x=>x.date.slice(0,7)).sort()[0],span=Math.min(12,Math.max(1,(new Date(today().slice(0,7)+'-01')-new Date(first+'-01'))/2.63e9+1)|0||1);
    m1+=d.reduce((s,x)=>s+x.price,0)/span*a.qty}
  return m1}
