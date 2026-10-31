"""Fetch the Burgas Bay coastline from OSM, stitch the ways, simplify, project to an SVG viewBox and print the path."""
import json, urllib.request, urllib.parse, sys, math
sys.stdout.reconfigure(encoding='utf-8')
S, W, N, E = 42.40, 27.40, 42.80, 27.86
q = f'[out:json][timeout:120];way["natural"="coastline"]({S},{W},{N},{E});(._;>;);out skel qt;'
data = None
for ep in ['https://overpass-api.de/api/interpreter', 'https://maps.mail.ru/osm/tools/overpass/api/interpreter']:
    try:
        data = json.loads(urllib.request.urlopen(urllib.request.Request(ep, data=urllib.parse.urlencode({'data': q}).encode(), headers={'User-Agent': 'bgbh-site/0.1'}), timeout=150).read())
        break
    except Exception as e:
        print('fail', ep, e, file=sys.stderr)
nodes = {e['id']: (e['lat'], e['lon']) for e in data['elements'] if e['type'] == 'node'}
ways = [e['nodes'] for e in data['elements'] if e['type'] == 'way']
# stitch
chains = []
ways = [list(w) for w in ways]
while ways:
    c = ways.pop()
    changed = True
    while changed:
        changed = False
        for i, w in enumerate(ways):
            if w[0] == c[-1]:
                c += w[1:]; ways.pop(i); changed = True; break
            if w[-1] == c[0]:
                c = w + c[1:]; ways.pop(i); changed = True; break
    chains.append(c)
chains.sort(key=len, reverse=True)
VW, VH = 1000, 900
k = math.cos(math.radians(42.6))


def proj(p):
    x = (p[1] - W) / ((E - W)) * VW
    y = (N - p[0]) / ((N - S)) * VH * (1 / ((E - W) * k / (N - S)) * VW / VH) if False else (N - p[0]) / (N - S) * VH
    return x, y


# keep aspect correct: scale x by cos(lat)
sx = VW / ((E - W) * k)
sy = VH / (N - S)
s = min(sx, sy)


def proj(p):
    return ((p[1] - W) * k * s, (N - p[0]) * s)


def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    a, b = pts[0], pts[-1]
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy) or 1e-9
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / L
        if d > dmax:
            dmax, idx = d, i
    if dmax > eps:
        return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [a, b]


paths = []
for c in chains:
    pts = [proj(nodes[n]) for n in c if n in nodes]
    if len(pts) < 8:
        continue
    pts = rdp(pts, 0.9)
    paths.append('M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in pts))
print(json.dumps({'w': round((E - W) * k * s), 'h': round((N - S) * s), 'S': S, 'W': W, 'N': N, 'E': E, 'k': k, 's': s, 'paths': paths[:6]}))
