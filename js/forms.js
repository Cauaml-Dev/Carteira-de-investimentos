/* Formulário de operações, exclusão, dados demo e exportação. */
function openOp(type='buy',id){const o=S.ops.find(x=>x.id===id)||{type,date:today(),fee:0,tk:'',qty:'',price:''},a=S.as[o.tk]||{};
  const d=document.getElementById('dlg');d.innerHTML=`<form method="dialog" onsubmit="return false"><h3 style="margin:0">${id?'Editar':'Nova'} operação</h3>
<label>Tipo<select id="f_type" onchange="document.getElementById('f_dt').style.display=this.value==='div'?'block':'none'"><option value="buy" ${o.type=='buy'?'selected':''}>Compra</option><option value="sell" ${o.type=='sell'?'selected':''}>Venda</option><option value="div" ${o.type=='div'?'selected':''}>Dividendo / rendimento</option></select></label>
<div class="row"><label>Ticker (digite para buscar)<input id="f_tk" value="${o.tk}" placeholder="Ex.: P, PETR, MXRF" autocomplete="off" oninput="sugerir(this.value)" style="text-transform:uppercase"><div id="sug"></div></label><label>Categoria<select id="f_cat">${CATS.map(c=>`<option ${a.cat==c?'selected':''}>${c}</option>`).join('')}</select></label></div>
<label>Nome do ativo<input id="f_nome" value="${a.nome||''}"></label>
<div class="row"><label>Quantidade<input id="f_qty" type="number" step="any" value="${o.qty}"></label><label>Preço (ou valor por cota)<input id="f_price" type="number" step="any" value="${o.price}"></label></div>
<div class="row"><label>Taxas (R$)<input id="f_fee" type="number" step="any" value="${o.fee||0}"></label><label>Data<input id="f_date" type="date" value="${o.date}"></label></div>
<label id="f_dt" style="display:${o.type=='div'?'block':'none'}">Tipo de rendimento<select id="f_dtv">${['Dividendo','JCP','Rendimento de FII','Outro'].map(x=>`<option ${o.dt==x?'selected':''}>${x}</option>`).join('')}</select></label>
<div class="top" style="margin-top:16px"><button class="p" onclick="saveOp('${id||''}')">Salvar</button><button onclick="dlg.close()">Cancelar</button></div><div id="err" class="neg sub"></div></form>`;ajudas(d);d.showModal()}
function saveOp(id){const v=k=>document.getElementById('f_'+k).value,tk=v('tk').trim().toUpperCase(),qty=+v('qty'),price=+v('price'),fee=+v('fee')||0,type=v('type'),date=v('date');
  if(!tk||!(qty>0)||!(price>=0)||!date)return err('Informe ticker, quantidade, preço e data.');
  if(type==='sell'){const{p}=calc(ops().filter(o=>o.id!==id&&o.date<=date));if((p[tk]?.qty||0)<qty-1e-9)return err('Quantidade maior que a posição em carteira nessa data.')}
  const o={id:id||uid(),type,tk,qty,price,fee,date,dt:type==='div'?v('dtv'):undefined};S.ops=S.ops.filter(x=>x.id!==id);S.ops.push(o);
  S.as[tk]={cat:v('cat'),nome:v('nome')||tk};if(type!=='div'&&!S.q[tk])S.q[tk]={p:price,d:date,h:[]};save();document.getElementById('dlg').close();go()}
const err=m=>{document.getElementById('err').textContent=m};
function demo(){const t=today(),ym=n=>addM(t.slice(0,7),-n)+'-10';S={demo:true,as:{MXRF11:{cat:'FII',nome:'Maxi Renda (demo)'},PETR4:{cat:'Ação',nome:'Petrobras PN (demo)'}},q:{MXRF11:{p:10.4,d:t,h:[]},PETR4:{p:37,d:t,h:[]}},ops:[
 {id:uid(),type:'buy',tk:'MXRF11',qty:100,price:9.8,fee:0,date:ym(8)},{id:uid(),type:'buy',tk:'MXRF11',qty:50,price:10.1,fee:0,date:ym(4)},{id:uid(),type:'buy',tk:'PETR4',qty:30,price:34,fee:2,date:ym(6)},{id:uid(),type:'sell',tk:'PETR4',qty:10,price:36,fee:1,date:ym(2)}]};
 for(let i=7;i>=0;i--)S.ops.push({id:uid(),type:'div',tk:'MXRF11',qty:i>3?100:150,price:0.1,fee:0,date:ym(i).slice(0,8)+'15',dt:'Rendimento de FII'});save();go()}
function exp(){const b=new Blob([JSON.stringify(S,null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='carteira.json';a.click()}
function imp(){const i=document.createElement('input');i.type='file';i.accept='.json';i.onchange=()=>{const f=i.files[0];if(!f)return;f.text().then(t=>{try{const d=JSON.parse(t);if(!Array.isArray(d.ops))throw 0;S={ops:d.ops,as:d.as||{},q:d.q||{},demo:!!d.demo};save();go()}catch(e){alert('Arquivo inválido.')}})};i.click()}
