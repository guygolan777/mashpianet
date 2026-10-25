const NICHE_KEY=Object.fromEntries(Object.entries(CAT).map(([k,v])=>[v,k]));
const fmtF=n=>n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':String(n||0);
let DIR_AT=0;
async function loadDirectory(force){
 if(!sb||!LS.g('user'))return;
 if(!force&&Date.now()-DIR_AT<20000)return;
 const {data,error}=await sb.rpc('creator_directory');
 if(error)return;
 DIR_AT=Date.now();
 for(let i=CR.length-1;i>=0;i--)if(CR[i].real)CR.splice(i,1);
 const pub=p=>p?sb.storage.from('creator-works').getPublicUrl(p).data.publicUrl:'';
 const real=(data||[]).map(r=>{
  const plat=r.instagram?'ig':r.tiktok?'tt':r.youtube?'yt':'ig';
  const f=plat==='ig'?r.followers_ig:plat==='tt'?r.followers_tt:r.followers_yt;
  return {id:r.user_id,real:true,n:r.display_name,p:plat,f:f?fmtF(f):'—',c:r.city||'',pr:r.min_price?r.min_price/3.6:0,minShek:r.min_price||0,pk:'',ct:NICHE_KEY[(r.niches||[])[0]]||'lifestyle',r:'—',bio:r.bio||'',t:0,img:pub(r.avatar_path)||pub(r.cover_path),soc:{ig:r.instagram,tt:r.tiktok,yt:r.youtube}}});
 CR.unshift(...real)}
const _creators=R['/creators'];
R['/creators']=async q=>{if(LS.g('user'))await loadDirectory(true);_creators(q)};
const _creator=R['/creator'];
R['/creator']=async(q,id)=>{
 if(id!=='example'&&LS.g('user')){
  if(!CR.some(c=>c.id===id&&c.real)&&/^[0-9a-f-]{36}$/.test(id))await loadDirectory(true);
  const c=CR.find(x=>x.id===id&&x.real);
  if(c)return realProfile(c)}
 return _creator(q,id)};
async function realProfile(c){
 frame('#/creators',`<div class='empty'>טוען...</div>`);
 const uid=c.id;
 const [cp,sv,ad,pk,wk,ins]=await Promise.all([sb.from('creator_profiles').select('*').eq('user_id',uid).maybeSingle(),sb.from('creator_services').select('service_key,price,included').eq('user_id',uid),sb.from('creator_addons').select('addon_key,kind,value,note').eq('user_id',uid),sb.from('creator_packages').select('title,price,description,items').eq('user_id',uid).order('created_at'),sb.from('creator_works').select('id,kind,media_type,path').eq('user_id',uid).order('created_at'),sb.from('creator_insights').select('*').eq('user_id',uid).maybeSingle()]);
 if(location.hash.indexOf(uid)<0)return;
 const det=cp.data||{};det.services=sv.data||[];det.addons=ad.data||[];det.insights=ins.data||{};
 meView({full_name:c.n},det,pk.data||[],wk.data||[],'',uid,false)}
