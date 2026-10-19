"""One-time import: restore static pages and save portfolio assets in this repo."""
import base64, concurrent.futures, hashlib, io, json, urllib.request, zipfile, time
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'migration/assets.json').read_text())
def download(item):
 url,path=item;target=ROOT/path
 if target.exists():return
 for attempt in range(3):
  try:
   request=urllib.request.Request(url,headers={'User-Agent':'PortfolioMigration/1.0'})
   data=urllib.request.urlopen(request,timeout=60).read()
   if target.suffix=='.webp':
    image=Image.open(io.BytesIO(data));image.thumbnail((2400,2400));buffer=io.BytesIO();image.save(buffer,format='WEBP',quality=90);data=buffer.getvalue()
   target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data);return
  except Exception:
   if attempt==2:raise
   time.sleep(2)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:list(pool.map(download,manifest.items()))
print(f'Imported {len(manifest)} assets. Static pages are ready in docs/.')

