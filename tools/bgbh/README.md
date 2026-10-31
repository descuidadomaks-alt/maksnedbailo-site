# BG Beach Homes data pipeline

Run from a scratch folder (writes json/photos there), in this order:

1. `scrape_tme.py bgbeachhomes_rent tme_rent.json` and `scrape_tme.py bgbeachhomes_sale tme_sale.json` - public channel pages (text + photo URLs)
2. `structure.py` - posts to structured listings (`listings_all.json`)
3. `photos.py listings_all.json photos` - downloads up to 7 photos per listing, WebP
4. `osm.py` - schools, kindergartens, shops, pharmacies, named complexes (OpenStreetMap)
5. `geo.py` - places listings and measures distances (`listings_geo.json`)
6. `build_data.py <repo>/public/bgbh` - writes `data/listings.json`, copies photos, makes `card.jpg` for Telegram
7. `coast.py > coast.json` - Burgas Bay coastline for the home page map (rarely needed)

Next step on the roadmap: read the Listings DB Google Sheet instead of the channels.
