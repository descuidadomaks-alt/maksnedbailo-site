"""Write the public listings file for the site and copy the photos next to it.
usage: build_data.py <site_dir>   (site_dir = public/bgbh in the repo)"""
import json, os, re, shutil, sys, collections
sys.stdout.reconfigure(encoding='utf-8')
site = sys.argv[1]
TR = dict(zip('абвгдежзийклмнопрстуфхцчшщъыьэюяё', ['a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'ts', 'ch', 'sh', 'sht', 'a', 'y', '', 'e', 'yu', 'ya', 'yo']))
# Cyrillic spellings of names that are English (or Italian) in real life
FIX = [(r'Drims', 'Dreams'), (r'Si?y? Briz', 'Sea Breeze'), (r'Romans Parizh', 'Romance Paris'), (r'Romans Marin\w*', 'Romance Marina'),
       (r'Reynbou', 'Rainbow'), (r'Raduga', 'Rainbow'), (r'Heppi Haus', 'Happy House'), (r'San+i Dey', 'Sunny Day'), (r'Gavana', 'Havana'),
       (r'Viyana', 'Vienna'), (r'Marina keyp', 'Marina Cape'), (r'Marvel delyuks', 'Marvel Deluxe'), (r'Ipanema Bich', 'Ipanema Beach'), (r'Pasifik', 'Pacific'),
       (r'Baterflyay', 'Butterfly'), (r'Ro[uy]al [Ss]an', 'Royal Sun'), (r'Roual Sun', 'Royal Sun'), (r'Kasa-Real', 'Casa Real'), (r'Galateya', 'Galatea'),
       (r'Meliya', 'Melia'), (r'Shato', 'Chateau'), (r'Dolche', 'Dolce'), (r'Apolon\b', 'Apollon'), (r'Grand Kameliya', 'Grand Camellia'), (r'^Taris', 'Tarsis'),
       (r'San House', 'Sun House'), (r'^[Rr]ayon (\w+)', r'\1 district'), (r'(?i)kompleks ?', ''), (r'^panorama', 'Panorama'), (r'Anzhelika', 'Angelika'),
       (r'Stani Kort', 'Stani Court'), (r'Millenium', 'Millennium'), (r'Sanny Day - 6', 'Sunny Day 6'), (r'Siana - 1', 'Siana 1'), (r'Holliday', 'Holiday'),
       (r'^Vip Harmony', 'Harmony Suites'), (r'^VIP Harmony', 'Harmony'), (r'Oazis', 'Oasis'), (r'Morski Bryag', 'Morski Bryag'), (r'Kentavar', 'Kentavar')]
NOT_A_NAME = re.compile(r'(жил|помещ|дом\b|квартир|апартамент|здани|новостро|улиц|ул\.|элитн|равда$)')


def lat(s):
    out = []
    for c in s:
        lc = c.lower()
        if lc in TR:
            r = TR[lc]
            out.append(r.capitalize() if c != lc and r else r)
        else:
            out.append(c)
    s = ''.join(out)
    for a, b in FIX:
        s = re.sub(a, b, s)
    return re.sub(r'\s+', ' ', s).strip()


def clean(s):
    return re.sub('[\U0001F300-\U0001FAFF☀-➿️]', '', s or '').strip()


L = json.load(open('listings_geo.json', encoding='utf-8'))
os.makedirs(os.path.join(site, 'p'), exist_ok=True)
pub = []
for x in L:
    if x['status'] != 'active' or not x['photos'] or not x['town']:
        continue
    if x['kind'] == 'rent' and x['date'] < '2025-01-01':
        continue
    key = f"{x['kind'][0]}{x['id']}"
    src = os.path.join('photos', key)
    if not os.path.isdir(src):
        continue
    imgs = sorted([f for f in os.listdir(src) if re.fullmatch(r'\d+\.webp', f)], key=lambda f: int(f.split('.')[0]))
    if not imgs or not os.path.exists(os.path.join(src, 'card.webp')):
        continue
    dst = os.path.join(site, 'p', key)
    os.makedirs(dst, exist_ok=True)
    for f in imgs + ['card.webp']:
        if not os.path.exists(os.path.join(dst, f)):
            shutil.copy2(os.path.join(src, f), os.path.join(dst, f))
    if not os.path.exists(os.path.join(dst, 'card.jpg')):  # Telegram alerts need JPEG
        from PIL import Image
        im = Image.open(os.path.join(src, '0.webp')).convert('RGB'); im.thumbnail((960, 960))
        im.save(os.path.join(dst, 'card.jpg'), 'JPEG', quality=74, optimize=True, progressive=True)
    cx = clean(x.get('complex'))
    if cx and NOT_A_NAME.match(cx.lower()):
        cx = None
    o = {'key': key, 'id': x['id'], 'kind': x['kind'], 'town': x['town'], 'cx': cx or None, 'cxl': lat(cx) if cx else None,
         'date': x['date'], 'tg': x['url'], 'n': len(imgs), 'beds': x['beds'], 'f': x['f'],
         'lat': x['lat'], 'lon': x['lon'], 'geo': x['geo'], 'near': x['near']}
    for k in ['sea_m', 'area', 'floor', 'floors', 'house', 'act16', 'offplan', 'fee', 'fee_unit', 'price', 'from_month', 'from_day', 'season_price', 'district']:
        if x.get(k) not in (None, False, ''):
            o[k] = x[k]
    if x['kind'] == 'rent':
        o['rates'] = [{k: v for k, v in r.items() if v not in (None, False, [])} for r in x['rates']]
    o['unit'] = clean(x['unit_ru'])
    o['desc'] = clean(x['desc_ru'])
    pub.append(o)
json.dump(pub, open(os.path.join(site, 'data', 'listings.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print(len(pub), collections.Counter(p['kind'] for p in pub), collections.Counter(p['town'] for p in pub))
print(os.path.getsize(os.path.join(site, 'data', 'listings.json')) // 1024, 'KB')
print(sorted(set(p['cxl'] for p in pub if p['cxl'])))
