/* Componentes de interface: gráficos, cards, filtros e tabelas. */
// ---- UI ----
function chart(id,cfg){const el=document.getElementById(id);if(!el||!window.Chart)return;
  const tc=getComputedStyle(document.documentElement).getPropertyValue('--mu');Chart.defaults.color=tc;Chart.defaults.font.family='Manrope';
  cfg.options={responsive:true,maintainAspectRatio:false,...cfg.options};charts.push(new Chart(el,cfg))}
const card=(t,v,s,c='')=>`<div class="c"><h3>${t}</h3><div class="k ${c}">${v}</div><div class="sub">${s||''}</div></div>`;
function months(){const o=ops();if(!o.length)return[];const out=[];let m=o[0].date.slice(0,7);const end=today().slice(0,7);while(m<=end){out.push(m);m=addM(m,1)}return out}
function evol(){return months().map(m=>{const end=m+'-31',{p}=calc(ops(),end);let v=0,c=0;for(const a of Object.values(p)){if(a.qty<1e-9)continue;c+=a.cost;v+=a.qty*(m===today().slice(0,7)?(S.q[a.tk]?.p??price(a.tk,end)):price(a.tk,end))}
  return{m,v,c,d:divs().filter(x=>x.date<=end).reduce((s,x)=>s+x.tot,0)}})}
const empty=`<div class="c"><h3>Carteira vazia</h3><p>Registre sua primeira compra para ver os indicadores. Ou <a href="#" onclick="demo();return false" style="color:var(--bl)">carregue dados demonstrativos</a> (identificados como fictícios).</p></div>`;
function filters(){const yrs=[...new Set(S.ops.map(o=>o.date.slice(0,4)))].sort(),tks=Object.keys(S.as).sort();
  return`<select onchange="F.y=this.value;go()"><option value="">Ano: todos</option>${yrs.map(y=>`<option ${F.y==y?'selected':''}>${y}</option>`).join('')}</select>
<select onchange="F.m=this.value;go()"><option value="">Mês: todos</option>${MES.map((m,i)=>`<option value="${String(i+1).padStart(2,'0')}" ${F.m==String(i+1).padStart(2,'0')?'selected':''}>${m}</option>`).join('')}</select>
<select onchange="F.c=this.value;go()"><option value="">Tipo: todos</option>${CATS.map(c=>`<option ${F.c==c?'selected':''}>${c}</option>`).join('')}</select>
<select onchange="F.t=this.value;go()"><option value="">Ativo: todos</option>${tks.map(t=>`<option ${F.t==t?'selected':''}>${t}</option>`).join('')}</select>
<button class="p" onclick="openOp()">Adicionar investimento</button>`}
function table(L,fii){const stale=a=>!a.qd||(Date.now()-new Date(a.qd))/864e5>3;
  return`<div class="w"><table><tr><th>Ativo</th><th>Qtd</th><th>Preço médio</th><th>Cotação</th><th>Investido</th><th>Valor atual</th><th>Lucro</th><th>Rent.</th><th>Part.</th>${fii?'<th>Últ. rend./cota</th><th>Yield 12m</th><th>Rend. mensal</th>':'<th>Dividendos</th>'}</tr>
${L.map(a=>{const D=divs().filter(d=>d.tk===a.tk).sort((x,y)=>y.date.localeCompare(x.date)),u=D[0]?.price||0,y12=D.filter(d=>d.date.slice(0,7)>=addM(today().slice(0,7),-11)).reduce((s,d)=>s+d.price,0);
return`<tr><td><b>${a.tk}</b> <span class="tag">${a.cat}</span><div class="sub">${a.nome}</div></td><td>${N(a.qty,4)}</td><td>${R(a.pm)}</td>
<td><input type="number" step="0.01" value="${a.cur}" style="width:84px" onchange="setQ('${a.tk}',this.value)">${stale(a)?'<div class="sub warn">desatualizada</div>':''}</td><td>${R(a.cost)}</td><td>${R(a.val)}</td><td class="${cl(a.lucro)}">${R(a.lucro)}</td><td class="${cl(a.rent)}">${P(a.rent)}</td><td>${P(a.part)}</td>
${fii?`<td>${R(u)}</td><td>${a.cur?P(y12/a.cur*100):'—'}</td><td>${R(u*a.qty)}</td>`:`<td>${R(a.divs)}</td>`}</tr>`}).join('')||'<tr><td colspan=12>Nenhum ativo.</td></tr>'}</table></div>`}
function listPage(cat){const{L}=pos();let X=L.filter(a=>(!cat||a.cat===cat)&&(!F.c||a.cat===F.c)&&(!F.t||a.tk===F.t));
  const q=(window.busca||'').toLowerCase(),ord=window.ord||'val';X=X.filter(a=>!q||(a.tk+a.nome).toLowerCase().includes(q)).sort((a,b)=>ord==='rent'?b.rent-a.rent:ord==='nome'?a.tk.localeCompare(b.tk):b[ord==='inv'?'cost':'val']-a.cost*(ord==='inv'?0:0)-(ord==='inv'?0:0));
  return`<div class="c"><div class="top"><input placeholder="Buscar nome ou ticker" value="${window.busca||''}" oninput="window.busca=this.value;go(1)"><select onchange="window.ord=this.value;go()"><option value="val">Ordenar: valor</option><option value="rent" ${ord=='rent'?'selected':''}>Rentabilidade</option><option value="inv" ${ord=='inv'?'selected':''}>Valor investido</option><option value="nome" ${ord=='nome'?'selected':''}>Ticker</option></select></div>${table(X,cat==='FII')}</div>`}
