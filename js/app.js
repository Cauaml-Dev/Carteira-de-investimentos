/* Renderização principal e inicialização. */
function go(keep){charts.forEach(c=>c.destroy());charts=[];const act=document.activeElement,id=act?.placeholder;
  document.getElementById('nav').innerHTML='<h1><i></i>Minha Carteira</h1>'+PAGES.map(([k,t])=>`<a class="${k==page?'on':''}" onclick="page='${k}';go()">${t}</a>`).join('');
  document.getElementById('main').innerHTML=`<div class="top"><h2>${PAGES.find(p=>p[0]==page)[1]}</h2>${filters()}</div>`+(S.demo?'<div class="note">Dados demonstrativos fictícios — limpe em Configurações.</div>':'')+PG[page]();
  ajudas(document.getElementById('main'));if(keep){const i=document.querySelector('input[placeholder]');if(i){i.focus();i.setSelectionRange(99,99)}}}
function setQ(tk,v){v=+v;if(!(v>0))return;S.q[tk]={p:v,d:today(),h:[...(S.q[tk]?.h||[]),{d:today(),p:v}]};save();go()}
function del(id){if(confirm('Excluir esta operação?')){S.ops=S.ops.filter(o=>o.id!==id);save();go()}}

go(); // inicializa a aplicação
