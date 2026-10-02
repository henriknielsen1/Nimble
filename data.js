const NIMBLE_DATA = {
  rules: {
    actions: {
      title: "1. Dine 3 Handlinger (Actions)",
      desc: "På din tur har du altid 3 handlinger (Actions) til rådighed til fri fordeling:",
      items: [
        "Bevæge dig (Move): Ryk din Speed i felter (1 felt = 5 fod / standard gitter).",
        "Angribe (Attack): Udfør et nærkamps- eller afstandsangreb.",
        "Kaste Formular (Cast Spell): Brug en magisk cantrip eller formular.",
        "Vurdere Situationen (Assess): Søg efter svagheder, fælder eller overblik.",
        "Hjælpe Holdet: Samarbejd taktisk med dine allierede."
      ],
      refreshNote: "Action Refresh (Nulstilling): Så snart din tur SLUTTER, genoplades puljen straks med 3 friske handlinger til fjendens tur! Gem aldrig handlinger på din egen tur."
    },
    attacks: {
      title: "2. Sådan Angriber Du (Ingen 'Rul for at Ramme')",
      desc: "I Nimble ruller du aldrig for at se, om du rammer. Du ruller direkte dit våbens eller din formels skadesterning:",
      items: [
        "1'er på primær terning = Fejlskud (Miss): Angrebet glipper fuldstændigt (0 skade).",
        "MAX på skadesterning = Kritisk Træffer (Crit)! Terningen eksploderer: Rul terningen igen og læg tallet oveni (fortsæt hvis du slår max igen!). Kritiske træffere ignorerer altid fjendens rustning (Defense).",
        "Hasteangreb (Rushed Attacks): Angriber du flere gange på samme tur, får dit 2. og 3. angreb Ulempe (Disadvantage): Rul 1 ekstra terning og fjern den højeste."
      ]
    },
    defense: {
      title: "3. Aktivt Forsvar (Reaktioner på Fjendens Tur)",
      desc: "Når monstrene angriber, bruger du af de 3 handlinger, du lige har genvundet (koster 1 handling hver, maks. én af hver reaktion pr. runde):",
      items: [
        "Forsvar (Defend): Træk din samlede Defense-værdi direkte fra den indgående skade.",
        "Træd Imellem (Interpose): Skub en allieret (inden for 2 felter) i sikkerhed, indtag deres felt og tag angrebet i deres sted.",
        "Hjælp (Help): Giv en allieret lov til at omrulle en terning ved et angreb eller save, hvis du kan forklare DM, hvordan du assisterer."
      ]
    },
    saves: {
      title: "4. Redningsslag (Saves)",
      desc: "Når du skal modstå magi, fælder eller farer, rulles et d20-save:",
      items: [
        "1 Advantaged Save (+): Slå altid med Fordel (rul 2d20, vælg den højeste).",
        "1 Disadvantaged Save (-): Slå altid med Ulempe (rul 2d20, vælg den laveste).",
        "Neutrale Saves (de 2 øvrige): Slå 1d20. Naturlig 1 fejler altid; naturlig 20 lykkes altid automatisk."
      ]
    },
    inventory: {
      title: "🎒 Inventar & Slots",
      desc: "Maksimal bæreevne = 10 + STR-rating slots (STR -1 = 9, STR +2 = 12). Alt du bærer tæller med – også rustning på kroppen og våben i hænderne. Hver genstand på databladet har sin slot-pris i firkantet parentes, fx [1] eller [2]. Appen lægger dem sammen og viser hvor mange slots der er ledige.",
      items: [
        "[0] Småting: låsedirker, kridt, spejl, enkelte eliksirer, op til 100 mønter (max 3–5 småting før de samlet fylder 1 slot).",
        "[1] Standard: enhåndsvåben, skjolde, pilekogger, reb, fakler, dagsrationer, let/mellemtung rustning, Medical Kit.",
        "[2] Tung: tohåndsvåben, tung pladerustning, bjergbestigningsgrej, telte, kister.",
        "[3+] Kolossal: bevidstløse allierede, store skattekister, monstredele (efter spillederens skøn).",
        "Overbelastet (over 10 + STR): Speed -2 og Ulempe på STR- og DEX-handlinger/saves/tjek.",
        "Immobiliseret (over 10 + STR + 5): Speed 0.",
        "Smid rygsækken: 0 handlinger. Find en stuvet genstand i kamp: 1 handling (ikke hvis den sidder i bæltehylster)."
      ]
    },
    dying: {
      title: "5. Hvad sker der ved 0 HP? (Dying & Wounds)",
      desc: "Når dine HP rammer 0, segner du om som Døende (Dying) og modtager straks 1 Wound:",
      items: [
        "Som Dying har du kun 1 handling pr. tur.",
        "Vil du angribe eller kaste magi som Dying, skal du bestå et DC 10 STR-save (ellers tager du straks +1 Wound).",
        "Tager du skade, mens du er Dying, får du +2 Wounds (+3 ved et fjendtligt Crit).",
        "6 Wounds = Karakteren er død.",
        "Modtager du healing, fjernes Dying-tilstanden øjeblikkeligt!"
      ]
    }
  },
  characters: [
    {
      id: "liem_swiftwind",
      character_name: "Liem Swiftwind",
      class: "The Zephyr (Monk)",
      level: 1,
      ancestry: "Menneske",
      background: "Klostermunk",
      quote: "En adræt kampsportsekspert, der afværger angreb med de bare næver og suser lynhurtigt over slagmarken uden panser.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 4,
      defense_calc: "Iron Defense: DEX + STR",
      speed: "6 felter",
      initiative: "+2",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Might (+3)" },
        DEX: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Finesse (+3), Stealth (+2)" },
        INT: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Arcana (-1), Examination (-1), Lore (-1)" },
        WIL: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Insight (+1), Influence (0), Naturecraft (0), Perception (+1)" }
      },
      attacks: [
        { name: "👊 Håndkantstød & Næver (Unarmed)", damage: "1d4 + 2", traits: "Nærkamp, STR" },
        { name: "🥢 Munkestav (Quarterstaff)", damage: "1d8 + 2", traits: "Nærkamp, 2-hånds" }
      ],
      class_features: [
        { title: "Iron Defense", text: "Din Defense er altid lig med din DEX + STR (2 + 2 = 4), forudsat at du ikke bærer nogen form for rustning." },
        { title: "Swift Fists", text: "Dine ubevæbnede angreb rammes aldrig af Ulempe ved Hasteangreb (Rushed Attacks)! Du kan angribe ubevæbnet flere gange i træk uden straf." }
      ],
      inventory: [
        "[2] Afslebet Munkestav af jerntræ (2-hånds)",
        "[0] Let træningskappe og sandaler (Ingen rustning)",
        "[0] Næver og fødder svøbt i linnedbånd",
        "[0] Bønnesnor & bundt røgelsespinde",
        "[1] Rulle fint linned & helende urtesalve",
        "[1] Drejet træskål til te & vand",
        "[0] Pose med tørrede teblade & urteblandinger",
        "[1] Rejserationer (Ris og tørret frugt): 3 dage",
        "[0] Rensende urtemedicin: [ ] [ ]"
      ],
      gold: { gp: 12, sp: 0, cp: 0 },
      notes: "Kendetegn: Rolig, afbalanceret vejrtrækning; bevæger sig altid uden en lyd.\nPersonligt Mål: Finde den forsvundne mester og bringe klosterets stjålne skriftrulle tilbage."
    },
    {
      id: "bram_bloodfury",
      character_name: "Bram Bloodfury",
      class: "The Berserker (Barbarian)",
      level: 1,
      ancestry: "Menneske",
      background: "Vildmarkskriger",
      quote: "En ustoppelig naturkraft af vildt raseri og blodtørst, der vokser sig stærkere og farligere, jo tættere han er på fjendens linjer.",
      hp: 17,
      hp_max: 17,
      hit_die: "1d10",
      defense: 5,
      defense_calc: "3 Hides + 2 DEX",
      speed: "6 felter",
      initiative: "+2",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Might (+4)" },
        DEX: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Finesse (+2), Stealth (+2)" },
        INT: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Arcana (-1), Examination (-1), Lore (-1)" },
        WIL: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Insight (0), Influence (0), Naturecraft (0), Perception (0)" }
      },
      attacks: [
        { name: "🪓 Tohånds Bøddeløkse (Greataxe)", damage: "1d12 + 2", traits: "Nærkamp, 2-hånds" },
        { name: "🪓 Kasteøkser (2 stk.)", damage: "1d6 + 2", traits: "Light, Thrown Range 4 felter" }
      ],
      class_features: [
        { title: "Rage (1/tur - Action)", text: "Rul en Fury Die (1d4) og læg den til side. Tilføj terningens værdi til alle dine STR-angreb! (Maks 2 Fury Dice i puljen). Rage ophører ved 0 HP, eller hvis du går 1 hel runde uden at angribe/rage." },
        { title: "Is That All You Got?!", text: "Bliver du angrebet, kan du spendere 1 eller flere Fury Dice for at reducere skaden med STR + DEX (4) pr. terning!" }
      ],
      inventory: [
        "[1] Cheap Hides læderrustning (+3 Defense)",
        "[2] Massiv Tohånds Bøddeløkse",
        "[1] 2x Kasteøkser i brystremme",
        "[0] Krigsmaling, knogleamuletter",
        "[0] Læderremme & ekstra kasteøkse-stropper",
        "[1] Tørret proviantkød (3 dagsrationer)",
        "[1] Drikkehorn fyldt med stærk dværgemjød",
        "[1] Groft uldtæppe & flintesten"
      ],
      gold: { gp: 8, sp: 0, cp: 0 },
      notes: "Kendetegn: Brede skuldre dækket af kampar; ler højt midt under kampens hede.\nPersonligt Mål: Nedlægge et legendarisk monster alene og bringe dets kranie hjem."
    },
    {
      id: "caldra_brightward",
      character_name: "Caldra Brightward",
      class: "The Oathsworn (Paladin)",
      level: 1,
      ancestry: "Dværg",
      background: "Hellig Vægter",
      quote: "En urokkelig, tungt pansret vægter, der kanaliserer guddommelig stråleglans i sine knusende hammerslag og holder sit hold i live.",
      hp: 17,
      hp_max: 17,
      hit_die: "1d10",
      defense: 8,
      defense_calc: "6 Rusty Mail + 2 Shield",
      speed: "6 felter",
      initiative: "0",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Might (+2)" },
        DEX: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Finesse (0), Stealth (0)" },
        INT: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "Arcana (-1), Examination (-1), Lore (-1)" },
        WIL: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Influence (+4), Insight (+4), Naturecraft (+2), Perception (+2)" }
      },
      attacks: [
        { name: "🔨 Stridskølle (Mace)", damage: "1d6 + 2", traits: "Nærkamp" },
        { name: "🛡️️ Træskjold (Wooden Buckler)", damage: "-", traits: "+2 Defense (allerede medregnet i de 8 Defense)" }
      ],
      class_features: [
        { title: "Radiant Judgment", text: "Hver gang en fjende angriber dig uden aktive Judgment Dice: Rul straks 2d6 Judgment Dice. Ved dit næste nærkampsangreb lægges summen direkte til som ekstra Radiant Damage!" },
        { title: "Lay on Hands", text: "Helbredelsespulje på 5 HP (5 x Lvl). Handling (Action): Rør en allieret og spender point for at helbrede dem. Genoplades ved Sikker Hvile (Safe Rest)." }
      ],
      inventory: [
        "[1] Rusty Mail ringbrynje (+6 Defense)",
        "[1] Træskjold med jernbeslag (+2 Defense)",
        "[1] Jern-stridskølle (Mace)",
        "[0] Dværeggudens hammer udskåret i granit",
        "[1] Stål-håndjern med nøgle",
        "[1] Rulle rene linned-bandager & helende salve",
        "[0] Vievands-flaske",
        "[1] Kraftig tømrerhammer & 4 jernkiler",
        "[1] Feltrationer: 3 dage",
        "[0] Olieflaske & lunte: [ ] [ ]"
      ],
      gold: { gp: 10, sp: 0, cp: 0 },
      notes: "Kendetegn: Flettet mørkt skæg pyntet med bronzeringe; taler med fast og rungende stemme.\nPersonligt Mål: Rense det vanhelligede bjergtempel og genoprette ordenen."
    },
    {
      id: "virel_ember_eye",
      character_name: "Virel of the Ember Eye",
      class: "The Mage (Wizard)",
      level: 1,
      ancestry: "Højelver",
      background: "Frafalden Arkainer",
      quote: "En nysgerrig og beregnende elvertroldmand, der manipulerer Ild, Is og Lyn uden tøven og uden at rulle for at ramme.",
      hp: 10,
      hp_max: 10,
      hit_die: "1d6",
      defense: 2,
      defense_calc: "Adventurer's Garb",
      speed: "6 felter",
      initiative: "0",
      wounds: 0,
      stats: {
        STR: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Might (-1)" },
        DEX: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Finesse (0), Stealth (0)" },
        INT: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Arcana (+4), Lore (+4), Examination (+2)" },
        WIL: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Insight (+2), Influence (+2), Naturecraft (+2), Perception (+2)" }
      },
      attacks: [
        { name: "🧹 Egetræsstav (Staff)", damage: "1d8 - 1", traits: "Nærkamp, 2-hånds" },
        { name: "🔥 Fire Blast (Cantrip)", damage: "1d10 Ild", traits: "Range 8 felter, Crits eksploderer" },
        { name: "❄️ Frost Ray (Cantrip)", damage: "1d8 Is", traits: "Range 8 felter, -2 Speed i 1 runde" },
        { name: "⚡ Lightning Arc (Cantrip)", damage: "1d6 Lyn", traits: "Range 8 felter, kædes automatisk til nærmeste skabning for 1d6 Lyn" }
      ],
      class_features: [
        { title: "Elemental Spellcasting", text: "Mestrer urkræfterne. Cantrips koster 0 mana, kræver ingen to-hit rul og koster 1 handling." }
      ],
      inventory: [
        "[1] Adventurer's Garb magikerkappe (+2 Defense)",
        "[2] Snittet Egetræsstav med indfældet glødesten (2-hånds)",
        "[0] Bogpose, lyssten i lædersnor",
        "[1] Bog med arkane noter og formelskitse",
        "[0] Blækhorn, 3 fjerpenne & 5 ark pergament",
        "[0] Magisk lyssten (lyser ved berøring)",
        "[0] Stykke fint duftsæbe & tørt klæde",
        "[0] Mana Potion (+3 Mana): [ ] [ ]",
        "[1] Rejserationer: 3 dage"
      ],
      gold: { gp: 12, sp: 0, cp: 0 },
      notes: "Kendetegn: Ravgyldne øjne; mumler formelord under åndedrættet.\nPersonligt Mål: Bevise over for akademiet, at elementarkræfter ikke behøver bureaukratisk kontrol."
    },
    {
      id: "thorne_underbough",
      character_name: "Thorne Underbough",
      class: "The Hunter (Ranger)",
      level: 1,
      ancestry: "Halvering",
      background: "Skovboer & Bueskytte",
      quote: "En usvigelig sporer og bueskytte fra de dybe skove, der mærker sit bytte og nedlægger det sikkert på lang afstand.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 5,
      defense_calc: "3 Hides + 2 DEX",
      speed: "6 felter",
      initiative: "+2",
      wounds: 0,
      stats: {
        STR: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Might (0)" },
        DEX: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Finesse (+2), Stealth (+3)" },
        INT: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Arcana (-1), Examination (-1), Lore (-1)" },
        WIL: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Naturecraft (+4), Insight (+3), Perception (+2), Influence (+2)" }
      },
      attacks: [
        { name: "🏹 Kortbue (Shortbow)", damage: "1d6 + 2", traits: "2-hånds, Range 12 felter" },
        { name: "🗡️ Jægerdolk (Dagger)", damage: "1d4 + 2", traits: "Light, Thrown Range 4 felter" }
      ],
      class_features: [
        { title: "Hunter's Mark (Action)", text: "Mærk en synlig skabning i 1 dag. Den kan ikke gemme sig; angreb mod den får enten Fordel (Advantage) eller +1 ekstra skade (vælges før hvert angreb)." },
        { title: "Forager", text: "Altid fordel på skill checks til at finde føde, rent drikkevand og sikkert ly i vildmarken." }
      ],
      inventory: [
        "[1] Cheap Hides læderrustning (+3 Defense)",
        "[1] Kortbue",
        "[1] Pilekogger med 20 pile",
        "[1] Jægerdolk i bæltehylster",
        "[1] Rævesaks / Jægerfælde af jern",
        "[1] Sejlgarn og klatrereb (15 m)",
        "[0] Feltflaske af læder (rent vand)",
        "[1] Pelsforet tæppe & tændsæt",
        "[1] Tørret vildtkød & nødder: 4 dagsrationer",
        "[0] Lægende urter (stabiliserer en såret): [ ] [ ]"
      ],
      gold: { gp: 10, sp: 0, cp: 0 },
      notes: "Kendetegn: Piberygende halvering; lytter altid til vinden.\nPersonligt Mål: Opspore det bæst, der drev hans klan væk fra de sydlige skove."
    },
    {
      id: "kessa_quickstep",
      character_name: "Kessa Quickstep",
      class: "The Cheat (Rogue)",
      level: 1,
      ancestry: "Menneske",
      background: "Gadebarn",
      quote: "En snarrådig og lynsnild lommetyv med to slebne dolke og en slynge, der slår hårdt og præcist til fra skyggerne.",
      hp: 10,
      hp_max: 10,
      hit_die: "1d6",
      defense: 5,
      defense_calc: "3 Hides + 2 DEX",
      speed: "6 felter",
      initiative: "+2",
      wounds: 0,
      stats: {
        STR: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "Might (-1)" },
        DEX: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Finesse (+3), Stealth (+4)" },
        INT: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Arcana (+2), Examination (+2), Lore (+2)" },
        WIL: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Insight (+1), Influence (0), Naturecraft (0), Perception (0)" }
      },
      attacks: [
        { name: "🗡️ Dobbelt-Dolke", damage: "1d4 + 2", traits: "Light, Thrown Range 4 felter" },
        { name: "🎯 Slynge (Sling)", damage: "1d4 + 2", traits: "Range 12 felter, Vicious" }
      ],
      class_features: [
        { title: "Sneak Attack (1/tur)", text: "Når du slår en Kritisk Træffer (maksimal terningværdi), tilføjer du +1d6 ekstra skade." },
        { title: "Vicious Opportunist (1/tur)", text: "Når du rammer et Distracted mål i nærkamp, bestemmer du selv hvad skadesterningen viser! Sæt den til maks for automatisk Crit." }
      ],
      inventory: [
        "[1] Cheap Hides læderrustning (+3 Defense)",
        "[2] Ståldolk (Højre hånd) & Ståldolk (Venstre hånd)",
        "[1] Læderslynge + stenpose (20 sten)",
        "[0] Låsedirkesæt",
        "[1] Rulle tynd rebsnøre (10 m) + klatrekrog",
        "[0] Kridt (3 stykker) + lille lommespejl",
        "[0] Tændstål & tørsvamp",
        "[1] Rationer (Tørret frugt og brød): 3 dage",
        "[0] Lille helbredelseseliksir (Healer 1d6 HP): [ ] [ ]"
      ],
      gold: { gp: 15, sp: 0, cp: 0 },
      notes: "Kendetegn: Et ar over venstre øjenbryn; går altid lydløst.\nPersonligt Mål: Finde ud af hvem der forrådte den gamle gadebande i havnekvarteret."
    }
  ]
};
