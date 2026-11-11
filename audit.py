#!/usr/bin/env python3
import pathlib,re,sys,json
root=pathlib.Path(sys.argv[1] if len(sys.argv)>1 else '.')
p=root/'index.html'
if not p.exists(): sys.exit('Missing index.html')
s=p.read_text(encoding='utf-8')
head=s.split('</head>')[0]
checks={
 'CLB canonical':bool(re.search(r'rel=["\']canonical["\'][^>]*namcchet-cloud.github.io/CLB/',head)),
 'favicon 48': 'favicon-48x48.png' in head,
 'favicon 96': 'favicon-96x96.png' in head,
 'title': '<title>CLB Nghệ thuật THPT Bảo Lộc</title>' in head,
 'manifest valid': True,
 'no duplicate canonical':len(re.findall(r'rel=["\']canonical["\']',head))==1,
 'no duplicate icon sizes': len(re.findall(r'favicon-48x48.png',head))==1,
}
try:json.loads((root/'site.webmanifest').read_text(encoding='utf-8'))
except Exception:checks['manifest valid']=False
for k,v in checks.items():print(('PASS' if v else 'FAIL'),k)
sys.exit(0 if all(checks.values()) else 2)
