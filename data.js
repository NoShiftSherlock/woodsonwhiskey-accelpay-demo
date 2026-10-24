/* Woodson Whiskey demo data, 2026-10-24.
 REAL: products, names, images, copy and prices from woodsonwhiskey.com (Shopify theme with Bottle Nexus buy
   buttons; Shopify /products.json is empty, so this is read from the home page). Their current no-ship list
   from the delivery details on the home page (AL, AR, MS, MI, OK, SD, TN, UT, VT, WI). Charles Woodson's
   Intercept wines on ReserveBar.com (5 listings, checked 2026-10-24).
 NOT REAL: no network retailer stocks Woodson Whiskey today (ReserveBar/AccelPay retailer catalog matched on
   brand and product name; only the Intercept wines appear) and no Gopuff location carries it (live check of
   181 spirits-licensed locations). Every route is "a licensed retailer in <state>, connected at launch".
   Shipping ($14.99, free over $150 as today), tax (8%), payment step and confirmation are illustrative. */
window.DEMO = {
 "key": "woodsonwhiskey",
 "brand": "Woodson Whiskey",
 "storeName": "Woodson Whiskey",
 "orderPrefix": "WW",
 "catalog": {
  "michigan-12": {
   "name": "Michigan Football Champions X 12 Limited Edition",
   "short": "Michigan Football Champions X 12",
   "size": "750ML",
   "tag": "Limited Edition",
   "price": 7899,
   "image": "assets/p-michigan-12.webp",
   "gallery": [
    "assets/p-michigan-12.webp",
    "assets/hero-michigan.webp"
   ],
   "lead": "12 championships. 1 bottle.",
   "specs": "KENTUCKY STRAIGHT BOURBON / AGED 5 YEARS / 750ML",
   "desc": [
    "This Limited Edition bourbon honors Michigan Football's full national championship legacy of 12 titles, from 1901 to 2023. Every cork is individually engraved with the licensed Michigan helmet.",
    "Nose: dried apricot, honey and soft florals. Palate: smooth caramel, then nutmeg, black pepper and clove. Finish: clean and lightly malty. Mash bill 70% corn, 21% rye, 9% malted barley.",
    "Expect 5 to 7 business days for delivery. 21 and older, ID required at delivery."
   ]
  },
  "mbb-2026": {
   "name": "Michigan Wolverines 2026 NCAA Basketball National Champions Commemorative Bottle",
   "short": "Michigan 2026 Basketball Champions",
   "size": "750ML",
   "tag": "Pre-order",
   "price": 7499,
   "image": "assets/p-mbb-2026.webp",
   "gallery": [
    "assets/p-mbb-2026.webp"
   ],
   "lead": "Made in official collaboration with the University of Michigan.",
   "specs": "KENTUCKY STRAIGHT BOURBON / AGED 6 YEARS / 90 PROOF / 750ML",
   "desc": [
    "Crafted from 6-year aged Kentucky straight bourbon and bottled at 90 proof (45% ABV), a smooth, balanced profile worthy of a championship season.",
    "Available for pre-order. Bottles are expected to ship in about 3 weeks. Limited quantities."
   ]
  },
  "all-american": {
   "name": "Woodson Whiskey All-American 5 Year Aged 90 Proof",
   "short": "All-American 5 Year",
   "size": "750ML",
   "tag": "Kentucky Bourbon",
   "price": 3999,
   "image": "assets/p-all-american.webp",
   "gallery": [
    "assets/p-all-american.webp"
   ],
   "lead": "The flagship.",
   "specs": "KENTUCKY STRAIGHT BOURBON / AGED 5 YEARS / 90 PROOF / 750ML",
   "desc": [
    "Nose: warm caramel and vanilla with toasted oak, spicy rye and a touch of cinnamon and nutmeg. Taste: rich caramel balanced by peppery rye spice and toffee, with dark cherry and orange peel. Finish: medium to long, oak and spice fading into soft caramel.",
    "Expect 5 to 7 business days for delivery. 21 and older, ID required at delivery."
   ]
  },
  "hof": {
   "name": "Limited Edition Pro Football Hall of Fame Bottle, Hand Numbered",
   "short": "Pro Football Hall of Fame Edition",
   "size": "750ML",
   "tag": "Hand numbered, 1 of 1500",
   "price": 5999,
   "image": "assets/p-hof.webp",
   "gallery": [
    "assets/p-hof.webp"
   ],
   "lead": "Finished with cognac staves.",
   "specs": "KENTUCKY BOURBON / AGED 5 YEARS / 750ML",
   "desc": [
    "Crafted to celebrate the partnership between Woodson Whiskey and the Pro Football Hall of Fame. Finished with cognac staves, aged five years and individually hand numbered (1 of 1500).",
    "A portion of proceeds from every bottle benefits the Hall of Fame's charitable initiatives."
   ]
  },
  "rose-in-mouth": {
   "name": "University of Michigan Charles Woodson \"Rose in Mouth\" Limited Edition",
   "short": "\"Rose in Mouth\" Limited Edition",
   "size": "750ML",
   "tag": "Commemorative bottle",
   "price": 5999,
   "image": "assets/p-rose-in-mouth.webp",
   "gallery": [
    "assets/p-rose-in-mouth.webp"
   ],
   "lead": "Display cylinder included.",
   "specs": "KENTUCKY STRAIGHT BOURBON / AGED 3 YEARS / 90 PROOF / 750ML",
   "desc": [
    "Honey, toasted ginger, vanilla, black cherries and baking spice with oak, then a buttery caramel finish. Comes with the limited edition Rose in Mouth Michigan display cylinder.",
    "Expect 5 to 7 business days for delivery. 21 and older, ID required at delivery."
   ]
  },
  "team-144": {
   "name": "Team 144 Michigan Commemorative Bottle",
   "short": "Team 144 Michigan",
   "size": "750ML",
   "tag": "Commemorative bottle",
   "price": 4499,
   "image": "assets/p-team-144.webp",
   "gallery": [
    "assets/p-team-144.webp"
   ],
   "lead": "Aged more than 2 years in Owensboro, Kentucky.",
   "specs": "KENTUCKY STRAIGHT BOURBON / 90 PROOF / 750ML",
   "desc": [
    "Made with Kentucky-grown corn, mostly from Daviess County. Mash bill 70% corn, 21% winter rye and 9% malted barley, for warming spice, cinnamon, dried cherry and light leather.",
    "Expect 5 to 7 business days for delivery. 21 and older, ID required at delivery."
   ]
  },
  "black-hole": {
   "name": "The Black Hole Limited Edition Bottle",
   "short": "The Black Hole Limited Edition",
   "size": "750ML",
   "tag": "Limited Edition",
   "price": 4799,
   "image": "assets/p-black-hole.webp",
   "gallery": [
    "assets/p-black-hole.webp"
   ],
   "lead": "Bold, unapologetic flavor.",
   "specs": "KENTUCKY STRAIGHT BOURBON / AGED 3 YEARS / 90 PROOF / 750ML",
   "desc": [
    "Made for the most notorious fans on the planet.",
    "Expect 5 to 7 business days for delivery. 21 and older, ID required at delivery."
   ]
  },
  "raiders-blackout": {
   "name": "65th Anniversary Raiders \"Blackout\" Limited Edition",
   "short": "Raiders \"Blackout\" Limited Edition",
   "size": "750ML",
   "tag": "Commemorative bottle",
   "price": 6499,
   "image": "assets/p-raiders-blackout.webp",
   "gallery": [
    "assets/p-raiders-blackout.webp"
   ],
   "lead": "Barrel strength.",
   "specs": "KENTUCKY STRAIGHT BOURBON / AGED 3 YEARS / 118 PROOF / 750ML",
   "desc": [
    "Sweet corn, charred oak, baking spice and vanilla, with a long, dry finish of oak, pepper and caramel.",
    "Expect 5 to 7 business days for delivery. 21 and older, ID required at delivery."
   ]
  },
  "maize-n-blitz": {
   "name": "Maize 'N Blitz Cinnamon Whiskey, Tailgate Edition",
   "short": "Maize 'N Blitz Cinnamon Whiskey",
   "size": "750ML",
   "tag": "Cinnamon Whiskey",
   "price": 2499,
   "image": "assets/p-maize-n-blitz.webp",
   "gallery": [
    "assets/p-maize-n-blitz.webp"
   ],
   "lead": "Smooth whiskey with a natural cinnamon kick.",
   "specs": "NON-CHILL FILTERED / SMALL BATCH / 750ML",
   "desc": [
    "Made with all natural ingredients. Built for the Big House tailgate. Shake well and enjoy."
   ]
  },
  "cinnamon-blitz": {
   "name": "Woodson Cinnamon Blitz",
   "short": "Cinnamon Blitz",
   "size": "750ML",
   "tag": "Cinnamon Whiskey",
   "price": 2499,
   "image": "assets/p-cinnamon-blitz.webp",
   "gallery": [
    "assets/p-cinnamon-blitz.webp"
   ],
   "lead": "Natural cinnamon heat that can't be beat.",
   "specs": "NON-CHILL FILTERED / SMALL BATCH / 750ML",
   "desc": [
    "Whiskey, real cinnamon and other whole natural infusions. The perfect pregame, postgame or between-game pour."
   ]
  },
  "heis-manhattan": {
   "name": "HEIS-MANHATTAN Ready to Pour Cocktail",
   "short": "Heis-Manhattan",
   "size": "375ML",
   "tag": "Ready to pour",
   "price": 2499,
   "image": "assets/p-heis-manhattan.webp",
   "gallery": [
    "assets/p-heis-manhattan.webp"
   ],
   "lead": "The Perfect Manhattan.",
   "specs": "35% ALC BY VOL / 375ML",
   "desc": [
    "Woodson Bourbon Whiskey blended with our own vermouth of 12 spices and botanicals, with a vanilla middle, balanced bitters and a sweet caramel finish."
   ]
  },
  "raiders-bundle": {
   "name": "Autographed Raiders Bundle",
   "short": "Autographed Raiders Bundle",
   "size": "750ML + mini helmet",
   "tag": "Autographed",
   "price": 24999,
   "image": "assets/p-raiders-bundle.webp",
   "gallery": [
    "assets/p-raiders-bundle.webp"
   ],
   "lead": "Signed by Charles Woodson.",
   "specs": "AUTOGRAPHED \"BLACKOUT\" BOTTLE + MINI HELMET",
   "desc": [
    "A Charles Woodson autographed Limited Edition \"Blackout\" bottle plus an officially licensed Raiders x Woodson Whiskey autographed mini helmet (half scale, for display only)."
   ]
  }
 },
 "order": [
  "michigan-12",
  "mbb-2026",
  "all-american",
  "hof",
  "rose-in-mouth",
  "team-144",
  "black-hole",
  "raiders-blackout",
  "maize-n-blitz",
  "cinnamon-blitz",
  "heis-manhattan",
  "raiders-bundle"
 ],
 "defaultHandle": "michigan-12",
 "retailers": [],
 "realHandles": [],
 "gopuff": null,
 "noShip": [
  "AL",
  "AR",
  "MS",
  "MI",
  "OK",
  "SD",
  "TN",
  "UT",
  "VT",
  "WI",
  "AK",
  "HI"
 ],
 "rates": {
  "shipping": 1499,
  "freeOver": 15000,
  "gopuff": 499
 },
 "taxRate": 0.08,
 "expressAddress": [
  "233 S Wacker Dr",
  "Chicago",
  "60606"
 ],
 "fulfilIcon": "assets/logo.png",
 "rbNote": "<b>Intercept wines are already on ReserveBar.com.</b> Charles Woodson's Intercept wines are listed on <a href=\"https://www.reservebar.com/products/charles-woodsons-intercept-cabernet-sauvignon/GROUPING-1404641\" target=\"_blank\" rel=\"noopener\">ReserveBar.com</a>. The whiskey would join them.",
 "text": {
  "fulfilReal": "",
  "fulfilLaunch": "Ships from a licensed retailer in your state. Free shipping over $150, as today. Rates show at checkout once you enter your address.",
  "cardReal": "",
  "cardLaunch": "Ships from licensed retailers",
  "soldOut": "Sold out.",
  "noShip": "We are not shipping to {state} yet. Same states as the current store.",
  "launchNote": "In the demo, no retailer stocks Woodson Whiskey yet. Licensed retailers are connected during onboarding, which takes about one week."
 }
};
