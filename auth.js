const SB_URL='https://vfpwvoycjevzerjjtuki.supabase.co';
const SB_KEY='sb_publishable_qKMTYnZfLyf8u5Qsq0bdRA_zlh7Gcy0';
const sb=window.supabase?window.supabase.createClient(SB_URL,SB_KEY):null;
const ROLE_HE={advertiser:'מפרסם',creator:'יוצר תוכן'};
const INDUSTRIES=['אופנה','ביוטי וטיפוח','מזון ומשקאות','טכנולוגיה ואפליקציות','פיננסים וביטוח','בריאות וכושר','תיירות ופנאי','חינוך','נדל"ן','קמעונאות ומסחר אלקטרוני','אחר'];
const BUDGETS=['עד ₪5,000','₪5,000 עד ₪15,000','₪15,000 עד ₪50,000','מעל ₪50,000','עדיין לא יודע'];
const GOALS=['מודעות למותג','מכירות','התקנות אפליקציה','תוכן לשימוש חוזר (UGC)','השקת מוצר'];
const PLATS=['אינסטגרם','טיקטוק','יוטיוב','UGC'];
const NICHES_ALL=['ביוטי','אופנה','לייפסטייל','UGC','טכנולוגיה','כושר','טיולים','חיות מחמד','אוכל','הורות','גיימינג','עסקים'];
const E=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;').replace(/"/g,'&quot;');

(function(){const st=document.createElement('style');st.textContent='.auth.wide .bc{max-width:780px}.auth .bc .brand{display:flex}.g2{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:0 16px}.sech{font-weight:700;margin:22px 0 10px;color:var(--sky2);font-size:15px}.err{background:#ffe9e9;color:#a02020;border-radius:12px;padding:10px 14px;margin:12px 0;display:none}.err.show{display:block}.chk{display:flex;gap:8px;align-items:flex-start;margin:12px 0;font-size:14px}.chk input{margin-top:4px}.uname{font-weight:600;white-space:nowrap}.roles{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px}.rolecard{border:2px solid var(--line);border-radius:20px;padding:26px 20px;cursor:pointer;text-align:center;background:#fff;display:block;color:inherit;transition:.2s}.rolecard:hover{border-color:var(--sky);transform:translateY(-2px)}.rolecard b{display:block;font-size:20px;margin:8px 0 6px}.rolecard span{color:var(--ink2);font-size:14px;display:block}.rolecard i{font-style:normal;font-size:34px}.hint{color:var(--mut);font-size:13px;margin-top:4px}.rb{display:inline-block;background:#e4f5ff;color:#0b7cc4;border-radius:99px;padding:3px 12px;font-size:13px;font-weight:600}@media(max-width:700px){.g2,.g3,.roles{grid-template-columns:1fr}}';document.head.append(st)})();

const sel=(id,label,opts,val)=>`<div class='fld'><label>${label}</label><select id='${id}'><option value=''>בחרו</option>${opts.map(o=>`<option ${o===val?'selected':''}>${E(o)}</option>`).join('')}</select></div>`;
const inp=(id,label,type,ph,val,extra)=>`<div class='fld'><label>${label}</label><input id='${id}' type='${type||'text'}' placeholder='${E(ph||'')}' value='${E(val)}' ${extra||''}></div>`;
const area=(id,label,ph,val)=>`<div class='fld'><label>${label}</label><textarea id='${id}' placeholder='${E(ph||'')}' maxlength='1000'>${E(val)}</textarea></div>`;
const chipSet=(grp,opts,on)=>`<div class='pill' data-grp='${grp}'>${opts.map(o=>`<button type='button' class='ch ${(on||[]).includes(o)?'on':''}' data-v='${E(o)}'>${E(o)}</button>`).join('')}</div>`;
const val=id=>{const e=$('#'+id);return e?e.value.trim():''};
const picked=grp=>$$('[data-grp='+grp+'] .ch.on').map(b=>b.dataset.v);
const numOrNull=id=>{const v=val(id);if(!v)return null;const n=Number(v);return Number.isInteger(n)&&n>=0&&n<1e9?n:NaN};
const bindChips=()=>$$('.pill[data-grp] .ch').forEach(b=>b.onclick=()=>b.classList.toggle('on'));
const showErr=m=>{const e=$('#er');if(!e)return toast(m);e.textContent=m;e.classList.add('show');e.scrollIntoView({block:'center',behavior:'smooth'})};
const okEmail=s=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const normUrl=s=>{if(!s)return '';const u=/^https?:\/\//i.test(s)?s:'https://'+s;try{const x=new URL(u);return x.hostname.includes('.')?x.href:null}catch(e){return null}};
const handleOf=s=>s.replace(/^@/,'').replace(/^https?:\/\/[^/]+\//i,'').replace(/\/+$/,'').trim();

const heError=er=>{const m=(er&&er.message||'').toLowerCase();
 if(m.includes('invalid login'))return 'אימייל או סיסמה שגויים';
 if(m.includes('not confirmed'))return 'יש לאשר את האימייל לפני ההתחברות. בדקו את תיבת הדואר, כולל ספאם';
 if(m.includes('already registered'))return 'כתובת האימייל כבר רשומה. אפשר להתחבר';
 if(m.includes('password'))return 'הסיסמה חלשה מדי. השתמשו בלפחות 8 תווים';
 if(m.includes('rate limit')||m.includes('too many'))return 'יותר מדי ניסיונות. נסו שוב בעוד כמה דקות';
 if(m.includes('email'))return 'כתובת האימייל לא תקינה';
 if(m.includes('failed to fetch')||m.includes('network'))return 'אין חיבור לשירות. בדקו אינטרנט ונסו שוב';
 return 'אירעה שגיאה: '+(er&&er.message||'לא ידועה')};

async function loadProfile(session){
 if(!sb||!session){LS.s('user',null);return null}
 const {data,error}=await sb.from('profiles').select('role,full_name').eq('id',session.user.id).maybeSingle();
 if(error||!data){LS.s('user',{n:session.user.email,r:null,e:session.user.email});return null}
 LS.s('user',{n:data.full_name||session.user.email,r:data.role,e:session.user.email});
 return data}
const homeFor=r=>r==='creator'?'#/me':'#/campaigns';
const curPath=()=>(location.hash.slice(1)||'/').split('?')[0];

function authShell(title,sub,inner,wide){
 const root=$('#root');root.className='noside';
 root.innerHTML=`<div class='auth ${wide?'wide':''}'><div class='bc'><a class='brand' href='#/' style='padding:0 0 4px'><i>מ</i><span>${BRAND}</span></a><div class='slogan'>מחברים בין משפיענים למפרסמים</div><div class='h2'>${title}</div><p class='sub'>${sub}</p>${inner}</div></div>`;
 window.scrollTo(0,0)}

R['/signup']=q=>{
 const t=q.get('t');
 if(t==='brand')return brandForm();
 if(t==='creator')return creatorForm(q.get('h')||'');
 authShell('הצטרפו למשפיענט','בחרו את המסלול שמתאים לכם. לכל מסלול טופס הרשמה משלו.',
 `<div class='roles'><a class='rolecard' href='#/signup?t=brand'><i>📣</i><b>אני מפרסם</b><span>מותג, עסק או סוכנות שמחפשים יוצרי תוכן ומשפיעני רשת לקמפיינים</span></a><a class='rolecard' href='#/signup?t=creator'><i>🎬</i><b>אני יוצר תוכן / משפיען רשת</b><span>רוצים לקבל הצעות ממותגים, לקבוע מחירון ולהרוויח מהתוכן</span></a></div><p class='sub' style='margin-top:20px;text-align:center'>כבר רשומים? <a href='#/login' style='color:var(--sky2);font-weight:600'>התחברות</a> · <a href='#/'>חזרה לאתר</a></p>`)};

const accountFields=()=>`<div class='sech'>פרטי התחברות</div><div class='g2'>${inp('em','אימייל','email','name@example.com','','autocomplete=email')}${inp('ph','טלפון (לא חובה)','tel','050-0000000','','autocomplete=tel')}${inp('pw','סיסמה','password','לפחות 8 תווים','','autocomplete=new-password minlength=8')}${inp('pw2','אימות סיסמה','password','הקלידו שוב','','autocomplete=new-password')}</div>`;
const checkAccount=()=>{
 const em=val('em').toLowerCase(),pw=$('#pw').value,pw2=$('#pw2').value;
 if(!okEmail(em))return 'כתובת האימייל לא תקינה';
 if(pw.length<8)return 'הסיסמה חייבת להכיל לפחות 8 תווים';
 if(pw!==pw2)return 'הסיסמאות אינן זהות';
 return ''};

const advDetails=v=>{v=v||{};return `<div class='sech'>פרטי העסק</div><div class='g2'>${inp('co','שם המותג / החברה *','text','למשל: קוסמטיקה טבעית בע״מ',v.company_name)}${sel('ind','תחום פעילות',INDUSTRIES,v.industry)}${inp('web','אתר או עמוד עסקי','text','www.example.co.il',v.website)}${sel('bud','תקציב חודשי משוער לשיווק משפיענים',BUDGETS,v.monthly_budget)}</div><div class='fld'><label>באילו פלטפורמות תרצו לפרסם?</label>${chipSet('plats',PLATS,v.platforms)}</div>${sel('goal','מה המטרה העיקרית?',GOALS,v.goal)}${area('about','ספרו בקצרה על העסק ועל סוג היוצרים שאתם מחפשים','למשל: מותג טיפוח טבעי, מחפשים יוצרות ביוטי עם קהל ישראלי',v.about)}`};
const readAdv=()=>{
 const co=val('co');if(!co)return {error:'נא למלא שם מותג או חברה'};
 const w=val('web'),nu=normUrl(w);if(w&&!nu)return {error:'כתובת האתר לא תקינה'};
 return {d:{company_name:co,industry:val('ind'),website:nu||'',monthly_budget:val('bud'),platforms:picked('plats'),goal:val('goal'),about:val('about')}}};

const crDetails=v=>{v=v||{};const nv=x=>x==null?'':x;return `<div class='sech'>פרופיל יוצר</div><div class='g2'>${inp('dn','שם שיוצג בפרופיל *','text','איך מכירים אתכם ברשת',v.display_name)}${inp('city','עיר','text','תל אביב',v.city)}</div><div class='fld'><label>תחומי תוכן * (אפשר לבחור כמה)</label>${chipSet('niches',NICHES_ALL,v.niches)}</div>${area('bio','קצת עליכם','תארו את הסגנון שלכם ואת סוג התוכן שאתם יוצרים',v.bio)}<div class='sech'>החשבונות שלכם ברשתות</div><div class='g2'>${inp('ig','אינסטגרם (שם משתמש)','text','username',v.instagram)}${inp('igf','עוקבים באינסטגרם','number','4200',nv(v.followers_ig),'min=0')}${inp('tt','טיקטוק (שם משתמש)','text','username',v.tiktok)}${inp('ttf','עוקבים בטיקטוק','number','15000',nv(v.followers_tt),'min=0')}${inp('yt','יוטיוב (שם ערוץ)','text','channel',v.youtube)}${inp('ytf','מנויים ביוטיוב','number','800',nv(v.followers_yt),'min=0')}</div><div class='sech'>מחירון התחלתי (₪)</div><div class='g3'>${inp('ps','סטורי','number','150',nv(v.price_story),'min=0')}${inp('pp','פוסט','number','300',nv(v.price_post),'min=0')}${inp('pv','סרטון','number','600',nv(v.price_video),'min=0')}</div>${inp('pf','קישור לתיק עבודות (לא חובה)','text','www.example.com',v.portfolio_url)}`};
const readCr=()=>{
 const dn=val('dn');if(!dn)return {error:'נא למלא שם שיוצג בפרופיל'};
 const niches=picked('niches');if(!niches.length)return {error:'נא לבחור לפחות תחום תוכן אחד'};
 const ig=handleOf(val('ig')),tt=handleOf(val('tt')),yt=handleOf(val('yt'));
 if(!ig&&!tt&&!yt)return {error:'נא למלא לפחות חשבון אחד ברשת חברתית'};
 const nums={};for(const [k,id,l] of [['followers_ig','igf','עוקבים באינסטגרם'],['followers_tt','ttf','עוקבים בטיקטוק'],['followers_yt','ytf','מנויים ביוטיוב'],['price_story','ps','מחיר סטורי'],['price_post','pp','מחיר פוסט'],['price_video','pv','מחיר סרטון']]){const n=numOrNull(id);if(Number.isNaN(n))return {error:'הערך בשדה "'+l+'" אינו מספר תקין'};nums[k]=n}
 const pf=val('pf'),pu=normUrl(pf);if(pf&&!pu)return {error:'כתובת תיק העבודות לא תקינה'};
 return {d:{display_name:dn,city:val('city'),niches,bio:val('bio'),instagram:ig,tiktok:tt,youtube:yt,portfolio_url:pu||'',...nums}}};

function brandForm(){
 authShell('הרשמה למפרסמים','פותחים חשבון מותג, ומתחילים למצוא יוצרי תוכן ומשפיעני רשת שמתאימים לקמפיין.',
 `<form id='sf' novalidate><div class='fld'><label>שם איש הקשר *</label><input id='fn' autocomplete='name' placeholder='שם מלא'></div>${accountFields()}${advDetails()}<label class='chk'><input type='checkbox' id='tos'><span>קראתי ואני מסכים לתנאי השימוש ולמדיניות הפרטיות של משפיענט</span></label><div class='err' id='er'></div><button class='btn b1 full' id='sb'>יצירת חשבון מפרסם</button></form><p class='sub' style='margin-top:16px;text-align:center'>כבר רשומים? <a href='#/login' style='color:var(--sky2);font-weight:600'>התחברות</a> · <a href='#/signup'>חזרה לבחירת מסלול</a></p>`,1);
 bindChips();
 $('#sf').onsubmit=async e=>{e.preventDefault();
  const fn=val('fn');if(!fn)return showErr('נא למלא שם איש קשר');
  const ac=checkAccount();if(ac)return showErr(ac);
  const r=readAdv();if(r.error)return showErr(r.error);
  if(!$('#tos').checked)return showErr('יש לאשר את תנאי השימוש');
  r.d.phone=val('ph');
  await doSignup('advertiser',val('em').toLowerCase(),$('#pw').value,fn,r.d,$('#sb'))}}

function creatorForm(h){
 const years=[];for(let y=new Date().getFullYear()-18;y>=1940;y--)years.push(String(y));
 authShell('הרשמה ליוצרי תוכן ומשפיעני רשת','פותחים פרופיל, קובעים מחירון, ומתחילים לקבל הצעות ממותגים.',
 `<form id='sf' novalidate><div class='g2'><div class='fld'><label>שם מלא *</label><input id='fn' autocomplete='name' placeholder='שם פרטי ושם משפחה'></div>${sel('by','שנת לידה * (18 ומעלה)',years,'')}</div>${accountFields()}${crDetails({instagram:h})}<label class='chk'><input type='checkbox' id='tos'><span>קראתי ואני מסכים לתנאי השימוש ולמדיניות הפרטיות, ואני מאשר שאני בן או בת 18 ומעלה</span></label><div class='err' id='er'></div><button class='btn b1 full' id='sb'>יצירת פרופיל יוצר</button></form><p class='sub' style='margin-top:16px;text-align:center'>כבר רשומים? <a href='#/login' style='color:var(--sky2);font-weight:600'>התחברות</a> · <a href='#/signup'>חזרה לבחירת מסלול</a></p>`,1);
 bindChips();
 $('#sf').onsubmit=async e=>{e.preventDefault();
  const fn=val('fn');if(!fn)return showErr('נא למלא שם מלא');
  const by=val('by');if(!by)return showErr('נא לבחור שנת לידה');
  const ac=checkAccount();if(ac)return showErr(ac);
  const r=readCr();if(r.error)return showErr(r.error);
  if(!$('#tos').checked)return showErr('יש לאשר את תנאי השימוש ואת גיל 18 ומעלה');
  r.d.phone=val('ph');r.d.birth_year=by;
  await doSignup('creator',val('em').toLowerCase(),$('#pw').value,fn,r.d,$('#sb'))}}

async function doSignup(role,email,pw,full,details,btn){
 if(!sb)return showErr('שירות ההרשמה לא נטען. רעננו את הדף ונסו שוב');
 btn.disabled=true;const t0=btn.textContent;btn.textContent='יוצר חשבון...';
 let res;try{res=await sb.auth.signUp({email,password:pw,options:{data:{role,full_name:full,details},emailRedirectTo:location.origin+'/'}})}catch(x){res={error:x}}
 btn.disabled=false;btn.textContent=t0;
 const {data,error}=res;
 if(error)return showErr(heError(error));
 if(data&&data.user&&Array.isArray(data.user.identities)&&data.user.identities.length===0)return showErr('כתובת האימייל כבר רשומה. אפשר להתחבר');
 if(data&&data.session){await loadProfile(data.session);toast('ההרשמה הושלמה, ברוכים הבאים');location.hash=homeFor(role);return}
 authShell('בדקו את תיבת הדואר','',`<div style='text-align:center;padding:10px 0'><div style='font-size:52px'>✉️</div><p style='margin:12px 0'>שלחנו קישור אישור אל <b dir='ltr'>${E(email)}</b>.<br>לחצו עליו כדי להשלים את ההרשמה ולהתחבר.</p><p class='sub'>לא הגיע? בדקו בספאם, או נסו שוב בעוד כמה דקות.</p><a class='btn b1' style='margin-top:14px' href='#/login'>למסך ההתחברות</a></div>`)}

R['/login']=q=>{
 authShell('טוב לראות אתכם שוב','התחברו כדי להמשיך.',
 `<form id='lf' novalidate>${inp('em','אימייל','email','name@example.com','','autocomplete=email')}${inp('pw','סיסמה','password','הסיסמה שלכם','','autocomplete=current-password')}<div class='err' id='er'></div><button class='btn b1 full' id='lb'>התחברות</button></form><p class='sub' style='margin-top:14px;text-align:center'><a href='#' id='fg' style='color:var(--sky2)'>שכחתי סיסמה</a></p><p class='sub' style='margin-top:10px;text-align:center'>חדשים כאן? <a href='#/signup' style='color:var(--sky2);font-weight:600'>הרשמה</a> · <a href='#/'>חזרה לאתר</a></p>`);
 $('#lf').onsubmit=async e=>{e.preventDefault();
  const em=val('em').toLowerCase(),pw=$('#pw').value;
  if(!okEmail(em))return showErr('כתובת האימייל לא תקינה');
  if(!pw)return showErr('נא להקליד סיסמה');
  if(!sb)return showErr('שירות ההתחברות לא נטען. רעננו את הדף');
  const b=$('#lb');b.disabled=true;
  let res;try{res=await sb.auth.signInWithPassword({email:em,password:pw})}catch(x){res={error:x}}
  b.disabled=false;
  if(res.error)return showErr(heError(res.error));
  const p=await loadProfile(res.data.session);toast('התחברתם בהצלחה');location.hash=homeFor(p&&p.role)};
 $('#fg').onclick=async e=>{e.preventDefault();
  const em=val('em').toLowerCase();if(!okEmail(em))return showErr('הקלידו את האימייל שלכם בשדה למעלה ולחצו שוב');
  if(!sb)return showErr('השירות לא נטען');
  const {error}=await sb.auth.resetPasswordForEmail(em,{redirectTo:location.origin+'/'});
  if(error)return showErr(heError(error));
  toast('אם הכתובת רשומה, נשלח אליה קישור לאיפוס סיסמה')}};

R['/reset']=()=>{
 authShell('בחירת סיסמה חדשה','',`<form id='rf' novalidate>${inp('pw','סיסמה חדשה','password','לפחות 8 תווים','','autocomplete=new-password')}${inp('pw2','אימות סיסמה','password','הקלידו שוב','','autocomplete=new-password')}<div class='err' id='er'></div><button class='btn b1 full'>עדכון סיסמה</button></form>`);
 $('#rf').onsubmit=async e=>{e.preventDefault();
  const a=$('#pw').value;if(a.length<8)return showErr('הסיסמה חייבת להכיל לפחות 8 תווים');
  if(a!==$('#pw2').value)return showErr('הסיסמאות אינן זהות');
  const {error}=await sb.auth.updateUser({password:a});
  if(error)return showErr(heError(error));
  toast('הסיסמה עודכנה');location.hash='#/me'}};

R['/me']=async()=>{
 if(!sb){location.hash='#/login';return}
 const {data:{session}}=await sb.auth.getSession();
 if(!session){location.hash='#/login';return}
 if(curPath()!=='/me')return;
 const uid=session.user.id;
 const {data:pr}=await sb.from('profiles').select('role,full_name,phone').eq('id',uid).maybeSingle();
 if(!pr){frame('#/me',`<div class='empty'>לא נמצא פרופיל לחשבון הזה.<br><br><button class='btn b3' id='lo2'>התנתקות</button></div>`);$('#lo2').onclick=logout;return}
 const isAdv=pr.role==='advertiser';
 const {data:det}=await sb.from(isAdv?'advertiser_profiles':'creator_profiles').select('*').eq('user_id',uid).maybeSingle();
 if(curPath()!=='/me')return;
 frame('#/me',`<div class='h2' style='font-size:30px'>הפרופיל שלי</div><div class='sub' style='margin-bottom:16px'><span class='rb'>${ROLE_HE[pr.role]}</span> · <span dir='ltr'>${E(session.user.email)}</span></div><div class='bc' style='max-width:780px'><form id='mf' novalidate><div class='g2'><div class='fld'><label>שם מלא${isAdv?' (איש קשר)':''}</label><input id='fn' value='${E(pr.full_name)}'></div>${inp('ph','טלפון','tel','',pr.phone||'')}</div>${isAdv?advDetails(det):crDetails(det)}<div class='err' id='er'></div><button class='btn b1'>שמירת שינויים</button> <button type='button' class='btn b3' id='lo2'>${ico('out')} התנתקות</button></form></div>`);
 bindChips();$('#lo2').onclick=logout;
 $('#mf').onsubmit=async e=>{e.preventDefault();
  const fn=val('fn');if(!fn)return showErr('נא למלא שם');
  const r=isAdv?readAdv():readCr();if(r.error)return showErr(r.error);
  const a=await sb.from('profiles').update({full_name:fn,phone:val('ph')||null}).eq('id',uid);
  if(a.error)return showErr(heError(a.error));
  const b=await sb.from(isAdv?'advertiser_profiles':'creator_profiles').update(r.d).eq('user_id',uid);
  if(b.error)return showErr(heError(b.error));
  const u=LS.g('user',{});u.n=fn;LS.s('user',u);toast('הפרופיל נשמר')}};

async function logout(){if(sb)await sb.auth.signOut();LS.s('user',null);toast('התנתקתם');location.hash='#/'}

if(sb){
 sb.auth.onAuthStateChange((ev,session)=>{setTimeout(async()=>{
  const was=!!LS.g('user',null);
  await loadProfile(session);
  if(ev==='PASSWORD_RECOVERY'){location.hash='#/reset';return}
  const p=curPath();
  if(session&&(ev==='SIGNED_IN')&&(p==='/'||p==='/login'||p==='/signup')&&!was){const u=LS.g('user',{});location.hash=homeFor(u.r);return}
  route()},0)});
 sb.auth.getSession().then(async({data})=>{await loadProfile(data.session);route()})
}else{LS.s('user',null)}
