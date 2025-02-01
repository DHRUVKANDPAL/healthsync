import random
import json

# Sample doctor and department IDs (use your actual data here)
doctor_ids = [
  "cm6mjaox4000i5e15eql1jufv",
  "cm6cn7akm0000anyuojctx404",
  "cm6cn9who0001anyuqns00gwj",
  "cm6mjape8000j5e15xeyrqlq1",
  "cm3iqi7bz0000zi5m3gzfzvcg",
  "cm6mi4nhs0000147l9cjzq9ca",
  "cm6mi9rjv0001147lhoxf7scx",
  "cm6mj7dh100065e152e0mlcym",
  "cm6mjakn200075e15yvz2dnnl",
  "cm6mjal1d00085e1532fwcxw0",
  "cm6mjalf900095e15z0ykmxje",
  "cm6mjalsh000a5e153g553dqd",
  "cm6mjam5y000b5e15b95y3bgg",
  "cm6mjamjj000c5e15v8njqaaa",
  "cm6mjamyw000d5e15l6n4lu42",
  "cm6mjanb6000e5e157di6n0pw",
  "cm6mjanol000f5e15uhskwmyb",
  "cm6mjao26000g5e15c8shzd0c",
  "cm6mjaofg000h5e15ajfbsntz",
  "cm6mjapu8000k5e15h3w1ngeo",
  "cm6mjaqb6000l5e159bar47x7",
  "cm6mjaqov000m5e15q6191frb",
  "cm6mjar2p000n5e1502775qrv",
  "cm6mjargk000o5e15elyg2y6i",
  "cm6mjarue000p5e15l7qfcb6d",
  "cm6mjas85000q5e155f5pswxo",
  "cm6mjasm3000r5e158uxy1not",
  "cm6mjasz5000s5e155og2wsli",
  "cm6mjatcd000t5e15rb498ply",
  "cm6mjatq9000u5e159rc69fht",
  "cm6mjau3u000v5e15e0apbqa0",
  "cm6mjaujn000w5e15bfvqg4fq",
  "cm6mjauww000x5e156a94r0gl",
  "cm6mjavan000y5e15r7bv74cb",
  "cm6mjavoo000z5e15dkacsrze",
  "cm6mjaw1r00105e15ppzewjz9",
  "cm6mjawhp00115e15wozm0y1o",
  "cm6mjawv900125e15w0fp9k2t",
  "cm6mjaxac00135e15fcte1lih",
  "cm6mjaxok00145e15t81xvcci",
  "cm6mjay1x00155e15zepewioc",
  "cm6mjayf700165e15b1gbs0ch",
  "cm6mjayti00175e15kvsqb5at",
  "cm6mjaz7r00185e152u6gm2jq",
  "cm6mjazmy00195e15qdi4preh",
  "cm6mjazzw001a5e15270f21z4",
  "cm6mjb0fo001b5e15hmrgodj8",
  "cm6mjb0sb001c5e150jlvfi89",
  "cm6mjb16b001d5e153ei93i03",
  "cm6mjb1jz001e5e150yjr1209",
  "cm6mjb1yx001f5e15n8bka0pz",
  "cm6mjb2cv001g5e153ubaw0pz",
  "cm6mjb2qa001h5e15hdxr3xxd",
  "cm6mjb33p001i5e15zwv6iw8o",
  "cm6mjb3gk001j5e150eisi7ml",
  "cm6mjb3tr001k5e15ujokqx8y",
  "cm6mjb47z001l5e15t900q9ns",
  "cm6mjb4me001m5e15sdshwp7a",
  "cm6mjb4zm001n5e15q61wmczq",
  "cm6mjb5h1001o5e15i773a4ak",
  "cm6mjb5ta001p5e159egpgoeg",
  "cm6mjb67c001q5e15q7zh5p37",
  "cm6mjb6pm001r5e1587oao7oc",
  "cm6mjb726001s5e151y2uharj",
  "cm6mjb7i7001t5e15i5uwzbt0",
  "cm6mjb7xw001u5e15ey28lq2c",
  "cm6mjb8b6001v5e15sxiv8yj8",
  "cm6mjb8ow001w5e15lb5uq8qg",
  "cm6mjb92c001x5e151606cby0",
  "cm6mjb9ff001y5e15dzkpthbh",
  "cm6mjb9t5001z5e15o6t2wuj3"
];
  # Add all 100 doctor IDs here

department_ids = [
  "cm6cifdr80001wghquj6k27tt",
  "cm6mgg2m60001ljwbr7leaki5",
  "cm6mhwzmn000t4eovxeqwsjgf",
  "cm6mhwzue000v4eov8dl7ekiu",
  "cm6mhwzz1000x4eov1x1nw3s2",
  "cm6mhx03k000z4eov2fflhfin",
  "cm6mhx08600114eoviua7z2u7",
  "cm6mhx0cl00134eov6nz9zggr",
  "cm6mhx0hc00154eovtv56puwq",
  "cm6mhx0m200174eovsavtccqn",
  "cm6mhx0r000194eovnzz6givs",
  "cm6mhx0vm001b4eovi6qckcq9",
  "cm6mhx106001d4eov64we1rai",
  "cm6mhx14m001f4eovd37g76fi",
  "cm6mhx19d001h4eov0qak8tps",
  "cm6mhx1dx001j4eov34q53kfg",
  "cm6mi1e0j001l4eov74ys8ben",
  "cm6mi1e5n001n4eovdehddngp",
  "cm6mi1eah001p4eovk8a84bi7",
  "cm6mi1efg001r4eovylns6zcy",
  "cm6mi1ek7001t4eovvpgnqj7v",
  "cm6mi1epb001v4eovhbaf284g",
  "cm6mi1eu6001x4eovi4ro9pk3",
  "cm6mi1ez2001z4eovszummxf1",
  "cm6mi1f3s00214eov5quqpt72",
  "cm6mi1f8n00234eovtgl48o2p",
  "cm6mi1fda00254eov0beepaae",
  "cm6mi1fi500274eovh0ae754u",
  "cm6mi1fn000294eovt7ae82tr",
  "cm6mi1frr002b4eovy173oath",
  "cm6mi1fwk002d4eovby890tq6",
  "cm6mi3pjs002f4eovb8pn11eu"
];
 # Add all department IDs here

# Generate unique random combinations
combinations = []
for _ in range(150):
    doc_id = random.choice(doctor_ids)
    dept_id = random.choice(department_ids)
    pair = {"doctorId": doc_id, "deptId": dept_id}
    
    # Ensure the combination is unique
    if pair not in combinations:
        combinations.append(pair)

# Convert to JSON format
json_output = json.dumps(combinations, indent=4)

# Print or save the JSON output
print(json_output)
