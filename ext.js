const SLOGAN="<div class='slogan'>מחברים בין משפיענים למפרסמים</div>";
const imgTag=id=>`<img class='pimg' alt='' src='faces/${id==='example'?'noa-levi':id}.jpg'>`;
const fill=(p,id)=>{if(p&&!p.querySelector('.pimg'))p.innerHTML=imgTag(id)};
const decorate=()=>{
 $$('a.cc').forEach(a=>fill($('.ph',a),a.getAttribute('href').split('/').pop()));
 $$('.exhero .cc .ph').forEach(p=>fill(p,'example'));
 $$('a.it').forEach(a=>fill($('.th',a),a.getAttribute('href').split('/').pop()));
 $$('.th2').forEach(t=>fill($('.av',t),t.dataset.id));
 $$('.oc').forEach(o=>{const c=CR.find(x=>x.n===$('b',o).textContent);if(c)fill($('.th',o),c.id)});
 if(location.hash.startsWith('#/creator/'))fill($('.pav'),location.hash.split('/').pop().split('?')[0]);
 const bd=$('.side .brand');if(bd&&!$('.side .slogan'))bd.insertAdjacentHTML('afterend',SLOGAN);
};
const frame0=frame;
frame=function(route,html){frame0(route,html);decorate()};
new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
(function(){const st=document.createElement('style');st.textContent='.pimg{width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block}.cc{position:relative}.cc .ph{position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:0;overflow:hidden;font-size:0;background:#cfe9f8;opacity:1;display:block}.pimg{object-position:50% 12%}.it .th,.oc .th,.th2 .av{overflow:hidden;padding:0}.pav{overflow:hidden;padding:0}';document.head.append(st)})();
(function(){const st=document.createElement('style');st.textContent='.ph1{height:180px}.covw{position:absolute;inset:0;border-radius:26px;overflow:hidden}.covw:after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(53,180,239,.55),rgba(11,124,196,.45))}.cov2{position:absolute;inset:-24px;background-size:cover;background-position:50% 18%;filter:blur(16px) saturate(1.15)}.folio{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.ft{aspect-ratio:3/4;border-radius:18px;background-repeat:no-repeat;position:relative;overflow:hidden;background-color:#cfe9f8}.ft span{position:absolute;inset:auto 0 0;padding:26px 10px 8px;color:#fff;font-size:13px;font-weight:600;background:linear-gradient(transparent,rgba(14,39,64,.8))}@media(max-width:700px){.folio{grid-template-columns:repeat(2,1fr)}}';document.head.append(st)})();
(function(){const st=document.createElement('style');st.textContent='.slogan{font-size:13px;color:#4d6579;margin:-6px 0 14px;padding:0 6px;line-height:1.4}.auth .slogan{margin:-8px 0 18px}.mini .slogan{display:none}';document.head.append(st)})();
route();
