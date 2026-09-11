from pathlib import Path
from playwright.sync_api import sync_playwright
from harness import load_site
import json,time,os
ROOT=Path(__file__).resolve().parents[1];OUT=Path(__file__).resolve().parent/'results';OUT.mkdir(exist_ok=True);results=[]
def check(name,ok,detail=None):
 results.append({'test':name,'pass':bool(ok),'detail':detail});print(('PASS' if ok else 'FAIL'),name,detail or '',flush=True)
 OUT.joinpath('edge-tests.json').write_text(json.dumps({'tests':results,'passed':sum(x['pass'] for x in results)},ensure_ascii=False,indent=2))
 if not ok:raise AssertionError(name)
def ready(p):p.wait_for_function('document.documentElement.dataset.appReady === "true"')
def music(p):
 p.locator('#playlist').scroll_into_view_if_needed();p.wait_for_function('window.ClubMusicV4 !== undefined');p.locator('#mv3Turntable').scroll_into_view_if_needed();p.wait_for_timeout(100)
def place(p,id='studio'):
 p.evaluate('(id)=>ClubMusicV4.select(id)',id);p.wait_for_function('(id)=>ClubMusicV4.state.selectedId===id&&ClubMusicV4.state.phase==="IN_SLEEVE"',arg=id)
 p.locator(f'.mv3-disc[data-record="{id}"]').focus();p.keyboard.press('Enter');p.wait_for_function('(id)=>ClubMusicV4.state.loadedId===id && ClubMusicV4.state.phase==="ON_TURNTABLE"',arg=id)
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or None,args=['--no-sandbox'])
 # Real touch input through Chromium DevTools, not a browser mouse masquerading as touch.
 c=b.new_context(viewport={'width':390,'height':900},has_touch=True,is_mobile=True,device_scale_factor=3)
 p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));load_site(p,ROOT,spotify=True);ready(p);music(p)
 p.locator('#mv3Albums').scroll_into_view_if_needed();p.wait_for_timeout(150)
 r=p.locator('.mv3-disc[data-record="studio"]').bounding_box();x=r['x']+r['width']*.94;y=r['y']+r['height']*.5
 check('Mobile touch: exposed vinyl can be targeted',p.evaluate('([x,y])=>!!document.elementFromPoint(x,y)?.closest(".mv3-disc")',[x,y]))
 cd=c.new_cdp_session(p)
 def touch(kind,x=0,y=0):cd.send('Input.dispatchTouchEvent',{'type':kind,'touchPoints':[] if kind in ['touchEnd','touchCancel'] else [{'x':x,'y':y,'id':1,'radiusX':2,'radiusY':2}]})
 touch('touchStart',x,y);touch('touchMove',x-20,y+20);p.wait_for_timeout(100)
 check('Mobile touch: actual disc node leaves sleeve',p.evaluate('ClubMusicV4.dragging && document.querySelector(".mv3-disc.is-dragging").parentElement===document.body'))
 before=r['width'];after=p.locator('.mv3-disc.is-dragging').bounding_box()['width'];check('Mobile touch: diameter is unchanged while dragging',abs(before-after)<.1,[before,after])
 # Keep the pointer low only as needed; autoscroll must bring the platter into view.
 for i in range(45):
  d=p.locator('#mv3DropZone').bounding_box()
  targetX=d['x']+d['width']/2+before*.44;targetY=d['y']+d['height']/2
  if 115<targetY<820:break
  touch('touchMove',min(380,targetX),870 if targetY>=820 else 100);p.wait_for_timeout(55)
 touch('touchMove',min(380,targetX),max(100,min(820,targetY)));p.wait_for_timeout(100);touch('touchEnd')
 p.wait_for_function('ClubMusicV4.state.phase==="ON_TURNTABLE"')
 check('Mobile touch: record lands on the platter',p.evaluate('ClubMusicV4.state.loadedId==="studio"'))
 p.locator('#mv3Turntable').scroll_into_view_if_needed();p.wait_for_timeout(100)
 r2=p.locator('.mv3-disc.is-on-deck').bounding_box();check('Mobile touch: diameter remains unchanged on deck',abs(before-r2['width'])<1,[before,r2['width']])
 # Pointer cancellation returns the disc instead of orphaning it in body.
 p.evaluate('ClubMusicV4.select("pink")');p.wait_for_function('ClubMusicV4.state.selectedId==="pink" && ClubMusicV4.state.phase==="IN_SLEEVE"')
 p.locator('.mv3-disc[data-record="pink"]').scroll_into_view_if_needed();p.wait_for_timeout(100)
 r=p.locator('.mv3-disc[data-record="pink"]').bounding_box();x=min(379,r['x']+r['width']*.95);y=r['y']+r['height']/2
 touch('touchStart',x,y);touch('touchMove',x-15,y+15);p.wait_for_timeout(50);touch('touchCancel');p.wait_for_timeout(700)
 check('Touch cancellation leaves no floating disc or stuck drag state',p.evaluate('!ClubMusicV4.dragging && document.querySelectorAll("body>.mv3-disc").length===0'))
 check('Mobile touch sequence has no JS exceptions',not errors,errors);c.close()
 # Reduced-motion preference respected from initial load.
 c=b.new_context(viewport={'width':390,'height':900},reduced_motion='reduce');p=c.new_page();load_site(p,ROOT,spotify=True);ready(p);music(p);place(p);p.wait_for_timeout(80)
 p.locator('#mv3Play').click();p.wait_for_timeout(150)
 check('Reduced motion: audio state remains functional without animated motor',p.evaluate('ClubMusicV4.state.playing && !ClubMusicV4.animationActive && document.documentElement.dataset.motion==="off"'))
 c.close()
 # Visible error and retry when Spotify fails; never fake a spinning, silent player.
 p=b.new_page(viewport={'width':1440,'height':1000});load_site(p,ROOT,spotify=False);ready(p);music(p);place(p);p.wait_for_timeout(300)
 check('Spotify network failure is explained without fake playback',p.evaluate('!ClubMusicV4.state.playing && !ClubMusicV4.animationActive') and 'Spotify' in p.locator('#mv3Status').inner_text())
 p.route('https://open.spotify.com/embed/iframe-api/v1',lambda r:r.fulfill(body=Path(__file__).with_name('spotify-mock.js').read_text(),content_type='text/javascript'))
 p.locator('#mv3Play').click();p.wait_for_timeout(400)
 check('Spotify can retry after an API network failure',p.evaluate('ClubMusicV4.state.playing'))
 # Finish while events are arriving; a stale seek cannot resurrect the previous disc.
 p.evaluate('ClubMusicV4.select("pink");ClubMusicV4.select("studio");ClubMusicV4.select("pink")')
 p.wait_for_function('ClubMusicV4.state.phase === "IN_SLEEVE" && ClubMusicV4.state.selectedId==="pink"')
 check('Rapid cover changes settle on the last choice',p.evaluate('document.querySelectorAll(".mv3-disc").length===2 && !ClubMusicV4.state.loadedId'))
 p.close()
 # Static content must remain readable if JS is unavailable.
 c=b.new_context(viewport={'width':390,'height':900},java_script_enabled=False);p=c.new_page();load_site(p,ROOT)
 check('No-JS fallback keeps artwork cards in the page',p.locator('#galleryGrid .gallery-card').count()==6)
 check('No-JS fallback retains registration link',p.locator('a[href="https://forms.gle/kwnmuuC9N77aHMzGA"]').count()>0)
 c.close();b.close()
print('TOTAL',len(results))
