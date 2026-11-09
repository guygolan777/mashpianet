/* ===== agencies: representatives who manage several creators ===== */
window.AGMAP=window.AGMAP||{};
let AG_AT=0;
async function loadAgMap(force){
 if(!sb||!LS.g('user'))return;
 if(!force&&Date.now()-AG_AT<30000)return;
 const {data,error}=await sb.rpc('creator_agency_map');if(error)return;
 AG_AT=Date.now();window.AGMAP={};(data||[]).forEach(r=>{window.AGMAP[r.creator_id]=r.agency_name});
 (typeof CR!=='undefined'?CR:[]).forEach(c=>{if(c.real)c.agency=window.AGMAP[c.id]||''})}
const _loadDirAg=loadDirectory;
loadDirectory=async function(force){await _loadDirAg(force);await loadAgMap(force)};

const AG_COUNTS=['1 עד 5','6 עד 15','16 עד 30','יותר מ־30'];
function agencyForm(){
 authShell('הרשמה לסוכנויות ומנהלי משפיענים','פותחים חשבון סוכנות, ומנהלים דרכו את היוצרים שאתם מייצגים. החשבון נבדק ומאושר לפני שאפשר להוסיף יוצרים.',
 `<form id='sf' novalidate><div class='fld'><label>שם איש הקשר *</label><input id='fn' autocomplete='name' placeholder='שם מלא'></div>${accountFields()}<div class='sech'>פרטי הסוכנות</div>${inp('agn','שם הסוכנות / החברה *','text','למשל: סטודיו משפיעניות')}${sel('agc','כמה יוצרים אתם מייצגים?',AG_COUNTS,'')}<details class='opt'><summary>עוד פרטים (לא חובה)</summary>${inp('agw','אתר או עמוד עסקי','text','www.example.co.il')}${area('aga','ספרו על הסוכנות ועל היוצרים שאתם מייצגים','')}</details><label class='chk'><input type='checkbox' id='tos'><span>קראתי ואני מסכים לתנאי השימוש ולמדיניות הפרטיות, ואני מצהיר שיש לי הרשאה לייצג את היוצרים שאוסיף</span></label><div class='err' id='er'></div><button class='btn b1 full' id='sb'>יצירת חשבון סוכנות</button></form><p class='sub' style='margin-top:16px;text-align:center'>כבר רשומים? <a href='#/login' style='color:var(--sky2);font-weight:600'>התחברות</a> · <a href='#/signup'>חזרה לבחירת מסלול</a></p>`,1);
 draftBind('agent');
 $('#sf').onsubmit=async e=>{e.preventDefault();
  const fn=val('fn');if(!fn)return showErr('נא למלא שם איש קשר');
  const ac=checkAccount();if(ac)return showErr(ac);
  const an=val('agn');if(!an)return showErr('נא למלא שם סוכנות');
  const w=val('agw'),nu=normUrl(w);if(w&&!nu)return showErr('כתובת האתר לא תקינה');
  if(!$('#tos').checked)return showErr('יש לאשר את תנאי השימוש');
  await doSignup('agent',val('em').toLowerCase(),$('#pw').value,fn,{agency_name:an,website:nu||'',creators_count:val('agc'),about:val('aga'),phone:val('ph')},$('#sb'))}}

/* signup chooser + routing hook */
const _signupAg=R['/signup'];
R['/signup']=q=>{
 if(q.get('t')==='agency')return agencyForm();
 _signupAg(q);
 const roles=$('.roles');
 if(roles)roles.insertAdjacentHTML('beforeend',`<a class='rolecard' href='#/signup?t=agency'><i>${SI("<circle cx='9' cy='8' r='3.2'/><circle cx='17' cy='9' r='2.6'/><path d='M3 20c0-3.4 2.7-5.5 6-5.5s6 2.1 6 5.5M15.5 14.8c3 0 5.5 1.7 5.5 5'/>")}</i><b>אני סוכנות או מנהל/ת משפיענים</b><span>מייצגים כמה יוצרים ורוצים שכל הפניות, ההודעות והקמפיינים יעברו דרככם</span><ul><li>ניהול מרוכז של כל היוצרים שלכם</li><li>הודעות ממפרסמים בתיבה אחת</li><li>אתם מוסיפים את המיוצגים</li></ul><em class='btn b3'>המשך כסוכנות</em></a>`)};

/* ===== agency home ===== */
const agStatus={pending:['ממתינה לאישור','החשבון נבדק על ידי צוות האתר. אחרי האישור אפשר להוסיף יוצרים מיוצגים.'],approved:['מאושרת',''],rejected:['לא אושרה','החשבון לא אושר. לפרטים אפשר לפנות לתמיכה.']};
async function agencyHome(){
 if(!sb){location.hash='#/login';return}
 const me=await myId();if(!me){location.hash='#/login';return}
 frame('#/',`<div class='h2' style='font-size:30px'>הסוכנות שלי</div><div class='sub'>טוען...</div>`);
 const [{data:ag},{data:roster}]=await Promise.all([
  sb.from('agency_profiles').select('agency_name,status,creators_count').eq('user_id',me).maybeSingle(),
  sb.from('agency_creators').select('creator_id,created_at,creator_profiles(display_name,avatar_path,city,followers_ig,followers_tt,followers_yt,niches)').eq('agent_id',me).order('created_at',{ascending:false})]);
 if(curPath()!=='/')return;
 if(!ag){frame('#/',`<div class='empty'>לא נמצא פרופיל סוכנות לחשבון הזה.</div>`);return}
 const st=agStatus[ag.status]||agStatus.pending;const ok=ag.status==='approved';
 const U=LS.g('user')||{};const nm=(U.n||'').split(' ')[0];
 const cards=(roster||[]).map(r=>{const c=r.creator_profiles||{};const f=(c.followers_ig||0)+(c.followers_tt||0)+(c.followers_yt||0);
  return `<div class='apr'><a class='apav' href='#/creator/${r.creator_id}'>${avatarOf(c,c.display_name)}</a><div class='apb'><div class='apt'><b>${E(c.display_name||'יוצר')}</b><button class='btn b3 sm agrm' data-c='${r.creator_id}'>הסרה</button></div><small>${E([(c.niches||[]).slice(0,2).join(', '),c.city].filter(Boolean).join(' · '))}${f?' · '+fmtN(f)+' עוקבים':''}</small></div></div>`}).join('');
 frame('#/',`<div class='h2' style='font-size:30px'>${nm?'שלום, '+E(nm):'הסוכנות שלי'}</div><div class='sub'>${E(ag.agency_name)} · <span class='stt ${ok?'s-done':''}'>${st[0]}</span></div>
 ${st[1]?`<div class='dap' style='margin:14px 0'><div><b>${st[0]}</b><small>${st[1]}</small></div></div>`:''}
 <div class='bc' style='margin-top:14px'><div class='h2'>הוספת יוצר מיוצג</div><p class='sub'>חפשו יוצר רשום לפי שם או משתמש באינסטגרם. יוצר שכבר מיוצג על ידי סוכנות אחרת לא יופיע לשיוך.</p><div class='chs'><input id='agq' placeholder='שם או משתמש אינסטגרם...' ${ok?'':'disabled'}></div><div id='agr'></div></div>
 <div class='bc' style='margin-top:14px'><div class='h2'>היוצרים שלי (${(roster||[]).length})</div>${cards||`<div class='sub' style='padding:8px 0'>עוד לא הוספתם יוצרים. הודעות ממפרסמים ליוצרים מיוצגים יגיעו אליכם בלשונית "הודעות".</div>`}</div>
 <a class='btn b2 full' style='margin-top:14px' href='#/chat'>להודעות</a>`);
 $$('.agrm').forEach(b=>b.onclick=async()=>{if(!confirm('להסיר את היוצר מהייצוג? ההודעות איתו יחזרו אליו.'))return;
  const {error}=await sb.from('agency_creators').delete().eq('creator_id',b.dataset.c).eq('agent_id',me);if(error)return toast('ההסרה נכשלה');toast('הוסר מהייצוג');loadAgMap(true);agencyHome()});
 const q=$('#agq');if(!q||!ok)return;
 await loadDirectory(true);
 const taken=new Set((roster||[]).map(r=>r.creator_id));
 const draw=()=>{const t=q.value.trim().toLowerCase();const box=$('#agr');if(!t){box.innerHTML='';return}
  const l=CR.filter(c=>c.real&&!taken.has(c.id)&&!AGMAP[c.id]&&((c.n||'').toLowerCase().includes(t)||String((c.soc&&c.soc.ig)||'').toLowerCase().includes(t))).slice(0,8);
  box.innerHTML=l.length?l.map(c=>`<div class='apr'><span class='apav'>${c.img?`<img src='${E(c.img)}' alt=''>`:`<b>${E(initial(c.n))}</b>`}</span><div class='apb'><div class='apt'><b>${E(c.n)}</b><button class='btn b2 sm agadd' data-c='${c.id}'>הוספה</button></div><small>${E(c.c||'')}${c.soc&&c.soc.ig?' · @'+E(c.soc.ig):''}</small></div></div>`).join(''):`<div class='sub' style='padding:8px 0'>לא נמצא יוצר פנוי. יוצרים שכבר מיוצגים לא מוצגים כאן.</div>`;
  $$('.agadd',box).forEach(b=>b.onclick=()=>addToRoster(b.dataset.c))};
 q.oninput=draw}
async function addToRoster(creatorId){
 const me=await myId();if(!me)return;
 if(!confirm('להוסיף את היוצר לייצוג שלכם? מעכשיו הודעות ממפרסמים אליו יגיעו אליכם, והוא יקבל על כך הודעה.'))return;
 const {error}=await sb.from('agency_creators').insert({agent_id:me,creator_id:creatorId});
 if(error){toast(/duplicate|unique/i.test(error.message)?'היוצר כבר מיוצג על ידי סוכנות':'ההוספה נכשלה. ייתכן שהסוכנות עדיין לא אושרה');return}
 toast('היוצר נוסף לייצוג');await loadAgMap(true);
 if(curPath()==='/')agencyHome()}
document.addEventListener('click',e=>{const b=e.target.closest('#sag');if(b)addToRoster(b.dataset.u)});

R['/agency']=()=>{location.replace('#/')};
const _homeAg=R['/'];
R['/']=function(q){const U=LS.g('user');if(U&&U.r==='agent'){agencyHome();return}return _homeAg(q)};

/* badge "represented by" on cards and profile header */
const _cardAg=card;
card=function(c){const h=_cardAg(c);return c.real&&c.agency?h.replace("<div class='acn'>","<div class='acn'><span class='agb'>בייצוג "+E(c.agency)+"</span>"):h};
const _frameAg=frame;
frame=function(route,html){_frameAg(route,html);loadAgMap()};
