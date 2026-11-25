/* Estado global, persistência (localStorage), formatadores e constantes. */
const KEY='carteira_v1';
let S={ops:[],q:{},as:{},demo:false},page='geral',F={y:'',m:'',c:'',t:''},charts=[],per=12;

const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}; // salva no navegador
try{const r=localStorage.getItem(KEY);if(r)S=JSON.parse(r)}catch(e){}
const R=v=>(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}),N=(v,d=2)=>(v||0).toLocaleString('pt-BR',{maximumFractionDigits:d}),P=v=>N(v)+'%';
const cl=v=>v>=0?'pos':'neg',uid=()=>Math.random().toString(36).slice(2,9),today=()=>new Date().toISOString().slice(0,10);
const MES=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const PAGES=[['geral','Visão Geral'],['carteira','Minha Carteira'],['acoes','Ações'],['fiis','Fundos Imobiliários (FIIs)'],['divs','Dividendos'],['hist','Histórico de Operações'],['analise','Análise Patrimonial'],['config','Configurações']];
const CATS=['Ação','FII','ETF','BDR','Outro'];
const ops=()=>[...S.ops].sort((a,b)=>a.date.localeCompare(b.date));
