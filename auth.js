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

(function(){const st=document.createElement('style');st.textContent='.auth.wide .bc{max-width:780px}.auth .bc .brand{display:flex}.g2{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:0 16px}.sech{font-weight:700;margin:22px 0 10px;color:var(--sky2);font-size:15px}.err{background:#ffe9e9;color:#a02020;border-radius:12px;padding:10px 14px;margin:12px 0;display:none}.err.show{display:block}.chk{display:flex;gap:8px;align-items:flex-start;margin:12px 0;font-size:14px}.chk input{margin-top:4px}.uname{font-weight:600;white-space:nowrap}.roles{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px}.rolecard{border:2px solid var(--line);border-radius:20px;padding:26px 20px;cursor:pointer;text-align:center;background:#fff;display:block;color:inherit;transition:.2s}.rolecard:hover{border-color:var(--sky);transform:translateY(-2px)}.rolecard b{display:block;font-size:20px;margin:8px 0 6px}.rolecard span{color:var(--ink2);font-size:14px;display:block}.rolecard i{font-style:normal;font-size:34px}.hint{color:var(--mut);font-size:13px;margin-top:4px}.rb{display:inline-block;background:#e4f5ff;color:#0b7cc4;border-radius:99px;padding:3px 12px;font-size:13px;font-weight:600}@media(max-width:700px){.g2,.g3,.roles{grid-template-columns:1fr}}.ctr .h2,.ctr .sub{text-align:center}.ctr .brand{justify-content:center}.ctr .slogan{text-align:center}.auth .slogan{margin:2px 0 20px;padding:0}.auth .bc .brand{padding:0}.roles{gap:20px;margin-top:26px;align-items:stretch}.rolecard{display:flex;flex-direction:column;align-items:flex-start;text-align:right;padding:28px 26px}.rolecard i{width:64px;height:64px;border-radius:20px;display:grid;place-items:center;font-size:30px;background:linear-gradient(145deg,#d9f1ff,#c8f3ea);margin-bottom:16px}.rolecard b{font-size:21px;margin:0 0 8px}.rolecard ul{list-style:none;padding:0;margin:16px 0 22px;display:grid;gap:9px;font-size:14px;color:var(--ink)}.rolecard li{padding-right:24px;position:relative}.rolecard li:before{content:\"✓\";position:absolute;right:0;color:var(--sky2);font-weight:800}.rolecard em{font-style:normal;margin-top:auto;width:100%;text-align:center}.pkb{border:1px dashed #bfe0f5;border-radius:16px;padding:16px;background:#f6fbff;margin-top:10px}.pkb b{display:block;margin-bottom:10px}.pkrow{display:grid;grid-template-columns:80px 1fr auto;gap:10px;margin-bottom:10px}.pkrow input,.pkrow select{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:#fff;min-width:0}.pkc{display:flex;align-items:center;gap:12px;border:1px solid var(--line);border-radius:16px;padding:12px 14px;margin-bottom:8px;background:#fff}.pkc>div:first-child{flex:1;min-width:0}.pkc b{display:block}.pkc small{display:block;color:var(--mut);margin-top:2px}.pkpr{font-weight:800;color:var(--sky2);white-space:nowrap}.pkx{color:var(--mut);font-size:16px;padding:4px 8px}.pkx:hover{color:#c0392b}.wkb{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px}.wkb select{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:#fff}.wkup{cursor:pointer}.wkdrop{border:2px dashed #bfe0f5;border-radius:16px;padding:22px;text-align:center;color:var(--ink2);background:#f6fbff;cursor:pointer}.wkdrop.over{border-color:var(--sky);background:#e4f5ff}.wkgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px}.wkt{position:relative;aspect-ratio:3/4;border-radius:14px;overflow:hidden;background:#e4f5ff}.wkt img,.wkt video{width:100%;height:100%;object-fit:cover;display:block}.wkt span{position:absolute;inset:auto 0 0;padding:20px 8px 6px;color:#fff;font-size:12px;font-weight:600;background:linear-gradient(transparent,rgba(14,39,64,.8))}.wkx{position:absolute;top:6px;left:6px;background:rgba(14,39,64,.75);color:#fff;border-radius:99px;width:26px;height:26px;line-height:26px}.svg{margin-bottom:14px}.svt{font-weight:700;margin:12px 0 8px}.svr{border:1px solid var(--line);border-radius:16px;padding:10px 14px;margin-bottom:8px;background:#fff}.svr.on{border-color:var(--sky);background:#f6fbff}.svh{display:flex;gap:10px;align-items:center;cursor:pointer}.svb{display:none;grid-template-columns:110px auto 1fr;gap:8px;align-items:center;margin-top:10px}.svr.on .svb{display:grid}.svb input,.svb textarea{border:1px solid var(--line);border-radius:12px;padding:8px 10px;background:#fff;min-width:0;font:inherit}@media(max-width:700px){.svb{grid-template-columns:1fr auto}.svb textarea,.svb input[type=text]{grid-column:1/-1}}.wkv{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:54px;height:54px;border-radius:50%;background:rgba(14,39,64,.6);display:grid;place-items:center;pointer-events:none}.wkv svg{width:26px;height:26px;margin-right:-3px}@media(max-width:700px){.wkgrid{grid-template-columns:repeat(2,1fr)}}@media(max-width:700px){.pkrow{grid-template-columns:70px 1fr}.pkrow .btn{grid-column:1/-1}}';document.head.append(st)})();

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
 const {data,error}=await sb.from('profiles').select('role,full_name,status').eq('id',session.user.id).maybeSingle();
 if(error||!data){LS.s('user',{n:session.user.email,r:null,e:session.user.email});return null}
 if(data.status==='suspended'){await sb.auth.signOut();LS.s('user',null);toast('החשבון הושעה. לפרטים צרו קשר עם התמיכה');return null}
 const {data:ad}=await sb.from('admins').select('user_id').eq('user_id',session.user.id).maybeSingle();
 LS.s('user',{n:data.full_name||session.user.email,r:data.role,e:session.user.email,a:!!ad});
 return data}
const homeFor=r=>r==='creator'?'#/me':'#/campaigns';
const curPath=()=>(location.hash.slice(1)||'/').split('?')[0];

function authShell(title,sub,inner,wide){
 const root=$('#root');root.className='noside';
 root.innerHTML=`<div class='auth ${wide?'wide':''}'><div class='bc'><a class='brand' href='#/' style='padding:0 0 4px'><i>${LOGO}</i><span>${BRAND}</span></a><div class='slogan'>מחברים בין משפיענים למפרסמים</div><div class='h2'>${title}</div><p class='sub'>${sub}</p>${inner}</div></div>`;
 window.scrollTo(0,0)}

R['/signup']=q=>{
 const t=q.get('t');
 if(t==='brand')return brandForm();
 if(t==='creator')return creatorForm(q.get('h')||'');
 const li=a=>a.map(x=>`<li>${x}</li>`).join('');
 authShell('הצטרפו למשפיענים','בחרו את המסלול שמתאים לכם. לכל מסלול טופס הרשמה משלו.',
 `<div class='roles'><a class='rolecard' href='#/signup?t=brand'><i>${SI("<path d='M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z'/><path d='M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12'/>")}</i><b>אני מפרסם</b><span>מותג, עסק או סוכנות שמחפשים יוצרי תוכן ומשפיעני רשת לקמפיינים</span><ul>${li(['איתור יוצרים לפי תחום, פלטפורמה ותקציב','פרסום קמפיין וקבלת הגשות מיוצרים','מחירון שקוף מראש'])}</ul><em class='btn b1'>המשך כמפרסם</em></a><a class='rolecard' href='#/signup?t=creator'><i>${SI("<rect x='3' y='5' width='18' height='14' rx='3'/><circle cx='12' cy='12' r='3.2'/><path d='M17 8.5h.01'/>")}</i><b>אני יוצר תוכן או משפיען רשת</b><span>רוצים לקבל הצעות ממותגים, לקבוע מחירון ולהרוויח מהתוכן</span><ul>${li(['פרופיל עם עבודות וחשבונות ברשתות','מחירון משלכם, בלי משא ומתן מביך','הגשת מועמדות לקמפיינים פתוחים'])}</ul><em class='btn b2'>המשך כיוצר</em></a></div><p class='sub' style='margin-top:18px;text-align:center'>כבר רשומים? <a href='#/login' style='color:var(--sky2);font-weight:600'>התחברות</a></p>`,1);
 $('.auth .bc').classList.add('ctr')};
const accountFields=()=>`<div class='sech'>פרטי התחברות</div><div class='g2'>${inp('em','אימייל','email','name@example.com','','autocomplete=email')}${inp('ph','טלפון *','tel','050-0000000','','autocomplete=tel')}${inp('pw','סיסמה','password','לפחות 8 תווים','','autocomplete=new-password minlength=8')}${inp('pw2','אימות סיסמה','password','הקלידו שוב','','autocomplete=new-password')}</div>`;
const checkAccount=()=>{
 const em=val('em').toLowerCase(),pw=$('#pw').value,pw2=$('#pw2').value;
 if(!okEmail(em))return 'כתובת האימייל לא תקינה';
 const ph=val('ph').replace(/[\s\-()]/g,'');if(!ph)return 'נא למלא מספר טלפון';if(!/^\+?\d{9,14}$/.test(ph))return 'מספר הטלפון לא תקין';
 if(pw.length<8)return 'הסיסמה חייבת להכיל לפחות 8 תווים';
 if(pw!==pw2)return 'הסיסמאות אינן זהות';
 return ''};

const advDetails=v=>{v=v||{};return `<div class='sech'>פרטי העסק</div><div class='g2'>${inp('co','שם המותג / החברה *','text','למשל: קוסמטיקה טבעית בע״מ',v.company_name)}${sel('ind','תחום פעילות',INDUSTRIES,v.industry)}${inp('web','אתר או עמוד עסקי','text','www.example.co.il',v.website)}${sel('bud','תקציב חודשי משוער לשיווק משפיענים',BUDGETS,v.monthly_budget)}</div><div class='fld'><label>באילו פלטפורמות תרצו לפרסם?</label>${chipSet('plats',PLATS,v.platforms)}</div>${sel('goal','מה המטרה העיקרית?',GOALS,v.goal)}${area('about','ספרו בקצרה על העסק ועל סוג היוצרים שאתם מחפשים','למשל: מותג טיפוח טבעי, מחפשים יוצרות ביוטי עם קהל ישראלי',v.about)}`};
const readAdv=()=>{
 const co=val('co');if(!co)return {error:'נא למלא שם מותג או חברה'};
 const w=val('web'),nu=normUrl(w);if(w&&!nu)return {error:'כתובת האתר לא תקינה'};
 return {d:{company_name:co,industry:val('ind'),website:nu||'',monthly_budget:val('bud'),platforms:picked('plats'),goal:val('goal'),about:val('about')}}};

const KINDS=['רילס באינסטגרם','סטורי באינסטגרם','פוסט באינסטגרם','סרטון טיקטוק','סרטון יוטיוב','סרטון UGC','תמונות UGC'];
const HOSTS={ig:'instagram.com',tt:'tiktok.com',yt:'youtube.com'};
const HANDLE_OK=/^[A-Za-z0-9._-]{1,60}$/;
const parseSocial=(id,key)=>{
 const v=val(id);if(!v)return '';
 let h=v;
 const m=v.match(/^(?:https?:\/\/)?(?:www\.|m\.)?([^\/\s]+)\/(.+)$/i);
 if(m){if(!m[1].toLowerCase().includes(HOSTS[key]))return null;h=m[2]}
 h=h.split(/[?#]/)[0].replace(/\/+$/,'').replace(/^(c|channel|user)\//i,'').replace(/^@/,'');
 return HANDLE_OK.test(h)?h:null};
const socUrl=(key,h)=>!h?'':(/^https?:/i.test(h)?h:({ig:'https://instagram.com/',tt:'https://tiktok.com/@',yt:'https://youtube.com/@'})[key]+h);
const pkTitle=items=>items.map(i=>i.q+' '+i.k).join(' + ');
let PKGS=[],CUR=[];
const pkgHtml=()=>`<div class='sech' id='packages'>החבילות שלכם</div><p class='hint' style='margin:-4px 0 12px'>הרכיבו חבילות משלכם, למשל 3 רילס באינסטגרם + 2 סטורי, וקבעו להן מחיר. מותגים יראו אותן בפרופיל.</p><div id='pklist'></div><div class='pkb'><b>הרכבת חבילה חדשה</b><div class='pkrow'><input id='pkq' type='number' min='1' max='99' value='1' aria-label='כמות'><select id='pkk' aria-label='סוג'>${KINDS.map(k=>`<option>${E(k)}</option>`).join('')}</select><button type='button' class='btn b3 sm' id='pkadd'>＋ הוסיפו לחבילה</button></div><div class='pill' id='pkitems'></div><div class='g2' style='margin-top:12px'>${inp('pkn','שם החבילה (לא חובה)','text','אם ריק, ייווצר שם אוטומטי')}${inp('pkp','מחיר החבילה (₪)','number','900','','min=0')}</div>${inp('pkd','תיאור קצר (לא חובה)','text','למשל: כולל תיאום זכויות שימוש')}<button type='button' class='btn b2 sm' id='pksave'>שמירת החבילה</button></div>`;
const renderPk=()=>{
 const L=$('#pklist');if(!L)return;
 L.innerHTML=PKGS.length?PKGS.map((p,i)=>`<div class='pkc'><div><b>${E(p.title)}</b><small>${p.items.map(x=>E(x.q+' × '+x.k)).join(' · ')}${p.description?' · '+E(p.description):''}</small></div><div class='pkpr'>₪${Number(p.price).toLocaleString('he-IL')}</div><button type='button' class='pkx' data-i='${i}' aria-label='מחיקה'>✕</button></div>`).join(''):`<div class='hint' style='margin-bottom:10px'>עוד לא הוספתם חבילות.</div>`;
 $$('.pkx',L).forEach(b=>b.onclick=()=>{PKGS.splice(+b.dataset.i,1);renderPk()});
 const I=$('#pkitems');I.innerHTML=CUR.map((x,i)=>`<button type='button' class='ch on' data-i='${i}'>${E(x.q+' × '+x.k)} ✕</button>`).join('');
 $$('button',I).forEach(b=>b.onclick=()=>{CUR.splice(+b.dataset.i,1);renderPk()})};
const pkgInit=list=>{
 PKGS=(list||[]).map(p=>({title:p.title,price:p.price,description:p.description||'',items:p.items}));CUR=[];renderPk();
 $('#pkadd').onclick=()=>{const q=parseInt($('#pkq').value,10);if(!(q>=1&&q<=99))return showErr('הכמות חייבת להיות בין 1 ל־99');
  const k=$('#pkk').value;const ex=CUR.find(x=>x.k===k);if(ex)ex.q=Math.min(99,ex.q+q);else{if(CUR.length>=12)return showErr('אפשר עד 12 סוגי תוכן בחבילה');CUR.push({q,k})}
  $('#pkq').value=1;renderPk()};
 $('#pksave').onclick=()=>{
  if(!CUR.length)return showErr('הוסיפו לחבילה לפחות פריט אחד (כמות וסוג תוכן)');
  const pr=$('#pkp').value.trim();const price=Number(pr);if(!pr||!Number.isInteger(price)||price<0||price>1e7)return showErr('נא להזין מחיר חבילה כמספר שלם');
  if(PKGS.length>=10)return showErr('אפשר להגדיר עד 10 חבילות');
  const nm=$('#pkn').value.trim();
  PKGS.push({title:(nm||pkTitle(CUR)).slice(0,160),price,description:$('#pkd').value.trim().slice(0,300),items:CUR.map(x=>({q:x.q,k:x.k}))});
  CUR=[];$('#pkn').value='';$('#pkp').value='';$('#pkd').value='';renderPk();const er=$('#er');if(er)er.classList.remove('show')}};
const WK={story:'סטורי',reel:'רילס',post:'פוסט'};
const MIME_EXT={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif','video/mp4':'mp4','video/quicktime':'mov','video/webm':'webm'};
const MAX_WORK_MB=50,MAX_WORKS=30;
let WORKS=[];
const worksHtml=()=>`<div class='sech' id='works'>העלאת עבודות שלכם (סטורי, רילסים, פוסטים)</div><p class='hint' style='margin:-4px 0 12px'>העלו תמונות וסרטונים מהעבודות שלכם כדי שמותגים יראו את הסגנון. עד ${MAX_WORKS} קבצים, כל קובץ עד ${MAX_WORK_MB}MB.</p><div class='wkb'><select id='wkk' aria-label='סוג עבודה'>${Object.entries(WK).map(([k,v])=>`<option value='${k}'>${v}</option>`).join('')}</select><label class='btn b3 sm wkup'>＋ בחרו קבצים<input id='wkf' type='file' multiple accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm' hidden></label><span class='hint'>בחרו קודם את סוג העבודה, ואז את הקבצים</span></div><div class='wkdrop' id='wkdrop'>או גררו לכאן תמונות וסרטונים</div><div class='wkgrid' id='wkgrid'></div>`;
const renderWorks=()=>{
 const g=$('#wkgrid');if(!g)return;
 g.innerHTML=WORKS.map((w,i)=>w.del?'':`<div class='wkt'>${w.media==='video'?`<video src='${E(w.url)}#t=0.1' muted playsinline preload='auto'></video><em class='wkv'><svg viewBox='0 0 24 24' fill='#fff'><path d='M8 5v14l11-7z'/></svg></em>`:`<img src='${E(w.url)}' alt=''>`}<span>${WK[w.kind]}${w.file?' · חדש':''}</span><button type='button' class='wkx' data-i='${i}' aria-label='הסרה'>✕</button></div>`).join('');
 $$('.wkx',g).forEach(b=>b.onclick=()=>{const w=WORKS[+b.dataset.i];if(w.file){URL.revokeObjectURL(w.url);WORKS.splice(+b.dataset.i,1)}else w.del=true;renderWorks()})};
const addWorkFiles=files=>{
 let bad=0;
 for(const f of files){
  if(!MIME_EXT[f.type]){bad++;continue}
  if(f.size>MAX_WORK_MB*1048576){bad++;continue}
  if(WORKS.filter(w=>!w.del).length>=MAX_WORKS){showErr('אפשר להעלות עד '+MAX_WORKS+' עבודות');break}
  WORKS.push({kind:$('#wkk').value,media:f.type.startsWith('video')?'video':'image',file:f,url:URL.createObjectURL(f)})}
 if(bad)showErr('חלק מהקבצים לא נוספו. מותרים תמונות (JPG, PNG, WebP, GIF) וסרטונים (MP4, MOV, WebM) עד '+MAX_WORK_MB+'MB');
 renderWorks()};
const worksInit=list=>{
 WORKS=(list||[]).map(w=>({id:w.id,kind:w.kind,media:w.media_type,path:w.path,url:sb.storage.from('creator-works').getPublicUrl(w.path).data.publicUrl}));
 renderWorks();
 const inpf=$('#wkf'),dz=$('#wkdrop');
 inpf.onchange=()=>{addWorkFiles([...inpf.files]);inpf.value=''};
 dz.onclick=()=>inpf.click();
 dz.ondragover=e=>{e.preventDefault();dz.classList.add('over')};
 dz.ondragleave=()=>dz.classList.remove('over');
 dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');addWorkFiles([...e.dataTransfer.files])}};
async function syncWorks(uid){
 let fails=0;
 const rm=WORKS.filter(w=>w.del&&w.id);
 if(rm.length){await sb.from('creator_works').delete().in('id',rm.map(w=>w.id));await sb.storage.from('creator-works').remove(rm.map(w=>w.path))}
 for(const w of WORKS.filter(w=>w.file&&!w.del)){
  const path=uid+'/'+Date.now()+'-'+Math.random().toString(36).slice(2,8)+'.'+MIME_EXT[w.file.type];
  const up=await sb.storage.from('creator-works').upload(path,w.file,{contentType:w.file.type});
  if(up.error){fails++;continue}
  const ins=await sb.from('creator_works').insert({user_id:uid,kind:w.kind,media_type:w.media,path});
  if(ins.error){fails++;await sb.storage.from('creator-works').remove([path])}}
 return fails}
const SVC_CATALOG=[
['אינסטגרם',[['reel','רילס (עד 60 שניות)','תסריט, צילום מקצועי, עריכה עם טרנדים ומעברים, כיתוב (קפשן) ונוכחות קבועה בפיד',7500],['collab_reel','רילס קולאב','פרסום משותף בפיד שלי ובפיד של המותג',8500],['story_series','סדרת סטוריז (3-4 סטוריז)','בעיה, פתרון, הדגמה וסטיקר לינק עם קוד קופון',3500],['story','סטורי בודד (עד 15 שניות)','סטורי אחד עם הדגמה ולינק',1500],['feed_post','פוסט סטטי / קרוסלה (עד 4 תמונות)','צילום ועיצוב פוסט, כיתוב ותיוג המותג',5000]]],
['טיקטוק',[['tt_video','סרטון אורגני (עד 60 שניות)','תסריט, צילום ועריכה בסגנון הפלטפורמה',6500],['tt_challenge','צ׳אלנג׳ / סאונד של המותג','יצירת צ׳אלנג׳ או שימוש בסאונד המותג והפצה לקהל',8000]]],
['יוטיוב',[['yt_short','Shorts','סרטון קצר אנכי עד 60 שניות',5500],['yt_integration','אינטגרציית ספונסר בסרטון ארוך','קטע של 60-90 שניות בסרטון באורך 10-20 דקות, כולל לינק בתיאור',12000],['yt_dedicated','סרטון ייעודי','סרטון מלא של 8-15 דקות המוקדש למותג',25000]]],
['UGC (תוכן למותג בלבד, לא מפורסם בערוצים שלי)',[['ugc_vertical','סרטון אנכי 9:16 לפרסום ממומן','סרטון מוכן להעלאה כמודעה, נמסר למותג ללא פרסום בערוצים שלי',4000]]]];
const ADDON_CATALOG=[['exclusivity','בלעדיות','percent',40,'אין מותג מתחרה למשך 30 יום','% מהמחיר הבסיסי'],['whitelisting','Whitelisting / Dark ads','percent',25,'לכל 30 יום, מחיר הסרטון','% ממחיר הסרטון'],['rush','הפקה דחופה','fixed',1500,'מסירה תוך 48 שעות','₪']];
const svcRow=(k,t,def,ex,cur)=>{const on=!!cur;return `<div class='svr${on?' on':''}' data-k='${k}'><label class='svh'><input type='checkbox' id='sv_${k}'${on?' checked':''}><b>${t}</b></label><div class='svb'><input type='number' min='0' id='svp_${k}' placeholder='המחיר שלך' value='${on?cur.price:''}' ${on?'':'disabled'}><span>₪</span><textarea id='svi_${k}' rows='2' maxlength='400' placeholder='מה כלול' ${on?'':'disabled'}>${on?E(cur.included||''):''}</textarea></div></div>`};
const svcHtml=(sv,ad)=>{sv=sv||[];ad=ad||[];const gs=k=>sv.find(x=>x.service_key===k||x.key===k);const ga=k=>ad.find(x=>x.addon_key===k||x.key===k);
 return `<div class='sech' id='pricing'>מחירון שירותים (₪)</div><p class='hint' style='margin:-4px 0 10px'>סמנו את השירותים שאתם מציעים, קבעו מחיר ופרטו מה כלול. מפרסמים יראו את המחירון בפרופיל שלכם.</p>`+SVC_CATALOG.map(([g,items])=>`<div class='svg'><div class='svt'>${g}</div>${items.map(([k,t,d,ex])=>svcRow(k,t,d,ex,gs(k))).join('')}</div>`).join('')+`<div class='svg'><div class='svt'>תוספות שמפרסמים יכולים לסמן בהזמנה</div>${ADDON_CATALOG.map(([k,t,kind,dv,note,unit])=>{const c=ga(k);const on=!!c;return `<div class='svr${on?' on':''}' data-a='${k}'><label class='svh'><input type='checkbox' id='ad_${k}'${on?' checked':''}><b>${t}</b></label><div class='svb'><input type='number' min='0' id='adv_${k}' placeholder='הערך שלך' value='${on?c.value:''}' ${on?'':'disabled'}><span>${kind==='percent'?'%':'₪'}</span><input type='text' maxlength='400' id='adn_${k}' placeholder='${note}' value='${on?E(c.note||''):''}' ${on?'':'disabled'}></div><div class='hint'>${unit}</div></div>`}).join('')}</div>`};
const svcInit=()=>{
 const wire=(row,ids,defs)=>{const cb=row.querySelector('input[type=checkbox]');cb.onchange=()=>{row.classList.toggle('on',cb.checked);ids.forEach((id,i)=>{const el=$('#'+id);el.disabled=!cb.checked;if(cb.checked&&!el.value&&defs[i]!=null)el.value=defs[i]});if(!cb.checked)ids.forEach(id=>$('#'+id).value='')}};
 SVC_CATALOG.forEach(([g,items])=>items.forEach(([k,t,d,ex])=>wire($('.svr[data-k="'+k+'"]'),['svp_'+k,'svi_'+k],[null,d])));
 ADDON_CATALOG.forEach(([k,t,kind,dv,note])=>wire($('.svr[data-a="'+k+'"]'),['adv_'+k,'adn_'+k],[null,note]));};
const readSvc=()=>{const services=[],addons=[];
 for(const [g,items] of SVC_CATALOG)for(const [k,t] of items){if(!$('#sv_'+k).checked)continue;const raw=$('#svp_'+k).value.trim();const p=Number(raw);if(raw===''||!Number.isInteger(p)||p<0||p>10000000)return {error:'נא להזין מחיר תקין (מספר שלם) עבור "'+t+'"'};services.push({key:k,price:p,included:$('#svi_'+k).value.trim().slice(0,400)})}
 for(const [k,t,kind] of ADDON_CATALOG){if(!$('#ad_'+k).checked)continue;const raw=$('#adv_'+k).value.trim();const p=Number(raw);if(raw===''||!Number.isInteger(p)||p<0||p>(kind==='percent'?300:10000000))return {error:'נא להזין ערך תקין עבור התוספת "'+t+'"'};addons.push({key:k,kind,value:p,note:$('#adn_'+k).value.trim().slice(0,400)})}
 return {services,addons}};
const insForm=v=>{v=v||{};const nv=x=>x==null?'':x;return `<div class='sech' id='insights'>נתוני ביצועים</div><p class='hint' style='margin:-4px 0 10px'>נתונים אלה מוצגים למפרסמים בלשונית "נתוני קהל". כרגע הם מוזנים ידנית ומסומנים כ"לא מאומת". חיבור רשמי לאינסטגרם, שיציג גם נתוני קהל מאומתים, יתווסף בקרוב.</p><div class='g3'>${inp('ilk','לייקים בממוצע לפוסט','number','500',nv(v.avg_likes),'min=0')}${inp('icm','תגובות בממוצע לפוסט','number','20',nv(v.avg_comments),'min=0')}${inp('ivw','צפיות בממוצע לרילס','number','5000',nv(v.avg_views),'min=0')}</div><div class='g2'>${inp('ipo','מספר פוסטים','number','300',nv(v.posts),'min=0')}<div class='fld'><label>חיבור לאינסטגרם</label><button type='button' class='btn b3 full' disabled title='יהיה זמין בקרוב'>חברו אינסטגרם (בקרוב)</button></div></div>`};
const readIns=()=>{const o={};for(const [k,id,l] of [['avg_likes','ilk','לייקים'],['avg_comments','icm','תגובות'],['avg_views','ivw','צפיות'],['posts','ipo','פוסטים']]){const n=numOrNull(id);if(Number.isNaN(n)||(n!=null&&(n<0||n>1e9||!Number.isInteger(n))))return {error:'הערך בשדה "'+l+'" אינו תקין'};o[k]=n}return {o}};
const crDetails=(v,withPricing)=>{v=v||{};const nv=x=>x==null?'':x;return `<div class='esec' data-s='prof'><div class='sech' id='prof'>פרופיל יוצר</div><div class='g2'>${inp('dn','שם שיוצג בפרופיל *','text','איך מכירים אתכם ברשת',v.display_name)}${inp('city','עיר','text','תל אביב',v.city)}</div><div class='fld'><label>תחומי תוכן * (אפשר לבחור כמה)</label>${chipSet('niches',NICHES_ALL,v.niches)}</div>${area('bio','קצת עליכם','תארו את הסגנון שלכם ואת סוג התוכן שאתם יוצרים',v.bio)}<div class='sech'>הקישורים שלכם לרשתות (לא חובה, אפשר להוסיף גם אחר כך)</div><div class='g2'>${inp('ig','קישור לאינסטגרם (לא חובה)','text','https://instagram.com/username',socUrl('ig',v.instagram),'dir=ltr')}${inp('igf','עוקבים באינסטגרם','number','4200',nv(v.followers_ig),'min=0')}${inp('tt','קישור לטיקטוק (לא חובה)','text','https://tiktok.com/@username',socUrl('tt',v.tiktok),'dir=ltr')}${inp('ttf','עוקבים בטיקטוק','number','15000',nv(v.followers_tt),'min=0')}${inp('yt','קישור ליוטיוב (לא חובה)','text','https://youtube.com/@channel',socUrl('yt',v.youtube),'dir=ltr')}${inp('ytf','מנויים ביוטיוב','number','800',nv(v.followers_yt),'min=0')}</div></div>${withPricing?`<div class='esec' data-s='pricing'>${svcHtml(v.services,v.addons)}</div><div class='esec' data-s='packages'>${pkgHtml()}</div><div class='esec' data-s='insights'>${insForm(v.insights)}</div>`:''}<div class='esec' data-s='works'>${worksHtml()}</div>`};
const readCr=()=>{
 const dn=val('dn');if(!dn)return {error:'נא למלא שם שיוצג בפרופיל'};
 const niches=picked('niches');if(!niches.length)return {error:'נא לבחור לפחות תחום תוכן אחד'};
 const ig=parseSocial('ig','ig'),tt=parseSocial('tt','tt'),yt=parseSocial('yt','yt');
 if(ig===null)return {error:'הקישור לאינסטגרם לא תקין. הדביקו קישור מהפרופיל, למשל https://instagram.com/username'};
 if(tt===null)return {error:'הקישור לטיקטוק לא תקין. הדביקו קישור מהפרופיל, למשל https://tiktok.com/@username'};
 if(yt===null)return {error:'הקישור ליוטיוב לא תקין'};
 const nums={};for(const [k,id,l] of [['followers_ig','igf','עוקבים באינסטגרם'],['followers_tt','ttf','עוקבים בטיקטוק'],['followers_yt','ytf','מנויים ביוטיוב']]){const n=numOrNull(id);if(Number.isNaN(n))return {error:'הערך בשדה "'+l+'" אינו מספר תקין'};nums[k]=n}
 const hasP=!!$('#sv_reel');const sv=hasP?readSvc():{services:[],addons:[]};if(sv.error)return sv;if(hasP){const pf=k=>{const x=sv.services.find(y=>y.key===k);return x?x.price:null};nums.price_video=pf('reel');nums.price_story=pf('story');nums.price_post=pf('feed_post')}
 return {d:{display_name:dn,city:val('city'),niches,bio:val('bio'),instagram:ig,tiktok:tt,youtube:yt,...nums},services:sv.services,addons:sv.addons,packages:(hasP?PKGS:[]).map(p=>({title:p.title,price:p.price,description:p.description,items:p.items}))}};

function brandForm(){
 authShell('הרשמה למפרסמים','פותחים חשבון מותג, ומתחילים למצוא יוצרי תוכן ומשפיעני רשת שמתאימים לקמפיין.',
 `<form id='sf' novalidate><div class='fld'><label>שם איש הקשר *</label><input id='fn' autocomplete='name' placeholder='שם מלא'></div>${accountFields()}${advDetails()}<label class='chk'><input type='checkbox' id='tos'><span>קראתי ואני מסכים לתנאי השימוש ולמדיניות הפרטיות של משפיענים</span></label><div class='err' id='er'></div><button class='btn b1 full' id='sb'>יצירת חשבון מפרסם</button></form><p class='sub' style='margin-top:16px;text-align:center'>כבר רשומים? <a href='#/login' style='color:var(--sky2);font-weight:600'>התחברות</a> · <a href='#/signup'>חזרה לבחירת מסלול</a></p>`,1);
 bindChips();
 $('#sf').onsubmit=async e=>{e.preventDefault();
  const fn=val('fn');if(!fn)return showErr('נא למלא שם איש קשר');
  const ac=checkAccount();if(ac)return showErr(ac);
  const r=readAdv();if(r.error)return showErr(r.error);
  if(!$('#tos').checked)return showErr('יש לאשר את תנאי השימוש');
  r.d.phone=val('ph');
  await doSignup('advertiser',val('em').toLowerCase(),$('#pw').value,fn,r.d,$('#sb'))}}

function creatorForm(h){
 authShell('הרשמה ליוצרי תוכן ומשפיעני רשת',`<span class='steps2'><b class='on'>1</b> פרופיל <i></i><b>2</b> מחירון וחבילות</span>`,
 `<form id='sf' novalidate><div class='fld'><label>שם מלא *</label><input id='fn' autocomplete='name' placeholder='שם פרטי ושם משפחה'></div>${accountFields()}${crDetails({instagram:handleOf(h)})}<label class='chk'><input type='checkbox' id='tos'><span>קראתי ואני מסכים לתנאי השימוש ולמדיניות הפרטיות, ואני מאשר שאני בן או בת 18 ומעלה</span></label><div class='err' id='er'></div><button class='btn b1 full' id='sb'>יצירת פרופיל והמשך לבניית מחירון</button></form><p class='sub' style='margin-top:16px;text-align:center'>כבר רשומים? <a href='#/login' style='color:var(--sky2);font-weight:600'>התחברות</a> · <a href='#/signup'>חזרה לבחירת מסלול</a></p>`,1);
 bindChips();worksInit([]);
 $('#sf').onsubmit=async e=>{e.preventDefault();
  const fn=val('fn');if(!fn)return showErr('נא למלא שם מלא');
  const ac=checkAccount();if(ac)return showErr(ac);
  const r=readCr();if(r.error)return showErr(r.error);
  if(!$('#tos').checked)return showErr('יש לאשר את תנאי השימוש ואת גיל 18 ומעלה');
  r.d.phone=val('ph');r.d.packages=r.packages;r.d.services=r.services;r.d.addons=r.addons;
  await doSignup('creator',val('em').toLowerCase(),$('#pw').value,fn,r.d,$('#sb'))}}

async function doSignup(role,email,pw,full,details,btn){
 if(!sb)return showErr('שירות ההרשמה לא נטען. רעננו את הדף ונסו שוב');
 btn.disabled=true;const t0=btn.textContent;btn.textContent='יוצר חשבון...';
 let res;try{res=await sb.auth.signUp({email,password:pw,options:{data:{role,full_name:full,details},emailRedirectTo:location.origin+'/'}})}catch(x){res={error:x}}
 btn.disabled=false;btn.textContent=t0;
 const {data,error}=res;
 if(error)return showErr(heError(error));
 if(data&&data.user&&Array.isArray(data.user.identities)&&data.user.identities.length===0)return showErr('כתובת האימייל כבר רשומה. אפשר להתחבר');
 if(data&&data.session){await loadProfile(data.session);if(role==='creator'&&WORKS.some(w=>w.file)){toast('מעלה את העבודות שלכם...');const f=await syncWorks(data.session.user.id);if(f)toast('חלק מהקבצים לא הועלו. אפשר להעלות שוב ב"הפרופיל שלי"')}toast('ההרשמה הושלמה, ברוכים הבאים');location.hash=homeFor(role);return}
 authShell('בדקו את תיבת הדואר','',`<div style='text-align:center;padding:10px 0'><div class='bigi'>${SI("<rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/>")}</div><p style='margin:12px 0'>שלחנו קישור אישור אל <b dir='ltr'>${E(email)}</b>.<br>לחצו עליו כדי להשלים את ההרשמה ולהתחבר. אחרי ההתחברות תעברו לשלב 2: בניית המחירון והחבילות.</p>${WORKS.some(w=>w.file)?`<p class='sub'>הקבצים שבחרתם לא הועלו עדיין. אחרי ההתחברות אפשר להעלות אותם בעמוד "הפרופיל שלי".</p>`:''}<p class='sub'>לא הגיע? בדקו בספאם, או נסו שוב בעוד כמה דקות.</p><a class='btn b1' style='margin-top:14px' href='#/login'>למסך ההתחברות</a></div>`)}

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


const svcTitle={};SVC_CATALOG.forEach(([g,it])=>it.forEach(([k,t])=>svcTitle[k]=t));
const shk=n=>'₪'+Number(n).toLocaleString('he-IL');
function meView(pr,det,pk,wk,email){
 const urls=wk.map(w=>({...w,url:sb.storage.from('creator-works').getPublicUrl(w.path).data.publicUrl}));
 const imgs=urls.filter(w=>w.media_type!=='video'),vids=urls.filter(w=>w.media_type==='video');
 const mosaic=urls.slice(0,5);
 const tile=(w,i)=>w.media_type==='video'?`<div class='pt pt${i}'><video src='${E(w.url)}#t=0.1' muted playsinline preload='auto'></video></div>`:`<div class='pt pt${i}' style='background-image:url(${E(w.url)});background-size:cover;background-position:50% 20%'></div>`;
 const edit=(sec,label)=>`<a class='btn b3 sm' href='#/me?edit=${sec}'>${SI("<path d='M12 20h9'/><path d='M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'/>")} ${label||'עריכה'}</a>`;
 const fol=(det.followers_ig||0)+(det.followers_tt||0)+(det.followers_yt||0);
 const name=det.display_name||pr.full_name||email;
 const soc=chips({ig:det.instagram,tt:det.tiktok,yt:det.youtube});
 const tabs=['מחירון','חבילות','עבודות','נתוני קהל','אודות'];
 const sv=det.services||[],ad=det.addons||[];
 const body={
  'מחירון':()=>sv.length?`<div class='tabact'>${edit('pricing','עריכת מחירון')}</div>`+SVC_CATALOG.map(([g,items])=>{const rows=items.filter(([k])=>sv.some(x=>x.service_key===k));return rows.length?`<div class='xg'><div class='xt'>${g}</div>${rows.map(([k,t])=>{const x=sv.find(y=>y.service_key===k);return `<div class='pk' style='cursor:default'><div><span>${t}</span><span>${shk(x.price)}</span></div>${x.included?`<p>${E(x.included)}</p>`:''}</div>`}).join('')}</div>`:''}).join('')+(ad.length?`<div class='xg'><div class='xt'>תוספות</div>${ad.map(a=>`<div class='pk' style='cursor:default'><div><span>${E({exclusivity:'בלעדיות',whitelisting:'Whitelisting / Dark ads',rush:'הפקה דחופה'}[a.addon_key]||a.addon_key)}</span><span>${a.kind==='percent'?'+'+a.value+'%':'+'+shk(a.value)}</span></div>${a.note?`<p>${E(a.note)}</p>`:''}</div>`).join('')}</div>`:''):`<div class='empty'><b>עוד לא הגדרתם מחירון</b><br>מותגים רואים את המחירון שלכם לפני שהם פונים.<br><br>${edit('pricing','בניית מחירון')}</div>`,
  'חבילות':()=>pk.length?`<div class='tabact'>${edit('packages','עריכת חבילות')}</div>`+pk.map(p=>`<div class='pk' style='cursor:default'><div><span>${E(p.title)}</span><span>${shk(p.price)}</span></div><p>${E((p.items||[]).map(x=>x.q+' × '+x.k).join(' · '))}${p.description?' · '+E(p.description):''}</p></div>`).join(''):`<div class='empty'><b>עוד אין חבילות</b><br>אפשר לשלב כמה שירותים בחבילה אחת במחיר מיוחד.<br><br>${edit('packages','יצירת חבילה')}</div>`,
  'עבודות':()=>urls.length?`<div class='tabact'>${edit('works','עריכת עבודות')}</div><div class='wkgrid'>${urls.map((w,i)=>`<div class='wkt'>${w.media_type==='video'?`<video src='${E(w.url)}#t=0.1' muted playsinline controls preload='metadata'></video>`:`<img src='${E(w.url)}' alt=''>`}<span>${WK[w.kind]||''}</span></div>`).join('')}</div>`:`<div class='empty'><b>עוד לא הועלו עבודות</b><br>תמונות וסרטונים מראים למותגים את הסגנון שלכם.<br><br>${edit('works','העלאת עבודות')}</div>`,
  'נתוני קהל':()=>`<div class='tabact'>${edit('insights','עריכת נתונים')}</div>`+(det.insights&&Object.keys(det.insights).length?insightsHtml(det.insights,false):`<div class='empty'><b>עוד לא הוזנו נתוני ביצועים</b><br>לייקים, תגובות וצפיות בממוצע יעזרו למותגים להעריך אתכם.<br><br>${edit('insights','הוספת נתונים')}</div>`),
  'אודות':()=>`<div class='tabact'>${edit('prof','עריכת פרטים')}</div>${det.bio?`<p style='white-space:pre-line'>${E(det.bio)}</p>`:`<div class='empty'>עוד לא כתבתם על עצמכם.</div>`}<p class='sub'>${E([det.city,(det.niches||[]).join(', ')].filter(Boolean).join(' · '))}</p>`
 };
 let tab=0;
 const draw=()=>{
  const needP=!sv.length&&!pk.length;
  frame('#/me',`${needP?`<div class='bc' style='margin-bottom:14px;background:linear-gradient(135deg,#dff3ff,#c8f3ea);border:0'><b style='font-size:18px'>השלב הבא: בנו את המחירון והחבילות שלכם</b><p class='sub' style='margin:6px 0 12px'>כך מותגים יראו הכול לפני שהם פונים.</p><a class='btn b1' href='#/me?edit=pricing'>מעבר למחירון</a></div>`:''}
  ${mosaic.length?`<div class='pmos pm${mosaic.length}'>${mosaic.map(tile).join('')}</div>`:`<div class='pmos0'><div><b>עוד אין עבודות בפרופיל</b><p>הוסיפו תמונות וסרטונים כדי שהפרופיל ייראה מרשים</p>${edit('works','העלאת עבודות')}</div></div>`}
  <div class='phead'><div class='pavw'><div class='pavx' style='${imgs[0]?`background-image:url(${E(imgs[0].url)})`:'background:linear-gradient(135deg,#38bdf8,#14b8a6)'}'>${imgs[0]?'':`<b style='color:#fff;font-size:44px;display:grid;place-items:center;height:100%'>${E(name[0]||'?')}</b>`}</div></div><div class='pinfo'><div class='h2 pname'>${E(name)}</div><div class='sub'>${E([(det.niches||[]).join(', '),det.city].filter(Boolean).join(' · '))}</div></div><div class='pact'><a class='btn b1' href='#/me?edit=prof'>${SI("<path d='M12 20h9'/><path d='M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'/>")} עריכת פרופיל</a></div></div>
  <div class='pstats'><div><b>${fol?nfmt(fol):'—'}</b><small>עוקבים</small></div><div><b>${urls.length}</b><small>עבודות</small></div><div><b>${sv.length}</b><small>שירותים במחירון</small></div><div><b>${pk.length}</b><small>חבילות</small></div></div>
  <div class='socs'>${soc||`<span class='sub'>לא הוספתם קישורי רשתות</span>`}</div>
  <div class='tabs' id='tb'>${tabs.map((t,i)=>`<button data-i='${i}'>${t}</button>`).join('')}</div><div id='tc'>${tabs.map((t,i)=>`<section class='psec' id='m_${i}'><h3>${t}</h3>${body[t]()}</section>`).join('')}</div>
  <p class='sub' style='margin-top:20px'>כך מותגים רואים את הפרופיל שלכם. <button class='btn b3 sm' id='lo3'>${ico('out')} התנתקות</button></p>`);
  $$('#tb button').forEach(b=>b.onclick=()=>{const t=$('#m_'+b.dataset.i);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})});$('#lo3').onclick=logout};
 draw()}
R['/me']=async(q)=>{
 q=q||new URLSearchParams();
 if(!sb){location.hash='#/login';return}
 const {data:{session}}=await sb.auth.getSession();
 if(!session){location.hash='#/login';return}
 if(curPath()!=='/me')return;
 const uid=session.user.id;
 const {data:pr}=await sb.from('profiles').select('role,full_name,phone').eq('id',uid).maybeSingle();
 if(!pr){frame('#/me',`<div class='empty'>לא נמצא פרופיל לחשבון הזה.<br><br><button class='btn b3' id='lo2'>התנתקות</button></div>`);$('#lo2').onclick=logout;return}
 const isAdv=pr.role==='advertiser';
 const {data:det0}=await sb.from(isAdv?'advertiser_profiles':'creator_profiles').select('*').eq('user_id',uid).maybeSingle();const det=det0||{};
 let myPk=[],myWk=[];if(!isAdv){const {data:pk}=await sb.from('creator_packages').select('title,price,description,items').eq('user_id',uid).order('created_at');myPk=pk||[];const {data:wk}=await sb.from('creator_works').select('id,kind,media_type,path').eq('user_id',uid).order('created_at');myWk=wk||[];const {data:sv}=await sb.from('creator_services').select('service_key,price,included').eq('user_id',uid);const {data:ad}=await sb.from('creator_addons').select('addon_key,kind,value,note').eq('user_id',uid);det.services=sv||[];det.addons=ad||[];const {data:ins}=await sb.from('creator_insights').select('*').eq('user_id',uid).maybeSingle();det.insights=ins||{}}
 if(curPath()!=='/me')return;
 if(!isAdv&&!q.get('edit'))return meView(pr,det,myPk,myWk,session.user.email);
 const needP=!isAdv&&!(det.services||[]).length&&!myPk.length;
 const ES=q.get('edit');const ET={prof:'פרטי הפרופיל',pricing:'המחירון',packages:'החבילות',insights:'נתוני הביצועים',works:'העבודות'};const only=!isAdv&&ET[ES]?ES:'';
 frame('#/me',`${isAdv?'':`<a href='#/me' class='btn b3 sm' style='margin-bottom:12px'>← חזרה לתצוגת הפרופיל</a>`}${needP&&!only?`<div class='bc' style='max-width:780px;margin-bottom:14px;background:linear-gradient(135deg,#dff3ff,#c8f3ea);border:0'><b style='font-size:18px'>השלב הבא: בנו את המחירון והחבילות שלכם</b><p class='sub' style='margin:6px 0 12px'>הפרופיל נוצר. עכשיו קבעו מחיר לכל שירות ובנו חבילות, כדי שמותגים יראו הכול לפני שהם פונים.</p><a class='btn b1' href='#pricing' id='gop'>מעבר למחירון</a></div>`:''}<div class='h2' style='font-size:30px'>${only?'עריכת '+ET[only]:'הפרופיל שלי'}</div><div class='sub' style='margin-bottom:16px'><span class='rb'>${ROLE_HE[pr.role]}</span> · <span dir='ltr'>${E(session.user.email)}</span></div><div class='bc' style='max-width:780px'><form id='mf' novalidate data-only='${only}'><div class='g2 ${isAdv?'':'esec'}' data-s='prof'><div class='fld'><label>שם מלא${isAdv?' (איש קשר)':''}</label><input id='fn' value='${E(pr.full_name)}'></div>${inp('ph','טלפון','tel','',pr.phone||'')}</div>${isAdv?advDetails(det):crDetails(det,true)}<div class='err' id='er'></div><button class='btn b1'>${only?'שמירה':'שמירת שינויים'}</button> <button type='button' class='btn b3' id='lo2'>${ico('out')} התנתקות</button></form></div>`);
 bindChips();if(!isAdv){svcInit();pkgInit(myPk);worksInit(myWk)}$('#lo2').onclick=logout;const sc=only?null:q.get('s');if(sc&&$('#'+sc))setTimeout(()=>$('#'+sc).scrollIntoView({behavior:'smooth'}),100);const gp=$('#gop');if(gp)gp.onclick=e=>{e.preventDefault();$('#pricing').scrollIntoView({behavior:'smooth'})};
 $('#mf').onsubmit=async e=>{e.preventDefault();
  const fn=val('fn');if(!fn)return showErr('נא למלא שם');
  const r=isAdv?readAdv():readCr();if(r.error)return showErr(r.error);
  const W=k=>isAdv||!only||only===k;
  if(W('prof')){const a=await sb.from('profiles').update({full_name:fn,phone:val('ph')||null}).eq('id',uid);
  if(a.error)return showErr(heError(a.error))}
  if(W('prof')||W('pricing')){const b=await sb.from(isAdv?'advertiser_profiles':'creator_profiles').update(only==='pricing'?{price_video:r.d.price_video,price_story:r.d.price_story,price_post:r.d.price_post}:r.d).eq('user_id',uid);
  if(b.error)return showErr(heError(b.error))}
  if(!isAdv&&W('packages')){const dl=await sb.from('creator_packages').delete().eq('user_id',uid);if(dl.error)return showErr(heError(dl.error));
   if(r.packages.length){const ins=await sb.from('creator_packages').insert(r.packages.map(p=>({user_id:uid,title:p.title,price:p.price,description:p.description||null,items:p.items})));if(ins.error)return showErr(heError(ins.error))}}
  if(!isAdv&&W('pricing')){const d1=await sb.from('creator_services').delete().eq('user_id',uid);if(d1.error)return showErr(heError(d1.error));
   if(r.services.length){const i1=await sb.from('creator_services').insert(r.services.map(x=>({user_id:uid,service_key:x.key,platform:x.key.startsWith('tt_')?'tiktok':x.key.startsWith('yt_')?'youtube':x.key.startsWith('ugc_')?'ugc':'instagram',price:x.price,included:x.included||null})));if(i1.error)return showErr(heError(i1.error))}
   const d2=await sb.from('creator_addons').delete().eq('user_id',uid);if(d2.error)return showErr(heError(d2.error));
   if(r.addons.length){const i2=await sb.from('creator_addons').insert(r.addons.map(x=>({user_id:uid,addon_key:x.key,kind:x.kind,value:x.value,note:x.note||null})));if(i2.error)return showErr(heError(i2.error))}}
  if(!isAdv&&W('insights')){const ri=readIns();if(ri.error)return showErr(ri.error);const f=Object.values(ri.o).some(x=>x!=null);if(f){const ex=await sb.from('creator_insights').select('verified,followers').eq('user_id',uid).maybeSingle();const row={...ri.o,followers:(r.d.followers_ig!=null?r.d.followers_ig:ex.data&&ex.data.followers)||null,updated_at:new Date().toISOString()};const q=ex.data?(ex.data.verified?null:sb.from('creator_insights').update(row).eq('user_id',uid)):sb.from('creator_insights').insert({user_id:uid,platform:'instagram',...row,updated_at:undefined});if(q){const w=await q;if(w.error)return showErr(heError(w.error))}}}
  let wf=0;if(!isAdv&&W('works')){const had=WORKS.some(w=>w.file||w.del);if(had){toast('שומר את העבודות...');wf=await syncWorks(uid)}}
  const u=LS.g('user',{});u.n=fn;LS.s('user',u);toast(wf?'הפרופיל נשמר, אבל חלק מהקבצים לא הועלו':'הפרופיל נשמר');if(!isAdv)location.hash='#/me'}};

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
