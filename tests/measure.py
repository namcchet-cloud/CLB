"""Measure local resource body bytes, not real-world download time.
Usage: python tests/measure.py [--root /path/to/site]
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from harness import load_site
import argparse, json, os
parser=argparse.ArgumentParser();parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[1]);args=parser.parse_args()
out=Path(__file__).resolve().parent/'results';out.mkdir(exist_ok=True)
with sync_playwright() as pw:
    browser=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or None)
    page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='no-preference')
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    served=load_site(page,args.root.resolve());page.wait_for_timeout(2000)
    data={'viewport':[1440,1000],'resource_body_bytes':sum(x['bytes'] for x in served),'resources':list(served),'page_errors':errors,
          'notes':'set_content + local route fulfillment, cold page, 2 seconds. HTML is injected, external fonts/Spotify aborted. Not a Lighthouse score or a real network timing.'}
    (out/'resource-measurement.json').write_text(json.dumps(data,indent=2))
    print(json.dumps(data,indent=2));browser.close()
