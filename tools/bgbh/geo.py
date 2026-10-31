"""Place listings: match complex names to named OSM objects near their town, then measure distances to everyday places."""
import json, re, sys, math, difflib, collections
sys.stdout.reconfigure(encoding='utf-8')
TOWN = {'sveti-vlas': (42.7135, 27.7590), 'sunny-beach': (42.6950, 27.7110), 'nessebar': (42.6600, 27.7230), 'ravda': (42.6425, 27.6780),
        'pomorie': (42.5560, 27.6420), 'aheloy': (42.6490, 27.6480), 'burgas': (42.5048, 27.4626), 'obzor': (42.8180, 27.8800), 'elenite': (42.7600, 27.7980)}
ARENA = (42.5226, 27.4520)   # Arena Burgas (approx., Izgrev district)
AIRPORT = (42.5696, 27.5152)  # Burgas airport
TR = dict(zip('абвгдежзийклмнопрстуфхцчшщъыьэюяё', ['a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'ts', 'ch', 'sh', 'sht', 'a', 'y', '', 'e', 'yu', 'ya', 'e']))


def km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(h))


def norm(s):
    s = (s or '').lower()
    s = ''.join(TR.get(c, c) for c in s)
    s = re.sub(r'\b(complex|kompleks|apartments?|apartamenti|apart|hotel|residence|rezidens|zhk|zhilishten|kompleks|holiday|village|resort)\b', ' ', s)
    s = s.replace('noks', 'nox').replace('ks', 'x').replace('ll', 'l').replace('ph', 'f').replace('w', 'v').replace('c', 'k')
    s = re.sub(r'[^a-z0-9 ]', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


osm = json.load(open('osm.json', encoding='utf-8'))
places = [o for o in osm if o['k'] == 'place']
for p in places:
    p['n'] = {norm(p['name']), norm(p.get('name_en'))} - {''}
L = json.load(open('listings_all.json', encoding='utf-8'))
hits = 0
for x in L:
    t = TOWN.get(x['town'])
    if not t:
        continue
    cx = norm(x.get('complex'))
    best, bs = None, 0
    if cx and len(cx) >= 3:
        nums = re.findall(r'\d+', cx)
        word = re.sub(r'\d+', '', cx).strip()
        for p in places:
            if km(t, (p['lat'], p['lon'])) > 4.5:
                continue
            for n in p['n']:
                pn = re.findall(r'\d+', n)
                if nums and pn and nums != pn:
                    continue
                pw = re.sub(r'\d+', '', n).strip()
                r = difflib.SequenceMatcher(None, word, pw).ratio()
                if nums and pn == nums:
                    r += 0.05
                if r > bs:
                    best, bs = p, r
    if best and bs >= 0.86:
        x['lat'], x['lon'], x['geo'] = best['lat'], best['lon'], 'complex'
        x['geo_name'] = best['name']
        hits += 1
    else:
        x['lat'], x['lon'], x['geo'] = t[0], t[1], 'town'
    pos = (x['lat'], x['lon'])
    near = {}
    for k in ['school', 'kindergarten', 'supermarket', 'pharmacy']:
        ds = sorted((km(pos, (o['lat'], o['lon'])), o.get('name') or o.get('brand')) for o in osm if o['k'] == k)
        if ds:
            near[k] = round(ds[0][0], 2)
            near[k + '_name'] = ds[0][1]
    ds = sorted(km(pos, (o['lat'], o['lon'])) for o in osm if o['k'] in ('hospital', 'clinic', 'doctors'))
    near['medical'] = round(ds[0], 2) if ds else None
    near['airport'] = round(km(pos, AIRPORT), 1)
    near['arena'] = round(km(pos, ARENA), 1)
    x['near'] = near
json.dump(L, open('listings_geo.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('matched', hits, 'of', len(L))
for x in L[:40]:
    if x.get('geo') == 'complex':
        print(x['id'], x['complex'], '->', x['geo_name'])
