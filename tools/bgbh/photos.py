"""Download the channel photos for the listings that go on the site and save web-sized webp copies.
usage: photos.py listings_all.json out_dir"""
import json, sys, os, io, urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
MAXP = 7
L = json.load(open(src, encoding='utf-8'))
sel = [x for x in L if x['status'] == 'active' and (x['kind'] == 'sale' or x['date'] >= '2025-01-01') and x['photos']]
jobs = []
for x in sel:
    d = os.path.join(out, f"{x['kind'][0]}{x['id']}")
    os.makedirs(d, exist_ok=True)
    for i, u in enumerate(x['photos'][:MAXP]):
        jobs.append((x, i, 'https:' + u if u.startswith('//') else u, d))


def run(j):
    x, i, u, d = j
    big = os.path.join(d, f'{i}.webp')
    if os.path.exists(big):
        return 'skip'
    try:
        data = urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'}), timeout=40).read()
        im = Image.open(io.BytesIO(data)).convert('RGB')
        b = im.copy(); b.thumbnail((1100, 1100))
        b.save(big, 'WEBP', quality=58, method=5)
        if i == 0:
            c = im.copy(); c.thumbnail((640, 640))
            c.save(os.path.join(d, 'card.webp'), 'WEBP', quality=60, method=5)
        return 'ok'
    except Exception as e:
        return f'ERR {u} {e}'


with ThreadPoolExecutor(12) as ex:
    res = list(ex.map(run, jobs))
errs = [r for r in res if r.startswith('ERR')]
print(len(sel), 'listings', len(jobs), 'photos', len(errs), 'errors')
for e in errs[:10]:
    print(e)
