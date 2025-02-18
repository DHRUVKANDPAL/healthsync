"use client";
import BeatLoader from "@/components/BeatLoader";
import { Button } from "@/components/ui/button";
import { triage } from "@/lib/gemini";
// import { MedicalTriage, triage } from "@/lib/gemini";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { doctorsignupDummy } from "../(main)/doctor-auth/authdoc.action";
import { useLatLong } from "@/hooks/useLatLong";
import { useLocation } from "@/hooks/useLocation";

type Props = {};
const da = [
  
  {
    doctorId: "cm6mjb3tr001k5e15ujokqx8y",
    deptId: "cm6mi1epb001v4eovhbaf284g",
  },
  {
    doctorId: "cm6mjaofg000h5e15ajfbsntz",
    deptId: "cm6mi1efg001r4eovylns6zcy",
  },
  {
    doctorId: "cm6cn9who0001anyuqns00gwj",
    deptId: "cm6mhx0hc00154eovtv56puwq",
  },
  {
    doctorId: "cm6mjamyw000d5e15l6n4lu42",
    deptId: "cm6mhx0vm001b4eovi6qckcq9",
  },
  {
    doctorId: "cm6mjamyw000d5e15l6n4lu42",
    deptId: "cm6mi1efg001r4eovylns6zcy",
  },
  {
    doctorId: "cm6cn9who0001anyuqns00gwj",
    deptId: "cm6cifdr80001wghquj6k27tt",
  },
  {
    doctorId: "cm6mjb33p001i5e15zwv6iw8o",
    deptId: "cm6mi1fda00254eov0beepaae",
  },
  {
    doctorId: "cm6mjb8ow001w5e15lb5uq8qg",
    deptId: "cm6mi1ez2001z4eovszummxf1",
  },
  {
    doctorId: "cm6mjarue000p5e15l7qfcb6d",
    deptId: "cm6mhx03k000z4eov2fflhfin",
  },
  {
    doctorId: "cm6mjau3u000v5e15e0apbqa0",
    deptId: "cm6mi1fda00254eov0beepaae",
  },
  {
    doctorId: "cm6mjawv900125e15w0fp9k2t",
    deptId: "cm6mi1fn000294eovt7ae82tr",
  },
  {
    doctorId: "cm6mjb7i7001t5e15i5uwzbt0",
    deptId: "cm6mi1epb001v4eovhbaf284g",
  },
  {
    doctorId: "cm6mj7dh100065e152e0mlcym",
    deptId: "cm6mhx14m001f4eovd37g76fi",
  },
  {
    doctorId: "cm6mjasm3000r5e158uxy1not",
    deptId: "cm6mi1fn000294eovt7ae82tr",
  },
  {
    doctorId: "cm6mjb2cv001g5e153ubaw0pz",
    deptId: "cm6mhx0hc00154eovtv56puwq",
  },
  {
    doctorId: "cm6mjar2p000n5e1502775qrv",
    deptId: "cm6mhx106001d4eov64we1rai",
  },
  {
    doctorId: "cm6mi4nhs0000147l9cjzq9ca",
    deptId: "cm6mhx0vm001b4eovi6qckcq9",
  },
  {
    doctorId: "cm6mjasz5000s5e155og2wsli",
    deptId: "cm6mhx0cl00134eov6nz9zggr",
  },
  {
    doctorId: "cm6cn7akm0000anyuojctx404",
    deptId: "cm6mi1fwk002d4eovby890tq6",
  },
  {
    doctorId: "cm6mjaox4000i5e15eql1jufv",
    deptId: "cm6mhx19d001h4eov0qak8tps",
  },
  {
    doctorId: "cm6mjal1d00085e1532fwcxw0",
    deptId: "cm6mi1f3s00214eov5quqpt72",
  },
  {
    doctorId: "cm6mjb7xw001u5e15ey28lq2c",
    deptId: "cm6mi1e5n001n4eovdehddngp",
  },
  {
    doctorId: "cm6mjaqov000m5e15q6191frb",
    deptId: "cm6mhx03k000z4eov2fflhfin",
  },
  {
    doctorId: "cm6mjb2qa001h5e15hdxr3xxd",
    deptId: "cm6mi1fwk002d4eovby890tq6",
  },
  {
    doctorId: "cm6mjay1x00155e15zepewioc",
    deptId: "cm6mhx1dx001j4eov34q53kfg",
  },
  {
    doctorId: "cm6mjb0sb001c5e150jlvfi89",
    deptId: "cm6mgg2m60001ljwbr7leaki5",
  },
  {
    doctorId: "cm6mjauww000x5e156a94r0gl",
    deptId: "cm6mhx0cl00134eov6nz9zggr",
  },
  {
    doctorId: "cm6mjb7xw001u5e15ey28lq2c",
    deptId: "cm6mhx0vm001b4eovi6qckcq9",
  },
  {
    doctorId: "cm6mjb8ow001w5e15lb5uq8qg",
    deptId: "cm6mhx19d001h4eov0qak8tps",
  },
  {
    doctorId: "cm6mjb0sb001c5e150jlvfi89",
    deptId: "cm6mhx106001d4eov64we1rai",
  },
  {
    doctorId: "cm6mjb3tr001k5e15ujokqx8y",
    deptId: "cm6mhx14m001f4eovd37g76fi",
  },
  {
    doctorId: "cm6mjaujn000w5e15bfvqg4fq",
    deptId: "cm6mi1efg001r4eovylns6zcy",
  },
  {
    doctorId: "cm6mjb5h1001o5e15i773a4ak",
    deptId: "cm6mhx1dx001j4eov34q53kfg",
  },
  {
    doctorId: "cm6mjanol000f5e15uhskwmyb",
    deptId: "cm6mhx0vm001b4eovi6qckcq9",
  },
  {
    doctorId: "cm6mjb4zm001n5e15q61wmczq",
    deptId: "cm6mi1ez2001z4eovszummxf1",
  },
  {
    doctorId: "cm6cn9who0001anyuqns00gwj",
    deptId: "cm6mgg2m60001ljwbr7leaki5",
  },
  {
    doctorId: "cm6mjb4me001m5e15sdshwp7a",
    deptId: "cm6mi1fwk002d4eovby890tq6",
  },
  {
    doctorId: "cm6mjaujn000w5e15bfvqg4fq",
    deptId: "cm6mhx14m001f4eovd37g76fi",
  },
  {
    doctorId: "cm6mjalsh000a5e153g553dqd",
    deptId: "cm6mhx08600114eoviua7z2u7",
  },
  {
    doctorId: "cm6mjapu8000k5e15h3w1ngeo",
    deptId: "cm6mgg2m60001ljwbr7leaki5",
  },
  {
    doctorId: "cm6mjb47z001l5e15t900q9ns",
    deptId: "cm6cifdr80001wghquj6k27tt",
  },
  {
    doctorId: "cm6mjb1yx001f5e15n8bka0pz",
    deptId: "cm6mhx0vm001b4eovi6qckcq9",
  },
  {
    doctorId: "cm6mjayf700165e15b1gbs0ch",
    deptId: "cm6mi1fn000294eovt7ae82tr",
  },
  {
    doctorId: "cm6mjau3u000v5e15e0apbqa0",
    deptId: "cm6mi1e0j001l4eov74ys8ben",
  },
  {
    doctorId: "cm6mjb16b001d5e153ei93i03",
    deptId: "cm6mhx0m200174eovsavtccqn",
  },
  {
    doctorId: "cm6mjalf900095e15z0ykmxje",
    deptId: "cm6mi1f3s00214eov5quqpt72",
  },
  {
    doctorId: "cm6mjapu8000k5e15h3w1ngeo",
    deptId: "cm6mi1f3s00214eov5quqpt72",
  },
  {
    doctorId: "cm6mjargk000o5e15elyg2y6i",
    deptId: "cm6mi1e0j001l4eov74ys8ben",
  },
  {
    doctorId: "cm6mjaxac00135e15fcte1lih",
    deptId: "cm6mi1eah001p4eovk8a84bi7",
  },
  {
    doctorId: "cm6mjanol000f5e15uhskwmyb",
    deptId: "cm6mhx03k000z4eov2fflhfin",
  },
  {
    doctorId: "cm6mjb7i7001t5e15i5uwzbt0",
    deptId: "cm6mi1f8n00234eovtgl48o2p",
  },
  {
    doctorId: "cm6mjb2cv001g5e153ubaw0pz",
    deptId: "cm6mhx1dx001j4eov34q53kfg",
  },
  {
    doctorId: "cm6mjay1x00155e15zepewioc",
    deptId: "cm6mhx03k000z4eov2fflhfin",
  },
  {
    doctorId: "cm6mjanol000f5e15uhskwmyb",
    deptId: "cm6mhx0m200174eovsavtccqn",
  },
  {
    doctorId: "cm6mjau3u000v5e15e0apbqa0",
    deptId: "cm6mi1f8n00234eovtgl48o2p",
  },
  {
    doctorId: "cm6mjar2p000n5e1502775qrv",
    deptId: "cm6mhx0cl00134eov6nz9zggr",
  },
  {
    doctorId: "cm6mi4nhs0000147l9cjzq9ca",
    deptId: "cm6mhx106001d4eov64we1rai",
  },
  {
    doctorId: "cm6mjamjj000c5e15v8njqaaa",
    deptId: "cm6mhx03k000z4eov2fflhfin",
  },
  {
    doctorId: "cm6mjaxok00145e15t81xvcci",
    deptId: "cm6mhwzmn000t4eovxeqwsjgf",
  },
  {
    doctorId: "cm6mjb33p001i5e15zwv6iw8o",
    deptId: "cm6mi1ez2001z4eovszummxf1",
  },
  {
    doctorId: "cm6mjb5ta001p5e159egpgoeg",
    deptId: "cm6mi1epb001v4eovhbaf284g",
  },
  {
    doctorId: "cm6mjb3tr001k5e15ujokqx8y",
    deptId: "cm6cifdr80001wghquj6k27tt",
  },
  {
    doctorId: "cm6mjb1jz001e5e150yjr1209",
    deptId: "cm6mi1frr002b4eovy173oath",
  },
  {
    doctorId: "cm6mjasm3000r5e158uxy1not",
    deptId: "cm6mi1e0j001l4eov74ys8ben",
  },
  {
    doctorId: "cm6mjaox4000i5e15eql1jufv",
    deptId: "cm6mi1fi500274eovh0ae754u",
  },
  {
    doctorId: "cm6mjatcd000t5e15rb498ply",
    deptId: "cm6mi1eu6001x4eovi4ro9pk3",
  },
  {
    doctorId: "cm6mjalsh000a5e153g553dqd",
    deptId: "cm6mhx0m200174eovsavtccqn",
  },
  {
    doctorId: "cm6mjapu8000k5e15h3w1ngeo",
    deptId: "cm6mhx0r000194eovnzz6givs",
  },
  {
    doctorId: "cm6mjal1d00085e1532fwcxw0",
    deptId: "cm6mhwzmn000t4eovxeqwsjgf",
  },
  {
    doctorId: "cm6mjb9t5001z5e15o6t2wuj3",
    deptId: "cm6mhx0vm001b4eovi6qckcq9",
  },
  {
    doctorId: "cm6mjar2p000n5e1502775qrv",
    deptId: "cm6mi1ez2001z4eovszummxf1",
  },
  {
    doctorId: "cm6mjazmy00195e15qdi4preh",
    deptId: "cm6mi1ez2001z4eovszummxf1",
  },
  {
    doctorId: "cm6mjb9t5001z5e15o6t2wuj3",
    deptId: "cm6mhwzmn000t4eovxeqwsjgf",
  },
  {
    doctorId: "cm6mjamjj000c5e15v8njqaaa",
    deptId: "cm6mi1e5n001n4eovdehddngp",
  },
  {
    doctorId: "cm6mjaqb6000l5e159bar47x7",
    deptId: "cm6mhx14m001f4eovd37g76fi",
  },
  {
    doctorId: "cm6mjarue000p5e15l7qfcb6d",
    deptId: "cm6mi1eu6001x4eovi4ro9pk3",
  },
  {
    doctorId: "cm6cn7akm0000anyuojctx404",
    deptId: "cm6mhx1dx001j4eov34q53kfg",
  },
  {
    doctorId: "cm6mjaofg000h5e15ajfbsntz",
    deptId: "cm6mhx106001d4eov64we1rai",
  },
  {
    doctorId: "cm6mjb3gk001j5e150eisi7ml",
    deptId: "cm6mhx08600114eoviua7z2u7",
  },
  {
    doctorId: "cm6mjatq9000u5e159rc69fht",
    deptId: "cm6mhx0m200174eovsavtccqn",
  },
  {
    doctorId: "cm6mjauww000x5e156a94r0gl",
    deptId: "cm6mhwzz1000x4eov1x1nw3s2",
  },
  {
    doctorId: "cm6mjb4me001m5e15sdshwp7a",
    deptId: "cm6mi1efg001r4eovylns6zcy",
  },
  {
    doctorId: "cm6mjaxok00145e15t81xvcci",
    deptId: "cm6mi1eu6001x4eovi4ro9pk3",
  },
  {
    doctorId: "cm6mjb33p001i5e15zwv6iw8o",
    deptId: "cm6mi1fwk002d4eovby890tq6",
  },
  {
    doctorId: "cm6mjape8000j5e15xeyrqlq1",
    deptId: "cm6mgg2m60001ljwbr7leaki5",
  },
  {
    doctorId: "cm6mjb2qa001h5e15hdxr3xxd",
    deptId: "cm6mi1ek7001t4eovvpgnqj7v",
  },
  {
    doctorId: "cm6mjavan000y5e15r7bv74cb",
    deptId: "cm6mhx0r000194eovnzz6givs",
  },
  {
    doctorId: "cm6mjb0fo001b5e15hmrgodj8",
    deptId: "cm6mhwzmn000t4eovxeqwsjgf",
  },
  {
    doctorId: "cm6mjb9ff001y5e15dzkpthbh",
    deptId: "cm6mhwzz1000x4eov1x1nw3s2",
  },
  {
    doctorId: "cm6mjanol000f5e15uhskwmyb",
    deptId: "cm6mi1fi500274eovh0ae754u",
  },
  {
    doctorId: "cm6mjasz5000s5e155og2wsli",
    deptId: "cm6mhwzue000v4eov8dl7ekiu",
  },
  {
    doctorId: "cm6mjarue000p5e15l7qfcb6d",
    deptId: "cm6mi1ez2001z4eovszummxf1",
  },
  {
    doctorId: "cm6mjaz7r00185e152u6gm2jq",
    deptId: "cm6cifdr80001wghquj6k27tt",
  },
  {
    doctorId: "cm6mjawv900125e15w0fp9k2t",
    deptId: "cm6mi3pjs002f4eovb8pn11eu",
  },
  {
    doctorId: "cm6mjas85000q5e155f5pswxo",
    deptId: "cm6mi1f8n00234eovtgl48o2p",
  },
  {
    doctorId: "cm6mjasz5000s5e155og2wsli",
    deptId: "cm6mi1epb001v4eovhbaf284g",
  },
  {
    doctorId: "cm6mjaofg000h5e15ajfbsntz",
    deptId: "cm6mhx0hc00154eovtv56puwq",
  },
  {
    doctorId: "cm6mjanb6000e5e157di6n0pw",
    deptId: "cm6mhwzue000v4eov8dl7ekiu",
  },
  {
    doctorId: "cm6mjamjj000c5e15v8njqaaa",
    deptId: "cm6mgg2m60001ljwbr7leaki5",
  },
  {
    doctorId: "cm6mjb92c001x5e151606cby0",
    deptId: "cm6mi1fn000294eovt7ae82tr",
  },
  {
    doctorId: "cm6mjavoo000z5e15dkacsrze",
    deptId: "cm6mi1ez2001z4eovszummxf1",
  },
  {
    doctorId: "cm6mjb3gk001j5e150eisi7ml",
    deptId: "cm6mi1efg001r4eovylns6zcy",
  },
  {
    doctorId: "cm6cn9who0001anyuqns00gwj",
    deptId: "cm6mi1eu6001x4eovi4ro9pk3",
  },
  {
    doctorId: "cm6mjamyw000d5e15l6n4lu42",
    deptId: "cm6mhwzz1000x4eov1x1nw3s2",
  },
  {
    doctorId: "cm6mjb16b001d5e153ei93i03",
    deptId: "cm6mhx1dx001j4eov34q53kfg",
  },
  {
    doctorId: "cm6mjaw1r00105e15ppzewjz9",
    deptId: "cm6mhx0hc00154eovtv56puwq",
  },
  {
    doctorId: "cm6mjal1d00085e1532fwcxw0",
    deptId: "cm6mgg2m60001ljwbr7leaki5",
  },
  {
    doctorId: "cm6mjb9ff001y5e15dzkpthbh",
    deptId: "cm6cifdr80001wghquj6k27tt",
  },
  {
    doctorId: "cm6mjaqov000m5e15q6191frb",
    deptId: "cm6mhwzmn000t4eovxeqwsjgf",
  },
  {
    doctorId: "cm6mjamyw000d5e15l6n4lu42",
    deptId: "cm6mhx0m200174eovsavtccqn",
  },
  {
    doctorId: "cm6mjavan000y5e15r7bv74cb",
    deptId: "cm6mi1epb001v4eovhbaf284g",
  },
  {
    doctorId: "cm6mjal1d00085e1532fwcxw0",
    deptId: "cm6mhwzue000v4eov8dl7ekiu",
  },
  {
    doctorId: "cm6mjb1yx001f5e15n8bka0pz",
    deptId: "cm6mgg2m60001ljwbr7leaki5",
  },
  {
    doctorId: "cm6cn9who0001anyuqns00gwj",
    deptId: "cm6mi1ek7001t4eovvpgnqj7v",
  },
  {
    doctorId: "cm6mjazzw001a5e15270f21z4",
    deptId: "cm6mhx03k000z4eov2fflhfin",
  },
  {
    doctorId: "cm6mjaqov000m5e15q6191frb",
    deptId: "cm6cifdr80001wghquj6k27tt",
  },
  {
    doctorId: "cm6mjb33p001i5e15zwv6iw8o",
    deptId: "cm6mhx19d001h4eov0qak8tps",
  },
  {
    doctorId: "cm6mjaxok00145e15t81xvcci",
    deptId: "cm6mi1f8n00234eovtgl48o2p",
  },
  {
    doctorId: "cm6mjaxac00135e15fcte1lih",
    deptId: "cm6mi1eu6001x4eovi4ro9pk3",
  },
  {
    doctorId: "cm6mjb67c001q5e15q7zh5p37",
    deptId: "cm6mi1eah001p4eovk8a84bi7",
  },
  {
    doctorId: "cm6mjape8000j5e15xeyrqlq1",
    deptId: "cm6mhwzue000v4eov8dl7ekiu",
  },
  {
    doctorId: "cm6mjb1yx001f5e15n8bka0pz",
    deptId: "cm6mhx0hc00154eovtv56puwq",
  },
  {
    doctorId: "cm6mjape8000j5e15xeyrqlq1",
    deptId: "cm6mhx0r000194eovnzz6givs",
  },
  {
    doctorId: "cm6mjaqov000m5e15q6191frb",
    deptId: "cm6mi1fn000294eovt7ae82tr",
  },
  {
    doctorId: "cm6mjazmy00195e15qdi4preh",
    deptId: "cm6mhwzue000v4eov8dl7ekiu",
  },
  {
    doctorId: "cm6mjam5y000b5e15b95y3bgg",
    deptId: "cm6mi3pjs002f4eovb8pn11eu",
  },
  {
    doctorId: "cm6mjatcd000t5e15rb498ply",
    deptId: "cm6mi1fi500274eovh0ae754u",
  },
  {
    doctorId: "cm6mjauww000x5e156a94r0gl",
    deptId: "cm6mi1fda00254eov0beepaae",
  },
  {
    doctorId: "cm6mjawv900125e15w0fp9k2t",
    deptId: "cm6mhx0vm001b4eovi6qckcq9",
  },
  {
    doctorId: "cm6mjb67c001q5e15q7zh5p37",
    deptId: "cm6mi1ez2001z4eovszummxf1",
  },
  {
    doctorId: "cm6mi9rjv0001147lhoxf7scx",
    deptId: "cm6mhx19d001h4eov0qak8tps",
  },
  {
    doctorId: "cm6mjasm3000r5e158uxy1not",
    deptId: "cm6mgg2m60001ljwbr7leaki5",
  },
  {
    doctorId: "cm6mj7dh100065e152e0mlcym",
    deptId: "cm6mi1f8n00234eovtgl48o2p",
  },
  {
    doctorId: "cm6mjb67c001q5e15q7zh5p37",
    deptId: "cm6mhx08600114eoviua7z2u7",
  },
  {
    doctorId: "cm6mjb5ta001p5e159egpgoeg",
    deptId: "cm6mhx0cl00134eov6nz9zggr",
  },
  {
    doctorId: "cm6mjavoo000z5e15dkacsrze",
    deptId: "cm6mi1efg001r4eovylns6zcy",
  },
  {
    doctorId: "cm6mjb8ow001w5e15lb5uq8qg",
    deptId: "cm6mi1fda00254eov0beepaae",
  },
  {
    doctorId: "cm6mjanb6000e5e157di6n0pw",
    deptId: "cm6mi1ek7001t4eovvpgnqj7v",
  },
  {
    doctorId: "cm6mjaz7r00185e152u6gm2jq",
    deptId: "cm6mi3pjs002f4eovb8pn11eu",
  },
  {
    doctorId: "cm6mjamyw000d5e15l6n4lu42",
    deptId: "cm6mhx1dx001j4eov34q53kfg",
  },
  {
    doctorId: "cm6mjb92c001x5e151606cby0",
    deptId: "cm6mi3pjs002f4eovb8pn11eu",
  },
  {
    doctorId: "cm6mjb5h1001o5e15i773a4ak",
    deptId: "cm6mi1f8n00234eovtgl48o2p",
  },
  {
    doctorId: "cm6mjb3gk001j5e150eisi7ml",
    deptId: "cm6mhx0hc00154eovtv56puwq",
  },
  {
    doctorId: "cm6mjaqov000m5e15q6191frb",
    deptId: "cm6mhx0m200174eovsavtccqn",
  },
];


const data = [
    {
        "doctorId": "cm6mjawhp00115e15wozm0y1o",
        "deptId": "cm6w278ep0043vo7i8801c8ey"
    },
    {
        "doctorId": "cm6mjargk000o5e15elyg2y6i",
        "deptId": "cm6w22u98002tvo7isg5rcis3"
    },
    {
        "doctorId": "cm6mjaw1r00105e15ppzewjz9",
        "deptId": "cm6w22v6d0037vo7i1eehifdo"
    },
    {
        "doctorId": "cm6mi9rjv0001147lhoxf7scx",
        "deptId": "cm6w22vwu003jvo7ig31bmxqv"
    },
    {
        "doctorId": "cm6mjb2cv001g5e153ubaw0pz",
        "deptId": "cm6w22vat0039vo7ig20o7oyh"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w1z6tb0015vo7i3xe4e2pn"
    },
    {
        "doctorId": "cm6mjao26000g5e15c8shzd0c",
        "deptId": "cm6w22vat0039vo7ig20o7oyh"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w278rq0049vo7ipazcx074"
    },
    {
        "doctorId": "cm6mjayti00175e15kvsqb5at",
        "deptId": "cm6w278ep0043vo7i8801c8ey"
    },
    {
        "doctorId": "cm6mjb33p001i5e15zwv6iw8o",
        "deptId": "cm6w1z8rd001vvo7i29j4xu6o"
    },
    {
        "doctorId": "cm6mjb2cv001g5e153ubaw0pz",
        "deptId": "cm6w1z70t0017vo7iru2scgrb"
    },
    {
        "doctorId": "cm6mjavan000y5e15r7bv74cb",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6mjamyw000d5e15l6n4lu42",
        "deptId": "cm6w1z75a0019vo7isxg3tk26"
    },
    {
        "doctorId": "cm6mjaxok00145e15t81xvcci",
        "deptId": "cm6w1z7uw001lvo7i00bu4qae"
    },
    {
        "doctorId": "cm6mjaz7r00185e152u6gm2jq",
        "deptId": "cm6w1z79c001bvo7ihp57tzoi"
    },
    {
        "doctorId": "cm6mjamjj000c5e15v8njqaaa",
        "deptId": "cm6w277xp003vvo7iz3hwp96o"
    },
    {
        "doctorId": "cm6mjanol000f5e15uhskwmyb",
        "deptId": "cm6w277xp003vvo7iz3hwp96o"
    },
    {
        "doctorId": "cm6mjau3u000v5e15e0apbqa0",
        "deptId": "cm6w22ux50033vo7iau873zod"
    },
    {
        "doctorId": "cm6mjb726001s5e151y2uharj",
        "deptId": "cm6w278nd0047vo7iubumut4j"
    },
    {
        "doctorId": "cm6mjas85000q5e155f5pswxo",
        "deptId": "cm6w22vnx003fvo7i42m01w2u"
    },
    {
        "doctorId": "cm6mjaz7r00185e152u6gm2jq",
        "deptId": "cm6w1z75a0019vo7isxg3tk26"
    },
    {
        "doctorId": "cm6mjamyw000d5e15l6n4lu42",
        "deptId": "cm6w2790k004dvo7izc19ticq"
    },
    {
        "doctorId": "cm6mjb6pm001r5e1587oao7oc",
        "deptId": "cm6w277ti003tvo7ia0f8z27w"
    },
    {
        "doctorId": "cm6mjape8000j5e15xeyrqlq1",
        "deptId": "cm6w2ad9g004nvo7iswsrf4qp"
    },
    {
        "doctorId": "cm6mjb3tr001k5e15ujokqx8y",
        "deptId": "cm6w22uns002zvo7iulsub604"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w1z7ic001fvo7ili1f92d5"
    },
    {
        "doctorId": "cm6mjatq9000u5e159rc69fht",
        "deptId": "cm6w278rq0049vo7ipazcx074"
    },
    {
        "doctorId": "cm6mjaujn000w5e15bfvqg4fq",
        "deptId": "cm6w2addt004pvo7i7xgodckj"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w27869003zvo7it54y02eb"
    },
    {
        "doctorId": "cm6mjayti00175e15kvsqb5at",
        "deptId": "cm6w22v1i0035vo7i659s8e21"
    },
    {
        "doctorId": "cm6mjayti00175e15kvsqb5at",
        "deptId": "cm6w2ad9g004nvo7iswsrf4qp"
    },
    {
        "doctorId": "cm6mjau3u000v5e15e0apbqa0",
        "deptId": "cm6w1z87b001rvo7iedo3ek8h"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w22w11003lvo7i4ig2sqm8"
    },
    {
        "doctorId": "cm6mjas85000q5e155f5pswxo",
        "deptId": "cm6w1z7yv001nvo7iomiixnzf"
    },
    {
        "doctorId": "cm6mjanb6000e5e157di6n0pw",
        "deptId": "cm6w1z7qu001jvo7ixgp5nl51"
    },
    {
        "doctorId": "cm6mjau3u000v5e15e0apbqa0",
        "deptId": "cm6w2acuk004jvo7i7abb79k3"
    },
    {
        "doctorId": "cm6mjasz5000s5e155og2wsli",
        "deptId": "cm6w22uiz002xvo7iosuthiz3"
    },
    {
        "doctorId": "cm6mjb2cv001g5e153ubaw0pz",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6mjayf700165e15b1gbs0ch",
        "deptId": "cm6w22ux50033vo7iau873zod"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w2aeky0059vo7ivvajpo18"
    },
    {
        "doctorId": "cm6mjb9t5001z5e15o6t2wuj3",
        "deptId": "cm6w1z7yv001nvo7iomiixnzf"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w2adii004rvo7imvyiljn4"
    },
    {
        "doctorId": "cm6mjasm3000r5e158uxy1not",
        "deptId": "cm6w2aegd0057vo7ieqvzqkur"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w1z70t0017vo7iru2scgrb"
    },
    {
        "doctorId": "cm6mjakn200075e15yvz2dnnl",
        "deptId": "cm6w22ue2002vvo7iq9j8brve"
    },
    {
        "doctorId": "cm6mjb33p001i5e15zwv6iw8o",
        "deptId": "cm6w1z82z001pvo7ijxowb0ag"
    },
    {
        "doctorId": "cm6mjaxok00145e15t81xvcci",
        "deptId": "cm6w2aeky0059vo7ivvajpo18"
    },
    {
        "doctorId": "cm6mjasm3000r5e158uxy1not",
        "deptId": "cm6w1z7uw001lvo7i00bu4qae"
    },
    {
        "doctorId": "cm6mjatcd000t5e15rb498ply",
        "deptId": "cm6w1z6tb0015vo7i3xe4e2pn"
    },
    {
        "doctorId": "cm6mi9rjv0001147lhoxf7scx",
        "deptId": "cm6w277gj003nvo7i0gscylbh"
    },
    {
        "doctorId": "cm6mjb7xw001u5e15ey28lq2c",
        "deptId": "cm6w22u98002tvo7isg5rcis3"
    },
    {
        "doctorId": "cm6mjb2cv001g5e153ubaw0pz",
        "deptId": "cm6w2795b004fvo7ixcsph8te"
    },
    {
        "doctorId": "cm6mjapu8000k5e15h3w1ngeo",
        "deptId": "cm6w22vsd003hvo7ixy7b7144"
    },
    {
        "doctorId": "cm6mjb6pm001r5e1587oao7oc",
        "deptId": "cm6w2adzt004zvo7ivx2z4t4k"
    },
    {
        "doctorId": "cm6mjar2p000n5e1502775qrv",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6mjar2p000n5e1502775qrv",
        "deptId": "cm6w22uso0031vo7i5ybg81tl"
    },
    {
        "doctorId": "cm6mi9rjv0001147lhoxf7scx",
        "deptId": "cm6w1z82z001pvo7ijxowb0ag"
    },
    {
        "doctorId": "cm6mjasm3000r5e158uxy1not",
        "deptId": "cm6w278j50045vo7ir42icb9p"
    },
    {
        "doctorId": "cm6mjaofg000h5e15ajfbsntz",
        "deptId": "cm6w22v1i0035vo7i659s8e21"
    },
    {
        "doctorId": "cm6mjasm3000r5e158uxy1not",
        "deptId": "cm6w22vsd003hvo7ixy7b7144"
    },
    {
        "doctorId": "cm6mjakn200075e15yvz2dnnl",
        "deptId": "cm6w2aec90055vo7i6w9kup6y"
    },
    {
        "doctorId": "cm6mjb0fo001b5e15hmrgodj8",
        "deptId": "cm6w2acuk004jvo7i7abb79k3"
    },
    {
        "doctorId": "cm6mjalf900095e15z0ykmxje",
        "deptId": "cm6w2adv7004xvo7i1qg418se"
    },
    {
        "doctorId": "cm6mjb8b6001v5e15sxiv8yj8",
        "deptId": "cm6w1z70t0017vo7iru2scgrb"
    },
    {
        "doctorId": "cm6mjalsh000a5e153g553dqd",
        "deptId": "cm6w2ae840053vo7ifxzu1vou"
    },
    {
        "doctorId": "cm6mjape8000j5e15xeyrqlq1",
        "deptId": "cm6w22uiz002xvo7iosuthiz3"
    },
    {
        "doctorId": "cm6mjb7i7001t5e15i5uwzbt0",
        "deptId": "cm6w2ad56004lvo7ikkpu05x3"
    },
    {
        "doctorId": "cm6mjazmy00195e15qdi4preh",
        "deptId": "cm6w277xp003vvo7iz3hwp96o"
    },
    {
        "doctorId": "cm6mjaqov000m5e15q6191frb",
        "deptId": "cm6w22vja003dvo7in0h9ustu"
    },
    {
        "doctorId": "cm6mjb7xw001u5e15ey28lq2c",
        "deptId": "cm6w2ae840053vo7ifxzu1vou"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6mjaw1r00105e15ppzewjz9",
        "deptId": "cm6w1z8rd001vvo7i29j4xu6o"
    },
    {
        "doctorId": "cm6cn9who0001anyuqns00gwj",
        "deptId": "cm6w278j50045vo7ir42icb9p"
    },
    {
        "doctorId": "cm6mjam5y000b5e15b95y3bgg",
        "deptId": "cm6w2ae3x0051vo7iyjyjm975"
    },
    {
        "doctorId": "cm6mjb16b001d5e153ei93i03",
        "deptId": "cm6w22v6d0037vo7i1eehifdo"
    },
    {
        "doctorId": "cm6mjar2p000n5e1502775qrv",
        "deptId": "cm6w1z7ic001fvo7ili1f92d5"
    },
    {
        "doctorId": "cm6mjb8ow001w5e15lb5uq8qg",
        "deptId": "cm6w2aeky0059vo7ivvajpo18"
    },
    {
        "doctorId": "cm6mjb1yx001f5e15n8bka0pz",
        "deptId": "cm6w2aec90055vo7i6w9kup6y"
    },
    {
        "doctorId": "cm6mjakn200075e15yvz2dnnl",
        "deptId": "cm6w1z70t0017vo7iru2scgrb"
    },
    {
        "doctorId": "cm6mjb67c001q5e15q7zh5p37",
        "deptId": "cm6w27820003xvo7ihla4n714"
    },
    {
        "doctorId": "cm6mjalsh000a5e153g553dqd",
        "deptId": "cm6w277gj003nvo7i0gscylbh"
    },
    {
        "doctorId": "cm6mjaqov000m5e15q6191frb",
        "deptId": "cm6w278ai0041vo7i2rs1f9zr"
    },
    {
        "doctorId": "cm6mjazmy00195e15qdi4preh",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6mjalsh000a5e153g553dqd",
        "deptId": "cm6w2acuk004jvo7i7abb79k3"
    },
    {
        "doctorId": "cm6mjargk000o5e15elyg2y6i",
        "deptId": "cm6w2adzt004zvo7ivx2z4t4k"
    },
    {
        "doctorId": "cm6mjargk000o5e15elyg2y6i",
        "deptId": "cm6w2ad56004lvo7ikkpu05x3"
    },
    {
        "doctorId": "cm6mjawhp00115e15wozm0y1o",
        "deptId": "cm6w22vja003dvo7in0h9ustu"
    },
    {
        "doctorId": "cm6mjazzw001a5e15270f21z4",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6mjatcd000t5e15rb498ply",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6mjaw1r00105e15ppzewjz9",
        "deptId": "cm6w1z75a0019vo7isxg3tk26"
    },
    {
        "doctorId": "cm6mjaxac00135e15fcte1lih",
        "deptId": "cm6w1z8mb001tvo7i1svjohrq"
    },
    {
        "doctorId": "cm6mjb1jz001e5e150yjr1209",
        "deptId": "cm6w2790k004dvo7izc19ticq"
    },
    {
        "doctorId": "cm6mjb4zm001n5e15q61wmczq",
        "deptId": "cm6w2790k004dvo7izc19ticq"
    },
    {
        "doctorId": "cm6mjakn200075e15yvz2dnnl",
        "deptId": "cm6w1z7qu001jvo7ixgp5nl51"
    },
    {
        "doctorId": "cm6mjaox4000i5e15eql1jufv",
        "deptId": "cm6w22vf2003bvo7idq4mdh1k"
    },
    {
        "doctorId": "cm6mjavoo000z5e15dkacsrze",
        "deptId": "cm6w22v1i0035vo7i659s8e21"
    },
    {
        "doctorId": "cm6mjb0fo001b5e15hmrgodj8",
        "deptId": "cm6w2adv7004xvo7i1qg418se"
    },
    {
        "doctorId": "cm6mjanol000f5e15uhskwmyb",
        "deptId": "cm6w2aeky0059vo7ivvajpo18"
    },
    {
        "doctorId": "cm6mjb47z001l5e15t900q9ns",
        "deptId": "cm6w2aegd0057vo7ieqvzqkur"
    },
    {
        "doctorId": "cm6mjayti00175e15kvsqb5at",
        "deptId": "cm6w22vwu003jvo7ig31bmxqv"
    },
    {
        "doctorId": "cm6mjb7i7001t5e15i5uwzbt0",
        "deptId": "cm6w2ae3x0051vo7iyjyjm975"
    },
    {
        "doctorId": "cm6mjatq9000u5e159rc69fht",
        "deptId": "cm6w1z7uw001lvo7i00bu4qae"
    },
    {
        "doctorId": "cm6mjaxac00135e15fcte1lih",
        "deptId": "cm6w22uso0031vo7i5ybg81tl"
    },
    {
        "doctorId": "cm6mjayf700165e15b1gbs0ch",
        "deptId": "cm6w278ep0043vo7i8801c8ey"
    },
    {
        "doctorId": "cm6mjb7i7001t5e15i5uwzbt0",
        "deptId": "cm6w22v6d0037vo7i1eehifdo"
    },
    {
        "doctorId": "cm6mjay1x00155e15zepewioc",
        "deptId": "cm6w22uso0031vo7i5ybg81tl"
    },
    {
        "doctorId": "cm6mjaujn000w5e15bfvqg4fq",
        "deptId": "cm6w278j50045vo7ir42icb9p"
    },
    {
        "doctorId": "cm6mjazmy00195e15qdi4preh",
        "deptId": "cm6w2adzt004zvo7ivx2z4t4k"
    },
    {
        "doctorId": "cm6mjasz5000s5e155og2wsli",
        "deptId": "cm6w2ae840053vo7ifxzu1vou"
    },
    {
        "doctorId": "cm6mjb67c001q5e15q7zh5p37",
        "deptId": "cm6w278nd0047vo7iubumut4j"
    },
    {
        "doctorId": "cm6mjb9t5001z5e15o6t2wuj3",
        "deptId": "cm6w277gj003nvo7i0gscylbh"
    },
    {
        "doctorId": "cm6mjao26000g5e15c8shzd0c",
        "deptId": "cm6w22v6d0037vo7i1eehifdo"
    },
    {
        "doctorId": "cm6mjawhp00115e15wozm0y1o",
        "deptId": "cm6w1z7dl001dvo7ii4bpwl4j"
    },
    {
        "doctorId": "cm6mjalsh000a5e153g553dqd",
        "deptId": "cm6w22uso0031vo7i5ybg81tl"
    },
    {
        "doctorId": "cm6mjb6pm001r5e1587oao7oc",
        "deptId": "cm6w22vja003dvo7in0h9ustu"
    },
    {
        "doctorId": "cm6mjalf900095e15z0ykmxje",
        "deptId": "cm6w1z79c001bvo7ihp57tzoi"
    },
    {
        "doctorId": "cm6mjb3tr001k5e15ujokqx8y",
        "deptId": "cm6w22ue2002vvo7iq9j8brve"
    },
    {
        "doctorId": "cm6mjarue000p5e15l7qfcb6d",
        "deptId": "cm6w2ad56004lvo7ikkpu05x3"
    },
    {
        "doctorId": "cm6mjar2p000n5e1502775qrv",
        "deptId": "cm6w2ae840053vo7ifxzu1vou"
    },
    {
        "doctorId": "cm6mjasz5000s5e155og2wsli",
        "deptId": "cm6w278ai0041vo7i2rs1f9zr"
    },
    {
        "doctorId": "cm6mjauww000x5e156a94r0gl",
        "deptId": "cm6w22ux50033vo7iau873zod"
    },
    {
        "doctorId": "cm6mjazzw001a5e15270f21z4",
        "deptId": "cm6w1z7ic001fvo7ili1f92d5"
    },
    {
        "doctorId": "cm6mjas85000q5e155f5pswxo",
        "deptId": "cm6w2adqt004vvo7ipzlt6nkb"
    },
    {
        "doctorId": "cm3iqi7bz0000zi5m3gzfzvcg",
        "deptId": "cm6w22w11003lvo7i4ig2sqm8"
    },
    {
        "doctorId": "cm6mjargk000o5e15elyg2y6i",
        "deptId": "cm6w2aegd0057vo7ieqvzqkur"
    },
    {
        "doctorId": "cm6mjb0fo001b5e15hmrgodj8",
        "deptId": "cm6w2acpv004hvo7iamh8zywz"
    },
    {
        "doctorId": "cm6mjawv900125e15w0fp9k2t",
        "deptId": "cm6w22vsd003hvo7ixy7b7144"
    },
    {
        "doctorId": "cm6mjayf700165e15b1gbs0ch",
        "deptId": "cm6w27820003xvo7ihla4n714"
    },
    {
        "doctorId": "cm6mjatcd000t5e15rb498ply",
        "deptId": "cm6w278ep0043vo7i8801c8ey"
    },
    {
        "doctorId": "cm6mjb4me001m5e15sdshwp7a",
        "deptId": "cm6w22vja003dvo7in0h9ustu"
    },
    {
        "doctorId": "cm6mjb2qa001h5e15hdxr3xxd",
        "deptId": "cm6w2aec90055vo7i6w9kup6y"
    },
    {
        "doctorId": "cm6mjavoo000z5e15dkacsrze",
        "deptId": "cm6w2ae840053vo7ifxzu1vou"
    },
    {
        "doctorId": "cm6mjatq9000u5e159rc69fht",
        "deptId": "cm6w22v1i0035vo7i659s8e21"
    },
    {
        "doctorId": "cm6mjb9ff001y5e15dzkpthbh",
        "deptId": "cm6w277xp003vvo7iz3hwp96o"
    },
    {
        "doctorId": "cm6mjb2cv001g5e153ubaw0pz",
        "deptId": "cm6w278ep0043vo7i8801c8ey"
    },
    {
        "doctorId": "cm6mjb92c001x5e151606cby0",
        "deptId": "cm6w1z7ic001fvo7ili1f92d5"
    },
    {
        "doctorId": "cm6mjb47z001l5e15t900q9ns",
        "deptId": "cm6w2acpv004hvo7iamh8zywz"
    },
    {
        "doctorId": "cm6mjamyw000d5e15l6n4lu42",
        "deptId": "cm6w1z79c001bvo7ihp57tzoi"
    },
    {
        "doctorId": "cm6mjaqov000m5e15q6191frb",
        "deptId": "cm6w1z70t0017vo7iru2scgrb"
    },
    {
        "doctorId": "cm6mjb2qa001h5e15hdxr3xxd",
        "deptId": "cm6w2adqt004vvo7ipzlt6nkb"
    },
    {
        "doctorId": "cm6mjar2p000n5e1502775qrv",
        "deptId": "cm6w278nd0047vo7iubumut4j"
    },
    {
        "doctorId": "cm6mjb2cv001g5e153ubaw0pz",
        "deptId": "cm6w22uns002zvo7iulsub604"
    },
    {
        "doctorId": "cm6mjb8b6001v5e15sxiv8yj8",
        "deptId": "cm6w2adml004tvo7iwpwmoz97"
    },
    {
        "doctorId": "cm6mjb9t5001z5e15o6t2wuj3",
        "deptId": "cm6w22uiz002xvo7iosuthiz3"
    },
    {
        "doctorId": "cm6mjb47z001l5e15t900q9ns",
        "deptId": "cm6w1z79c001bvo7ihp57tzoi"
    },
    {
        "doctorId": "cm6mjay1x00155e15zepewioc",
        "deptId": "cm6w1z8rd001vvo7i29j4xu6o"
    },
    {
        "doctorId": "cm6mjatcd000t5e15rb498ply",
        "deptId": "cm6w22vf2003bvo7idq4mdh1k"
    },
    {
        "doctorId": "cm6mjaxac00135e15fcte1lih",
        "deptId": "cm6w27869003zvo7it54y02eb"
    },
    {
        "doctorId": "cm6mjaqb6000l5e159bar47x7",
        "deptId": "cm6w1z7yv001nvo7iomiixnzf"
    },
    {
        "doctorId": "cm6mjb726001s5e151y2uharj",
        "deptId": "cm6w1z7dl001dvo7ii4bpwl4j"
    },
    {
        "doctorId": "cm6mjamjj000c5e15v8njqaaa",
        "deptId": "cm6w278w0004bvo7ipu199ktx"
    },
    {
        "doctorId": "cm6mjar2p000n5e1502775qrv",
        "deptId": "cm6w1z7mn001hvo7idej61ard"
    },
    {
        "doctorId": "cm6mjaqov000m5e15q6191frb",
        "deptId": "cm6w2ad56004lvo7ikkpu05x3"
    },
    {
        "doctorId": "cm6mjalsh000a5e153g553dqd",
        "deptId": "cm6w22vat0039vo7ig20o7oyh"
    },
    {
        "doctorId": "cm6mjasm3000r5e158uxy1not",
        "deptId": "cm6w1z7dl001dvo7ii4bpwl4j"
    },
    {
        "doctorId": "cm6mjay1x00155e15zepewioc",
        "deptId": "cm6w277ti003tvo7ia0f8z27w"
    },
    {
        "doctorId": "cm3iqi7bz0000zi5m3gzfzvcg",
        "deptId": "cm6w1z7mn001hvo7idej61ard"
    },
    {
        "doctorId": "cm6mjazzw001a5e15270f21z4",
        "deptId": "cm6w2acpv004hvo7iamh8zywz"
    },
    {
        "doctorId": "cm6mjayf700165e15b1gbs0ch",
        "deptId": "cm6w1z8mb001tvo7i1svjohrq"
    },
    {
        "doctorId": "cm6mjau3u000v5e15e0apbqa0",
        "deptId": "cm6w1z75a0019vo7isxg3tk26"
    },
    {
        "doctorId": "cm6mjb8b6001v5e15sxiv8yj8",
        "deptId": "cm6w277p4003rvo7i4ql59z61"
    },
    {
        "doctorId": "cm6mjatq9000u5e159rc69fht",
        "deptId": "cm6w277p4003rvo7i4ql59z61"
    },
    {
        "doctorId": "cm6mjaz7r00185e152u6gm2jq",
        "deptId": "cm6w278w0004bvo7ipu199ktx"
    },
    {
        "doctorId": "cm6mjb726001s5e151y2uharj",
        "deptId": "cm6w22u98002tvo7isg5rcis3"
    },
    {
        "doctorId": "cm6mjb16b001d5e153ei93i03",
        "deptId": "cm6w278rq0049vo7ipazcx074"
    },
    {
        "doctorId": "cm6mjb7xw001u5e15ey28lq2c",
        "deptId": "cm6w1z8rd001vvo7i29j4xu6o"
    },
    {
        "doctorId": "cm6mjazzw001a5e15270f21z4",
        "deptId": "cm6w2adqt004vvo7ipzlt6nkb"
    },
    {
        "doctorId": "cm6mjb8b6001v5e15sxiv8yj8",
        "deptId": "cm6w2aec90055vo7i6w9kup6y"
    },
    {
        "doctorId": "cm6mjaofg000h5e15ajfbsntz",
        "deptId": "cm6w1z70t0017vo7iru2scgrb"
    },
    {
        "doctorId": "cm6mjb7xw001u5e15ey28lq2c",
        "deptId": "cm6w22vwu003jvo7ig31bmxqv"
    },
    {
        "doctorId": "cm6mjb1jz001e5e150yjr1209",
        "deptId": "cm6w2795b004fvo7ixcsph8te"
    },
    {
        "doctorId": "cm6mjazmy00195e15qdi4preh",
        "deptId": "cm6w2ae3x0051vo7iyjyjm975"
    },
    {
        "doctorId": "cm6mj7dh100065e152e0mlcym",
        "deptId": "cm6w22ux50033vo7iau873zod"
    },
    {
        "doctorId": "cm6mjakn200075e15yvz2dnnl",
        "deptId": "cm6w1z7uw001lvo7i00bu4qae"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w22uso0031vo7i5ybg81tl"
    },
    {
        "doctorId": "cm6mjargk000o5e15elyg2y6i",
        "deptId": "cm6w1z7qu001jvo7ixgp5nl51"
    },
    {
        "doctorId": "cm6mi4nhs0000147l9cjzq9ca",
        "deptId": "cm6w22uns002zvo7iulsub604"
    },
    {
        "doctorId": "cm6mjb67c001q5e15q7zh5p37",
        "deptId": "cm6w2acpv004hvo7iamh8zywz"
    },
    {
        "doctorId": "cm6mjawhp00115e15wozm0y1o",
        "deptId": "cm6w278rq0049vo7ipazcx074"
    },
    {
        "doctorId": "cm6mjar2p000n5e1502775qrv",
        "deptId": "cm6w1z8mb001tvo7i1svjohrq"
    },
    {
        "doctorId": "cm6mjaofg000h5e15ajfbsntz",
        "deptId": "cm6w2addt004pvo7i7xgodckj"
    },
    {
        "doctorId": "cm6mjb92c001x5e151606cby0",
        "deptId": "cm6w1z82z001pvo7ijxowb0ag"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w22ux50033vo7iau873zod"
    },
    {
        "doctorId": "cm6mjasz5000s5e155og2wsli",
        "deptId": "cm6w1z7uw001lvo7i00bu4qae"
    },
    {
        "doctorId": "cm6mjawv900125e15w0fp9k2t",
        "deptId": "cm6w1z8rd001vvo7i29j4xu6o"
    },
    {
        "doctorId": "cm6mjalsh000a5e153g553dqd",
        "deptId": "cm6w27820003xvo7ihla4n714"
    },
    {
        "doctorId": "cm6mjb0fo001b5e15hmrgodj8",
        "deptId": "cm6w22vat0039vo7ig20o7oyh"
    },
    {
        "doctorId": "cm6mjb4zm001n5e15q61wmczq",
        "deptId": "cm6w277ti003tvo7ia0f8z27w"
    },
    {
        "doctorId": "cm6mjawhp00115e15wozm0y1o",
        "deptId": "cm6w278nd0047vo7iubumut4j"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w22u98002tvo7isg5rcis3"
    },
    {
        "doctorId": "cm6mi9rjv0001147lhoxf7scx",
        "deptId": "cm6w22vnx003fvo7i42m01w2u"
    },
    {
        "doctorId": "cm6mjb8b6001v5e15sxiv8yj8",
        "deptId": "cm6w1z6tb0015vo7i3xe4e2pn"
    },
    {
        "doctorId": "cm6mjb4me001m5e15sdshwp7a",
        "deptId": "cm6w1z6tb0015vo7i3xe4e2pn"
    },
    {
        "doctorId": "cm6mjb7xw001u5e15ey28lq2c",
        "deptId": "cm6w2addt004pvo7i7xgodckj"
    },
    {
        "doctorId": "cm6mjam5y000b5e15b95y3bgg",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6mjb92c001x5e151606cby0",
        "deptId": "cm6w2adzt004zvo7ivx2z4t4k"
    },
    {
        "doctorId": "cm6mjaox4000i5e15eql1jufv",
        "deptId": "cm6w2adzt004zvo7ivx2z4t4k"
    },
    {
        "doctorId": "cm6mjb1yx001f5e15n8bka0pz",
        "deptId": "cm6w22ux50033vo7iau873zod"
    },
    {
        "doctorId": "cm6mjau3u000v5e15e0apbqa0",
        "deptId": "cm6w1z7dl001dvo7ii4bpwl4j"
    },
    {
        "doctorId": "cm6mjawv900125e15w0fp9k2t",
        "deptId": "cm6w1z70t0017vo7iru2scgrb"
    },
    {
        "doctorId": "cm6mjb6pm001r5e1587oao7oc",
        "deptId": "cm6w1z8mb001tvo7i1svjohrq"
    },
    {
        "doctorId": "cm6mjb5h1001o5e15i773a4ak",
        "deptId": "cm6w1z82z001pvo7ijxowb0ag"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w278ai0041vo7i2rs1f9zr"
    },
    {
        "doctorId": "cm6mjb16b001d5e153ei93i03",
        "deptId": "cm6w22ux50033vo7iau873zod"
    },
    {
        "doctorId": "cm6mjao26000g5e15c8shzd0c",
        "deptId": "cm6w1z87b001rvo7iedo3ek8h"
    },
    {
        "doctorId": "cm6mjavoo000z5e15dkacsrze",
        "deptId": "cm6w2adzt004zvo7ivx2z4t4k"
    },
    {
        "doctorId": "cm6mjb2qa001h5e15hdxr3xxd",
        "deptId": "cm6w1z7dl001dvo7ii4bpwl4j"
    },
    {
        "doctorId": "cm6cn9who0001anyuqns00gwj",
        "deptId": "cm6w22vf2003bvo7idq4mdh1k"
    },
    {
        "doctorId": "cm6mjb7xw001u5e15ey28lq2c",
        "deptId": "cm6w1z82z001pvo7ijxowb0ag"
    },
    {
        "doctorId": "cm6mjakn200075e15yvz2dnnl",
        "deptId": "cm6w1z75a0019vo7isxg3tk26"
    },
    {
        "doctorId": "cm6mj7dh100065e152e0mlcym",
        "deptId": "cm6w1z7mn001hvo7idej61ard"
    },
    {
        "doctorId": "cm6mjawv900125e15w0fp9k2t",
        "deptId": "cm6w2adzt004zvo7ivx2z4t4k"
    },
    {
        "doctorId": "cm6mjb2qa001h5e15hdxr3xxd",
        "deptId": "cm6w2acpv004hvo7iamh8zywz"
    },
    {
        "doctorId": "cm6mjau3u000v5e15e0apbqa0",
        "deptId": "cm6w22ue2002vvo7iq9j8brve"
    },
    {
        "doctorId": "cm6mjam5y000b5e15b95y3bgg",
        "deptId": "cm6w277p4003rvo7i4ql59z61"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w22uiz002xvo7iosuthiz3"
    },
    {
        "doctorId": "cm6mjb4me001m5e15sdshwp7a",
        "deptId": "cm6w277gj003nvo7i0gscylbh"
    },
    {
        "doctorId": "cm6mjayti00175e15kvsqb5at",
        "deptId": "cm6w27869003zvo7it54y02eb"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w1z6tb0015vo7i3xe4e2pn"
    },
    {
        "doctorId": "cm6mjamjj000c5e15v8njqaaa",
        "deptId": "cm6w1z8mb001tvo7i1svjohrq"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w1z70t0017vo7iru2scgrb"
    },
    {
        "doctorId": "cm6mjb8ow001w5e15lb5uq8qg",
        "deptId": "cm6w1z7dl001dvo7ii4bpwl4j"
    },
    {
        "doctorId": "cm6mjawv900125e15w0fp9k2t",
        "deptId": "cm6w2adqt004vvo7ipzlt6nkb"
    },
    {
        "doctorId": "cm6mjb9ff001y5e15dzkpthbh",
        "deptId": "cm6w22v6d0037vo7i1eehifdo"
    },
    {
        "doctorId": "cm6mjaqov000m5e15q6191frb",
        "deptId": "cm6w2795b004fvo7ixcsph8te"
    },
    {
        "doctorId": "cm6mjb5ta001p5e159egpgoeg",
        "deptId": "cm6w1z79c001bvo7ihp57tzoi"
    },
    {
        "doctorId": "cm6mj7dh100065e152e0mlcym",
        "deptId": "cm6w27820003xvo7ihla4n714"
    },
    {
        "doctorId": "cm6mi9rjv0001147lhoxf7scx",
        "deptId": "cm6w22vat0039vo7ig20o7oyh"
    },
    {
        "doctorId": "cm6mjayf700165e15b1gbs0ch",
        "deptId": "cm6w22vf2003bvo7idq4mdh1k"
    },
    {
        "doctorId": "cm6mjb92c001x5e151606cby0",
        "deptId": "cm6w2adml004tvo7iwpwmoz97"
    },
    {
        "doctorId": "cm6mjb1yx001f5e15n8bka0pz",
        "deptId": "cm6w1z8ws001xvo7iget9d0e6"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w2acuk004jvo7i7abb79k3"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w277ky003pvo7i9e59x2ks"
    },
    {
        "doctorId": "cm6mjalf900095e15z0ykmxje",
        "deptId": "cm6w1z82z001pvo7ijxowb0ag"
    },
    {
        "doctorId": "cm6mjb0sb001c5e150jlvfi89",
        "deptId": "cm6w278j50045vo7ir42icb9p"
    },
    {
        "doctorId": "cm6mjb1yx001f5e15n8bka0pz",
        "deptId": "cm6w22vwu003jvo7ig31bmxqv"
    },
    {
        "doctorId": "cm6mi4nhs0000147l9cjzq9ca",
        "deptId": "cm6w27820003xvo7ihla4n714"
    },
    {
        "doctorId": "cm6mjb9ff001y5e15dzkpthbh",
        "deptId": "cm6w278ai0041vo7i2rs1f9zr"
    },
    {
        "doctorId": "cm6mjb1jz001e5e150yjr1209",
        "deptId": "cm6w22uso0031vo7i5ybg81tl"
    },
    {
        "doctorId": "cm6mjam5y000b5e15b95y3bgg",
        "deptId": "cm6w1z8rd001vvo7i29j4xu6o"
    },
    {
        "doctorId": "cm6mj7dh100065e152e0mlcym",
        "deptId": "cm6w22vf2003bvo7idq4mdh1k"
    },
    {
        "doctorId": "cm6mjb1jz001e5e150yjr1209",
        "deptId": "cm6w278ep0043vo7i8801c8ey"
    },
    {
        "doctorId": "cm6mjamjj000c5e15v8njqaaa",
        "deptId": "cm6w2790k004dvo7izc19ticq"
    },
    {
        "doctorId": "cm6mjazzw001a5e15270f21z4",
        "deptId": "cm6w2adv7004xvo7i1qg418se"
    },
    {
        "doctorId": "cm6mjauww000x5e156a94r0gl",
        "deptId": "cm6w2acpv004hvo7iamh8zywz"
    },
    {
        "doctorId": "cm6mjb1jz001e5e150yjr1209",
        "deptId": "cm6w2acpv004hvo7iamh8zywz"
    },
    {
        "doctorId": "cm6mjau3u000v5e15e0apbqa0",
        "deptId": "cm6w2aegd0057vo7ieqvzqkur"
    },
    {
        "doctorId": "cm6cn9who0001anyuqns00gwj",
        "deptId": "cm6w278rq0049vo7ipazcx074"
    },
    {
        "doctorId": "cm6mjarue000p5e15l7qfcb6d",
        "deptId": "cm6w2adii004rvo7imvyiljn4"
    },
    {
        "doctorId": "cm6mjatq9000u5e159rc69fht",
        "deptId": "cm6w1z7yv001nvo7iomiixnzf"
    },
    {
        "doctorId": "cm6mjb67c001q5e15q7zh5p37",
        "deptId": "cm6w2adqt004vvo7ipzlt6nkb"
    },
    {
        "doctorId": "cm6mjanol000f5e15uhskwmyb",
        "deptId": "cm6w22uiz002xvo7iosuthiz3"
    },
    {
        "doctorId": "cm6mjapu8000k5e15h3w1ngeo",
        "deptId": "cm6w22ux50033vo7iau873zod"
    },
    {
        "doctorId": "cm6mjavoo000z5e15dkacsrze",
        "deptId": "cm6w1z7dl001dvo7ii4bpwl4j"
    },
    {
        "doctorId": "cm6mjape8000j5e15xeyrqlq1",
        "deptId": "cm6w22uso0031vo7i5ybg81tl"
    },
    {
        "doctorId": "cm6mjaox4000i5e15eql1jufv",
        "deptId": "cm6w22u98002tvo7isg5rcis3"
    },
    {
        "doctorId": "cm6mjauww000x5e156a94r0gl",
        "deptId": "cm6w27869003zvo7it54y02eb"
    },
    {
        "doctorId": "cm6mjb1yx001f5e15n8bka0pz",
        "deptId": "cm6w278rq0049vo7ipazcx074"
    },
    {
        "doctorId": "cm6mjalf900095e15z0ykmxje",
        "deptId": "cm6w2adii004rvo7imvyiljn4"
    },
    {
        "doctorId": "cm6mjb92c001x5e151606cby0",
        "deptId": "cm6w1z8mb001tvo7i1svjohrq"
    },
    {
        "doctorId": "cm6mjaz7r00185e152u6gm2jq",
        "deptId": "cm6w27820003xvo7ihla4n714"
    },
    {
        "doctorId": "cm6mjaox4000i5e15eql1jufv",
        "deptId": "cm6w2ad56004lvo7ikkpu05x3"
    },
    {
        "doctorId": "cm6mi4nhs0000147l9cjzq9ca",
        "deptId": "cm6w277ky003pvo7i9e59x2ks"
    },
    {
        "doctorId": "cm6mjb9ff001y5e15dzkpthbh",
        "deptId": "cm6w22vf2003bvo7idq4mdh1k"
    },
    {
        "doctorId": "cm6mjb92c001x5e151606cby0",
        "deptId": "cm6w1z6tb0015vo7i3xe4e2pn"
    },
    {
        "doctorId": "cm6mjazzw001a5e15270f21z4",
        "deptId": "cm6w277ky003pvo7i9e59x2ks"
    },
    {
        "doctorId": "cm6mi9rjv0001147lhoxf7scx",
        "deptId": "cm6w277ky003pvo7i9e59x2ks"
    },
    {
        "doctorId": "cm6mjb5h1001o5e15i773a4ak",
        "deptId": "cm6w1z7ic001fvo7ili1f92d5"
    },
    {
        "doctorId": "cm6mjasz5000s5e155og2wsli",
        "deptId": "cm6w2acuk004jvo7i7abb79k3"
    },
    {
        "doctorId": "cm6mjalf900095e15z0ykmxje",
        "deptId": "cm6w22u98002tvo7isg5rcis3"
    },
    {
        "doctorId": "cm6mjal1d00085e1532fwcxw0",
        "deptId": "cm6w2ad9g004nvo7iswsrf4qp"
    },
    {
        "doctorId": "cm6cn7akm0000anyuojctx404",
        "deptId": "cm6w278j50045vo7ir42icb9p"
    },
    {
        "doctorId": "cm6mjazmy00195e15qdi4preh",
        "deptId": "cm6w1z7dl001dvo7ii4bpwl4j"
    },
    {
        "doctorId": "cm6mjb1yx001f5e15n8bka0pz",
        "deptId": "cm6w22v1i0035vo7i659s8e21"
    },
    {
        "doctorId": "cm6mjalf900095e15z0ykmxje",
        "deptId": "cm6w2790k004dvo7izc19ticq"
    },
    {
        "doctorId": "cm6mjazzw001a5e15270f21z4",
        "deptId": "cm6w22vf2003bvo7idq4mdh1k"
    },
    {
        "doctorId": "cm6mjb4zm001n5e15q61wmczq",
        "deptId": "cm6w22v1i0035vo7i659s8e21"
    },
    {
        "doctorId": "cm6mjayti00175e15kvsqb5at",
        "deptId": "cm6w22vat0039vo7ig20o7oyh"
    },
    {
        "doctorId": "cm6mjb0sb001c5e150jlvfi89",
        "deptId": "cm6w1z75a0019vo7isxg3tk26"
    },
    {
        "doctorId": "cm6mjau3u000v5e15e0apbqa0",
        "deptId": "cm6w1z79c001bvo7ihp57tzoi"
    },
    {
        "doctorId": "cm6mjatq9000u5e159rc69fht",
        "deptId": "cm6w22v6d0037vo7i1eehifdo"
    },
    {
        "doctorId": "cm6mj7dh100065e152e0mlcym",
        "deptId": "cm6w1z8rd001vvo7i29j4xu6o"
    },
    {
        "doctorId": "cm6mi9rjv0001147lhoxf7scx",
        "deptId": "cm6w2adzt004zvo7ivx2z4t4k"
    },
    {
        "doctorId": "cm6mjb7i7001t5e15i5uwzbt0",
        "deptId": "cm6w22uso0031vo7i5ybg81tl"
    },
    {
        "doctorId": "cm6mi9rjv0001147lhoxf7scx",
        "deptId": "cm6w2addt004pvo7i7xgodckj"
    },
    {
        "doctorId": "cm6mjaujn000w5e15bfvqg4fq",
        "deptId": "cm6w22u98002tvo7isg5rcis3"
    },
    {
        "doctorId": "cm6mjauww000x5e156a94r0gl",
        "deptId": "cm6w2adv7004xvo7i1qg418se"
    }
];


const page = (props: Props) => {
  // async function handleAddDepartment() {
  //   for(let i=0;i<data.length;i++){
  //     try {
  //       const res = await fetch("/api/test", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ values: data[i] }),
  //       });
  //       toast.success("Done");
  //     } catch (error) {
  //       toast.error("Error adding department.");
  //     }
  //   }
  // }
  // async function handleAddDepartment() {
  //   const res=await fetch(`/api/test`);
  //   const data=await res.json();
  //   console.log(data);
  // }
  const {latitude,longitude,location,accuracy}=useLocation();
  if(latitude===-1||longitude===-1){
    return (
      <div className="min-h-screen flex items-center justify-center font-extrabold text-5xl">Fetching Have patience .... pata nhi kaha kaha se aa jate h </div>
    )
  }
  return (
    <div className="min-h-screen flex items-center text-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* <BeatLoader className="w-[50px] h-[20px]"></BeatLoader> */}
      Test Page
      {/* <Button onClick={handleAddDepartment}>Handle Add Doc to Dept</Button> */}
      {`Latitude is ${latitude} and longitude is ${longitude} and Location is ${location}`}
      <br></br>
      {`Accuracy is ${accuracy} meters`}

    </div>
  );
};
export default page;
