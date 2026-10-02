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
    },
    inventory: {
      title: "6. Bæreevne & overbelastning",
      desc: "Maksimal bæreevne er 10 + STY (STR) slots. De første 5 småting med en pris på 0 slots er gratis; hver yderligere småting tæller som 1 slot.",
      items: [
        "0 slots: Småting (op til 5 gratis). 100 mønter = 1 slot.",
        "1 slot: Enhåndsvåben, skjolde, let/medium rustning, pilekogger, reb og rationer.",
        "2 slots: Tohåndsvåben, tung rustning, telte og klatregrej.",
        "3+ slots: Lig, store kister og monstredele.",
        "Overbelastet (> 10 + STY slots): -2 Speed samt ulempe på alle STY- og BEV-checks og saves.",
        "Immobiliseret (> 10 + STY + 5 slots): Speed = 0; karakteren kan ikke bevæge sig."
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
      quote: "En disciplineret nævekæmper, der afværger angreb med de bare hænder og bevæger sig ubesværet over slagmarken uden panser.",
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
        { name: "Bare Næver & Spark (Unarmed)", damage: "1d4 + 2", traits: "Nærkamp, STY" },
        { name: "Munkestav (Quarterstaff)", damage: "1d8 + 2", traits: "Nærkamp, Tohånds" }
      ],
      class_features: [
        { title: "Iron Defense", text: "Din Defense er altid lig med DEX + STR (2 + 2 = 4), så længe du ikke bærer rustning." },
        { title: "Swift Fists", text: "Dine ubevæbnede angreb rammes aldrig af Ulempe ved Hasteangreb (Rushed Attacks). Du kan angribe ubevæbnet flere gange i træk uden straf." }
      ],
      inventory: [
        "Afslebet munkestav af jerntræ",
        "Træningsdragt og sandaler (ingen rustning)",
        "Slot 1: Bønnesnor & bundt røgelsespinde",
        "Slot 2: Rulle fint linned & helende urtesalve",
        "Slot 3: Drejet træskål til te & vand",
        "Slot 4: Pose med tørrede teblade & urter",
        "Rejserationer (ris og tørret frugt): 3 dage",
        "Rensende urtemedicin: [ ] [ ]"
      ],
      gold: { gp: 12, sp: 0, cp: 0 },
      notes: "Kendetegn: Rolig, kontrolleret vejrtrækning; bevæger sig fuldstændig lydløst.\nPersonligt Mål: Finde den forsvundne mester og bringe klosterets stjålne skriftrulle tilbage."
    },
    {
      id: "bram_bloodfury",
      character_name: "Bram Bloodfury",
      class: "The Berserker (Barbarian)",
      level: 1,
      ancestry: "Menneske",
      background: "Vildmarkskriger",
      quote: "En voldsom urkraft drevet af blodtørst og raseri, der vokser i styrke og farlighed, jo dybere han trænger ind i kampen.",
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
        { name: "Tohånds Bøddeløkse (Greataxe)", damage: "1d12 + 2", traits: "Nærkamp, Tohånds" },
        { name: "Kasteøkser (2 stk.)", damage: "1d6 + 2", traits: "Light, Kast Rækkevidde 4" }
      ],
      class_features: [
        { title: "Rage (1/tur - Handling)", text: "Rul en Fury Die (1d4) og læg den i din pulje. Læg terningens værdi til alle dine STY-angreb (maks. 2 Fury Dice i puljen). Dit raseri ophører ved 0 HP, eller hvis en hel runde passerer uden angreb eller raseri." },
        { title: "Is That All You Got?!", text: "Når du bliver angrebet, kan du bruge 1 eller flere Fury Dice fra puljen til at reducere skaden med STY + BEV (4) pr. terning." }
      ],
      inventory: [
        "Cheap Hides læderrustning (+3 Defense)",
        "Massiv tohånds bøddeløkse",
        "2x Kasteøkser i brystremme",
        "Slot 1: Læderremme & slibesten",
        "Slot 2: Røget vildtkød (3 dagsrationer)",
        "Slot 3: Drikkehorn med stærk dværgemjød",
        "Slot 4: Groft uldtæppe & flintesten"
      ],
      gold: { gp: 8, sp: 0, cp: 0 },
      notes: "Kendetegn: Brede skuldre dækket af ar; ler triumferende midt under kampens hede.\nPersonligt Mål: Nedlægge et sagnomspundet udyr alene og bringe dets kranie hjem som trofæ."
    },
    {
      id: "caldra_brightward",
      character_name: "Caldra Brightward",
      class: "The Oathsworn (Paladin)",
      level: 1,
      ancestry: "Dværg",
      background: "Hellig Vægter",
      quote: "En urokkelig, svært pansret beskytter, der kanaliserer guddommelig glans i sine knusende slag og holder sine forbundsfæller oprejst.",
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
        { name: "Stridskølle (Mace)", damage: "1d6 + 2", traits: "Nærkamp" },
        { name: "Træskjold (Wooden Buckler)", damage: "-", traits: "+2 Defense (medregnet i Defense-total)" }
      ],
      class_features: [
        { title: "Radiant Judgment", text: "Hver gang en fjende angriber dig, og du ikke har aktive Judgment Dice: Rul straks 2d6 Judgment Dice. Ved dit næste nærkampsangreb lægges terningernes sum direkte til som ekstra Radiant-skade." },
        { title: "Lay on Hands", text: "Helbredelsespulje på 5 HP (5 x Level). Handling: Berør en allieret og brug point fra puljen til at helbrede vedkommende. Genoplades ved Sikker Hvile (Safe Rest)." }
      ],
      inventory: [
        "Rusty Mail ringbrynje (+6 Defense)",
        "Træskjold med jernbeslag (+2 Defense)",
        "Jern-stridskølle",
        "Dværgegudens symbol udskåret i granit",
        "Slot 1: Stålfanger / håndjern med nøgle",
        "Slot 2: Rulle rene bandager & salver",
        "Slot 3: Flaske med vievand",
        "Slot 4: Lille mukkert & 4 jernkiler",
        "Feltrationer: 3 dage",
        "Lampeolie & lunte: [ ] [ ]"
      ],
      gold: { gp: 10, sp: 0, cp: 0 },
      notes: "Kendetegn: Flettet mørkt skæg bundet med bronzeringe; taler med en dyb, bydende røst.\nPersonligt Mål: Rense et vanhelliget bjergtempel og genrejse dets faldne alter."
    },
    {
      id: "virel_ember_eye",
      character_name: "Virel of the Ember Eye",
      class: "The Mage (Wizard)",
      level: 1,
      ancestry: "Højelver",
      background: "Frafalden Arkainer",
      quote: "En beregnende og skarp elvertroldmand, der tøjler Ild, Is og Lyn med præcis, uafvigelig kontrol.",
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
        { name: "Egetræsstav (Staff)", damage: "1d8 - 1", traits: "Nærkamp, Tohånds" },
        { name: "Fire Blast (Cantrip)", damage: "1d10 Ild", traits: "Rækkevidde 8 felter" },
        { name: "Frost Ray (Cantrip)", damage: "1d8 Is", traits: "Rækkevidde 8 felter, -2 Speed i 1 runde" },
        { name: "Lightning Arc (Cantrip)", damage: "1d6 Lyn", traits: "Rækkevidde 8 felter, springer til nærmeste væsen for 1d6 Lyn" }
      ],
      class_features: [
        { title: "Elemental Spellcasting", text: "Mestrer elementerne. Dine Cantrips koster 0 Mana og kræver 1 handling." }
      ],
      inventory: [
        "Adventurer's Garb kappe (+2 Defense)",
        "Udskåret egetræsstav med indfældet fokus-sten",
        "Læderetui til skriftruller",
        "Slot 1: Formelbog med arkane diagrammer",
        "Slot 2: Blækhus, 3 fjerpenne & 5 ark pergament",
        "Slot 3: Arkan lyssten (aktiveres ved berøring)",
        "Slot 4: Vaskesæbe & tørt klæde",
        "Mana Potion (+3 Mana): [ ] [ ]",
        "Rejserationer: 3 dage"
      ],
      gold: { gp: 12, sp: 0, cp: 0 },
      notes: "Kendetegn: Ravgyldne øjne; mumler formler dæmpet under åndedrættet.\nPersonligt Mål: Bevise over for akademiet, at elementarkræfterne ikke tæmmes af rigide dogmer og regelrytteri."
    },
    {
      id: "thorne_underbough",
      character_name: "Thorne Underbough",
      class: "The Hunter (Ranger)",
      level: 1,
      ancestry: "Halvering",
      background: "Skovboer & Bueskytte",
      quote: "En skarp sporer og bueskytte fra de dybe skove, der udpeger sit bytte og nedlægger det sikkert på lang afstand.",
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
        { name: "Kortbue (Shortbow)", damage: "1d6 + 2", traits: "Tohånds, Rækkevidde 12 felter" },
        { name: "Jægerdolk (Dagger)", damage: "1d4 + 2", traits: "Light, Kast Rækkevidde 4" }
      ],
      class_features: [
        { title: "Hunter's Mark (Handling)", text: "Udpeg en synlig skabning i 1 dag. Målet kan ikke gemme sig for dig. Dine angreb mod målet får enten Fordel (Advantage) eller +1 skade (vælges før hvert angreb)." },
        { title: "Forager", text: "Har altid fordel på færdighedstjek til at finde føde, rent vand og ly i vildmarken." }
      ],
      inventory: [
        "Cheap Hides læderrustning (+3 Defense)",
        "Kortbue & pilekogger med 20 pile",
        "Jægerdolk i bælteskede",
        "Slot 1: Kraftig jægerfælde af jern",
        "Slot 2: Sejlgarn og klatretov (15 m)",
        "Slot 3: Læderfeltflaske med farsk vand",
        "Slot 4: Uldent felttæppe & tændstål",
        "Tørret vildtkød & nødder: 4 dagsrationer",
        "Lægende urter (stabiliserer sårede): [ ] [ ]"
      ],
      gold: { gp: 10, sp: 0, cp: 0 },
      notes: "Kendetegn: Piberygende og fåmælt; observerer altid terræn og vindretning.\nPersonligt Mål: Opspore det udyr, der fordrev hans familie fra de sydlige skove."
    },
    {
      id: "kessa_quickstep",
      character_name: "Kessa Quickstep",
      class: "The Cheat (Rogue)",
      level: 1,
      ancestry: "Menneske",
      background: "Gadebarn",
      quote: "En snarrådig lommetyv med to slebne dolke og en slynge, der slår hårdt og ubemærket til fra skyggerne.",
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
        { name: "Tvillingedolke (Daggers)", damage: "1d4 + 2", traits: "Light, Kast Rækkevidde 4" },
        { name: "Slynge (Sling)", damage: "1d4 + 2", traits: "Rækkevidde 12 felter, Vicious" }
      ],
      class_features: [
        { title: "Sneak Attack (1/tur)", text: "Når du ruller en Kritisk Træffer (maksimal terningværdi), tilføjer du +1d6 ekstra skade." },
        { title: "Vicious Opportunist (1/tur)", text: "Når du rammer et afledt mål (Distracted) i nærkamp, vælger du selv terningens udfald. Vælger du maksimum, tæller det som en Kritisk Træffer." }
      ],
      inventory: [
        "Cheap Hides læderrustning (+3 Defense)",
        "2x Ståldolke i specialskeder",
        "Læderslynge & pose med 20 rullesten",
        "Låsedirkesæt i inderlomme",
        "Slot 1: Tynd rebsnøre (10 m) & klatrekrog",
        "Slot 2: Kridt (3 stykker) & lille lommespejl",
        "Slot 3: Tændstål & tøndresvamp",
        "Rationer (tørret frugt og brød): 3 dage",
        "Lille helbredelseseliksir (helbreder 1d6 HP): [ ] [ ]"
      ],
      gold: { gp: 15, sp: 0, cp: 0 },
      notes: "Kendetegn: Et tyndt ar over venstre øjenbryn; træder altid blødt og uden lyd.\nPersonligt Mål: Afsløre hvem der forrådte den gamle gadebande i havnekvarteret."
    },
    {
      id: "valen_ironcrest",
      character_name: "Valen Jernmanke",
      class: "The Commander (Fighter / Warlord)",
      level: 1,
      ancestry: "Menneske",
      background: "Kamphærdet Kaptajn",
      quote: "En frygtløs hærfører og våbenmester, der koordinerer holdets angreb med militær præcision og tvinger modstanderne til at begå fatale fejl.",
      hp: 17,
      hp_max: 17,
      hit_die: "1d10",
      defense: 8,
      defense_calc: "6 Rustning + 2 Skjold",
      speed: "6 felter",
      initiative: "0",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Might (+4)" },
        DEX: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Finesse (0)" },
        INT: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Examination (+3), Lore (Taktik) (+3)" },
        WIL: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "Influence (+1)" }
      },
      attacks: [
        { name: "Hærdet Langsværd", damage: "1d8 + 2", traits: "Nærkamp, Versatile 1d10, Martial" },
        { name: "Tungt Jernskjold", damage: "-", traits: "Skjold, +2 Defense, Blokerer slag" },
        { name: "Kaste-Spyd (3 stk.)", damage: "1d6 + 2", traits: "Kast, Rækkevidde 6 felter" }
      ],
      class_features: [
        { title: "Combat Tactics (1d8 Combat Die)", text: "Brug en d8 Combat Die for at tilføje en specialtaktik: Heavy Strike skubber fjenden 2 felter og tilføjer terningens værdi som skade; Inerrant Strike lader dig rulle et misset angreb om og lægge terningen oveni; Lunging Strike giver +1 rækkevidde og tilføjer dobbelt terningens værdi i skade. (1/angreb)" },
        { title: "Coordinated Strike!", text: "2 gange pr. Safe Rest kan du beordre et lynangreb: Du og én allieret inden for 6 felter udfører begge øjeblikkeligt et gratis våbenangreb eller kaster en cantrip." },
        { title: "Commander's Order: Hold the Line!", text: "Én gang pr. encounter kan du som reaktion forhindre en allieret inden for synsvidde i at falde til 0 HP: Sæt straks deres HP til 3 x dit niveau." }
      ],
      inventory: [
        "Rusty Mail ringbrynje (+6 Defense)",
        "Tungt jernskjold (+2 Defense)",
        "Langsværd i bælteskede",
        "3x Kaste-spyd over ryggen",
        "Taktisk feltoversigtskort",
        "Signalhorn af messing",
        "Feltkirurgisk nål & tråd",
        "Vokslys & kridt",
        "3 dages tørrede feltrationer"
      ],
      gold: { gp: 12, sp: 0, cp: 0 },
      notes: "Kendetegn: Taler med myndig baryton; vurderer instinktivt flugtveje og chokepoints i ethvert rum.\nPersonligt Mål: Genopbygge en faldet legion og bevise over for riget, at ægte sejr vindes gennem kammeratskab.\nAllierede: Garnisonsmesteren i grænsefæstningen; en gammel våbensmed der skylder ham sit liv."
    },
    {
      id: "morwen_duskwhisper",
      character_name: "Morwen Skæbnespind",
      class: "The Shadowmancer (Warlock / Minionmancer)",
      level: 1,
      ancestry: "Mørkelver",
      background: "Pagtsøgende Kætterskriver",
      quote: "En gådefuld okkultist, der har indgået en pagt med en ældgammel rædsel og fremmaner horder af loyale skyggeminions som kødskjold og bødler.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 4,
      defense_calc: "2 Adventurer's Garb + 2 DEX",
      speed: "6 felter",
      initiative: "+2",
      wounds: 0,
      stats: {
        STR: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "" },
        DEX: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Stealth (+4), Finesse (+2)" },
        INT: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Arcana (+4), Examination (+3), Lore (Det Okkulte) (+3)" },
        WIL: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "" }
      },
      attacks: [
        { name: "Shadow Blast (Cantrip)", damage: "1d12 + 2 Nekrotisk", traits: "Magi, Rækkevidde 8 felter, 1/tur, Crits eksploderer" },
        { name: "Skygge-Kommando (Minions)", damage: "1d12 Nekrotisk pr. minion", traits: "Magi/Minion, Rækkevidde 1, 1 HP pr. minion, ingen crits eller hasteangrebsstraf" },
        { name: "Forgyldt Ritualdolk", damage: "1d4 + 2", traits: "Nærkamp, Finesse, Light" }
      ],
      class_features: [
        { title: "Summon Shadows (Nekrotisk Cantrip)", text: "Fremman en Skyggeminion inden for 1 felt. Du kan have op til din INT (2 minions) aktive ad gangen. Minions har 1 HP, bevæger sig 6 felter og forsvinder, når kampen slutter." },
        { title: "Command the Horde", text: "Beordr alle dine skyggeminions på én gang til at bevæge sig op til 6 felter og udføre et 1d12 nekrotisk angreb. Minionernes angreb tæller ikke som et hasteangreb for dig selv. (1/tur)" },
        { title: "Abhorrent Whispers", text: "Du kan tale flydende med udøde, dæmoner og aberrationer. Ingen afskyer fra skyggeriget kan overraske dig i mørke." }
      ],
      inventory: [
        "Adventurer's Garb kappe med ravnefjer (+2 Defense)",
        "Forgyldt krum ritualdolk",
        "Sort glaskugle (Okkult Fokus)",
        "Krukke med sort påkaldelsesblæk",
        "Bog indbundet i koldt skind",
        "3x Sort kridt til beskyttelsescirkler",
        "Død ravnefod som amulet",
        "3 dages tørrede svampe og brød"
      ],
      gold: { gp: 11, sp: 0, cp: 0 },
      notes: "Kendetegn: Bleg hud og kulsorte øjne; taler ofte lavmælt til skyggerne i krogene, som var de gamle venner.\nPersonligt Mål: Afdække sin patrons sande navn og bryde den forbandelse, der plager hendes slægt.\nAllierede: En lyssky antikvar i havnebyen; en forvist nekromantiker der kender de gamle ritualer."
    },
    {
      id: "gareth_sunheart",
      character_name: "Broder Gareth Solhjerte",
      class: "The Shepherd (Cleric / Spirit Guide)",
      level: 1,
      ancestry: "Menneske",
      background: "Klosterlæge & Feltpræst",
      quote: "En barmhjertig og standhaftig sjælehyrde, der mestrer balancen mellem liv og død, altid ledsaget af en lysende åndefælle (Lifebinding Spirit).",
      hp: 17,
      hp_max: 17,
      hit_die: "1d10",
      defense: 8,
      defense_calc: "6 Rustning + 2 Skjold",
      speed: "6 felter",
      initiative: "0",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Might (+3)" },
        DEX: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "" },
        INT: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Examination (Medicin) (+2)" },
        WIL: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Insight (+4), Influence (+3), Perception (+3)" }
      },
      attacks: [
        { name: "Velsignet Stridskølle", damage: "1d6 + 2", traits: "Nærkamp, STR-våben" },
        { name: "Træskjold med Solhjul", damage: "-", traits: "Skjold, +2 Defense" },
        { name: "Sacred Flame (Cantrip)", damage: "1d8 Radiant", traits: "Magi, Rækkevidde 6 felter, Ignorerer dække" },
        { name: "Chill Touch (Cantrip)", damage: "1d6 Nekrotisk", traits: "Magi, Rækkevidde 6 felter, Forhindrer HP-regen" }
      ],
      class_features: [
        { title: "Searing Light", text: "To gange pr. Safe Rest kan du bruge en handling på rækkevidde 6 felter til enten at helbrede 2d8 HP på en Døende eller allieret på 0 HP eller give 2d8 Radiant-skade til en udød eller Blodig fjende." },
        { title: "Keeper of Life & Death", text: "Du kender både Radiant- og Necrotic-magi. Du kan stabilisere faldne helte gratis uden medicin-tjek." }
      ],
      inventory: [
        "Rusty Mail ringbrynje (+6 Defense)",
        "Træskjold (+2 Defense)",
        "Stridskølle",
        "Sølvkæde med solsymbol",
        "Feltlægetaske med linnedruller og kniv",
        "Flakon med velsignet salvingsolie",
        "Rensende urtesalve",
        "Træske & messingtallerken",
        "3 dages brød og ost"
      ],
      gold: { gp: 10, sp: 0, cp: 0 },
      notes: "Kendetegn: Venligt ansigt med dybe smilerynker; lægger altid en trøstende hånd på skulderen af folk i nød.\nPersonligt Mål: Lindre lidelserne i de krigshærgede grænselande og bygge et hospice for de sårede.\nAllierede: En abbedisse ved bjergklosteret; en helbredt landevejsrøver der har svoret troskab."
    },
    {
      id: "lyra_silverchord",
      character_name: "Lyra Sølvstreng",
      class: "The Songweaver (Bard / Skjald)",
      level: 1,
      ancestry: "Halvelver",
      background: "Hofmusiker & Rejsende Visefortæller",
      quote: "En karismatisk troubadour med en lynsnild tunge, der inspirerer helte til umulige bedrifter og efterlader fjender forvirrede med spydige vers.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 5,
      defense_calc: "3 Rustning + 2 DEX",
      speed: "6 felter",
      initiative: "+2",
      wounds: 0,
      stats: {
        STR: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "" },
        DEX: { rating: "+2", key: false, save: "Neutral (1d20)", skills: "Finesse (+3)" },
        INT: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Lore (Ballader & Sagn) (+4)" },
        WIL: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Influence (Optræden/Tale) (+4), Insight (+3), Perception (+2)" }
      },
      attacks: [
        { name: "Vicious Mockery (Cantrip)", damage: "1d4 + 2 Psykisk", traits: "Magi, Rækkevidde 12 felter, Ignorerer rustning, Taunted i næste tur" },
        { name: "Razor Wind (Cantrip)", damage: "1d4 Slashing", traits: "Magi, Rækkevidde 8 felter, Ruller 2 terninger ved Crit" },
        { name: "Breath of Life (Cantrip)", damage: "-", traits: "Magi/Healing, Rækkevidde 1 felt, Giver 1 HP til en Dying helt og fjerner Dying" },
        { name: "Finslebet Kårde (Rapier)", damage: "1d6 + 2", traits: "Nærkamp, Finesse, DEX" }
      ],
      class_features: [
        { title: "Songweaver's Inspiration", text: "Fire gange pr. Safe Rest kan du som fri reaktion synge en opmuntrende strofe, når en allieret slår fejl på et angreb eller redningsslag, så de straks kan omrulle terningen." },
        { title: "Vicious Mockery", text: "Brug en handling på rækkevidde 12 felter til at give 1d4 + INT (2) psykisk skade, der ignorerer målets Defense. Målet bliver Taunted og tvunget til at fokusere på dig i sin næste tur." }
      ],
      inventory: [
        "Cheap Hides læderrustning (+3 Defense)",
        "Håndbygget kirsebærtræs-lut med sølvstrenge",
        "Slank kårde i lakeret læderskede",
        "Læderetui med nodepapir og fjerpen",
        "Fløjlspung til drikkepenge",
        "3 flasker god elvervin",
        "Spillekort og terninger",
        "3 dages fine rejserationer"
      ],
      gold: { gp: 14, sp: 0, cp: 0 },
      notes: "Kendetegn: Altid et glimt i øjet og et vittigt modsvar på læben; kan ikke modstå et godt væddemål eller en god historie.\nPersonligt Mål: Komponere det store epos om denne gruppes heltegerninger og synge det for højkongebordet.\nAllierede: En berømt teaterdirektør i hovedstaden; kroværter langs alle store kongeveje."
    },
    {
      id: "kieran_stormstrider",
      character_name: "Kieran Stormkald",
      class: "The Stormshifter (Druid / Formskifter)",
      level: 1,
      ancestry: "Skovelver",
      background: "Eremit & Stormvogter",
      quote: "En uforudsigelig naturpræst, der behersker lyn og tordenskyer på afstand og forvandler sig til en frygtindgydende rovdyrsform i kampens midte.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 5,
      defense_calc: "3 Rustning + 2 DEX",
      speed: "6 felter",
      initiative: "+2",
      wounds: 0,
      stats: {
        STR: { rating: "0", key: false, save: "Neutral (1d20)", skills: "" },
        DEX: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Stealth (+3), Finesse (+2)" },
        INT: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "" },
        WIL: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Naturecraft (+4), Perception (+4), Insight (+2)" }
      },
      attacks: [
        { name: "Shocking Grasp (Lyn-cantrip)", damage: "1d8 Lyn", traits: "Magi, Rækkevidde 8 felter, Elektrificerer målet ved Crit" },
        { name: "Gale Blast (Vind-cantrip)", damage: "1d6 Slag", traits: "Magi, Rækkevidde 6 felter, Skubber målet 2 felter tilbage" },
        { name: "Asketræspyd", damage: "1d6 + 2", traits: "Nærkamp/Kast, Rækkevidde 6 felter, Versatile 1d8" }
      ],
      class_features: [
        { title: "Beastshift (Formskifte)", text: "To gange pr. Safe Rest kan du bruge en handling på frit at forvandle dig til et harmløst dyr (ugle, falk, mår, egern eller odder). Du kan tale med alle dyr, beholder din forstand og kan snige dig overalt. Formen varer indtil 0 HP, spellcast eller frivillig afbrydelse." },
        { title: "Master of Storms", text: "Du kender elementære cantrips fra Lyn- og Vind-skolerne. Du kan manipulere vindstød til at slukke fakler eller sprede røg." }
      ],
      inventory: [
        "Cheap Hides læderrustning (+3 Defense)",
        "Asketræspyd med flinteod",
        "Halskæde af rovfuglekløer (Naturfokus)",
        "Pose med tørrede tordengræsfrø",
        "Snittet knoglefløjte",
        "Læder-vandblære",
        "Uldent regnslag",
        "3 dages tørrede bær og nødder"
      ],
      gold: { gp: 11, sp: 0, cp: 0 },
      notes: "Kendetegn: Vågent blik og lugtesans som en ulv; sidder helst på hug og trives bedst under åben himmel.\nPersonligt Mål: Bringe balance tilbage til skoven efter at en mørk korruption har forgiftet dyrene.\nAllierede: En gammel kæmpeugle i kronetræerne; eneboer-druiden i Tågedalen."
    }
  ]
};
