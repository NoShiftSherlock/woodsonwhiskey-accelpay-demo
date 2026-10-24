/* Shopify store + AccelPay Shopify app: demo storefront logic.
 *
 * Same pattern as the Le Portier demo: the brand's own Shopify theme, the native
 * Shopify cart drawer and the Shopify one-page checkout. What AccelPay adds is
 * shown as small callouts at checkout: payments, taxes and routing each order to
 * a licensed retailer by the shipping address. No third-party cart.
 *
 * Express checkout (Shop Pay, Apple Pay, Google Pay) is supported by the AccelPay
 * Shopify integration and appears at the top of checkout and in the cart drawer,
 * as on a standard Shopify store. In the demo the buttons fill a sample contact
 * and address and continue.
 *
 * All brand data (products, real retailers, Gopuff ZIPs, what is illustrative)
 * lives in data.js as window.DEMO. See README.md for sources.
 */
(function () {
  'use strict';
  const D = window.DEMO;
  const CATALOG = D.catalog, ORDER = D.order, DEF = D.defaultHandle;
  const RETAILERS = D.retailers || [];
  const REAL = D.realHandles || [];
  const GP = D.gopuff || null;
  const RATES = D.rates;
  const STATE_NAMES = { AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming' };
  const ZIP3 = [[5,5,'NY'],[10,27,'MA'],[28,29,'RI'],[30,38,'NH'],[39,49,'ME'],[50,59,'VT'],[60,69,'CT'],[70,89,'NJ'],[100,149,'NY'],[150,196,'PA'],[197,199,'DE'],[200,200,'DC'],[201,201,'VA'],[202,205,'DC'],[206,219,'MD'],[220,246,'VA'],[247,268,'WV'],[270,289,'NC'],[290,299,'SC'],[300,319,'GA'],[320,349,'FL'],[350,369,'AL'],[370,385,'TN'],[386,397,'MS'],[398,399,'GA'],[400,427,'KY'],[430,459,'OH'],[460,479,'IN'],[480,499,'MI'],[500,528,'IA'],[530,549,'WI'],[550,567,'MN'],[569,569,'DC'],[570,577,'SD'],[580,588,'ND'],[590,599,'MT'],[600,629,'IL'],[630,658,'MO'],[660,679,'KS'],[680,693,'NE'],[700,715,'LA'],[716,729,'AR'],[730,749,'OK'],[750,799,'TX'],[800,816,'CO'],[820,831,'WY'],[832,838,'ID'],[840,847,'UT'],[850,865,'AZ'],[870,884,'NM'],[885,885,'TX'],[889,898,'NV'],[900,961,'CA'],[967,968,'HI'],[970,979,'OR'],[980,994,'WA'],[995,999,'AK']];
  function stateForZip(zip) {
    if (!/^\d{5}$/.test(zip)) return null;
    const n = parseInt(zip.slice(0, 3), 10);
    for (const [a, b, s] of ZIP3) if (n >= a && n <= b) return s;
    return null;
  }
  const stName = st => STATE_NAMES[st] || st;

  // ---------------------------------------------------------------- cart (Shopify AJAX cart stand-in)
  const LS = D.key + '-shopify-demo-v1';
  const state = load() || { items: [] };
  state.items = state.items.filter(i => CATALOG[i.h] && !CATALOG[i.h].soldOut);
  function load() { try { return JSON.parse(localStorage.getItem(LS)); } catch (e) { return null; } }
  function save() { try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {} }
  const money = c => '$' + (c / 100).toFixed(2);
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function subtotal() { return state.items.reduce((a, i) => a + CATALOG[i.h].price * i.qty, 0); }
  function count() { return state.items.reduce((a, i) => a + i.qty, 0); }
  function add(h, qty) {
    if (!CATALOG[h] || CATALOG[h].soldOut) return;
    const ex = state.items.filter(i => i.h === h)[0];
    if (ex) ex.qty = Math.min(12, ex.qty + qty); else state.items.push({ h: h, qty: qty });
    save(); renderAll(); openDrawer();
  }
  function setQty(h, q) { const it = state.items.filter(i => i.h === h)[0]; if (!it) return; it.qty = Math.max(0, Math.min(12, q)); if (!it.qty) state.items = state.items.filter(i => i.h !== h); save(); renderAll(); }

  // Shipping rates the AccelPay app returns for a ZIP: delivery where it applies,
  // then one per licensed in-state retailer that stocks everything in the cart.
  // If no retailer stocks it yet, an illustrative "connected at launch" route.
  function ratesFor(zip) {
    const st = stateForZip(zip); if (!st) return null;
    if ((D.noShip || []).indexOf(st) >= 0) return { st: st, rates: [], blocked: true };
    const hs = state.items.map(i => i.h);
    const allReal = hs.length && hs.every(h => REAL.indexOf(h) >= 0);
    const free = RATES.freeOver && subtotal() >= RATES.freeOver;
    const ship = free ? 0 : RATES.shipping;
    const out = [];
    if (allReal && GP && GP.zips[zip] && hs.every(h => GP.handles.indexOf(h) >= 0)) out.push({ id: 'gopuff', kind: 'delivery', title: 'Delivery in about 30 minutes',
      sub: 'Gopuff, ' + GP.zips[zip] + ' · licensed retailer', price: RATES.gopuff, icon: 'assets/gopuff-icon.png', by: 'Gopuff (' + GP.zips[zip] + ')' });
    if (allReal) RETAILERS.filter(r => r.st === st).forEach(r => out.push({ id: r.id, kind: 'shipping',
      title: 'Standard shipping, 2 to 5 business days', sub: 'Ships from ' + r.name + ', ' + r.city + ', ' + r.st + ' · licensed retailer', price: ship, by: r.name + ' (' + r.city + ', ' + r.st + ')' }));
    if (!out.filter(o => o.kind === 'shipping').length) out.push({ id: 'launch-' + st, kind: 'shipping', launch: true,
      title: 'Standard shipping, 2 to 5 business days', sub: 'Ships from a licensed retailer in ' + stName(st) + ' · connected at launch', price: ship, by: 'a licensed retailer in ' + stName(st) });
    return { st: st, rates: out };
  }

  function openDrawer() { const d = $('#drawer'); if (!d) return; d.classList.add('on'); $('#scrim').classList.add('on'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { const d = $('#drawer'); if (!d) return; d.classList.remove('on'); $('#scrim').classList.remove('on'); document.body.style.overflow = ''; }
  function renderHeader() { $$('[data-cart-count]').forEach(el => { el.textContent = count(); el.hidden = !count(); }); }

  const XPAY = '<button type="button" class="xb shop" data-xpay="Shop Pay" aria-label="Shop Pay"><b>shop</b><span>Pay</span></button>' +
    '<button type="button" class="xb apple" data-xpay="Apple Pay" aria-label="Apple Pay"><svg width="17" height="20" viewBox="0 0 17 20" aria-hidden="true" fill="#fff"><path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1 7.4c-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.9c1.5 0 2.4-1.3 3.3-2.7 1-1.5 1.5-3 1.5-3.1 0 0-2.9-1.1-3-4.6zM11.5 2.9c.7-.9 1.2-2.1 1.1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.2.1 2.3-.6 3-1.5z"/></svg><span>Pay</span></button>' +
    '<button type="button" class="xb google" data-xpay="Google Pay" aria-label="Google Pay"><b class="g">G</b><span>Pay</span></button>';

  function renderDrawer() {
    const box = $('#drawer-items'); if (!box) return;
    box.innerHTML = state.items.length ? state.items.map(i => {
      const p = CATALOG[i.h];
      return '<div class="cline"><div class="im"><img src="' + p.image + '" alt=""></div><div>' +
        '<div class="nm">' + esc(p.name) + '</div><div class="pr">' + money(p.price) + '</div>' +
        '<div class="qrow"><div class="qty"><button data-q="' + (i.qty - 1) + '" data-h="' + i.h + '" aria-label="Decrease quantity">−</button><span>' + i.qty + '</span><button data-q="' + (i.qty + 1) + '" data-h="' + i.h + '" aria-label="Increase quantity">+</button></div>' +
        '<button class="rm" data-q="0" data-h="' + i.h + '" aria-label="Remove">\u{1F5D1}︎</button></div></div>' +
        '<div class="tot">' + money(p.price * i.qty) + '</div></div>';
    }).join('') : '<div class="empty">Your cart is empty</div>';
    const f = $('#drawer-foot');
    if (f) f.innerHTML = '<div class="est"><span>Estimated total</span><span>' + money(subtotal()) + ' USD</span></div>' +
      '<div class="small">Taxes and shipping calculated at checkout. Orders ship from a licensed retailer in your state.</div>' +
      '<a class="btn block" href="checkout.html"' + (state.items.length ? '' : ' style="opacity:.4;pointer-events:none"') + '>Check out</a>' +
      (state.items.length ? '<div class="xpay">' + XPAY + '</div>' : '');
    $$('[data-xpay]', f).forEach(b => b.addEventListener('click', () => { location.href = 'checkout.html?express=' + encodeURIComponent(b.getAttribute('data-xpay')); }));
    $$('[data-q]', box).forEach(b => b.addEventListener('click', () => setQty(b.getAttribute('data-h'), +b.getAttribute('data-q'))));
  }

  // ---------------------------------------------------------------- product page
  const pd = { img: 0, qty: 1 };
  function renderProduct() {
    const host = $('#pdp'); if (!host) return;
    const h0 = host.getAttribute('data-handle'); const h = CATALOG[h0] ? h0 : DEF; const p = CATALOG[h];
    document.title = p.name + ' | ' + D.storeName;
    if (pd.img >= p.gallery.length) pd.img = 0;
    const line = p.soldOut ? '' : (REAL.indexOf(h) >= 0 ? D.text.fulfilReal : D.text.fulfilLaunch);
    host.innerHTML = [
      '<div class="gallery"><div class="main"><img src="', p.gallery[pd.img], '" alt="', esc(p.short), '"></div>',
        p.gallery.length > 1 ? '<div class="thumbs">' + p.gallery.map((g, i) => '<button data-img="' + i + '" aria-selected="' + (i === pd.img) + '"><img src="' + g + '" alt=""></button>').join('') + '</div>' : '',
      '</div>',
      '<div class="info">',
        p.tag ? '<div class="eyebrow" style="margin:0">' + esc(p.tag) + '</div>' : '',
        '<h1>', esc(p.name), '</h1>',
        '<div class="price">', p.compare ? '<s style="opacity:.55;margin-right:.5rem">' + money(p.compare) + '</s>' : '', money(p.price), ' USD</div>',
        '<div class="small"><a href="#">Shipping</a> calculated at checkout.</div>',
        p.soldOut
          ? '<button class="btn atc" disabled>Sold out</button><div class="notice">' + esc(D.text.soldOut || 'Sold out on the current store.') + '</div>'
          : '<div class="qty-wrap">Quantity<div class="qty"><button id="qm" aria-label="Decrease quantity">−</button><span>' + pd.qty + '</span><button id="qp" aria-label="Increase quantity">+</button></div></div>' +
            '<button class="btn atc" id="atc">Add to cart</button>' +
            '<div class="xpay" style="max-width:380px">' + XPAY + '</div>' +
            '<div class="fulfil-line"><img src="' + D.fulfilIcon + '" alt=""><span>' + line + '</span></div>',
        '<div class="desc">', p.lead || p.specs ? '<p><b>' + esc(p.lead || '') + '</b>' + (p.specs ? '<br>' + esc(p.specs) : '') + '</p>' : '', (p.desc || []).map(d => '<p>' + esc(d) + '</p>').join(''), '</div>',
        D.rbNote ? '<div class="rb-note"><span class="rb-mark">ReserveBar</span><span>' + D.rbNote + '</span></div>' : '',
      '</div>'].join('');
    $$('[data-img]', host).forEach(b => b.addEventListener('click', () => { pd.img = +b.getAttribute('data-img'); renderProduct(); }));
    const qm = $('#qm', host), qp = $('#qp', host);
    if (qm) qm.addEventListener('click', () => { if (pd.qty > 1) { pd.qty--; renderProduct(); } });
    if (qp) qp.addEventListener('click', () => { if (pd.qty < 12) { pd.qty++; renderProduct(); } });
    const atc = $('#atc', host); if (atc) atc.addEventListener('click', () => add(h, pd.qty));
    $$('[data-xpay]', host).forEach(b => b.addEventListener('click', () => { add(h, pd.qty); location.href = 'checkout.html?express=' + encodeURIComponent(b.getAttribute('data-xpay')); }));
  }

  // ---------------------------------------------------------------- checkout
  const co = { rate: null };
  function renderCheckout() {
    const side = $('#os'); if (!side) return;
    const zipEl = $('#zip'), stEl = $('#state');
    const zip = (zipEl.value || '').trim();
    const r = ratesFor(zip);
    if (r && stEl.value !== r.st) stEl.value = r.st;
    const box = $('#rates');
    let rate = null;
    if (!state.items.length) box.innerHTML = '<div class="co-empty">Your cart is empty. <a href="product.html">Shop ' + esc(CATALOG[DEF].short) + '</a></div>';
    else if (!r) box.innerHTML = '<div class="co-empty">Enter your shipping address to view available shipping methods.</div>';
    else if (r.blocked) box.innerHTML = '<div class="co-empty">' + esc(D.text.noShip.replace('{state}', stName(r.st))) + '</div>';
    else {
      if (!r.rates.filter(x => x.id === co.rate)[0]) co.rate = r.rates[0].id;
      rate = r.rates.filter(x => x.id === co.rate)[0];
      box.innerHTML = '<div class="rates">' + r.rates.map(x => '<label class="rate' + (x.id === co.rate ? ' on' : '') + '"><input type="radio" name="rate" value="' + x.id + '"' + (x.id === co.rate ? ' checked' : '') + '>' +
        (x.icon ? '<img class="ic" src="' + x.icon + '" alt="">' : '') + '<span class="t">' + esc(x.title) + '<span>' + esc(x.sub) + '</span></span><span class="p">' + (x.price ? money(x.price) : 'Free') + '</span></label>').join('') + '</div>' +
        '<div class="callout"><span class="dot"></span><span><b>Retailer routing by AccelPay.</b> Your address decides which licensed retailer sells and ships the order. The order still lands in ' + esc(D.brand) + '’s Shopify admin with the full customer record.' +
        (rate && rate.launch ? ' ' + esc(D.text.launchNote) : '') + '</span></div>';
      $$('input[name=rate]', box).forEach(i => i.addEventListener('change', () => { co.rate = i.value; renderCheckout(); }));
    }
    const sub = subtotal(), ship = rate ? rate.price : null, tax = rate ? Math.round(sub * D.taxRate) : null;
    side.innerHTML = state.items.map(i => { const p = CATALOG[i.h];
        return '<div class="os-item"><div class="im"><img src="' + p.image + '" alt=""><span class="q">' + i.qty + '</span></div><div class="nm">' + esc(p.name) + '<span>' + esc(p.size) + '</span></div><div class="pr">' + money(p.price * i.qty) + '</div></div>'; }).join('') +
      '<div class="os-disc"><input placeholder="Discount code or gift card" aria-label="Discount code"><button type="button">Apply</button></div>' +
      '<div class="os-line"><span class="m">Subtotal · ' + count() + ' item' + (count() === 1 ? '' : 's') + '</span><span>' + money(sub) + '</span></div>' +
      '<div class="os-line"><span class="m">' + (rate && rate.kind === 'delivery' ? 'Delivery' : 'Shipping') + '</span><span>' + (ship === null ? '<span class="m">Enter shipping address</span>' : (ship ? money(ship) : 'Free')) + '</span></div>' +
      '<div class="os-line"><span class="m">Estimated taxes</span><span>' + (tax === null ? '<span class="m">-</span>' : money(tax)) + '</span></div>' +
      '<div class="os-line total"><span>Total</span><span><small>USD</small>' + money(sub + (ship || 0) + (tax || 0)) + '</span></div>' +
      '<div class="callout"><span class="dot"></span><span><b>Taxes by AccelPay.</b> Sales tax calculated for the ship-to address.</span></div>' +
      (rate ? '<div class="callout"><span class="dot"></span><span>' + (rate.kind === 'delivery' ? 'Delivered by ' : 'Sold and shipped by ') + '<b>' + esc(rate.by) + '</b>, a licensed retailer. Adult signature (21+) required.</span></div>' : '');
    const pay = $('#pay');
    if (pay) { pay.disabled = !rate; pay.textContent = 'Pay now'; }
    co.current = rate; co.total = sub + (ship || 0) + (tax || 0);
  }
  function wireCheckout() {
    const form = $('#co-form'); if (!form) return;
    ['#zip', '#state'].forEach(s => $(s).addEventListener('input', () => { co.rate = null; renderCheckout(); }));
    $('#zip').addEventListener('change', renderCheckout);
    $$('[data-fill]').forEach(b => b.addEventListener('click', () => {
      const v = b.getAttribute('data-fill').split('|');
      form.address1.value = v[0]; form.city.value = v[1]; $('#zip').value = v[2]; co.rate = null; renderCheckout();
    }));
    const xp = $('#xpay-top');
    if (xp) { xp.innerHTML = '<div class="xpay big">' + XPAY + '</div>';
      $$('[data-xpay]', xp).forEach(b => b.addEventListener('click', () => expressFill(b.getAttribute('data-xpay')))); }
    const q = new URLSearchParams(location.search).get('express'); if (q) expressFill(q);
    function expressFill(method) {
      // Demo: the wallet hands back a saved contact and address, then checkout continues.
      const a = D.expressAddress;
      form.email.value = form.email.value || 'shopper@example.com';
      form.first.value = form.first.value || 'Jordan'; form.last.value = form.last.value || 'Lee';
      form.address1.value = a[0]; form.city.value = a[1]; $('#zip').value = a[2]; co.rate = null; renderCheckout();
      const n = $('#xpay-note'); if (n) { n.hidden = false; n.textContent = method + ' filled your contact and address. Pick a shipping method below, then pay.'; }
      const r = $('#rates'); if (r && r.scrollIntoView) r.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.addEventListener('submit', e => {
      e.preventDefault(); if (!co.current) return;
      const n = D.orderPrefix + '-DEMO-' + (1000 + Math.floor(Math.random() * 9000));
      try { sessionStorage.setItem(D.key + '-order', JSON.stringify({ n: n, total: co.total, by: co.current.by, kind: co.current.kind })); } catch (err) {}
      state.items = []; save();
      location.href = 'checkout.html?confirmed=1';
    });
  }

  function renderGrid() {
    const grid = $('#collection-grid'); if (!grid) return;
    grid.innerHTML = ORDER.map(k => {
      const p = CATALOG[k];
      const href = 'product.html' + (k === DEF ? '' : '?p=' + k);
      const avail = p.soldOut ? 'Sold out' : (REAL.indexOf(k) >= 0 ? D.text.cardReal : D.text.cardLaunch);
      return '<a class="card" href="' + href + '"><div class="shot"><img src="' + p.image + '" alt="' + esc(p.short) + '" loading="lazy"></div>' +
        '<span class="tag">' + esc(p.tag || '') + '</span><h3>' + esc(p.name) + '</h3>' +
        '<span class="price">' + (p.compare ? '<s style="opacity:.55;margin-right:.4rem">' + money(p.compare) + '</s>' : '') + money(p.price) + ' USD</span>' +
        '<span class="avail">' + esc(avail) + '</span>' +
        (p.soldOut ? '' : '<span class="btn" data-add="' + k + '" style="margin-top:.4rem">Add to cart</span>') + '</a>';
    }).join('');
    $$('[data-add]', grid).forEach(b => b.addEventListener('click', e => { e.preventDefault(); add(b.getAttribute('data-add'), 1); }));
  }

  function renderConfirmed() {
    if (!new URLSearchParams(location.search).get('confirmed') || !$('#confirmed')) return;
    let raw = null; try { raw = JSON.parse(sessionStorage.getItem(D.key + '-order')); } catch (e) {}
    $('#checkout-view').hidden = true; $('#checkout-view').style.display = 'none'; $('#confirmed').hidden = false;
    if (raw) {
      $('#order-num').textContent = 'Demo order ' + raw.n;
      $('#order-by').textContent = (raw.kind === 'delivery' ? 'Would be delivered by ' : 'Would be sold and shipped by ') + raw.by + ', a licensed retailer.';
      $('#order-total').textContent = 'Total ' + money(raw.total) + ' USD';
    }
  }

  function renderAll() { renderHeader(); renderDrawer(); renderProduct(); renderCheckout(); }
  function boot() {
    $$('[data-cart-toggle]').forEach(b => b.addEventListener('click', openDrawer));
    const x = $('#drawer-close'); if (x) x.addEventListener('click', closeDrawer);
    const s = $('#scrim'); if (s) s.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
    const burger = $('#burger'); if (burger) burger.addEventListener('click', () => $('nav.main').classList.toggle('open'));
    wireCheckout(); renderGrid(); renderAll(); renderConfirmed();
  }
  window.ShopDemo = { catalog: CATALOG, order: ORDER, money: money, add: add };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
