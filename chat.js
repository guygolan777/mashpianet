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
 const {data:ex}=await sb.from('conversations').select('id').eq('advertiser_id',adv).eq('creator_id',cr).order('created_at').limit(1).maybeSingle();if(ex)return ex.id;
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
  let {data:ex}=await sb.from('conversations').select('id').eq('advertiser_id',c.advertiser_id).eq('creator_id',me).order('created_at').limit(1).maybeSingle();let id=ex&&ex.id;
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

/* ===== attachments + voice messages ===== */
const MEDIA_LABEL={image:'📷 תמונה',video:'🎥 סרטון',audio:'🎤 הודעה קולית',file:'📎 קובץ'};
const CHAT_MAX_MB=25,REC_MAX_S=300;
const CH_MIME={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif','video/mp4':'mp4','video/quicktime':'mov','video/webm':'webm','audio/webm':'webm','audio/ogg':'ogg','audio/mp4':'m4a','audio/mpeg':'mp3','audio/aac':'aac','audio/x-m4a':'m4a','audio/wav':'wav','application/pdf':'pdf'};
const mediaKind=m=>m.startsWith('image/')?'image':m.startsWith('video/')?'video':m.startsWith('audio/')?'audio':'file';
const MSG_COLS='id,sender_id,body,created_at,read,media_path,media_type,media_name,duration_ms';
let SIGN={};
async function signMedia(list){
 const need=[...new Set(list.filter(m=>m.media_path&&!SIGN[m.media_path]).map(m=>m.media_path))];
 if(!need.length)return;
 const {data}=await sb.storage.from('chat-media').createSignedUrls(need,3600);
 (data||[]).forEach(r=>{if(r.signedUrl&&r.path)SIGN[r.path]=r.signedUrl})}
async function sendMedia(convId,blob,mime,name,dur){
 const base=String(mime||blob.type||'').split(';')[0];const ext=CH_MIME[base];
 if(!ext){toast('סוג הקובץ לא נתמך. אפשר לשלוח תמונה, סרטון, הקלטה או PDF');return null}
 if(blob.size>CHAT_MAX_MB*1048576){toast('הקובץ גדול מדי (עד '+CHAT_MAX_MB+'MB)');return null}
 const me=await myId();if(!me)return null;
 const t=mediaKind(base);
 const path=convId+'/'+me+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,7)+'.'+ext;
 const up=await sb.storage.from('chat-media').upload(path,blob,{contentType:base,cacheControl:'3600'});
 if(up.error){toast('ההעלאה נכשלה');return null}
 const {data,error}=await sb.from('messages').insert({conversation_id:convId,body:MEDIA_LABEL[t],media_path:path,media_type:t,media_name:t==='audio'?null:String(name||'').slice(0,200)||null,duration_ms:dur?Math.round(dur):null}).select(MSG_COLS).maybeSingle();
 if(error||!data){await sb.storage.from('chat-media').remove([path]);toast('השליחה נכשלה');return null}
 return data}
const fmtDur=ms=>{const s=Math.max(0,Math.round((ms||0)/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const ICO_PLAY="<path d='M8 5v14l11-7z' fill='currentColor' stroke='none'/>",ICO_PAUSE="<path d='M7 5h3.5v14H7zM13.5 5H17v14h-3.5z' fill='currentColor' stroke='none'/>";
/* one shared player: only one voice message plays at a time */
let VP_CUR=null;
document.addEventListener('click',e=>{
 const b=e.target.closest('.vpb');
 if(b){const w=b.closest('.vp'),a=w.querySelector('audio');
  if(VP_CUR&&VP_CUR!==a){VP_CUR.pause()}
  if(a.paused){VP_CUR=a;a.play().catch(()=>toast('לא ניתן להשמיע את ההקלטה'))}else a.pause();return}
 const im=e.target.closest('.mimg');
 if(im){const o=document.createElement('div');o.className='lbx';o.innerHTML=`<img src='${im.src}' alt=''>`;o.onclick=()=>o.remove();document.body.append(o)}});
const vpSync=(a)=>{const w=a.closest('.vp');if(!w)return;const d=+w.dataset.d||(a.duration*1000)||0;
 w.querySelector('.vpb svg').innerHTML=a.paused?ICO_PLAY:ICO_PAUSE;
 w.querySelector('.vpbar i').style.width=d?Math.min(100,a.currentTime*1000/d*100)+'%':'0';
 w.querySelector('.vpt').textContent=fmtDur(a.paused&&a.currentTime===0?d:a.currentTime*1000)};
['play','pause','timeupdate','ended'].forEach(ev=>document.addEventListener(ev,e=>{if(e.target.tagName==='AUDIO'){if(ev==='ended')e.target.currentTime=0;vpSync(e.target)}},true));

async function chatThread(cid){
 frame('#/chat',`<div class='sub'>טוען...</div>`);
 const me=await myId();if(!me){location.hash='#/login';return}
 const {data:list}=await sb.rpc('my_conversations');
 const cv=(list||[]).find(c=>c.id===cid);
 if(!cv){frame('#/chat',`<div class='empty'>השיחה לא נמצאה.<br><br><a class='btn b1' href='#/chat'>להודעות</a></div>`);return}
 SIGN={};VP_CUR=null;
 const advId=cv.my_role==='advertiser'?me:cv.other_id,crId=cv.my_role==='advertiser'?cv.other_id:me;
 let cids=[cid];
 {const {data:all}=await sb.from('conversations').select('id').eq('advertiser_id',advId).eq('creator_id',crId);if(all&&all.length)cids=[...new Set([cid,...all.map(x=>x.id)])]}
 const profLink=cv.my_role==='advertiser'?`#/creator/${cv.other_id}`:null;
 let msgs=[];
 const body=m=>{
  const u=m.media_path?SIGN[m.media_path]:'';
  if(m.media_path&&!u)return `<div class='mt2'>${E(MEDIA_LABEL[m.media_type]||'קובץ')} (נטען...)</div>`;
  const cap=m.body&&m.body!==MEDIA_LABEL[m.media_type]?`<div class='mt2'>${E(m.body)}</div>`:'';
  if(m.media_type==='image')return `<img class='mimg' src='${E(u)}' alt='' loading='lazy'>${cap}`;
  if(m.media_type==='video')return `<video class='mvid' src='${E(u)}#t=0.1' controls playsinline preload='metadata'></video>${cap}`;
  if(m.media_type==='audio')return `<div class='vp' data-d='${m.duration_ms||0}'><button type='button' class='vpb' aria-label='השמעה'><svg viewBox='0 0 24 24'>${ICO_PLAY}</svg></button><div class='vpbar'><i></i></div><span class='vpt'>${fmtDur(m.duration_ms)}</span><audio preload='none' src='${E(u)}'></audio></div>`;
  if(m.media_type==='file')return `<a class='mfile' href='${E(u)}' target='_blank' rel='noopener'>${SI("<path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z'/><path d='M14 3v5h5'/>")}<span>${E(m.media_name||'קובץ')}</span></a>${cap}`;
  return `<div class='mt2'>${E(m.body)}</div>`};
 const mark=m=>m.sender_id===me?(m.read?' · נקרא':''):'';
 const bubble=m=>`<div class='mb ${m.sender_id===me?'me':''}' data-id='${m.id}'>${body(m)}<small>${hhmm(m.created_at)}<span class='rd'>${mark(m)}</span></small></div>`;
 frame('#/chat',`<div class='cth'><a href='#/chat' class='cbk'>${SI("<path d='M9 6l6 6-6 6'/>")}</a><${profLink?`a href='${profLink}'`:'div'} class='cho'><span class='cav'>${cv.other_avatar?`<img src='${E(pubUrl(cv.other_avatar))}' alt=''>`:`<b>${E(initial(cv.other_name))}</b>`}</span><span><b>${E(cv.other_name)}</b><small>${cv.campaign_title?'קמפיין: '+E(cv.campaign_title):'שיחה ישירה'}</small></span></${profLink?'a':'div'}></div><div class='cmsgs' id='cm'></div>
 <form class='cin' id='cf'><label class='cattach' title='צירוף קובץ' aria-label='צירוף קובץ'>${SI("<path d='M21 11.5l-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8l8.5-8.5a3.7 3.7 0 0 1 5.2 5.2l-8.5 8.5a1.8 1.8 0 0 1-2.6-2.6l7.8-7.8'/>")}<input type='file' id='cfile' accept='image/*,video/*,audio/*,application/pdf' multiple hidden></label><textarea id='ci' rows='1' maxlength='2000' placeholder='כתבו הודעה...'></textarea><button type='button' class='cmic' id='cmic' aria-label='הקלטת הודעה קולית'>${SI("<rect x='9' y='3' width='6' height='11' rx='3'/><path d='M5 11a7 7 0 0 0 14 0M12 18v3'/>")}</button><button class='cs' id='csend' aria-label='שליחה' hidden>${SI("<path d='M22 2L11 13M22 2l-7 20-4-9-9-4z'/>")}</button></form>
 <div class='crec' id='crec' hidden><button type='button' class='crx' id='crx' aria-label='ביטול'>${SI("<path d='M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3'/>")}</button><span class='crd'></span><b id='crt'>0:00</b><span class='crh'>מקליטים...</span><button type='button' class='cs' id='crs' aria-label='שליחת הקלטה'>${SI("<path d='M22 2L11 13M22 2l-7 20-4-9-9-4z'/>")}</button></div>`);
 const box=$('#cm');
 const render=(stick)=>{
  if(!msgs.length){box.innerHTML=`<div class='cem'>עוד אין הודעות בשיחה. כתבו את הראשונה.</div>`;return}
  const em=$('.cem',box);if(em)em.remove();
  const have=new Set($$('.mb',box).map(x=>x.dataset.id));
  msgs.forEach(m=>{
   if(!have.has(String(m.id))){box.insertAdjacentHTML('beforeend',bubble(m))}
   else{const el=box.querySelector(`.mb[data-id='${m.id}']`);const r=el&&el.querySelector('.rd');if(r&&r.textContent!==mark(m))r.textContent=mark(m);
    if(el&&m.media_path&&SIGN[m.media_path]&&/\(נטען/.test(el.textContent)){el.outerHTML=bubble(m)}}});
  if(stick)box.scrollTop=box.scrollHeight};
 const load=async(first)=>{
  const {data}=await sb.from('messages').select(MSG_COLS).in('conversation_id',cids).order('created_at');
  if(!data)return;
  const changed=data.length!==msgs.length||data.some((m,i)=>msgs[i]&&(msgs[i].read!==m.read));
  if(!changed&&!first)return;
  await signMedia(data);
  const atEnd=box.scrollHeight-box.scrollTop-box.clientHeight<80;
  msgs=data;render(first||atEnd);
  if(data.some(m=>m.sender_id!==me&&!m.read)){await sb.from('messages').update({read:true}).in('conversation_id',cids).neq('sender_id',me).eq('read',false);refreshChatBadge(true)}};
 await load(true);
 if(!$('#ci')||!$('#cm'))return;
 const timer=setInterval(()=>{if(!$('#cm')||location.hash.indexOf(cid)<0){clearInterval(timer);stopRec(false);return}load(false)},4000);
 const ci=$('#ci'),sendBtn=$('#csend'),micBtn=$('#cmic');
 const toggle=()=>{const has=!!ci.value.trim();sendBtn.hidden=!has;micBtn.hidden=has};
 ci.oninput=()=>{ci.style.height='auto';ci.style.height=Math.min(ci.scrollHeight,120)+'px';toggle()};
 ci.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#cf').requestSubmit()}};
 const push=async m=>{if(!m)return;await signMedia([m]);msgs.push(m);render(true)};
 $('#cf').onsubmit=async e=>{e.preventDefault();const t=ci.value.trim();if(!t)return;ci.value='';ci.style.height='auto';toggle();const m=await sendMsg(cid,t);if(m)await push(m);else{ci.value=t;toggle()}};
 /* attachments */
 const cfile=$('#cfile');
 cfile.onchange=async()=>{const files=[...cfile.files];cfile.value='';
  for(const f of files){
   const tmp=document.createElement('div');tmp.className='mb me up';tmp.innerHTML=`<div class='mt2'>מעלה ${E(f.name.slice(0,40))}...</div>`;box.append(tmp);box.scrollTop=box.scrollHeight;
   let ff=f;
   if(f.type.startsWith('video/')&&f.size>CHAT_MAX_MB*1048576&&typeof compressVideo==='function'){
    try{ff=await compressVideo(f,{maxDim:960,kbps:1800,maxSec:180,onProgress:p=>{tmp.innerHTML=`<div class='mt2'>מכווץ סרטון ${p}%...</div>`}})}catch(x){tmp.remove();toast('הסרטון גדול מדי ולא הצלחנו לכווץ אותו (עד '+CHAT_MAX_MB+'MB)');continue}}
   const m=await sendMedia(cid,ff,ff.type,ff.name,0);tmp.remove();if(m)await push(m)}};
 /* voice messages */
 let rec=null;
 function stopRec(send){
  const r=rec;if(!r)return Promise.resolve();rec=null;clearInterval(r.tick);
  return new Promise(res=>{
   r.mr.onstop=async()=>{r.stream.getTracks().forEach(t=>t.stop());
    const bar=$('#crec'),form=$('#cf');if(bar)bar.hidden=true;if(form)form.hidden=false;
    if(send&&r.chunks.length){const dur=Date.now()-r.t0;
     if(dur<700){toast('ההקלטה קצרה מדי');return res()}
     const blob=new Blob(r.chunks,{type:r.mime});const m=await sendMedia(cid,blob,r.mime,'',dur);if(m)await push(m)}
    res()};
   try{r.mr.stop()}catch(e){r.stream.getTracks().forEach(t=>t.stop());res()}})}
 micBtn.onclick=async()=>{
  if(rec)return;
  if(!navigator.mediaDevices||!window.MediaRecorder){toast('הדפדפן לא תומך בהקלטה. אפשר לצרף קובץ קול');return}
  let stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){toast('צריך לאשר גישה למיקרופון בדפדפן');return}
  const mime=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg'].find(t=>MediaRecorder.isTypeSupported(t))||'';
  let mr;try{mr=new MediaRecorder(stream,mime?{mimeType:mime}:undefined)}catch(e){stream.getTracks().forEach(t=>t.stop());toast('לא ניתן להתחיל הקלטה');return}
  const r={mr,stream,chunks:[],t0:Date.now(),mime:mr.mimeType||mime||'audio/webm'};
  mr.ondataavailable=e=>{if(e.data&&e.data.size)r.chunks.push(e.data)};
  rec=r;mr.start(250);
  $('#cf').hidden=true;$('#crec').hidden=false;$('#crt').textContent='0:00';
  r.tick=setInterval(()=>{const s=(Date.now()-r.t0)/1000;$('#crt').textContent=fmtDur(s*1000);if(s>=REC_MAX_S)$('#crs').click()},250)};
 $('#crx').onclick=()=>stopRec(false);
 $('#crs').onclick=()=>stopRec(true);
 toggle()}
