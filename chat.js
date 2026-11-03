/* ===== real messaging between advertisers and creators ===== */
let CHAT_UNREAD=0,CHAT_AT=0;
const hhmm=d=>{const t=new Date(d),n=new Date();return t.toDateString()===n.toDateString()?t.toLocaleTimeString('he-IL',{hour:'2-digit',minute:'2-digit'}):t.toLocaleDateString('he-IL',{day:'numeric',month:'numeric'})};
async function myId(){if(!sb)return null;const {data:{session}}=await sb.auth.getSession();return session?session.user.id:null}

async function startConv(otherId,campaignId){
 const me=await myId();const U=LS.g('user');
 if(!me||!U||U.r!=='advertiser'){toast('שליחת הודעה זמינה למפרסמים');return null}
 const id=await ensureConv(me,otherId,campaignId||null);
 if(id)location.hash='#/chat?c='+id;
 return id}
async function ensureConv(adv,cr,campaignId){
 let q=sb.from('conversations').select('id').eq('advertiser_id',adv).eq('creator_id',cr);
 q=campaignId?q.eq('campaign_id',campaignId):q.is('campaign_id',null);
 const {data:ex}=await q.maybeSingle();if(ex)return ex.id;
 const {data,error}=await sb.from('conversations').insert({advertiser_id:adv,creator_id:cr,campaign_id:campaignId}).select('id').maybeSingle();
 if(error||!data){toast('לא הצלחנו לפתוח שיחה');return null}
 return data.id}
async function sendMsg(convId,body){
 const text=String(body||'').trim().slice(0,2000);if(!text)return null;
 const {data,error}=await sb.from('messages').insert({conversation_id:convId,body:text}).select('id,sender_id,body,created_at,read').maybeSingle();
 if(error){toast('השליחה נכשלה');return null}
 return data}
/* creator applied to a campaign: open a conversation with the advertiser */
async function applyConv(campaignId,text){
 try{const me=await myId();if(!me)return;
  const {data:c}=await sb.from('campaigns').select('advertiser_id').eq('id',campaignId).maybeSingle();if(!c)return;
  let q=sb.from('conversations').select('id').eq('advertiser_id',c.advertiser_id).eq('creator_id',me).eq('campaign_id',campaignId);
  let {data:ex}=await q.maybeSingle();let id=ex&&ex.id;
  if(!id){const {data}=await sb.from('conversations').insert({advertiser_id:c.advertiser_id,creator_id:me,campaign_id:campaignId}).select('id').maybeSingle();id=data&&data.id}
  if(id&&text)await sendMsg(id,text)}catch(e){}}

async function refreshChatBadge(force){
 if(!sb||!LS.g('user'))return;
 if(force||Date.now()-CHAT_AT>15000){CHAT_AT=Date.now();const {data}=await sb.rpc('my_conversations');CHAT_UNREAD=(data||[]).reduce((s,c)=>s+(c.unread||0),0)}
 paintBadge()}
function paintBadge(){
 $$('.bni[href="#/chat"],a.nv[href="#/chat"]').forEach(a=>{let b=$('.cbd',a);if(!CHAT_UNREAD){if(b)b.remove();return}if(!b){b=document.createElement('em');b.className='cbd';a.append(b)}b.textContent=CHAT_UNREAD>9?'9+':CHAT_UNREAD})}
const _frameChat=frame;
frame=function(route,html){_frameChat(route,html);paintBadge();refreshChatBadge()};
setInterval(()=>{if(LS.g('user'))refreshChatBadge(true)},30000);

R['/chat']=async q=>{
 if(!sb){location.hash='#/login';return}
 const cid=q.get('c');if(cid)return chatThread(cid);
 frame('#/chat',`<div class='h2' style='font-size:30px'>הודעות</div><div class='sub'>טוען...</div>`);
 const me=await myId();if(!me){location.hash='#/login';return}
 const {data,error}=await sb.rpc('my_conversations');
 if(curPath()!=='/chat'||q.get('c'))return;
 if(error){frame('#/chat',`<div class='empty'>לא הצלחנו לטעון את ההודעות. נסו לרענן.</div>`);return}
 const all=data||[];CHAT_UNREAD=all.reduce((s,c)=>s+(c.unread||0),0);
 const U=LS.g('user')||{};let flt='all',term='';
 const draw=()=>{
  const l=all.filter(c=>(flt==='all'||c.unread>0)&&(!term||(c.other_name+' '+(c.campaign_title||'')+' '+(c.last_text||'')).toLowerCase().includes(term)));
  frame('#/chat',`<div class='h2' style='font-size:30px;margin-bottom:12px'>הודעות</div><div class='chs'><input id='cq' placeholder='חיפוש שיחות...' value='${esc(term)}'></div><div class='chf'><button class='chp ${flt==='all'?'on':''}' data-f='all'>הכל</button><button class='chp ${flt==='un'?'on':''}' data-f='un'>לא נקראו${CHAT_UNREAD?`<b>${CHAT_UNREAD}</b>`:''}</button></div>
  ${l.length?`<div class='cll'>${l.map(c=>`<a class='cli ${c.unread?'unr':''}' href='#/chat?c=${c.id}'><span class='cav'>${c.other_avatar?`<img src='${E(pubUrl(c.other_avatar))}' alt=''>`:`<b>${E(initial(c.other_name))}</b>`}</span><span class='clb'><span class='clt'><b>${E(c.other_name)}</b><small>${hhmm(c.last_at)}</small></span><span class='clc'>${c.campaign_title?`<i class='cpt'>קמפיין</i> ${E(c.campaign_title)}`:'שיחה ישירה'}</span><span class='cls'>${E(c.last_text||'שיחה חדשה')}</span></span>${c.unread?`<em class='cun'>${c.unread}</em>`:''}</a>`).join('')}</div>`:`<div class='empty'><b>${all.length?'לא נמצאו שיחות':'עדיין אין הודעות'}</b><br>${U.r==='creator'?'כשמפרסם יפנה אליכם, או כשתגישו מועמדות לקמפיין, השיחה תופיע כאן.':'התחילו שיחה מפרופיל של יוצר, או ממועמד לקמפיין שלכם.'}${U.r==='creator'?`<br><br><a class='btn b1' href='#/open'>לקמפיינים פתוחים</a>`:`<br><br><a class='btn b1' href='#/creators'>למאגר היוצרים</a>`}</div>`}`);
  $('#cq').oninput=e=>{term=e.target.value.trim().toLowerCase();const p=e.target.selectionStart;draw();const n=$('#cq');n.focus();n.setSelectionRange(p,p)};
  $$('.chp').forEach(b=>b.onclick=()=>{flt=b.dataset.f;draw()})};
 draw()};

async function chatThread(cid){
 frame('#/chat',`<div class='sub'>טוען...</div>`);
 const me=await myId();if(!me){location.hash='#/login';return}
 const {data:list}=await sb.rpc('my_conversations');
 const cv=(list||[]).find(c=>c.id===cid);
 if(!cv){frame('#/chat',`<div class='empty'>השיחה לא נמצאה.<br><br><a class='btn b1' href='#/chat'>להודעות</a></div>`);return}
 const U=LS.g('user')||{};
 const profLink=cv.my_role==='advertiser'?`#/creator/${cv.other_id}`:null;
 let msgs=[];
 const bubble=m=>`<div class='mb ${m.sender_id===me?'me':''}'><div class='mt2'>${E(m.body)}</div><small>${hhmm(m.created_at)}${m.sender_id===me?(m.read?' · נקרא':''):''}</small></div>`;
 frame('#/chat',`<div class='cth'><a href='#/chat' class='cbk'>${SI("<path d='M9 6l6 6-6 6'/>")}</a><${profLink?`a href='${profLink}'`:'div'} class='cho'><span class='cav'>${cv.other_avatar?`<img src='${E(pubUrl(cv.other_avatar))}' alt=''>`:`<b>${E(initial(cv.other_name))}</b>`}</span><span><b>${E(cv.other_name)}</b><small>${cv.campaign_title?'קמפיין: '+E(cv.campaign_title):'שיחה ישירה'}</small></span></${profLink?'a':'div'}></div><div class='cmsgs' id='cm'></div><form class='cin' id='cf'><textarea id='ci' rows='1' maxlength='2000' placeholder='כתבו הודעה...'></textarea><button class='cs' aria-label='שליחה'>${SI("<path d='M22 2L11 13M22 2l-7 20-4-9-9-4z'/>")}</button></form>`);
 const box=$('#cm');
 const render=(stick)=>{box.innerHTML=msgs.length?msgs.map(bubble).join(''):`<div class='cem'>עוד אין הודעות בשיחה. כתבו את הראשונה.</div>`;if(stick)box.scrollTop=box.scrollHeight};
 const load=async(first)=>{
  const {data}=await sb.from('messages').select('id,sender_id,body,created_at,read').eq('conversation_id',cid).order('created_at');
  if(!data)return;
  const changed=data.length!==msgs.length||data.some((m,i)=>msgs[i]&&(msgs[i].read!==m.read));
  msgs=data;if(changed||first){const atEnd=box.scrollHeight-box.scrollTop-box.clientHeight<80;render(first||atEnd)}
  if(data.some(m=>m.sender_id!==me&&!m.read)){await sb.from('messages').update({read:true}).eq('conversation_id',cid).neq('sender_id',me).eq('read',false);refreshChatBadge(true)}};
 await load(true);
 const timer=setInterval(()=>{if(!$('#cm')||location.hash.indexOf(cid)<0){clearInterval(timer);return}load(false)},4000);
 const ci=$('#ci');ci.oninput=()=>{ci.style.height='auto';ci.style.height=Math.min(ci.scrollHeight,120)+'px'};
 ci.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#cf').requestSubmit()}};
 $('#cf').onsubmit=async e=>{e.preventDefault();const t=ci.value.trim();if(!t)return;ci.value='';ci.style.height='auto';const m=await sendMsg(cid,t);if(m){msgs.push(m);render(true)}else ci.value=t}}
