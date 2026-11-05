import re,sys,os
d=os.path.dirname(os.path.abspath(__file__))
pts=[];last=None
for l in open(d+'/monitor.log').read().splitlines()[-60:]:
    m=re.match(r'(\d\d):(\d\d):(\d\d) hunt=\w+ .*?exp=([\d.]+) \(([\d.]+)/h\).*?hpPots=(-?\d+).*?lv=(\S+) nl=([\d.]+)%',l)
    if m:
        t=int(m[1])*3600+int(m[2])*60+int(m[3]); e=int(m[4].replace('.',''))
        pts.append((t,e)); last=m
if not last: print('sem dados'); sys.exit()
# só o trecho atual (o contador zera ao trocar de grupo)
k=len(pts)-1
while k>0 and pts[k-1][1]<=pts[k][1] and pts[k-1][0]<=pts[k][0]: k-=1
pts=pts[k:]
tl,el=pts[-1]
cand=[p for p in pts if tl-p[0]>=540]
b=cand[-1] if cand else pts[0]
rec=(el-b[1])/((tl-b[0])/3600)/1e6 if tl>b[0] else 0
print('%02d:%02d lv %s %s%% | média do grupo %.2f mi/h | ritmo dos últimos %.0f min: %.1f mi/h | poções %s'%(tl//3600,tl%3600//60,last[7],last[8],int(last[5].replace('.',''))/1e6,(tl-b[0])/60,rec,last[6]))
