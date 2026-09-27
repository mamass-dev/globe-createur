import json, sys, statistics
from collections import Counter, defaultdict
S="/private/tmp/claude-501/-Users-mamass/ef7d9418-a7df-428a-9dbf-2c7a29b2b0aa/scratchpad"
rows=json.load(open(f"{S}/barometre-results.json"))
ok=[r for r in rows if "score" in r and r.get("status",0)==200]
err=[r for r in rows if "error" in r or r.get("status",0)!=200]
print("total",len(rows),"| analysés (HTTP 200)",len(ok),"| injoignables/erreur",len(err))
scores=[r["score"] for r in ok]
print("score moyen",round(statistics.mean(scores),1),"| médiane",statistics.median(scores),"| <60 :",sum(s<60 for s in scores),"| 60-85 :",sum(60<=s<85 for s in scores),"| >=85 :",sum(s>=85 for s in scores))
crit=defaultdict(Counter)
for r in ok:
    for c in r["checks"]: crit[c["id"]][c["status"]]+=1
print("\n--- % de sites en échec ou avertissement par critère")
for cid,cnt in sorted(crit.items(), key=lambda kv: -(kv[1]["fail"]+kv[1]["warning"])):
    n=sum(cnt.values()); print(f"{cid:18s} fail {100*cnt['fail']//n:3d}%  warn {100*cnt['warning']//n:3d}%  pass {100*cnt['pass']//n:3d}%")
print("\n--- HTTP non sécurisé (URL finale en http)")
print(sum(1 for r in ok if not r["finalUrl"].startswith("https://")), "sites")
print("\n--- score moyen par catégorie (n>=8)")
bycat=defaultdict(list)
for r in ok: bycat[r["cat"]].append(r["score"])
for cat,v in sorted(bycat.items(), key=lambda kv:-len(kv[1])):
    if len(v)>=8: print(f"{cat:18s} n={len(v):3d} moy={round(statistics.mean(v),1)}")
print("\n--- noindex détecté")
print(sum(1 for r in ok for c in r["checks"] if c["id"]=="robots" and c["status"]=="fail"), "sites")
print("\n--- titles identiques au nom (title == nom entreprise seul) approx")
print(sum(1 for r in ok for c in r["checks"] if c["id"]=="title" and c["status"]!="pass"), "sites avec title absent/mauvaise longueur")
