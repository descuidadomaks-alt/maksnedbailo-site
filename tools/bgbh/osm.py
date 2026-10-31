import json, urllib.request, urllib.parse, sys
sys.stdout.reconfigure(encoding='utf-8')
BBOX = '42.50,27.40,42.80,27.80'  # Burgas airport .. Sveti Vlas
q = f"""[out:json][timeout:170];
(
 nwr["amenity"~"^(school|kindergarten|pharmacy|hospital|clinic|doctors)$"]({BBOX});
 nwr["shop"~"^(supermarket)$"]({BBOX});
 nwr["aeroway"="aerodrome"]({BBOX});
 nwr["name"]["tourism"~"^(hotel|apartment|guest_house|resort)$"]({BBOX});
 nwr["name"]["building"~"^(apartments|residential|hotel)$"]({BBOX});
 nwr["name"]["landuse"="residential"]({BBOX});
 nwr["name"]["leisure"="resort"]({BBOX});
);
out center tags;"""
for ep in ['https://overpass-api.de/api/interpreter', 'https://maps.mail.ru/osm/tools/overpass/api/interpreter']:
    try:
        data = urllib.request.urlopen(urllib.request.Request(ep, data=urllib.parse.urlencode({'data': q}).encode(), headers={'User-Agent': 'bgbh-site/0.1'}), timeout=180).read()
        break
    except Exception as e:
        print('fail', ep, e)
els = json.loads(data)['elements']
out = []
for e in els:
    c = e.get('center') or {'lat': e.get('lat'), 'lon': e.get('lon')}
    if c['lat'] is None:
        continue
    t = e.get('tags', {})
    kind = t.get('amenity') or ('supermarket' if t.get('shop') == 'supermarket' else None) or ('airport' if t.get('aeroway') else None) or 'place'
    out.append({'k': kind, 'lat': round(c['lat'], 5), 'lon': round(c['lon'], 5), 'name': t.get('name'), 'name_en': t.get('name:en'), 'brand': t.get('brand')})
json.dump(out, open('osm.json', 'w', encoding='utf-8'), ensure_ascii=False)
import collections
print(len(out), collections.Counter(o['k'] for o in out))
