#!/usr/bin/env python3
"""Non-destructive CLB SEO/favicon patch; standard library only."""
import argparse, datetime, json, pathlib, re, shutil, sys
BASE='https://namcchet-cloud.github.io/CLB/'
NAME='CLB Nghệ thuật THPT Bảo Lộc'
DESC='CLB Nghệ thuật THPT Bảo Lộc: mỹ thuật, hội họa, digital art, triển lãm tranh và hoạt động sáng tạo của học sinh tại Bảo Lộc, Lâm Đồng.'
FAV=['favicon.ico','assets/icons/favicon-48x48.png','assets/icons/favicon-96x96.png','assets/icons/favicon-192x192.png','assets/icons/favicon-512x512.png']
def rewrite_index(path, full):
    s=path.read_text(encoding='utf-8')
    if not re.search(r'<head\b[^>]*>',s,re.I) or '</head>' not in s.lower(): raise ValueError('index.html lacks head element')
    head=s[s.lower().index('<head'):s.lower().index('</head>')]
    # Existing SEO metadata is preserved; normalize a single canonical + favicon set.
    s,n=re.subn(r'<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>',f'<link rel="canonical" href="{BASE}"/>',s,count=1,flags=re.I)
    if not n: s=s.replace('</head>',f'<link rel="canonical" href="{BASE}"/>\n</head>',1)
    # Remove favicon links only in head, not webpage icons/branding.
    a,b=re.split(r'</head>',s,maxsplit=1,flags=re.I)
    a=re.sub(r'<link\b(?=[^>]*\brel=["\'](?:icon|shortcut icon|apple-touch-icon)["\'])[^>]*>\s*','',a,flags=re.I)
    lines=[f'<link rel="icon" type="image/x-icon" href="{BASE}favicon.ico"/>',
       f'<link rel="icon" type="image/png" sizes="48x48" href="{BASE}assets/icons/favicon-48x48.png"/>',
       f'<link rel="icon" type="image/png" sizes="96x96" href="{BASE}assets/icons/favicon-96x96.png"/>',
       f'<link rel="apple-touch-icon" sizes="180x180" href="{BASE}assets/icons/apple-touch-icon.png"/>']
    if full:
        lines.extend([f'<link rel="icon" type="image/png" sizes="192x192" href="{BASE}assets/icons/favicon-192x192.png"/>',
                      f'<link rel="manifest" href="{BASE}site.webmanifest"/>'])
        # Avoid duplicate manifest entries; keep data URI/CSP and feature scripts untouched.
        a=re.sub(r'<link\b(?=[^>]*\brel=["\']manifest["\'])[^>]*>\s*','',a,flags=re.I)
        # Remove conflicting homepage hint. CLB has canonical URL, root home points at a different site.
        a=re.sub(r'<link\b(?=[^>]*\brel=["\']home["\'])[^>]*>\s*','',a,flags=re.I)
        # Replace old structured-data IDs that incorrectly claim root homepage as the organization.
        a=a.replace('https://namcchet-cloud.github.io/#organization',BASE+'#organization')
        a=a.replace('https://namcchet-cloud.github.io/#website',BASE+'#website')
        # idempotent: add WebSite schema only when missing.
        if '"@id": "'+BASE+'#website"' not in a:
            a=a.replace('"@graph": [','"@graph": [\n    {"@type": "WebSite", "@id": "'+BASE+'#website", "url": "'+BASE+'", "name": "'+NAME+'", "inLanguage": "vi"},',1)
        # Normalize exactly one explicit title and description, leaving other social tags intact.
        a=re.sub(r'<title>.*?</title>',f'<title>{NAME}</title>',a,count=1,flags=re.I|re.S)
        a=re.sub(r'<meta\s+content="[^"]*"\s+name="description"\s*/>',f'<meta content="{DESC}" name="description"/>',a,count=1,flags=re.I)
    a=re.sub(r'\s+$','',a)+'\n'+'\n'.join(lines)+'\n'
    out=a+'</head>'+b
    if out!=s: path.write_text(out,encoding='utf-8')
    return out!=s

def apply(root,full):
    idx=root/'index.html'
    if not idx.is_file(): raise FileNotFoundError('Cannot find index.html. Run in CLB repository root.')
    missing=[x for x in FAV if not (root/x).is_file()]
    if missing: raise FileNotFoundError('Missing favicon assets (patch does not fabricate logos): '+', '.join(missing))
    backup=root/('_backup_before_clb_seo_'+datetime.datetime.now().strftime('%Y%m%d_%H%M%S'))
    backup.mkdir(exist_ok=True)
    for f in ['index.html','site.webmanifest','robots.txt','sitemap.xml']:
        p=root/f
        if p.exists(): shutil.copy2(p,backup/f)
    changed=[]
    if rewrite_index(idx,full): changed.append('index.html')
    if full:
        p=root/'site.webmanifest'
        if p.exists():
            manifest=json.loads(p.read_text(encoding='utf-8'))
            manifest.update({'name':NAME,'short_name':'CLB Nghệ thuật','start_url':'./','scope':'./','id':'./','lang':'vi'})
            updated=json.dumps(manifest,ensure_ascii=False,indent=2)+'\n'
            if p.read_text(encoding='utf-8')!=updated: p.write_text(updated,encoding='utf-8');changed.append('site.webmanifest')
        # Never rewrite sitemap dates, URL inventory, UI, CSS, or JS without complete content audit.
    print('Mode:', 'FULL SEO CLEANUP' if full else 'FOCUSED HOTFIX')
    print('Updated:',', '.join(changed) if changed else '(already patched)')
    print('Backup:',backup)
    print('Root-domain favicon requires separate root-site repository config.')

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('site_root',nargs='?',default='.',help='path to extracted CLB repository')
    ap.add_argument('--full',action='store_true')
    arg=ap.parse_args()
    try: apply(pathlib.Path(arg.site_root).resolve(),arg.full)
    except Exception as e: print('ERROR:',e,file=sys.stderr);sys.exit(1)
if __name__=='__main__':main()
