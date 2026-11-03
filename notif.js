/* ===== in-app notifications: bell, badge, list, optional browser alerts ===== */
let NT_UNREAD=0,NT_AT=0,NT_LAST=null;
const NT_ICON={application:"<circle cx='9' cy='8' r='3.5'/><path d='M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M18 8v6M15 11h6'/>",selected:"<circle cx='12' cy='12' r='9'/><path d='M8 12.5l2.7 2.7L16 9.5'/>",rejected:"<circle cx='12' cy='12' r='9'/><path d='M9 9l6 6M15 9l-6 6'/>",invite:"<path d='M22 2L11 13M22 2l-7 20-4-9-9-4z'/>",signup:"<path d='M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z'/>"};
async function refreshNotifs(force){
 if(!sb||!LS.g('user'))return;
 if(force||Date.now()-NT_AT>15000){
  NT_AT=Date.now();
  const {count,data}=await sb.from('notifications').select('id,title,body,link,created_at',{count:'exact'}).eq('read',false).order('created_at',{ascending:false}).limit(1);
  const prev=NT_UNREAD;NT_UNREAD=count||0;
  const top=data&&data[0];
  if(top&&NT_LAST!==null&&top.id!==NT_LAST&&NT_UNREAD>prev)browserAlert(top.title,top.body||'');
  NT_LAST=top?top.id:(NT_LAST===null?'':NT_LAST)}
 paintNotifBadge()}
function browserAlert(t,b){try{if('Notification' in window&&Notification.permission==='granted'&&document.hidden)new Notification(t,{body:b,icon:'/og.png'})}catch(e){}}
function paintNotifBadge(){
 const bell=$('#nbell');if(!bell)return;let b=$('.cbd',bell);
 if(!NT_UNREAD){if(b)b.remove();return}
 if(!b){b=document.createElement('em');b.className='cbd';bell.append(b)}
 b.textContent=NT_UNREAD>9?'9+':NT_UNREAD}
const _frameNt=frame;
frame=function(route,html){
 _frameNt(route,html);
 const U=LS.g('user',null);const top=$('.top');
 if(U&&top&&!$('#nbell',top)){const av=$('a.av',top);const a=document.createElement('a');a.id='nbell';a.className='ic';a.href='#/notifications';a.setAttribute('aria-label','התראות');a.innerHTML=SI("<path d='M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9'/><path d='M13.7 21a2 2 0 0 1-3.4 0'/>");if(av)top.insertBefore(a,av.previousElementSibling&&av.previousElementSibling.classList.contains('uname')?av.previousElementSibling:av);else top.append(a)}
 paintNotifBadge();refreshNotifs()};
setInterval(()=>{if(LS.g('user'))refreshNotifs(true)},30000);

R['/notifications']=async()=>{
 if(!sb){location.hash='#/login';return}
 frame('#/notifications',`<div class='h2' style='font-size:30px'>התראות</div><div class='sub'>טוען...</div>`);
 const {data,error}=await sb.from('notifications').select('id,type,title,body,link,read,created_at').order('created_at',{ascending:false}).limit(60);
 if(curPath()!=='/notifications')return;
 if(error){frame('#/notifications',`<div class='empty'>לא הצלחנו לטעון את ההתראות. נסו לרענן.</div>`);return}
 const l=data||[];NT_UNREAD=l.filter(x=>!x.read).length;
 const canBrowser='Notification' in window;const perm=canBrowser?Notification.permission:'denied';
 frame('#/notifications',`<div class='nth'><div><div class='h2' style='font-size:30px'>התראות</div><div class='sub'>${NT_UNREAD?NT_UNREAD+' חדשות':'הכול נקרא'}</div></div>${NT_UNREAD?`<button class='btn b3 sm' id='nall'>סימון הכול כנקרא</button>`:''}</div>
 ${canBrowser&&perm==='default'?`<div class='nbr'><span>רוצים לקבל התראה גם כשהאתר פתוח ברקע?</span><button class='btn b2 sm' id='nbe'>הפעלה</button></div>`:''}
 ${l.length?`<div class='nll'>${l.map(n=>`<a class='nli ${n.read?'':'unr'}' href='${E(n.link||'#/notifications')}' data-i='${n.id}'><span class='nic'>${SI(NT_ICON[n.type]||NT_ICON.signup)}</span><span class='nb'><b>${E(n.title)}</b>${n.body?`<small>${E(n.body)}</small>`:''}</span><time>${hhmm(n.created_at)}</time></a>`).join('')}</div>`:`<div class='empty'><b>אין התראות עדיין</b><br>נעדכן אתכם כאן על מועמדויות, הזמנות ושינויים בקמפיינים.</div>`}`);
 paintNotifBadge();
 $$('.nli').forEach(a=>a.onclick=()=>{if(a.classList.contains('unr'))sb.from('notifications').update({read:true}).eq('id',a.dataset.i).then(()=>refreshNotifs(true))});
 if($('#nall'))$('#nall').onclick=async()=>{await sb.from('notifications').update({read:true}).eq('read',false);await refreshNotifs(true);R['/notifications']()};
 if($('#nbe'))$('#nbe').onclick=async()=>{const p=await Notification.requestPermission();toast(p==='granted'?'התראות הופעלו':'ההרשאה לא ניתנה');R['/notifications']()}};
