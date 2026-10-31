import sys, re, json, time, urllib.request
from bs4 import BeautifulSoup
chan, outp = sys.argv[1], sys.argv[2]
posts = {}
before = None
UA = {'User-Agent': 'Mozilla/5.0'}
while True:
    url = f'https://t.me/s/{chan}' + (f'?before={before}' if before else '')
    html = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    ws = soup.select('div.tgme_widget_message[data-post]')
    if not ws: break
    ids = []
    for w in ws:
        pid = int(w['data-post'].split('/')[1]); ids.append(pid)
        t = w.select_one('.tgme_widget_message_text')
        text = None
        if t:
            for br in t.find_all('br'): br.replace_with('\n')
            text = t.get_text().strip()
        photos = [re.search(r"url\('([^']+)'\)", a['style']).group(1) for a in w.select('a.tgme_widget_message_photo_wrap') if 'url(' in a.get('style','')]
        vids = [v.get('src') for v in w.select('video') if v.get('src')]
        dt = w.select_one('time[datetime]')
        posts[pid] = {'post': pid, 'text': text, 'photos': photos, 'videos': vids, 'date': dt['datetime'] if dt else None}
    nb = min(ids)
    if before is not None and nb >= before: break
    before = nb
    time.sleep(0.4)
json.dump(sorted(posts.values(), key=lambda p: p['post']), open(outp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(chan, len(posts), sum(1 for p in posts.values() if p['text'] and 'ID' in p['text']), sum(len(p['photos']) for p in posts.values()))
