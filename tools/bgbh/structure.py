import json, re, sys, collections
sys.stdout.reconfigure(encoding='utf-8')
TOWNS = [('sveti-vlas', r'свет\w* влас|святой влас|святи влас'), ('sunny-beach', r'солнечн\w* берег|кошариц|какао'), ('ravda', r'равд'),
         ('nessebar', r'несеб'), ('pomorie', r'помори'), ('aheloy', r'ахело'), ('burgas', r'бургас'), ('obzor', r'обзор'), ('elenite', r'елените')]
MONTHS = {'янв': 1, 'фев': 2, 'мар': 3, 'апр': 4, 'май': 5, 'мая': 5, 'июн': 6, 'июл': 7, 'авг': 8, 'сен': 9, 'окт': 10, 'ноя': 11, 'дек': 12}


def num(s):
    s = s.replace(' ', '').replace(' ', '').replace(',', '.')
    if s.count('.') == 1 and len(s.split('.')[1]) == 3:
        s = s.replace('.', '')
    try:
        return float(s)
    except ValueError:
        return None


def town_of(t):
    lt = t.lower()
    for k, rx in TOWNS:
        if re.search(rx, lt):
            return k
    return None


def parse(p, kind):
    t = p['text']
    lines = [l.strip() for l in t.split('\n')]
    lt = t.lower()
    head = lines[0].lower()
    m = re.search(r'ID:?\s*(\d+)', t)
    L = {'id': int(m.group(1)), 'kind': kind, 'post': p['post'], 'url': f"https://t.me/bgbeachhomes_{kind}/{p['post']}",
         'date': p['date'][:10], 'photos': p['photos'], 'videos': len(p['videos'])}
    L['status'] = 'closed' if re.search(r'продан|принят депозит|сдан[оа]?\b|забронирован', head) else 'active'
    pins = [re.sub(r'^📌\s*', '', l) for l in lines if l.startswith('📌')]
    L['town'] = town_of(' '.join(pins)) or town_of(t)
    cx = None
    for pn in pins:
        pl = pn.lower()
        if re.match(r'(г\.|с\.|село|город)\s*', pl) and 'комплекс' not in pl:
            d = pn.split(',', 1)
            if len(d) > 1 and d[1].strip():
                L['district'] = d[1].strip()
            continue
        cx = re.sub(r'^(закрытый\s+)?(жилой\s+)?(комплекс)[:\s]*', '', pn, flags=re.I).strip(' "”“«»,')
    L['complex'] = cx
    sea = next((l for l in lines if l.startswith('🏖')), None)
    if sea:
        s = sea.lower()
        L['sea_raw'] = re.sub(r'^🏖\S*\s*', '', sea)
        mm = re.search(r'(\d[\d,.]*)\s*(км|km)', s)
        mt = re.search(r'(\d[\d\s]*)\s*(м\b|м\s|метр|m\b|м$)', s)
        mi = re.search(r'(\d+)\s*мин', s)
        if mm:
            L['sea_m'] = int(num(mm.group(1)) * 1000)
        elif mt:
            L['sea_m'] = int(num(mt.group(1)))
        elif mi:
            L['sea_m'] = int(mi.group(1)) * 80
        if 'перв' in s and 'лин' in s:
            L['sea_m'] = 50
    tl = ' '.join(l for l in lines if l.startswith('🏠')).lower()
    beds = None
    if 'студи' in tl:
        beds = 0
    if re.search(r'\bдом\b|вилл|къща|таунхаус', tl) and 'жилой дом' not in tl:
        L['house'] = True
    mb = re.search(r'(\d)\s*\+\s*(\d)', tl)
    if mb:
        beds = int(mb.group(2))
    elif re.search(r'(\d)\s*спал', tl):
        beds = int(re.search(r'(\d)\s*спал', tl).group(1))
    elif re.search(r'(три|3) (отдельные )?спальн|четыр\w*комнатн', tl):
        beds = 3
    elif re.search(r'(две|2) (отдельные )?спальн|тр[её]хкомнатн|тристайн', tl):
        beds = 2
    elif re.search(r'одна спальн|1 спальн|двухкомнатн|двустайн', tl):
        beds = 1
    if beds is None:
        tags = ' '.join(re.findall(r'#\S+', t))
        if 'студия' in tags:
            beds = 0
        elif 'однаспальня' in tags:
            beds = 1
        elif 'двеспальни' in tags:
            beds = 2
        elif 'триспальни' in tags or 'дом' in tags:
            beds = 3
    L['beds'] = beds
    ma = re.search(r'площадь[:\s]*(\d+[.,]?\d*)', lt) or re.search(r'(\d+[.,]?\d*)\s*(м²|м2|кв\.?\s*м)', lt)
    if ma:
        a = num(ma.group(1))
        if a and 12 <= a <= 600:
            L['area'] = a
    mf = re.search(r'этаж[:\s]*(\d+)\s*(?:из|/)\s*(\d+)', lt) or re.search(r'(\d+)\s*/\s*(\d+)\s*этаж', lt) or re.search(r'(\d+)\s*этаж', lt)
    if mf:
        L['floor'] = int(mf.group(1))
        if mf.lastindex and mf.lastindex > 1:
            L['floors'] = int(mf.group(2))
    L['act16'] = bool(re.search(r'акт\s*16', lt))
    if not L['act16'] and re.search(r'акт\s*14|акт\s*15|сдача объекта|на этапе строит', lt):
        L['offplan'] = True
    fee = re.search(r'такс\w* поддержки[^\d\n]*(\d[\d\s,.]*)\s*€?\s*(/\s*(м2|м²|кв\.?\s*м))?', lt)
    if re.search(r'без такс', lt):
        L['fee'] = 0
    elif fee:
        L['fee'] = num(fee.group(1).strip())
        L['fee_unit'] = 'm2' if fee.group(2) else 'year'
    F = {
        'pool': 'бассейн' in lt,
        'seaview': bool(re.search(r'вид\w* на море|панорамн\w* вид', lt)),
        'parking': bool(re.search(r'паркин|парковк|гараж', lt)),
        'pets': bool(re.search(r'с животн|собач|питом', lt)) and not re.search(r'без животн|нельзя с живот', lt),
        'kids': 'детск' in lt,
        'yearround': bool(re.search(r'кругл\w* год|круглогод', lt)),
        'furnished': bool(re.search(r'меблир|мебел|все необходимое', lt)),
        'security': bool(re.search(r'охран|видеонаблю|закрыт\w* территор', lt)),
        'verified': 'верифицирован' in lt,
        'shop': bool(re.search(r'магазин|супермаркет|гипермаркет|lidl|меркурий|billa|kaufland', lt)),
        'longterm': bool(re.search(r'долгосроч|на год\b|на зиму|помесячн|октябр\w*\s*-\s*апрел', lt)),
    }
    L['f'] = [k for k, v in F.items() if v]
    pl = next((l for l in lines if l.startswith('💶')), None)
    if kind == 'sale':
        cand = re.findall(r'(\d{2,3}[\s .]?\d{3})\s*€', t) + re.findall(r'€\s*(\d{2,3}[\s .]?\d{3})', t)
        if pl:
            cand = re.findall(r'(\d[\d\s .]*\d)', pl) + cand
        ps = [x for x in (num(c) for c in cand) if x and x >= 10000]
        if ps:
            L['price'] = int(ps[0])
    else:
        rates = []
        for l in lines:
            ll = l.lower()
            if not (l.startswith('💶') or l.startswith('➡️') or re.match(r'^(✅)?\s*(янв|фев|мар|апр|май|мая|июн|июл|авг|сен|окт|ноя|дек)', ll)):
                continue
            if 'такс' in ll or 'депозит' in ll:
                continue
            mon = sorted({v for k, v in MONTHS.items() if re.search(r'(^|[^а-я])' + k, ll)})
            booked = '❌' in l or 'бронь' in ll or 'занят' in ll
            pm = re.search(r'(\d[\d\s ]*\d|\d)\s*€?\s*/?\s*(мес|в месяц)', ll) or re.search(r'(\d[\d\s ]*\d)\s*€(?!\s*/?\s*сут)', ll)
            pd = re.search(r'(\d+)\s*€?\s*/?\s*(сут|ноч|день)', ll)
            r = {'months': mon}
            if re.search(r'до\s*0?1[./]06|до\s*1\s*июн', ll):
                r['months'] = [10, 11, 12, 1, 2, 3, 4, 5]
            if re.search(r'октябр\w*\s*-\s*апрел|зим|долгосроч|на год', ll):
                r['months'] = [10, 11, 12, 1, 2, 3, 4]
                r['long'] = True
            if not r['months'] and re.search(r'лето|сезон', ll):
                r['season'] = True
            if pm:
                v = num(pm.group(1))
                if v and v >= 100:
                    r['month'] = v
            if pd:
                v = num(pd.group(1))
                if v and 10 <= v <= 500:
                    r['day'] = v
            if booked:
                r['booked'] = True
            if r.get('month') or r.get('day') or booked:
                rates.append(r)
        L['rates'] = rates
        mos = [r['month'] for r in rates if r.get('month') and not r.get('season')]
        dys = [r['day'] for r in rates if r.get('day')]
        if mos:
            L['from_month'] = int(min(mos))
        if dys:
            L['from_day'] = int(min(dys))
        if not mos and not dys:
            sp = [r['month'] for r in rates if r.get('month')]
            if sp:
                L['season_price'] = int(min(sp))
    desc = [re.sub(r'^\S+\s*', '', l).strip() for l in lines if l.startswith(('🧭', '🔥', '🏘', '🅿', '🌊', '🌳'))]
    L['unit_ru'] = ' '.join(re.sub(r'^🏠\s*', '', l) for l in lines if l.startswith('🏠'))[:400]
    L['desc_ru'] = '\n'.join(d for d in desc if d and not re.fullmatch(r'в (квартире|апартаменте) есть все необходимое\.?( для комфортного проживания\.?)?', d.lower()))
    return L


out = []
for f, kind in [('tme_rent.json', 'rent'), ('tme_sale.json', 'sale')]:
    for p in json.load(open(f, encoding='utf-8')):
        if p['text'] and re.search(r'ID:?\s*\d+', p['text']):
            out.append(parse(p, kind))
best = {}
for L in sorted(out, key=lambda x: x['date']):
    best[(L['kind'], L['id'])] = L
res = sorted(best.values(), key=lambda x: x['date'], reverse=True)
json.dump(res, open('listings_all.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(res), collections.Counter((x['kind'], x['status']) for x in res))
print('town', collections.Counter(x['town'] for x in res))
print('beds', collections.Counter(x['beds'] for x in res))
print('no price rent', [x['id'] for x in res if x['kind'] == 'rent' and not (x.get('from_month') or x.get('from_day') or x.get('season_price'))])
print('no price sale', [x['id'] for x in res if x['kind'] == 'sale' and not x.get('price')])
print('no sea', len([x for x in res if 'sea_m' not in x]))
print('sale prices', sorted(x.get('price', 0) for x in res if x['kind'] == 'sale'))
