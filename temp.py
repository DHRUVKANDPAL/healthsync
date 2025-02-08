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
    "cm6w1z6tb0015vo7i3xe4e2pn",
    "cm6w1z70t0017vo7iru2scgrb",
    "cm6w1z75a0019vo7isxg3tk26",
    "cm6w1z79c001bvo7ihp57tzoi",
    "cm6w1z7dl001dvo7ii4bpwl4j",
    "cm6w1z7ic001fvo7ili1f92d5",
    "cm6w1z7mn001hvo7idej61ard",
    "cm6w1z7qu001jvo7ixgp5nl51",
    "cm6w1z7uw001lvo7i00bu4qae",
    "cm6w1z7yv001nvo7iomiixnzf",
    "cm6w1z82z001pvo7ijxowb0ag",
    "cm6w1z87b001rvo7iedo3ek8h",
    "cm6w1z8mb001tvo7i1svjohrq",
    "cm6w1z8rd001vvo7i29j4xu6o",
    "cm6w1z8ws001xvo7iget9d0e6",
    "cm6w22u98002tvo7isg5rcis3",
    "cm6w22ue2002vvo7iq9j8brve",
    "cm6w22uiz002xvo7iosuthiz3",
    "cm6w22uns002zvo7iulsub604",
    "cm6w22uso0031vo7i5ybg81tl",
    "cm6w22ux50033vo7iau873zod",
    "cm6w22v1i0035vo7i659s8e21",
    "cm6w22v6d0037vo7i1eehifdo",
    "cm6w22vat0039vo7ig20o7oyh",
    "cm6w22vf2003bvo7idq4mdh1k",
    "cm6w22vja003dvo7in0h9ustu",
    "cm6w22vnx003fvo7i42m01w2u",
    "cm6w22vsd003hvo7ixy7b7144",
    "cm6w22vwu003jvo7ig31bmxqv",
    "cm6w22w11003lvo7i4ig2sqm8",
    "cm6w277gj003nvo7i0gscylbh",
    "cm6w277ky003pvo7i9e59x2ks",
    "cm6w277p4003rvo7i4ql59z61",
    "cm6w277ti003tvo7ia0f8z27w",
    "cm6w277xp003vvo7iz3hwp96o",
    "cm6w27820003xvo7ihla4n714",
    "cm6w27869003zvo7it54y02eb",
    "cm6w278ai0041vo7i2rs1f9zr",
    "cm6w278ep0043vo7i8801c8ey",
    "cm6w278j50045vo7ir42icb9p",
    "cm6w278nd0047vo7iubumut4j",
    "cm6w278rq0049vo7ipazcx074",
    "cm6w278w0004bvo7ipu199ktx",
    "cm6w2790k004dvo7izc19ticq",
    "cm6w2795b004fvo7ixcsph8te",
    "cm6w2acpv004hvo7iamh8zywz",
    "cm6w2acuk004jvo7i7abb79k3",
    "cm6w2ad56004lvo7ikkpu05x3",
    "cm6w2ad9g004nvo7iswsrf4qp",
    "cm6w2addt004pvo7i7xgodckj",
    "cm6w2adii004rvo7imvyiljn4",
    "cm6w2adml004tvo7iwpwmoz97",
    "cm6w2adqt004vvo7ipzlt6nkb",
    "cm6w2adv7004xvo7i1qg418se",
    "cm6w2adzt004zvo7ivx2z4t4k",
    "cm6w2ae3x0051vo7iyjyjm975",
    "cm6w2ae840053vo7ifxzu1vou",
    "cm6w2aec90055vo7i6w9kup6y",
    "cm6w2aegd0057vo7ieqvzqkur",
    "cm6w2aeky0059vo7ivvajpo18",
]

 # Add all department IDs here

# Generate unique random combinations
combinations = []
for _ in range(300):
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


