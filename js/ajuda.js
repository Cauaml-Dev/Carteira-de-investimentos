/* Ícones de ajuda (?) com explicação de cada indicador, gráfico e coluna. */
const ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10.2"/><circle cx="12" cy="12" r="7.8" stroke-width="1" opacity=".5"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.2.9-1.2 1.8"/><circle cx="12" cy="16.6" r=".6" fill="currentColor"/></svg>';
const AJUDA={
'Patrimônio atual':'Quanto suas posições valem hoje: quantidade × cotação atual de cada ativo.',
'Total investido':'Custo de aquisição das posições que você ainda tem (compras + taxas, já descontando o que foi vendido).',
'Lucro não realizado':'Ganho ou perda “no papel”: valor atual − custo. Só vira dinheiro quando você vende.',
'Lucro realizado':'Resultado já obtido com vendas: preço de venda − preço médio − taxas.',
'Rentabilidade':'Lucro (ou prejuízo) ÷ custo de aquisição × 100.',
'Dividendos no mês':'Proventos recebidos no mês atual.',
'Previsão próximo mês':'Estimativa com base nos proventos por cota dos últimos 12 meses × sua quantidade atual. Não é garantida.',
'Previsão próx. mês':'Estimativa com base nos proventos por cota dos últimos 12 meses × sua quantidade atual. Não é garantida.',
'Previsão anual':'Estimativa mensal × 12. Baseada em pagamentos passados; valores futuros não são garantidos.',
'Posições abertas':'Quantidade de ativos diferentes que você possui hoje.',
'Valor atual':'Quantidade × cotação atual.',
'Total recebido':'Soma de todos os proventos já registrados.',
'Neste mês':'Proventos recebidos no mês atual.','Neste ano':'Proventos recebidos no ano atual.',
'Média mensal':'Total de proventos ÷ número de meses em que houve pagamento.',
'Capital aportado':'Tudo que você pagou em compras, incluindo taxas.',
'Dividendos acumulados':'Total de proventos recebidos. Fica separado do patrimônio para não contar duas vezes.',
'Retorno total':'Lucro não realizado + lucro realizado + dividendos.',
'Evolução patrimonial':'Linha azul: valor da carteira. Linha roxa: capital investido. A distância entre elas é o ganho.',
'Distribuição da carteira':'Percentual do patrimônio em cada ativo.',
'Dividendos mensais':'Proventos recebidos em cada mês do ano.',
'Rentabilidade da carteira':'Evolução mês a mês do retorno sobre o capital investido.',
'Previsão de rendimentos':'Projeção baseada em pagamentos anteriores. Dividendos futuros não são garantidos.',
'Proventos recebidos':'Lista de dividendos, JCP e rendimentos registrados.',
'Aportado × crescimento':'Azul: dinheiro que você colocou. Verde: quanto os investimentos cresceram (ou caíram) além disso.',
'Patrimônio por categoria':'Quanto você tem em Ações, FIIs, ETFs, BDRs e outros.',
'Qtd':'Quantidade de ações ou cotas em carteira.',
'Preço médio':'Média ponderada de tudo que você pagou, incluindo taxas.',
'Cotação':'Preço atual do ativo. Edite o campo para atualizar; “desatualizada” = mais de 3 dias.',
'Investido':'Custo de aquisição da posição.',
'Lucro':'Valor atual − custo de aquisição.',
'Rent.':'Lucro ÷ custo × 100.',
'Part.':'Participação do ativo no patrimônio total.',
'Dividendos':'Total de proventos recebidos deste ativo.',
'Últ. rend./cota':'Valor do último provento pago por cota.',
'Yield 12m':'Dividend Yield: proventos por cota dos últimos 12 meses ÷ cotação atual.',
'Rend. mensal':'Último provento por cota × quantidade de cotas.',
'Por cota':'Valor do provento por cota ou ação.',
'Preço unit.':'Preço por cota ou ação na operação.',
'Taxas':'Corretagem, emolumentos e outros custos. Entram no custo da compra.',
'Categoria':'Ação, FII, ETF, BDR ou outro. Usado nos gráficos e filtros.',
'Quantidade':'Número de cotas ou ações da operação.',
'Preço (ou valor por cota)':'Preço pago/recebido por unidade. No dividendo, é o valor por cota.',
'Taxas (R$)':'Custos da operação. Somam ao custo da compra e descontam da venda.',
'Tipo de rendimento':'Dividendo, JCP, rendimento de FII ou outro.'};
function ajudas(root){root.querySelectorAll('.c h3, th, label').forEach(e=>{const n=e.childNodes[0];if(!n||n.nodeType!==3)return;
  const t=n.textContent.trim(),k=Object.keys(AJUDA).filter(x=>t.startsWith(x)).sort((a,b)=>b.length-a.length)[0];if(!k)return;
  const s=document.createElement('span');s.className='aj';s.tabIndex=0;s.dataset.t=AJUDA[k];s.setAttribute('role','img');s.setAttribute('aria-label','Ajuda: '+k);s.innerHTML=ICON;n.after(s)})}
const tip=document.getElementById('tip'),aberto=()=>tip.matches(':popover-open');
function showTip(e){const a=e.target.closest?.('.aj');if(!a)return;tip.textContent=a.dataset.t;if(!aberto())tip.showPopover();
  const r=a.getBoundingClientRect(),w=tip.offsetWidth;tip.style.left=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2))+'px';
  tip.style.top=(r.bottom+tip.offsetHeight+10<innerHeight?r.bottom+6:r.top-tip.offsetHeight-6)+'px'}
const hideTip=()=>{if(aberto())tip.hidePopover()};
document.addEventListener('mouseover',showTip);document.addEventListener('focusin',showTip);
document.addEventListener('mouseout',e=>{if(e.target.closest?.('.aj'))hideTip()});document.addEventListener('focusout',e=>{if(e.target.closest?.('.aj'))hideTip()});
document.addEventListener('click',e=>{if(e.target.closest?.('.aj'))showTip(e);else hideTip()});
