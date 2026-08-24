
const WA1='233271826192',WA2='233542407799';
const DEFAULT_GALLERY = [{"id": 1, "name": "Tropical Mix", "caption": "Leopard, floral & French tips", "image":"gallery1.jpg", "visible": true}, {"id": 2, "name": "Signature Assortment", "caption": "Cherries, leopard, florals & French", "image": "gallery2.jpg", "visible": true}, {"id": 3, "name": "Pink French Luxe", "caption": "Soft pink French with gold charms", "image": "gallery3.jpg", "visible": true}, {"id": 4, "name": "Berry Blossom", "caption": "Burgundy florals & polka dots", "image": "g4.jpg", "visible": true}, {"id": 5, "name": "Cherry Bow", "caption": "Pink with cherries and bows", "image": "g5.jpg", "visible": true}, {"id": 6, "name": "Polka Floral", "caption": "Burgundy tips with white florals", "image": "g6.jpg", "visible": true}, {"id": 7, "name": "Tiger Pink", "caption": "Pink tiger print with bows", "image": "g8.jpg", "visible": true}, {"id": 8, "name": "Sakura French", "caption": "Pink florals on French tips", "image": "g10.jpg", "visible": true}, {"id": 9, "name": "Princess Hour", "caption": "Elegant burgundy & gold accents", "image": "g11.jpg", "visible": true}, {"id": 10, "name": "Orchid Bloom", "caption": "Pink orchids with black French", "image": "g12.jpg", "visible": true}, {"id": 11, "name": "Ruby Heart", "caption": "Deep red chrome & florals", "image": "g14.jpg", "visible": true}, {"id": 12, "name": "Polka On Hand", "caption": "Burgundy florals worn", "image": "g15.jpg", "visible": true}, {"id": 13, "name": "Soft Blossom", "caption": "3D florals in soft pink", "image": "g16.jpg", "visible": true}, {"id": 14, "name": "Chocolate Floral", "caption": "Brown & pink florals", "image": "g19.jpg", "visible": true}, {"id": 15, "name": "Worn Soft Floral", "caption": "Soft florals on hand", "image": "g21.jpg", "visible": true}];
let gallery = JSON.parse(localStorage.getItem('pmm_gal_v3') || 'null') || DEFAULT_GALLERY;
let products = JSON.parse(localStorage.getItem('pmm_prod') || 'null') || [];
let loggedIn=false, tab='overview', editProd=null, editGal=null;
let nextG = Math.max(0,...gallery.map(g=>g.id))+1;
let nextP = products.length ? Math.max(...products.map(p=>p.id))+1 : 1;
function saveG(){localStorage.setItem('pmm_gal_v3',JSON.stringify(gallery))}
function saveP(){localStorage.setItem('pmm_prod',JSON.stringify(products))}
function fmt(n){return 'GH₵ '+Number(n).toFixed(0)}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
function renderGal(){
  const el=document.getElementById('galGrid');
  const items=gallery.filter(g=>g.visible!==false);
  if(!items.length){el.innerHTML='<div class="empty" style="grid-column:1/-1">Gallery coming soon.</div>';return}
  el.innerHTML=items.map(g=>`<div class="gal-card" onclick="openLb('${g.image}')"><img src="${g.image}" alt="${g.name}" loading="lazy"><div class="gal-info"><h3>${g.name}</h3><p>${g.caption||''}</p></div></div>`).join('');
}
function renderShop(){
  const el=document.getElementById('shopGrid');
  if(!products.length){el.innerHTML='<div class="empty" style="grid-column:1/-1">Products will appear here when they become available.</div>';return}
  el.innerHTML=products.map(p=>{
    const avail=p.stock>0;
    return `<div class="prod ${avail?'':'oos'}"><span class="badge ${avail?'badge-in':'badge-out'}">${avail?'Available':'Out of Stock'}</span>
      <img src="${p.image||''}" alt="${p.name}" loading="lazy" onerror="this.style.background='#2A0D18'">
      <div class="prod-info"><h3>${p.name}</h3><div class="prod-meta">${[p.shape,p.length,p.category].filter(Boolean).join(' · ')}</div>
      <p>${p.desc||''}</p><div class="prod-bot"><span class="price">${fmt(p.price)}</span>
      ${avail?`<button class="btn-wa" onclick="waProd('${(p.name||'').replace(/'/g,"\\'")}',${p.price})">Ask on WhatsApp</button>`:`<button class="btn-wa" disabled>Out of Stock</button>`}
      </div></div></div>`;
  }).join('');
}
function waProd(name,price){const msg=`Hello, I'm interested in the ${name} press-on nail set priced at ${fmt(price)}. Is it available?`;window.open(`https://wa.me/${WA1}?text=${encodeURIComponent(msg)}`,'_blank')}
function openLb(src){document.getElementById('lbImg').src=src;document.getElementById('lb').classList.add('open')}
function closeLb(){document.getElementById('lb').classList.remove('open')}

document.getElementById('ham').onclick=()=>{document.getElementById('mob').classList.toggle('open')};
function closeMob(){document.getElementById('mob').classList.remove('open')}
renderGal();renderShop();
