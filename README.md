# Woodson Whiskey on Shopify with the AccelPay app (sales demo)

**Private sales demo.** This site uses Woodson Whiskey's and Charles Woodson's names, marks,
product imagery and copy (from woodsonwhiskey.com) to show their Shopify store with the AccelPay
Shopify app installed. It is not affiliated with or endorsed by Woodson Whiskey, Charles Woodson,
the University of Michigan, the Raiders or the Pro Football Hall of Fame. It is not a store and no
order is ever placed or charged. Shopify and ReserveBar marks belong to their owners. Keep the
link unlisted; share it 1:1 only.

Live: https://noshiftsherlock.github.io/woodsonwhiskey-accelpay-demo/

## The pitch it shows

woodsonwhiskey.com is a Shopify store (confirmed 2026-10-24: `window.Shopify` present, Venue
theme) that sells through Bottle Nexus buy buttons embedded on the page; Shopify's own
`/products.json` is empty. The demo replaces the buy buttons with the native Shopify cart drawer
and the Shopify one-page checkout, with the AccelPay Shopify app taking over payments, taxes and
routing to licensed retailers. No third-party cart; orders and customers land in their Shopify
admin. Express checkout (Shop Pay, Apple Pay, Google Pay) at the top of checkout, in the cart
drawer and on the product page.

| Page | What it shows |
| --- | --- |
| `index.html` | Home, 12-bottle grid, Charles Woodson story, Intercept on ReserveBar, "How this works", reordering note |
| `product.html?p=<id>` | Product page for each bottle (`michigan-12`, `mbb-2026`, `all-american`, `hof`, `rose-in-mouth`, `team-144`, `black-hole`, `raiders-blackout`, `maize-n-blitz`, `cinnamon-blitz`, `heis-manhattan`, `raiders-bundle`) |
| `checkout.html` | Shopify one-page checkout with AccelPay callouts |

## Real vs illustrative

Real (2026-10-24):
- Products, images, copy and prices from the woodsonwhiskey.com home page.
- The no-ship list from their own delivery details (AL, AR, MS, MI, OK, SD, TN, UT, VT, WI),
  plus AK and HI. Michigan is on it, which matters for the Michigan-licensed bottles.
- Charles Woodson's Intercept wines are listed on ReserveBar.com (5 listings).

Illustrative:
- No network retailer lists Woodson Whiskey today (only the Intercept wines appear) and no Gopuff
  location carries it (live check of 181 spirits-licensed locations). Every route is "a licensed
  retailer in <state>, connected at launch".
- Shipping ($14.99, free over $150 as today), 8% tax, payment fields, confirmation page.

Built from `data.js` and a shared `app.js`. GitHub Pages serves `main`; bump `?v=` on change.
