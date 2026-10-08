const NIMBLE_DATA = {
  rules: {
    actions: {
      title: "1. Dine 3 Handlinger (Actions)",
      desc: "På din tur har du 3 handlinger til fri fordeling. Det meste i kamp koster 1 handling; særligt stærke evner og formularer kan koste flere:",
      items: [
        "Initiativ: Rul 1d20 + din Initiative (typisk DEX). Ét ciffer = 1 handling i første runde, to cifre = 2 handlinger, 20+ (eller en naturlig 20) = alle 3.",
        "Bevæge dig (Move): Ryk op til din Speed (normalt 6 felter; 1 felt = ca. 1 meter). Besværligt terræn (Difficult Terrain), fx klatring, halverer farten.",
        "Angribe (Attack): Enhver evne eller formular, der kan skade en fjende, tæller som et angreb.",
        "Kaste formular (Cast Spell): Kræver en fri hånd (eller et fokus) og evnen til at tale. Cantrips koster ingen mana; tiered spells koster mana svarende til deres tier.",
        "Vurdere situationen (Assess): Slå et færdighedstjek (DC 10) for at stille et spørgsmål, skabe en åbning (+1 til næste Primary Die mod et mål) eller forudse fare (-1 til alle Primary Dice mod dig). Du kan ikke bruge samme færdighed to gange i samme encounter.",
        "Frie handlinger: Simple ting (åbne en ulåst dør, råbe en kort sætning, tabe en genstand, afbryde Concentration) er gratis 1 gang pr. tur. At drikke en helbredelsesdrik koster 1 handling."
      ],
      refreshNote: "Action Refresh (Nulstilling): Alle 3 handlinger genoplades, når din tur SLUTTER – gem dem aldrig. Bruger du handlinger på reaktioner uden for din tur, starter du din næste tur med færre."
    },
    attacks: {
      title: "2. Sådan Angriber Du (Ingen 'Rul for at Ramme')",
      desc: "I Nimble ruller du ikke for at ramme. Du ruller direkte skadesterningerne for dit våben eller din formel. Terningen længst til venstre er din Primary Die og afgør, om angrebet rammer:",
      items: [
        "1 på Primary Die = Fejlskud (Miss): Angrebet har ingen effekt.",
        "Maks. på Primary Die = Kritisk træffer (Crit): Rul Primary Die igen og læg tallet oveni. Slår du maks. igen, så rul igen – uden loft! Crits ignorerer rustning på begge sider: monstres Armor og din egen Defense, når du forsvarer dig.",
        "Våben, du ikke er trænet i (proficiency), kan ikke crit'e.",
        "Hasteangreb (Rushed Attacks): Hvert angreb efter det første i samme tur får kumulativ Ulempe – 2. angreb Ulempe 1, 3. angreb Ulempe 2.",
        "Fordel/Ulempe (Advantage/Disadvantage): Fordel = rul 1 ekstra terning og fjern den laveste. Ulempe = rul 1 ekstra terning og fjern den højeste. Hver Fordel ophæver én Ulempe.",
        "Afstandsangreb: Står en fjende ved siden af dig, har dine afstandsangreb Ulempe. Du kan tage 1 Ulempe for +2 Range (maks. +6).",
        "Rustede monstre: Medium Armor trækker 10 skade fra hvert angreb, Heavy Armor 20 skade. Crits ignorerer det."
      ]
    },
    defense: {
      title: "3. Heroiske Reaktioner (på Fjendens Tur)",
      desc: "Reaktioner udføres, når det IKKE er din tur, og koster 1 handling hver. Du kan højst udføre hver reaktion 1 gang pr. runde (nulstilles, når din egen tur slutter):",
      items: [
        "Forsvar (Defend): Reducér skaden fra ét angreb med din Defense. Nogle skader kan ikke undgås (fx psykisk skade og visse områdeangreb), og crits ignorerer din Defense.",
        "Træd Imellem (Interpose): Rammes en skabning inden for 2 felter af et angreb, kan du skubbe dem ud af vejen og blive angrebets nye mål. Du træder ind i deres felt; de flyttes til et tilstødende felt efter eget valg. Du kan både Interpose og Defend, hvis du har handlinger nok.",
        "Chanceangreb (Opportunity Attack): Et nærkampsangreb med Ulempe mod en tilstødende skabning, der frivilligt bevæger sig væk. Kun helte laver chanceangreb – ikke monstre.",
        "Hjælp (Help): Lad en allieret omrulle en terning (efter at have set resultatet), hvis du kan forklare spillederen (GM), hvordan du hjælper. Højst én Help-reaktion pr. rul."
      ]
    },
    saves: {
      title: "4. Redningsslag (Saves) & Færdighedstjek",
      desc: "Når verden påvirker DIG (magi, fælder, farer), slår du et save: 1d20 + den relevante egenskab. En naturlig 1 fejler altid; en naturlig 20 lykkes altid.",
      items: [
        "1 Advantaged Save (+): Slå altid med Fordel.",
        "1 Disadvantaged Save (-): Slå altid med Ulempe.",
        "2 neutrale saves: Slå almindeligt 1d20 + egenskab.",
        "Færdighedstjek: Når du vil påvirke verden, slår du 1d20 + færdigheden mod en DC, som GM fastsætter. Den højeste færdighedsbonus er +10.",
        "DC for effekter, du selv forårsager, er normalt 10 + KEY (en af dine to Key Stats)."
      ]
    },
    dying: {
      title: "5. Hvad sker der ved 0 HP? (Dying & Wounds)",
      desc: "Når dine HP rammer 0, får du straks 1 Wound og tilstanden Døende (Dying), indtil du får HP tilbage:",
      items: [
        "Som Dying har du kun 1 handling pr. tur, og din Concentration brydes.",
        "Angriber du, mens du er Dying, får du 1 ekstra Wound, medmindre du består et DC 10 STR-save. (Ikke-angribende formularer som Heal er sikre at kaste.)",
        "Tager du skade, mens du er Dying, får du 2 Wounds (3 ved et Crit).",
        "6 Wounds = Karakteren er død (medmindre en evne ændrer tallet).",
        "Får du HP tilbage (healing), ophører Dying. Wounds heler typisk kun 1 pr. Safe Rest.",
        "Hvile: Catch Breath (10 min.) – brug Hit Dice enkeltvis, rul dem og læg din STR til hver. Make Camp (8 timer) – tag maks. værdi på hver brugt Hit Die. Safe Rest (sikkert sted, fx en kro) – alle HP, Hit Dice og mana genoprettes, og 1 Wound heler."
      ]
    },
    inventory: {
      title: "6. Bæreevne (Inventory Slots)",
      desc: "Du har 10 + STR slots til udstyr og fund (båret, i brug eller i rygsæk). Mindre, beslægtede småting kan samles i ét slot, og ammunition behøver normalt ikke tælles.",
      items: [
        "1 slot: ét enhåndsvåben, skjold, båret rustning, en stak javelins, 500 gp eller 2 helbredelsesdrikke.",
        "2 slots: tohåndsvåben, rustning som ikke bæres og lignende klodset udstyr.",
        "Træning (proficiency): Våben, du ikke er trænet i, kan ikke crit'e. Forsvarer du dig i rustning, du ikke er trænet i, koster Defend 1 ekstra handling.",
        "Husregel i denne app (ikke i grundbogen): 100 mønter = 1 slot. Genstande med 0 slots tæller som småting – de første 5 er gratis, derefter tæller hver som 1 slot.",
        "Husregel i denne app (ikke i grundbogen): Overbelastet (mere end 10 + STR slots) giver -2 Speed og Ulempe på STR- og DEX-tjek og -saves.",
        "Husregel i denne app (ikke i grundbogen): Immobiliseret (mere end 10 + STR + 5 slots) giver Speed 0."
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
      background: "Acrobat (klostermunk)",
      quote: "En disciplineret nævekæmper, der afværger angreb med de bare hænder og bevæger sig ubesværet over slagmarken uden panser.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 4,
      defense_calc: "Iron Defense: DEX 2 + STR 2",
      speed: "6 felter",
      initiative: "+3",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Might (+4)" },
        DEX: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Finesse (+4), Stealth (+4)" },
        INT: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Arcana (0), Examination (0), Lore (0)" },
        WIL: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Influence (+1), Insight (+2), Naturecraft (+1), Perception (+1)" }
      },
      attacks: [
        { name: "Ubevæbnet slag (Unarmed Strike)", damage: "1d4 + 2", traits: "Nærkamp, trænet (kan crit'e), to næver = dual wield (Fordel 1/runde), Momentum" },
        { name: "Staff (stav)", damage: "1d8 + 2", traits: "Nærkamp, Tohånds, Momentum" }
      ],
      class_features: [
        { title: "Iron Defense", text: "Din Defense er DEX + STR (2 + 2 = 4), så længe du ikke bærer rustning." },
        { title: "Momentum", text: "Få 1 Momentum for hvert nyt felt, du går ind i på din tur. Brug 1 Momentum for at lægge 1 skade til et nærkampsangreb. Al Momentum mistes, hvis du tager skade, eller når kampen slutter." },
        { title: "Tenacious (herkomst: Menneske)", text: "+1 til alle færdigheder og Initiative (allerede indregnet)." },
        { title: "Acrobat (baggrund)", text: "Du kan blive kastet af en større allieret – virkelig langt. Du tager halv skade fra fald og tvungen bevægelse." }
      ],
      inventory: [
        "Staff (stav af jerntræ)",
        "Traveling Robes & Sandals (rejsekutte og sandaler)",
        "Småting: bønnesnor, røgelsespinde, urtete og rejserationer"
      ],
      inventory_slots: [2, 1, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Rolig, kontrolleret vejrtrækning; bevæger sig fuldstændig lydløst.\nPersonligt mål: Finde den forsvundne mester og bringe klosterets stjålne skriftrulle tilbage."
    },
    {
      id: "bram_bloodfury",
      character_name: "Bram Bloodfury",
      class: "The Berserker (Barbarian)",
      level: 1,
      ancestry: "Menneske",
      background: "Wild One (vildmarkskriger)",
      quote: "En voldsom urkraft drevet af blodtørst og raseri, der vokser i styrke og farlighed, jo dybere han trænger ind i kampen.",
      hp: 20,
      hp_max: 20,
      hit_die: "1d12",
      defense: 2,
      defense_calc: "Uden rustning: DEX 2 (Berserker er ikke trænet i rustning)",
      speed: "6 felter",
      initiative: "+3",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Might (+5)" },
        DEX: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Finesse (+3), Stealth (+3)" },
        INT: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Arcana (0), Examination (0), Lore (0)" },
        WIL: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Influence (+1), Insight (+1), Naturecraft (+3), Perception (+2)" }
      },
      attacks: [
        { name: "Battleaxe (stridsøkse)", damage: "1d10 + 2 + Fury Dice", traits: "Slashing, Nærkamp, Tohånds" }
      ],
      class_features: [
        { title: "Rage", text: "(1/tur) Handling: Rul en Fury Die (1d4) og læg den til side. Læg den til alle dine STR-angreb. Du kan have maks. KEY (2) Fury Dice ad gangen; de mistes, når din Rage ender." },
        { title: "That all you got?!", text: "Når du bliver angrebet, kan du bruge 1 eller flere Fury Dice til at reducere skaden med STR + DEX (4) for hver brugt terning." },
        { title: "Tenacious (herkomst: Menneske)", text: "+1 til alle færdigheder og Initiative (allerede indregnet)." },
        { title: "Wild One (baggrund)", text: "Vilde dyr er mindre bange for dig og mere villige til at hjælpe dig. +1 Naturecraft (allerede indregnet). Ved Field Rest i vildmarken genvinder dine Hit Dice +KEY (2) ekstra HP." }
      ],
      inventory: [
        "Battleaxe (massiv stridsøkse)",
        "Rope (50 ft.)",
        "Rations (røget vildtkød)",
        "Småting: slibesten, drikkehorn, uldtæppe og flint"
      ],
      inventory_slots: [2, 1, 1, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Brede skuldre dækket af ar; ler triumferende midt i kampens hede.\nPersonligt mål: Nedlægge et sagnomspundet udyr alene og bringe dets kranie hjem som trofæ."
    },
    {
      id: "caldra_brightward",
      character_name: "Caldra Brightward",
      class: "The Oathsworn (Paladin)",
      level: 1,
      ancestry: "Dværg",
      background: "History Buff (hellig vægter)",
      quote: "En urokkelig, svært pansret beskytter, der kanaliserer guddommelig glans i sine knusende slag og holder sine forbundsfæller oprejst.",
      hp: 17,
      hp_max: 17,
      hit_die: "3d10",
      defense: 8,
      defense_calc: "Rusty Mail 6 + DEX 0 + Wooden Buckler 2",
      speed: "5 felter",
      initiative: "0",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Might (+3)" },
        DEX: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Finesse (0), Stealth (0)" },
        INT: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "Arcana (-1), Examination (-1), Lore (-1)" },
        WIL: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Influence (+3), Insight (+3), Naturecraft (+2), Perception (+3)" }
      },
      attacks: [
        { name: "Mace (stridskølle)", damage: "1d6 + 2", traits: "Bludgeoning, Nærkamp, Judgment Dice" }
      ],
      class_features: [
        { title: "Radiant Judgment", text: "Hver gang en fjende angriber dig, og du ikke har Judgment Dice: Rul dine Judgment Dice (2d6). Rammer du med dit næste nærkampsangreb i denne encounter, giver terningernes sum ekstra radiant skade. Terningerne bruges, uanset om du rammer eller ej." },
        { title: "Lay on Hands", text: "Du har en magisk helbredelsespulje på 5 HP (5 x LVL), som genoplades ved Safe Rest. Handling: Berør et mål og brug point fra puljen til at genoprette lige så mange HP." },
        { title: "Stout (herkomst: Dværg)", text: "+2 maks. Hit Dice (3 i alt), +1 maks. Wounds (du dør først ved 7 Wounds) og -1 Speed (allerede indregnet)." },
        { title: "History Buff (baggrund)", text: "Fordel på Lore-tjek om genstande, fakta eller begivenheder, der ligger mere end 100 år tilbage." }
      ],
      inventory: [
        "Mace (jernstridskølle)",
        "Rusty Mail (ringbrynje, båret)",
        "Wooden Buckler (træskjold med jernbeslag)",
        "Manacles (håndjern med nøgle)",
        "Småting: helligt symbol af granit, bandager, vievand og lampe"
      ],
      inventory_slots: [1, 1, 1, 1, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Flettet mørkt skæg bundet med bronzeringe; taler med en dyb, bydende røst.\nPersonligt mål: Rense et vanhelliget bjergtempel og genrejse dets faldne alter."
    },
    {
      id: "virel_ember_eye",
      character_name: "Virel of the Ember Eye",
      class: "The Mage (Wizard)",
      level: 1,
      ancestry: "Elf (højelver)",
      background: "Academy Dropout (frafalden arkainer)",
      quote: "En beregnende og skarp elvertroldmand, der tøjler ild, is og lyn med præcis, uafvigelig kontrol.",
      hp: 10,
      hp_max: 10,
      hit_die: "1d6",
      defense: 2,
      defense_calc: "Adventurer's Garb 2 + DEX 0",
      speed: "7 felter",
      initiative: "0 (Fordel)",
      wounds: 0,
      stats: {
        STR: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Might (-1)" },
        DEX: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Finesse (0), Stealth (0)" },
        INT: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Arcana (+4), Examination (+3), Lore (+3)" },
        WIL: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Influence (+2), Insight (+2), Naturecraft (+2), Perception (+2)" }
      },
      attacks: [
        { name: "Staff (egetræsstav)", damage: "1d8 - 1", traits: "Bludgeoning, Nærkamp, Tohånds" },
        { name: "Flame Dart (Fire cantrip)", damage: "1d10 Ild", traits: "Magi, Range 10, ved Crit: Smoldering" },
        { name: "Ice Lance (Ice cantrip)", damage: "1d6 Kulde/Piercing", traits: "Magi, Range 12, ved træf: Slowed" },
        { name: "Zap (Lightning cantrip)", damage: "1d8 + 4 Lyn", traits: "Magi, Range 8, ved Fejlskud tager du halv skade selv" }
      ],
      class_features: [
        { title: "Elemental Spellcasting", text: "Du kender Fire-, Ice- og Lightning-cantrips (fx Flame Dart, Ice Lance, Zap, Heart's Fire, Snowblind og Overload). Cantrips koster ingen mana. Mana og tier 1-formularer låses op på level 2." },
        { title: "Lithe (herkomst: Elf)", text: "Fordel på Initiative og +1 Speed (allerede indregnet). Du kender Elvish." },
        { title: "Academy Dropout (baggrund)", text: "Du kender 1 ekstra Utility Spell: Kindle (konjurér en mindre visuel illusion ELLER antænd en lille, ikke-holdt genstand inden for Range 6)." }
      ],
      inventory: [
        "Adventurer's Garb (kappe)",
        "Staff (udskåret egetræsstav med fokus-sten)",
        "Småting: formelbog, blækhus og fjerpenne, lyssten og sæbe"
      ],
      inventory_slots: [1, 2, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Ravgyldne øjne; mumler formler dæmpet under åndedrættet.\nPersonligt mål: Bevise over for akademiet, at elementarkræfterne ikke lader sig tæmme af rigide dogmer og regelrytteri."
    },
    {
      id: "thorne_underbough",
      character_name: "Thorne Underbough",
      class: "The Hunter (Ranger)",
      level: 1,
      ancestry: "Halvering",
      background: "Wild One (skovboer og bueskytte)",
      quote: "En skarp sporer og bueskytte fra de dybe skove, der udpeger sit bytte og nedlægger det sikkert på lang afstand.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 5,
      defense_calc: "Cheap Hides 3 + DEX 2",
      speed: "6 felter",
      initiative: "+2",
      wounds: 0,
      stats: {
        STR: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Might (0)" },
        DEX: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Finesse (+2), Stealth (+4)" },
        INT: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Arcana (-1), Examination (-1), Lore (-1)" },
        WIL: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Influence (+2), Insight (+3), Naturecraft (+5), Perception (+2)" }
      },
      attacks: [
        { name: "Shortbow (kortbue)", damage: "1d6 + 2", traits: "Piercing, Tohånds, Range 12" },
        { name: "Dagger (jægerdolk)", damage: "1d4 + 2", traits: "Piercing, Light, Thrown 4" }
      ],
      class_features: [
        { title: "Hunter's Mark (Handling)", text: "En skabning, du kan se, bliver dit bytte (quarry) i 1 dag (eller til du udpeger en anden). Den kan ikke skjule sig for dig, og dine angreb mod den får efter eget valg Fordel ELLER +LVL (1) skade – vælges før hvert angreb." },
        { title: "Forager", text: "Fordel på færdighedstjek for at finde mad og vand i vildmarken." },
        { title: "Elusive (herkomst: Halvering)", text: "+1 Stealth (allerede indregnet). Fejler du et save, kan du i stedet lykkes (1/Safe Rest)." },
        { title: "Wild One (baggrund)", text: "Vilde dyr er mindre bange for dig og mere villige til at hjælpe dig. +1 Naturecraft (allerede indregnet). Ved Field Rest i vildmarken genvinder dine Hit Dice +KEY (2) ekstra HP." }
      ],
      inventory: [
        "Shortbow (kortbue med kogger og pile)",
        "Cheap Hides (læderrustning, båret)",
        "Dagger (jægerdolk i bælteskede)",
        "Hunting Trap (kraftig jægerfælde af jern)",
        "Småting: sejlgarn, feltflaske, uldtæppe og tændstål"
      ],
      inventory_slots: [2, 1, 1, 1, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Piberygende og fåmælt; observerer altid terræn og vindretning.\nPersonligt mål: Opspore det udyr, der fordrev hans familie fra de sydlige skove."
    },
    {
      id: "kessa_quickstep",
      character_name: "Kessa Quickstep",
      class: "The Cheat (Rogue)",
      level: 1,
      ancestry: "Menneske",
      background: "Ear to the Ground (gadebarn)",
      quote: "En snarrådig lommetyv med to slebne dolke og en slynge, der slår hårdt og ubemærket til fra skyggerne.",
      hp: 10,
      hp_max: 10,
      hit_die: "1d6",
      defense: 5,
      defense_calc: "Cheap Hides 3 + DEX 2",
      speed: "6 felter",
      initiative: "+3",
      wounds: 0,
      stats: {
        STR: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "Might (0)" },
        DEX: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Finesse (+4), Stealth (+5)" },
        INT: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Arcana (+3), Examination (+4), Lore (+3)" },
        WIL: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Influence (+1), Insight (+1), Naturecraft (+1), Perception (+1)" }
      },
      attacks: [
        { name: "2x Daggers (tvillingedolke)", damage: "1d4 + 2", traits: "Piercing, Light, to dolke = dual wield (Fordel 1/runde), Thrown 4" },
        { name: "Sling (slynge)", damage: "1d4 + 2", traits: "Bludgeoning, Tohånds, Range 12, Vicious" }
      ],
      class_features: [
        { title: "Sneak Attack", text: "(1/tur) Når du får en Kritisk træffer (Crit), giver du +1d6 ekstra skade." },
        { title: "Vicious Opportunist", text: "(1/tur) Når du rammer et Distracted mål med et nærkampsangreb, må du ændre Primary Die til, hvad du vil (maks. tæller som Crit). Et mål er Distracted, hvis det er ved siden af eller Taunted af en allieret, eller hvis det ikke kan se dig. Kan bruges igen samme runde, hvis du finder en måde at angribe på en andens tur." },
        { title: "Tenacious (herkomst: Menneske)", text: "+1 til alle færdigheder og Initiative (allerede indregnet)." },
        { title: "Ear to the Ground (baggrund)", text: "Fordel på tjek for at kende eller opsnappe sladder om begivenheder, der snart sker eller er sket for mindre end 1 år siden." }
      ],
      inventory: [
        "2x Daggers (stål i specialskeder)",
        "Sling (læderslynge med rullesten)",
        "Cheap Hides (læderrustning, båret)",
        "Småting: kridt, låsedirke, tændstål og rebsnøre"
      ],
      inventory_slots: [2, 1, 1, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Et tyndt ar over venstre øjenbryn; træder altid blødt og uden lyd.\nPersonligt mål: Afsløre, hvem der forrådte den gamle gadebande i havnekvarteret."
    },
    {
      id: "valen_ironcrest",
      character_name: "Valen Jernmanke",
      class: "The Commander (Fighter / Warlord)",
      level: 1,
      ancestry: "Menneske",
      background: "What? I've Been Around (kamphærdet kaptajn)",
      quote: "En frygtløs hærfører og våbenmester, der koordinerer holdets angreb med militær præcision og tvinger modstanderne til at begå fatale fejl.",
      hp: 17,
      hp_max: 17,
      hit_die: "1d10",
      defense: 6,
      defense_calc: "Rusty Mail 6 + DEX 0",
      speed: "6 felter",
      initiative: "+1",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Might (+4)" },
        DEX: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Finesse (+1), Stealth (+1)" },
        INT: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Arcana (+3), Examination (+4), Lore (+4)" },
        WIL: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "Influence (+1), Insight (0), Naturecraft (0), Perception (0)" }
      },
      attacks: [
        { name: "Short Sword (kortsværd)", damage: "1d6 + 0", traits: "Piercing, Nærkamp, Light" },
        { name: "Javelins (4 kastespyd)", damage: "1d6 + 2", traits: "Piercing, Range 8, stak af 4" }
      ],
      class_features: [
        { title: "Coordinated Strike!", text: "(1/encounter) Fri handling: Du og én allieret inden for 6 felter udfører begge øjeblikkeligt et gratis våbenangreb (også ubevæbnet) eller kaster en cantrip." },
        { title: "Tenacious (herkomst: Menneske)", text: "+1 til alle færdigheder og Initiative (allerede indregnet)." },
        { title: "What? I've Been Around (baggrund)", text: "(1 gang pr. sted, eller efter GM's skøn) Du kender LIGE den person, der har den information, du skal bruge, eller som kan hjælpe dig ud af en klemme. Rul 1d20: 1-5 vil have dig DØD; 6-12 du skylder dem penge; 13-19 de kan overtales til at hjælpe; 20 de er din største fan." }
      ],
      inventory: [
        "Short Sword (kortsværd i bælteskede)",
        "Javelins (4 kastespyd over ryggen)",
        "Rusty Mail (ringbrynje, båret)",
        "Småting: feltoversigtskort, signalhorn, feltkirurgisk nål og tråd, vokslys og kridt"
      ],
      inventory_slots: [1, 1, 1, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Taler med myndig baryton; vurderer instinktivt flugtveje og flaskehalse i ethvert rum.\nPersonligt mål: Genopbygge en faldet legion og bevise over for riget, at ægte sejr vindes gennem kammeratskab.\nAllierede: Garnisonsmesteren i grænsefæstningen; en gammel våbensmed, der skylder ham sit liv."
    },
    {
      id: "morwen_duskwhisper",
      character_name: "Morwen Skæbnespind",
      class: "The Shadowmancer (Warlock / Minionmancer)",
      level: 1,
      ancestry: "Elf (mørkelver)",
      background: "Haunted Past (pagtsøgende kætterskriver)",
      quote: "En gådefuld okkultist, der har indgået en pagt med en ældgammel rædsel og fremmaner horder af loyale skyggeminions som kødskjold og bødler.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 4,
      defense_calc: "Adventurer's Garb 2 + DEX 2",
      speed: "7 felter",
      initiative: "+2 (Fordel)",
      wounds: 0,
      stats: {
        STR: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "Might (-1)" },
        DEX: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Finesse (+2), Stealth (+3)" },
        INT: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Arcana (+4), Examination (+2), Lore (+3)" },
        WIL: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Influence (0), Insight (0), Naturecraft (0), Perception (0)" }
      },
      attacks: [
        { name: "Shadow Blast (Necrotic cantrip)", damage: "1d12 + 2 Nekrotisk", traits: "Magi, Range 8, 1/runde" },
        { name: "Command Shadows (Shadows)", damage: "1d12 Nekrotisk pr. Shadow", traits: "Magi, minions (1 HP, ingen skadebonus, ingen crit), flytter 6 og angriber Reach 1, 1/runde" },
        { name: "Sickle (ritualsegl)", damage: "1d4 + 2", traits: "Slashing, Nærkamp, Vicious" }
      ],
      class_features: [
        { title: "Shadow Blast (Necrotic cantrip)", text: "Handling (1/runde): Range 8. Skade: 1d12 + DEX (2). Hvert 5. level: +1d12 skade." },
        { title: "Summon Shadow (Necrotic cantrip)", text: "Handling: Fremmaner 1 tilstødende Shadow (en d12-minion). Shadow Limit: du kan have op til INT (2) Shadows. Hvert 5. level: +1 Shadow. Dine Shadows forlader dig, så snart kampen er slut." },
        { title: "Command Shadows (Necrotic cantrip)", text: "ALLE dine Shadows flytter 6 og angriber derefter (Reach 1, 1d12 hver). 1/runde." },
        { title: "Lithe (herkomst: Elf)", text: "Fordel på Initiative og +1 Speed (allerede indregnet). Du kender Elvish." },
        { title: "Haunted Past (baggrund)", text: "Du plages af stemmer, der af og til giver kryptiske råd – nogle gange MEGET nyttige, andre gange vil de bare se dig lide. Fordel mod frygt." }
      ],
      inventory: [
        "Adventurer's Garb (kappe med ravnefjer)",
        "Sickle (forgyldt krum ritualsegl)",
        "Shovel (skovl)",
        "Småting: sort glaskugle, påkaldelsesblæk, bog i koldt skind, kridt og ravnefod-amulet"
      ],
      inventory_slots: [1, 1, 2, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Bleg hud og kulsorte øjne; taler ofte lavmælt til skyggerne i krogene, som var de gamle venner.\nPersonligt mål: Afdække sin patrons sande navn og bryde den forbandelse, der plager hendes slægt.\nAllierede: En lyssky antikvar i havnebyen; en forvist nekromantiker, der kender de gamle ritualer."
    },
    {
      id: "gareth_sunheart",
      character_name: "Broder Gareth Solhjerte",
      class: "The Shepherd (Cleric / Spirit Guide)",
      level: 1,
      ancestry: "Menneske",
      background: "Tradesman/Artisan (klosterlæge og feltpræst)",
      quote: "En barmhjertig og standhaftig sjælehyrde, der mestrer balancen mellem liv og død, altid ledsaget af en lysende åndefælle (Lifebinding Spirit).",
      hp: 17,
      hp_max: 17,
      hit_die: "1d10",
      defense: 7,
      defense_calc: "Rusty Mail 6 + DEX -1 + Wooden Buckler 2",
      speed: "6 felter",
      initiative: "0",
      wounds: 0,
      stats: {
        STR: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Might (+3)" },
        DEX: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Finesse (0), Stealth (0)" },
        INT: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Arcana (+1), Examination (+3), Lore (+1)" },
        WIL: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Influence (+3), Insight (+4), Naturecraft (+4), Perception (+3)" }
      },
      attacks: [
        { name: "Mace (velsignet stridskølle)", damage: "1d6 + 2", traits: "Bludgeoning, Nærkamp" },
        { name: "Rebuke (Radiant cantrip)", damage: "1d8 Radiant", traits: "Magi, Reach 4, ignorerer rustning, dobbelt skade mod udøde og fej (Frightened eller i dækning)" },
        { name: "Withering Touch (Necrotic cantrip)", damage: "1d12 Nekrotisk", traits: "Magi, Reach 1, ved træf: målet regnes som udødt i 1 runde" },
        { name: "Lifebinding Spirit: Harm", damage: "1d8 + 2 Radiant", traits: "1 handling, ånden angriber op til Reach 4 væk, ignorerer rustning" }
      ],
      class_features: [
        { title: "Keeper of Life & Death", text: "Du kender Radiant- og Necrotic-cantrips. Mana og tier 1-formularer låses op på level 2." },
        { title: "Lifebinding Spirit (My Buddy!)", text: "Cantrip uden mana: Du har én åndefælle, der kan rejse op til Reach 4 væk for at handle og derefter vende tilbage til din side. Harm (1 handling): ånden angriber for 1d8 + STR (ignorerer rustning); +STR skade hvert 5. level. Mend (1 handling, WIL (2) gange/Safe Rest, Reach 4): ånden genopretter WIL d20 HP til en Dying skabning." },
        { title: "Tenacious (herkomst: Menneske)", text: "+1 til alle færdigheder og Initiative (allerede indregnet)." },
        { title: "Tradesman/Artisan (baggrund)", text: "Profession: læge og healer. Tjek relateret til din profession slås med Fordel, og du har særlig viden om faget." }
      ],
      inventory: [
        "Mace (stridskølle)",
        "Rusty Mail (ringbrynje, båret)",
        "Wooden Buckler (træskjold med solhjul)",
        "Småting: klokke, feltlægetaske, sølvkæde med solsymbol og salvingsolie"
      ],
      inventory_slots: [1, 1, 1, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Venligt ansigt med dybe smilerynker; lægger altid en trøstende hånd på skulderen af folk i nød.\nPersonligt mål: Lindre lidelserne i de krigshærgede grænselande og bygge et hospice for de sårede.\nAllierede: En abbedisse ved bjergklosteret; en helbredt landevejsrøver, der har svoret troskab."
    },
    {
      id: "lyra_silverchord",
      character_name: "Lyra Sølvstreng",
      class: "The Songweaver (Bard / Skjald)",
      level: 1,
      ancestry: "Elf (halvelver)",
      background: "Taste for the Finer Things (hofmusiker)",
      quote: "En karismatisk troubadour med en lynsnild tunge, der inspirerer helte til umulige bedrifter og efterlader fjender forvirrede med spydige vers.",
      hp: 13,
      hp_max: 13,
      hit_die: "1d8",
      defense: 2,
      defense_calc: "Adventurer's Garb 2 + DEX 0",
      speed: "7 felter",
      initiative: "0 (Fordel)",
      wounds: 0,
      stats: {
        STR: { rating: "-1", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Might (-1)" },
        DEX: { rating: "0", key: false, save: "Neutral (1d20)", skills: "Finesse (0), Stealth (0)" },
        INT: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Arcana (+2), Examination (+2), Lore (+3)" },
        WIL: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Influence (+4), Insight (+3), Naturecraft (+2), Perception (+2)" }
      },
      attacks: [
        { name: "Vicious Mockery (Wind cantrip)", damage: "1d6 + 2 Psykisk", traits: "Magi, Range 12, ignorerer rustning, ved træf: Taunted indtil slutningen af deres næste tur" },
        { name: "Razor Wind (Wind cantrip)", damage: "2d4 Slashing", traits: "Magi, Range 12, vælg: Fordel ELLER ram også 1 tilstødende mål" },
        { name: "Breath of Life (Wind cantrip)", damage: "Heal 1d4", traits: "Magi, Range 6, en Dying skabning; heles 4+, får den 1 handling" },
        { name: "Dagger (dolk)", damage: "1d4 + 0", traits: "Piercing, Light, Thrown 4" }
      ],
      class_features: [
        { title: "Wind Spellcasting", text: "Du kender cantrips fra Wind-skolen samt Vicious Mockery. Du vælger din anden skole på level 2. Mana og tier 1-formularer låses også op på level 2." },
        { title: "Songweaver's Inspiration", text: "(2 x WIL (4) gange/Safe Rest) Fri reaktion: Lad en allieret omrulle en enkelt terning ELLER hæve resultatet af en terning med 1." },
        { title: "Lithe (herkomst: Elf)", text: "Fordel på Initiative og +1 Speed (allerede indregnet). Du kender Elvish. Som halvelver bruger du kun elvernes bonus." },
        { title: "Taste for the Finer Things (baggrund)", text: "Du kender altid de højere klassers skikke og klædedragt og måske mange af deres hemmeligheder. Fordel på Influence-tjek mod overklassen." }
      ],
      inventory: [
        "Adventurer's Garb (rejsedragt)",
        "Instrument (håndbygget kirsebærtræslut med sølvstrenge)",
        "Dagger (dolk i lakeret læderskede)",
        "Småting: lommespejl, nodepapir og fjerpen, spillekort og terninger"
      ],
      inventory_slots: [1, 1, 1, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Altid et glimt i øjet og et vittigt svar på læben; kan ikke modstå et godt væddemål eller en god historie.\nPersonligt mål: Komponere det store epos om gruppens heltegerninger og synge det for højkongens bord.\nAllierede: En berømt teaterdirektør i hovedstaden; kroværter langs alle store kongeveje."
    },
    {
      id: "kieran_stormstrider",
      character_name: "Kieran Stormkald",
      class: "The Stormshifter (Druid / Formskifter)",
      level: 1,
      ancestry: "Elf (skovelver)",
      background: "Survivalist (eremit og stormvogter)",
      quote: "En uforudsigelig naturpræst, der behersker lyn og tordenskyer på afstand og forvandler sig til en frygtindgydende rovdyrsform midt i kampen.",
      hp: 13,
      hp_max: 13,
      hit_die: "2d8",
      defense: 5,
      defense_calc: "Cheap Hides 3 + DEX 2",
      speed: "7 felter",
      initiative: "+2 (Fordel)",
      wounds: 0,
      stats: {
        STR: { rating: "0", key: false, save: "🔽 Ulempe (Disadvantage)", skills: "Might (0)" },
        DEX: { rating: "+2", key: true, save: "Neutral (1d20)", skills: "Finesse (+2), Stealth (+3)" },
        INT: { rating: "-1", key: false, save: "Neutral (1d20)", skills: "Arcana (-1), Examination (-1), Lore (-1)" },
        WIL: { rating: "+2", key: true, save: "🔼 Fordel (Advantage)", skills: "Influence (+2), Insight (+2), Naturecraft (+4), Perception (+3)" }
      },
      attacks: [
        { name: "Zap (Lightning cantrip)", damage: "1d8 + 4 Lyn", traits: "Magi, Range 8, ved Fejlskud tager du halv skade selv" },
        { name: "Razor Wind (Wind cantrip)", damage: "2d4 Slashing", traits: "Magi, Range 12, vælg: Fordel ELLER ram også 1 tilstødende mål" },
        { name: "Staff (asketræsstav)", damage: "1d8 + 0", traits: "Bludgeoning, Nærkamp, Tohånds" },
        { name: "Gore (Fearsome Beast-form)", damage: "1d8 + 1", traits: "Handling, ved træf: få LVL (1) temp HP" }
      ],
      class_features: [
        { title: "Master of Storms", text: "Du kender cantrips fra Lightning- og Wind-skolerne (fx Zap, Overload, Razor Wind og Breath of Life). Mana og tier 1-formularer låses op på level 2." },
        { title: "Beastshift", text: "Du kan frit forvandle dig til et harmløst dyr (egern, due osv.) og tale med dyr. Formen varer, til du når 0 HP, kaster en formular eller afslutter den frit på din tur." },
        { title: "Direbeast Form: Fearsome Beast", text: "DEX (2) gange pr. encounter kan du Beastshift til en stor Direbeast-form (op til 1 minut): Få WIL (2) Defense, WIL + LVL (3) temp HP og Fordel på STR-saves. Angrebet Gore: 1d8 + LVL, ved træf får du LVL temp HP." },
        { title: "Lithe (herkomst: Elf)", text: "Fordel på Initiative og +1 Speed (allerede indregnet)." },
        { title: "Survivalist (baggrund)", text: "Du løber aldrig tør for dine egne rationer. Fordel mod gift-saves og +1 maks. Hit Die (allerede indregnet). (1/Safe Rest) Afslut gift på dig selv." }
      ],
      inventory: [
        "Cheap Hides (læderrustning, båret)",
        "Staff (asketræsstav)",
        "Småting: Strange Plant (tordengræsfrø), knoglefløjte, rovfuglekløer, regnslag og tørrede bær"
      ],
      inventory_slots: [1, 2, 1],
      gold: { gp: 0, sp: 0, cp: 0 },
      notes: "Kendetegn: Vågent blik og en lugtesans som en ulv; sidder helst på hug og trives bedst under åben himmel.\nPersonligt mål: Bringe balancen tilbage til skoven, efter at en mørk korruption har forgiftet dyrene.\nAllierede: En gammel kæmpeugle i trækronerne; eneboerdruiden i Tågedalen."
    }
  ]
};
