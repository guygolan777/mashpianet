/* ===== mobile-first shell: bottom nav + compact top bar ===== */
const _frameBase=frame;
frame=function(route,html){_frameBase(route,html);shellExtras(route)};
const pubUrl=p=>p&&sb?sb.storage.from('creator-works').getPublicUrl(p).data.publicUrl:'';
const initial=n=>(String(n||'?').trim()[0]||'?');
function navFor(U){
 const H=['#/','home','בית'];
 if(!U)return [H,['#/creators','users','יוצרים'],['#/join','spark','ליוצרים'],['#/signup','plus','הרשמה']];
 if(U.r==='creator')return [H,['#/open','mega','קמפיינים'],['#/me','users','פרופיל'],['#/chat','chat','הודעות']];
 return [H,['#/campaigns','mega','קמפיינים'],'plus',['#/creators','users','יוצרים'],['#/chat','chat','הודעות']]}
function shellExtras(route){
 const root=$('#root');if(!root||root.classList.contains('noside'))return;
 const U=LS.g('user',null);
 const top=$('.top');if(top&&!$('.mlogo',top))top.insertAdjacentHTML('afterbegin',`<a class='mlogo' href='#/'><i>${LOGO}</i><span>${BRAND}</span></a>`);
 const act=route==='#/'||route===''?'#/':route;
 const items=navFor(U).map(i=>i==='plus'?`<a class='bnew' href='#/new'>${SI("<path d='M12 5v14M5 12h14'/>")}<span>חדש</span></a>`:`<a class='bni ${act===i[0]?'on':''}' href='${i[0]}'>${ico(i[1])}<span>${i[2]}</span></a>`).join('');
 if(!$('.bnav'))root.insertAdjacentHTML('beforeend',`<nav class='bnav'>${items}</nav>`)}

/* ===== directory card (photo, badge, invite button, name + price below) ===== */
const folLine=c=>{const p=window.CURP||'';const f=folOf(c,p);const pl=p||primaryPl(c);return `${SIN[pl==='ugc'?'ig':pl]||''} ${f?fmtN(f)+' עוקבים':'—'}`};
card=function(c){
 const price=c.real?(c.minShek?'החל מ־₪'+Number(c.minShek).toLocaleString('he-IL'):''):ils(c.pr);
 return `<div class='acw'><a class='cc acc' href='#/creator/${c.id}' style='background:${gr(c.id)}'><div class='ph'>${c.real&&!c.img?`<span class='phl'>${esc(initial(c.n))}</span>`:c.n[0]}</div>${c.real?'':`<span class='demob'>דוגמה</span>`}${c.real&&!c.img?'':`<span class='acb'>${SI("<rect x='3' y='3' width='18' height='18' rx='3'/><circle cx='9' cy='9' r='1.6'/><path d='M21 15l-5-5L5 21'/>")} עם תיק עבודות</span>`}<span class='acg'>הזמנה</span></a><div class='acn'><b>${esc(c.n)}</b><span class='acf'>${folLine(c)}</span><small>${price}</small></div></div>`};

/* ===== advertiser dashboard ===== */
const _homeBase=R['/'];
R['/']=q=>{const U=LS.g('user');if(U&&U.r==='advertiser'&&sb)return advDash(U);return _homeBase(q)};
const greet=()=>{const h=new Date().getHours();return h<5?'לילה טוב':h<12?'בוקר טוב':h<18?'צהריים טובים':'ערב טוב'};
const ago=d=>{const m=Math.max(1,Math.round((Date.now()-new Date(d))/6e4));return m<60?'לפני '+m+' דקות':m<1440?'לפני '+Math.round(m/60)+' שעות':'לפני '+Math.round(m/1440)+' ימים'};
const stepper=(apps,sel)=>{
 const st=[['פורסם','done'],['מועמדויות',apps>0?'done':'cur'],['בחירה',sel>0?'done':apps>0?'cur':'todo'],['סרטונים',sel>0?'cur':'todo']];
 return `<div class='stp'>${st.map((s,i)=>`<div class='sp ${s[1]}'><i>${s[1]==='done'?SI("<path d='M5 12.5l4.2 4.2L19 7'/>"):i+1}</i><span>${s[0]}</span></div>`).join('')}</div>`};
const isVidPath=p=>/\.(mov|mp4|webm)$/i.test(p||'');
const avatarOf=(x,n)=>x&&x.avatar_path?`<img src='${E(pubUrl(x.avatar_path))}' alt=''>`:`<b>${E(initial(n))}</b>`;
async function advDash(U){
 const nm=(U.n||'').split(' ')[0];
 const head=`<div class='dh'><div><div class='dd'>${new Date().toLocaleDateString('he-IL',{weekday:'long',day:'numeric',month:'long'})}</div><h1 class='dg'>${greet()}${nm?', '+esc(nm):''}</h1></div><a class='btn b3 dnew' href='#/new'>＋ קמפיין</a></div>`;
 frame('#/',`${head}<div class='sub'>טוען...</div>`);
 const {data:{session}}=await sb.auth.getSession();if(!session)return;
 const uid=session.user.id;
 const {data:cs}=await sb.from('campaigns').select('id,title,platforms,budget_per_creator,status,created_at').eq('advertiser_id',uid).order('created_at',{ascending:false});
 const camps=cs||[];const ids=camps.map(c=>c.id);
 let apps=[];if(ids.length){const {data}=await sb.from('campaign_applications').select('id,campaign_id,creator_id,status,created_at').in('campaign_id',ids).order('created_at',{ascending:false});apps=data||[]}
 const cids=[...new Set(apps.map(a=>a.creator_id))];const people={};
 if(cids.length){const {data}=await sb.from('creator_profiles').select('user_id,display_name,city,avatar_path').in('user_id',cids);(data||[]).forEach(x=>people[x.user_id]=x)}
 const {data:dir}=await sb.rpc('creator_directory');const more=(dir||[]).filter(r=>!cids.includes(r.user_id)).slice(0,10);
 (dir||[]).forEach(r=>{if(people[r.user_id])people[r.user_id].cover_path=r.cover_path});
 if(location.hash!=='#/'&&location.hash!=='')return;
 const pending=apps.filter(a=>a.status==='pending').length;
 const card1=c=>{const ca=apps.filter(a=>a.campaign_id===c.id),sel=ca.filter(a=>a.status==='selected').length,pe=ca.filter(a=>a.status==='pending').length;
  return `<div class='dcc'><div class='dst ${c.status==='open'?'on':''}'><i></i>${c.status==='open'?'באוויר':'סגור'} · פורסם ${ago(c.created_at)}</div><a class='dct' href='#/campaign?id=${c.id}'>${E(c.title)}</a><div class='dcm'>${ca.length} מועמדויות${c.budget_per_creator!=null?' · ₪'+Number(c.budget_per_creator).toLocaleString('he-IL')+' ליוצר':''}${sel?' · '+sel+' נבחרו':''}</div>${stepper(ca.length,sel)}<div class='dap'>${ca.length?`<div><b>${pe?pe+' יוצרים הגישו מועמדות':'כל המועמדים טופלו'}</b><small>${ca.length} בסך הכול</small></div><div class='dfa'>${ca.slice(0,3).map(a=>`<span class='fa'>${avatarOf(people[a.creator_id],(people[a.creator_id]||{}).display_name)}</span>`).join('')}</div><a class='btn b2 dpick' href='#/campaign?id=${c.id}'>לבחור</a>`:`<div><b>עדיין אין מועמדויות</b><small>בדרך כלל הראשונה מגיעה תוך כמה דקות</small></div>`}</div></div>`};
 const people1=a=>{const x=people[a.creator_id]||{};return `<div class='pcard'><a class='pcp' href='#/creator/${a.creator_id}'>${avatarOf(x,x.display_name)}<div class='pcn'><b>${E(x.display_name||'יוצר')}</b><small>${E(x.city||'')}</small></div></a><a class='btn b3 sm full' href='#/campaign?id=${a.campaign_id}'>לצפייה</a></div>`};
 const dirCard=r=>`<div class='pcard'><a class='pcp' href='#/creator/${r.user_id}'>${avatarOf(r,r.display_name)}<div class='pcn'><b>${E(r.display_name)}</b><small>${r.min_price?'החל מ־₪'+Number(r.min_price).toLocaleString('he-IL'):E(r.city||'')}</small></div></a><a class='btn b3 sm full' href='#/creator/${r.user_id}'>לפרופיל</a></div>`;
 frame('#/',`${head}
 ${pending?`<a class='dban' href='#/campaign?id=${(apps.find(a=>a.status==='pending')||{}).campaign_id||''}'><div><b>${pending} יוצרים מחכים לתשובה</b><span>כדי לענות היום</span></div><i class='btn'>לראות</i></a>`:''}
 ${camps.length?camps.slice(0,3).map(card1).join(''):`<div class='dcc dnone'><b>הקמפיין הראשון שלכם</b><p>ספרו מה אתם רוצים לקדם, ויוצרים יגישו מועמדות.</p><a class='btn b2' href='#/new'>יצירת קמפיין</a></div>`}
 ${apps.length?`<div class='dsec'><div><h2>מי הגישה</h2><small>פתחו פרופיל, או בחרו ישר מההסקירה</small></div><a href='#/campaigns'>לכל המועמדויות ›</a></div><div class='prail'>${apps.slice(0,10).map(people1).join('')}</div>`:''}
 ${more.length?`<div class='dsec'><div><h2>עוד יוצרים שאפשר להזמין</h2><small>מהמאגר שלנו</small></div><a href='#/creators'>לכל היוצרים ›</a></div><div class='prail'>${more.map(dirCard).join('')}</div>`:''}`)}

/* ===== applicants for one campaign ===== */
R['/campaign']=async q=>{
 const cid=q.get('id');if(!cid||!sb){location.hash='#/campaigns';return}
 frame('#/campaigns',`<div class='sub'>טוען...</div>`);
 const {data:c}=await sb.from('campaigns').select('id,title,status,budget_per_creator,created_at').eq('id',cid).maybeSingle();
 if(!c){frame('#/campaigns',`<div class='empty'>הקמפיין לא נמצא.<br><br><a class='btn b1' href='#/campaigns'>לקמפיינים</a></div>`);return}
 const {data:ap}=await sb.from('campaign_applications').select('id,creator_id,message,status,created_at').eq('campaign_id',cid).order('created_at',{ascending:false});
 const apps=ap||[];const ids=apps.map(a=>a.creator_id);const people={};
 if(ids.length){const {data}=await sb.from('creator_profiles').select('user_id,display_name,city,instagram,tiktok,youtube,avatar_path').in('user_id',ids);(data||[]).forEach(x=>people[x.user_id]=x)}
 const sel=apps.filter(a=>a.status==='selected').length;
 const lab={pending:'ממתין',selected:'נבחר',rejected:'נדחה'};
 frame('#/campaigns',`<a href='#/campaigns' class='btn b3 sm' style='margin-bottom:12px'>← לקמפיינים</a><div class='h2' style='font-size:28px'>${E(c.title)}</div><div class='sub'>${apps.length} מועמדויות · ${sel} נבחרו</div>${stepper(apps.length,sel)}${apps.length?apps.map(a=>{const x=people[a.creator_id]||{};const soc=[x.instagram&&'אינסטגרם',x.tiktok&&'טיקטוק',x.youtube&&'יוטיוב'].filter(Boolean).join(' · ');
 return `<div class='apr ${a.status}'><a class='apav' href='#/creator/${a.creator_id}'>${avatarOf(x,x.display_name)}</a><div class='apb'><div class='apt'><b>${E(x.display_name||'יוצר')}</b><span class='stt ${a.status==='selected'?'s-done':a.status==='rejected'?'s-work':'s-new'}'>${lab[a.status]||''}</span></div><small>${E([x.city,soc].filter(Boolean).join(' · '))}</small>${a.message?`<p>${E(a.message)}</p>`:''}<div class='apa'><a class='btn b3 sm' href='#/creator/${a.creator_id}'>פרופיל</a><button class='btn b3 sm' data-m='${a.creator_id}'>הודעה</button>${a.status!=='selected'?`<button class='btn b2 sm' data-s='selected' data-i='${a.id}'>בחירה</button>`:''}${a.status!=='rejected'?`<button class='btn b3 sm' data-s='rejected' data-i='${a.id}'>דחייה</button>`:''}</div></div></div>`}).join(''):`<div class='empty'><b>עדיין אין מועמדויות</b><br>בדרך כלל הראשונה מגיעה תוך כמה דקות.<br><br><a class='btn b1' href='#/creators'>להזמנת יוצרים</a></div>`}`);
 $$('[data-m]').forEach(b=>b.onclick=()=>startConv(b.dataset.m,cid));
 $$('[data-i]').forEach(b=>b.onclick=async()=>{const {error}=await sb.from('campaign_applications').update({status:b.dataset.s}).eq('id',b.dataset.i);if(error)return toast('הפעולה נכשלה');toast(b.dataset.s==='selected'?'היוצר נבחר':'המועמדות נדחתה');R['/campaign'](q)})};

/* ===== send brief (invite a creator to one of my campaigns) ===== */
async function sendBrief(uid,name){
 const U=LS.g('user');if(!U||U.r!=='advertiser'){toast('שליחת בריף זמינה למפרסמים');return}
 const {data:{session}}=await sb.auth.getSession();if(!session)return;
 const {data:cs}=await sb.from('campaigns').select('id,title').eq('advertiser_id',session.user.id).eq('status','open').order('created_at',{ascending:false});
 if(!(cs||[]).length){modal(`<h3>אין עדיין קמפיין פעיל</h3><p class='sub'>כדי לשלוח בריף ל${E(name)}, פרסמו קודם קמפיין.</p><a class='btn b2 full' href='#/new' onclick="document.querySelector('.mdl').remove()">יצירת קמפיין</a>`);return}
 const m=modal(`<h3>שליחת בריף ל${E(name)}</h3><p class='sub'>בחרו קמפיין. היוצר יראה אותו עם ההזמנה האישית שלכם.</p><div id='il'>${cs.map((x,i)=>`<label class='ir'><input type='radio' name='ic' value='${x.id}' ${i?'':'checked'}><span><b>${E(x.title)}</b></span></label>`).join('')}</div><div class='fld'><label>הודעה ליוצר</label><textarea id='im' maxlength='600' placeholder='כמה מילים על למה אתם רוצים לעבוד איתו'></textarea></div><button class='btn b1 full' id='is'>שליחה</button>`);
 $('#is').onclick=async()=>{const v=m.querySelector('input:checked').value;const mtxt=$('#im').value.trim();const {error}=await sb.from('campaign_invites').insert({campaign_id:v,creator_id:uid,message:$('#im').value.trim()||null});if(error)return toast(error.code==='23505'?'כבר שלחתם לו בריף לקמפיין הזה':'השליחה נכשלה');m.remove();toast('הבריף נשלח');try{const cvId=await ensureConv(session.user.id,uid,v);if(cvId){const camp=cs.find(z=>z.id===v);await sendMsg(cvId,mtxt||('הוזמנת לקמפיין: '+(camp?camp.title:'')))}}catch(e){}}}

/* ===== new campaign: landing + 4-step wizard + live screen ===== */
const WZ_STEPS=['המוצר','הבריף','הדרישות','תקציב ומועד'];
const WZ_Q=['מה אתם מפרסמים?','מה היוצרים צריכים ליצור?','מה חשוב לכם ביוצרים?','תקציב ומועד'];
const WZ_SUB=['מוצר, שירות או חוויה','פלטפורמות, נכסים והנחיות','דרישות הקמפיין והתאמת יוצרים','כמה לשלם ליוצר ועד מתי'];
R['/new']=()=>{
 if(!sb){location.hash='#/login';return}
 const d={dl:[{k:'רילס באינסטגרם',q:1}],dmode:'days',ddate:'',n:5,opt:{ship:0,appr:1,rights:1,promo:0,track:0,raw:0},t:'',pl:['ig'],about:'',len:'עד 30 שניות',desc:'',ages:'18-34',ni:[],br:300,days:14};
 let step=0;
 const DK=['רילס באינסטגרם','סטורי באינסטגרם','פוסט באינסטגרם','סרטון טיקטוק','Shorts ביוטיוב','סרטון ביוטיוב','סרטון UGC לפרסום ממומן'];
 const EXS={'יופי וטיפוח':'אנחנו משיקים קרם פנים טבעי ומחפשים יוצרות ביוטי שיצלמו סרטון ניסיון אמיתי באינסטגרם.','אפליקציה':'אנחנו משיקים אפליקציה חדשה ומחפשים יוצרי תוכן שיציגו אותה בסרטון קצר בטיקטוק ובאינסטגרם.','מסעדה':'מסעדה חדשה בתל אביב מחפשת יוצרי אוכל שיתעדו ארוחה וימליצו עליה באינסטגרם.','אלקטרוניקה':'אנחנו מוכרים אוזניות אלחוטיות ומחפשים יוצרי טכנולוגיה לסרטון סקירה ביוטיוב וטיקטוק.'};
 const chips=(arr,key,labels)=>arr.map(x=>`<button type='button' class='ch ${d[key].includes(x[0])?'on':''}' data-c='${key}' data-v='${x[0]}'>${x[1]}</button>`).join('');
 const landing=()=>frame('#/campaigns',`<div class='nwl'><div class='nwi'>${SIC.beauty}</div><h1>מה אתם רוצים לקדם?</h1><p>כתבו במילים שלכם, ונבנה מזה טיוטת קמפיין שאפשר לערוך. אתם מאשרים לפני הפרסום.</p><div class='nwbox'><textarea id='bf' placeholder='למשל: אנחנו משיקים קרם פנים טבעי ומחפשים יוצרות ביוטי שיצלמו סרטון ניסיון אמיתי'></textarea><input id='wu' dir='ltr' placeholder='קישור למוצר או לאתר (לא חובה)'></div><button class='btn b2 full nwgo' id='af'>יוצאים לדרך ←</button><div class='nex'>${Object.keys(EXS).map(k=>`<button class='ch' data-ex='${k}'>${k}</button>`).join('')}</div><p class='nwman'>מעדיפים למלא הכול בעצמכם? <a href='#' id='sb'>יצירה ידנית</a></p></div>`);
 const bar=()=>`<div class='nwbar'>${step>1?`<button class='btn b3' id='bk'>חזרה</button>`:`<a class='btn b3' href='#' id='bk'>חזרה</a>`}<button class='btn b2' id='nx'>${step===4?'פרסום הקמפיין':'המשך ל'+WZ_STEPS[step]}</button></div>`;
 const body=()=>{
  if(step===1)return `<div class='fld'><label>שם הקמפיין או המוצר *</label><input id='dt' value='${esc(d.t)}' placeholder='למשל: השקת קרם פנים טבעי'></div><div class='fld'><label>על המוצר או השירות</label><textarea id='da' rows='5' placeholder='מה מקדמים, מי הקהל, איזה מסר חשוב להעביר'>${esc(d.about)}</textarea></div>`;
  if(step===2)return `<div class='fld'><label>באילו פלטפורמות יפורסם התוכן</label><div class='pill'>${chips(Object.entries(PL),'pl')}</div></div><div class='fld'><label>נכסים שכל יוצר יוצר</label>${d.dl.map((x,i)=>`<div class='row'><span><b>${x.q} × ${esc(x.k)}</b></span><button type='button' class='btn b3 sm' data-rm='${i}'>הסרה</button></div>`).join('')||`<div class='sub'>עוד לא הוספתם נכסים</div>`}<div class='two' style='margin-top:10px'><select id='dk'>${DK.map(x=>`<option>${x}</option>`).join('')}</select><input id='dq' type='number' min='1' max='20' value='1'></div><button type='button' class='btn b3 sm' id='dadd'>＋ הוספת נכס</button></div><div class='fld'><label>אורך הסרטון</label><select id='dl'>${['עד 15 שניות','עד 30 שניות','עד דקה','ללא הגבלה'].map(x=>`<option ${x===d.len?'selected':''}>${x}</option>`).join('')}</select></div><div class='fld'><label>הנחיות לתוכן</label><textarea id='dd' rows='4' placeholder='מה חייב להופיע, מה אסור, קישורים והאשטגים'>${esc(d.desc)}</textarea></div>`;
  if(step===3)return OPTS.map(o=>`<div class='fld'><label>${o[1]}</label><div class='seg'><button type='button' class='${d.opt[o[0]]?'':'on'}' data-o='${o[0]}' data-v='0'>${o[2][0]}</button><button type='button' class='${d.opt[o[0]]?'on':''}' data-o='${o[0]}' data-v='1'>${o[2][1]}</button></div></div>`).join('')+`<div class='fld'><label>תחומים</label><div class='pill'>${NICHES.map(x=>`<button type='button' class='ch ${d.ni.includes(x)?'on':''}' data-c='ni' data-v='${x}'>${x}</button>`).join('')}</div></div><div class='fld'><label>טווח גילאים של היוצר</label><select id='dg'>${['18-24','18-34','25-44','כל הגילאים'].map(x=>`<option ${x===d.ages?'selected':''}>${x}</option>`).join('')}</select></div>`;
  return `<div class='two'><div class='fld'><label>תקציב ליוצר (₪)</label><input type='number' id='db' min='0' value='${d.br}'></div><div class='fld'><label>מספר יוצרים</label><input type='number' id='dn' min='1' max='200' value='${d.n}'></div></div><div class='nwtot'>סך הכול: <b id='tot'></b> <small>(בלי עמלת פלטפורמה)</small></div><div class='fld'><label>מועד מסירת התוכן</label><div class='seg'><button type='button' class='${d.dmode==='days'?'on':''}' data-m='days'>מספר ימים</button><button type='button' class='${d.dmode==='date'?'on':''}' data-m='date'>תאריך קבוע</button></div></div>${d.dmode==='date'?`<div class='fld'><label>תאריך אחרון למסירה</label><input id='dd2' type='date' value='${d.ddate}'></div>`:`<div class='fld'><label>ימים עד המסירה</label><input id='dy2' type='number' min='1' value='${d.days}'></div>`}`};
 const wizard=()=>{
  frame('#/campaigns',`<div class='nwh'><div class='nwprog'>${[1,2,3,4].map(i=>`<i class='${i<=step?'on':''}'></i>`).join('')}</div><small>שלב ${step} מתוך 4 · ${WZ_STEPS[step-1]}</small><h1>${WZ_Q[step-1]}</h1><p>${WZ_SUB[step-1]}</p></div><div class='nws'>${body()}</div>${bar()}`);
  const bind=(i,k,n)=>{const e=$(i);if(e)e.oninput=()=>{d[k]=n?+e.value:e.value}};
  bind('#dt','t');bind('#da','about');bind('#dd','desc');bind('#dl','len');bind('#dg','ages');bind('#db','br',1);bind('#dn','n',1);bind('#dy2','days',1);
  [['#dl','len'],['#dg','ages']].forEach(p=>{if($(p[0]))$(p[0]).onchange=()=>{d[p[1]]=$(p[0]).value}});
  if($('#dd2'))$('#dd2').oninput=e=>{d.ddate=e.target.value};
  const tot=()=>{const t=$('#tot');if(t)t.textContent='₪'+(Math.round(d.br||0)*(d.n||0)).toLocaleString('he-IL')};['#db','#dn'].forEach(i=>{const e=$(i);if(e)e.addEventListener('input',tot)});tot();
  $$('[data-c]').forEach(b=>b.onclick=()=>{const k=b.dataset.c,v=b.dataset.v;d[k]=d[k].includes(v)?d[k].filter(x=>x!==v):[...d[k],v];wizard()});
  $$('[data-o]').forEach(b=>b.onclick=()=>{d.opt[b.dataset.o]=+b.dataset.v;wizard()});
  $$('[data-m]').forEach(b=>b.onclick=()=>{d.dmode=b.dataset.m;wizard()});
  $$('[data-rm]').forEach(b=>b.onclick=()=>{d.dl.splice(+b.dataset.rm,1);wizard()});
  if($('#dadd'))$('#dadd').onclick=()=>{const q=Math.round(+$('#dq').value);if(!(q>=1&&q<=20))return toast('כמות בין 1 ל-20');const k=$('#dk').value;const e=d.dl.find(x=>x.k===k);if(e)e.q=Math.min(20,e.q+q);else d.dl.push({k,q});wizard()};
  $('#bk').onclick=e=>{e.preventDefault();if(step>1){step--;wizard()}else{step=0;landing();wireLanding()}};
  $('#nx').onclick=async()=>{
   if(step===1&&!d.t.trim())return toast('נא לתת שם לקמפיין');
   if(step===2){if(!d.pl.length)return toast('בחרו לפחות פלטפורמה אחת');if(!d.dl.length)return toast('הוסיפו לפחות נכס אחד')}
   if(step<4){step++;wizard();return}
   if(!(d.br>=0))return toast('תקציב לא תקין');if(!(d.n>=1))return toast('מספר יוצרים לא תקין');if(d.dmode==='date'&&!d.ddate)return toast('בחרו תאריך מסירה');
   const btn=$('#nx');btn.disabled=true;
   const row={title:d.t.trim().slice(0,160),brief:d.about.trim().slice(0,3000),platforms:d.pl,niches:d.ni,format:(d.dl[0]||{}).k||null,length:d.len,guidelines:d.desc.trim().slice(0,3000),ages:d.ages,budget_per_creator:Math.round(d.br),days:Math.round(d.days),options:{...d.opt,deliv:d.dl,n:Math.round(d.n),date:d.dmode==='date'?d.ddate:''}};
   const {data,error}=await sb.from('campaigns').insert(row).select('id').maybeSingle();btn.disabled=false;
   if(error)return toast('לא הצלחנו לפרסם: '+error.message);
   live(row,data&&data.id)}};
 const live=(row,id)=>{
  frame('#/campaigns',`<div class='lv'><div class='lvc'><span class='lvb'><i></i> משודר עכשיו ליוצרים</span><h1>הקמפיין <em>באוויר!</em></h1><p>יוצרים כבר רואים את הקמפיין ויכולים להגיש מועמדות.</p><div class='lvr'><div class='lvk'><b>${esc(row.title)}</b><small>${esc((row.platforms||[]).map(k=>PL[k]||k).join(' · '))}${row.budget_per_creator!=null?' · ₪'+Number(row.budget_per_creator).toLocaleString('he-IL'):''}</small></div></div><div class='lvn'><b>0</b><div><strong>מועמדויות עד עכשיו</strong><small>בדרך כלל הראשונה מגיעה תוך כמה דקות</small></div></div></div><div class='lvi'><h3>הזמינו יוצרים בעצמכם</h3><p>שלחו בריף ישירות למי שמתאים לכם מהמאגר.</p><a class='btn b3 full' href='#/creators'>לבחור יוצרים ←</a></div><a class='btn b2 full' href='#/${id?'campaign?id='+id:'campaigns'}'>לדשבורד הקמפיין</a><button class='btn b3 full' id='shr' style='margin-top:10px'>${SI("<circle cx='6' cy='12' r='2.5'/><circle cx='18' cy='6' r='2.5'/><circle cx='18' cy='18' r='2.5'/><path d='M8.2 11l7.6-4M8.2 13l7.6 4'/>")} שיתוף הקישור עם יוצרים שאתם מכירים</button></div>`);
  $('#shr').onclick=async()=>{const url='https://mashpianim.co.il/#/signup?t=creator';const text='יש קמפיין חדש באתר משפיענים. הירשמו כיוצרים והגישו מועמדות:';try{if(navigator.share){await navigator.share({title:'משפיענים',text,url});return}await navigator.clipboard.writeText(text+' '+url);toast('הקישור הועתק')}catch(e){toast('לא הצלחנו לשתף')}}};
 const wireLanding=()=>{
  $$('[data-ex]').forEach(b=>b.onclick=()=>{$('#bf').value=EXS[b.dataset.ex]});
  $('#sb').onclick=e=>{e.preventDefault();step=1;wizard()};
  $('#af').onclick=()=>{const b=$('#bf').value.trim();if(!b)return toast('כתבו כמה מילים על הקמפיין');const w=$('#wu').value.trim();d.about=b+(w?'\n'+w:'');{let t=b.split(/[.\n]/)[0].trim();if(t.length>45){t=t.slice(0,45);t=t.slice(0,t.lastIndexOf(' '))+'…'}d.t=t}const k={אינסטגרם:'ig',טיקטוק:'tt',יוטיוב:'yt',UGC:'ugc'};const f=Object.keys(k).filter(x=>b.includes(x)).map(x=>k[x]);if(f.length)d.pl=f;d.ni=NICHES.filter(x=>b.includes(x));step=1;wizard();toast('נוצרה טיוטה, אפשר לערוך')}};
 landing();wireLanding()};

/* ===== mobile account menu: avatar opens profile / settings / admin / logout ===== */
(function(){
 const _f=frame;
 frame=function(route,html){
  _f(route,html);
  const a=$('.top a.av');if(!a||a.dataset.mm)return;a.dataset.mm='1';
  a.addEventListener('click',e=>{
   if(!matchMedia('(max-width:980px)').matches)return;
   e.preventDefault();e.stopPropagation();
   const U=LS.g('user',null);if(!U)return;
   const old=$('#acm');if(old){old.remove();return}
   const it=(h,i,t)=>`<a class='acmi' href='${h}'>${ico(i)}<span>${t}</span></a>`;
   document.body.insertAdjacentHTML('beforeend',`<div id='acm' class='acm'><div class='acms'><div class='acmh'><b>${E(U.n||'')}</b><small>${E(U.e||'')}</small></div>${it('#/me','users','הפרופיל שלי')}${it('#/settings','gear','הגדרות')}${U.a?it('#/admin','gear','מערכת ניהול'):''}${it('#/help','help','עזרה')}<button class='acmi' id='acmo'>${ico('out')}<span>התנתקות</span></button></div></div>`);
   const m=$('#acm');m.onclick=ev=>{if(ev.target===m||ev.target.closest('a'))m.remove()};
   $('#acmo').onclick=()=>{m.remove();logout()}},true)};
})();

/* upload profile photo straight from the creator home banner */
document.addEventListener('change',async e=>{
 if(!e.target||e.target.id!=='hav')return;
 const f=e.target.files[0];if(!f)return;
 if(!/^image\/(jpeg|png|webp)$/.test(f.type)||f.size>5242880)return toast('בחרו תמונה JPG, PNG או WebP עד 5MB');
 toast('מעלה תמונה...');
 const {data:{session}}=await sb.auth.getSession();if(!session)return;const uid=session.user.id;
 const path=uid+'/avatar-'+Date.now()+'.'+MIME_EXT[f.type];
 const up=await sb.storage.from('creator-works').upload(path,f,{contentType:f.type,cacheControl:'3600'});if(up.error)return toast('ההעלאה נכשלה');
 const u2=await sb.from('creator_profiles').update({avatar_path:path}).eq('user_id',uid);if(u2.error)return toast('השמירה נכשלה');
 const U=LS.g('user',{});U.p=pubUrl(path);LS.s('user',U);toast('תמונת הפרופיל עודכנה');route()});
