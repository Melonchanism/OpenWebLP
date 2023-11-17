import { readable, writable, type Readable } from "svelte/store";
type Song = {
  name: string;
  lyrics: string[];
};

export default writable([
  {
    "name": "Another In The Fire(Hillsong United)",
    "lyrics": [
      "[Verse 1]\nThere's a grace when the heart is under fire\nAnother way when the walls are closing in\nAnd when I look at the space between\nWhere I used to be and this reckoning\nI know I will never be alone",
      "[Chorus]\nThere was another in the fire\nStanding next to me\nThere was another in the waters\nHolding back the seas\nAnd should I ever need reminding\nOf how I've been set free\nThere is a cross that bears the burden\nWhere another died for me",
      "[Tag]\nThere is another in the fire",
      "[Verse 2]\nAll my debt left for dead beneath the waters\nI'm no longer a slave to my sin anymore\nAnd should I fall in the space between\nWhat remains of me and this reckoning\nEither way I won't bow\nTo the things of this world\nAnd I know I will never be alone",
      "[Chorus]\nThere is another in the fire\nStanding next to me\nThere is another in the waters\nHolding back the seas\nAnd should I ever need reminding\nWhat power set me free\nThere is a grave that holds no body\nAnd now that power lives in me",
      "[Bridge]\nAnd I can see the light in the darkness\nAs the darkness bows to Him\nI can hear the roar in the heavens\nAs the space between wears thin\nI can feel the ground shake beneath us\nAs the prison walls cave in\nNothing stands between us\nNothing stands between us",
      "[Verse 3]\nThere is no other name\nBut the Name that is Jesus\nHe who was and still is\nAnd will be through it all\nSo come what may in the space between\nAll the things unseen and this reckoning\nI know I will never be alone",
      "[Chorus]\nThere'll be another in the fire\nStanding next to me\nThere'll be another in the waters\nHolding back the seas\nAnd should I ever need reminding\nHow good You've been to me\nI'll count the joy come every battle\n'Cause I know that's where You'll be"
    ]
  },
  {
    "name": "What a beautiful name(Hillsong Worship)",
    "lyrics": [
      "[Verse 1]\nYou were the Word at the beginning\nOne with God the Lord Most High\nYour hidden glory in creation\nNow revealed in You our Christ",
      "[Chorus 1]\nWhat a beautiful Name it is\nWhat a beautiful Name it is\nThe Name of Jesus Christ my King\nWhat a beautiful Name it is\nNothing compares to this\nWhat a beautiful Name it is\nThe Name of Jesus",
      "[Verse 2]\nYou didn't want Heaven without us\nSo Jesus You brought Heaven down\nMy sin was great Your love was greater\nWhat could separate us now?",
      "[Chorus 2]\nWhat a wonderful Name it is\nWhat a wonderful Name it is\nThe Name of Jesus Christ my King\nWhat a wonderful Name it is\nNothing compares to this\nWhat a wonderful Name it is\nThe Name of Jesus",
      "[Instrumentals]",
      "[Bridge 1]\nDeath could not hold You\nThe veil tore before You\nYou silenced the boast of sin and grave\nThe Heavens are roaring\nThe praise of Your glory\nFor You are raised to life again",
      "[Bridge 2]\nYou have no rival\nYou have no equal\nNow and forever God You reign\nYours is the Kingdom\nYours is the glory\nYours is the Name above all names",
      "[Chorus 3]\nWhat a powerful Name it is, What a powerful Name it is\nThe Name of Jesus Christ my King\nWhat a powerful Name it is, Nothing can stand against\nWhat a powerful Name it is, The Name of Jesus(x3)"
    ]
  },
  {
    "name": "Waymaker(Michael W Smith)",
    "lyrics": [
      "[Verse 1]\nYou are here, moving in our midst\nI worship You, I worship You\nYou are here, working in this place\nI worship You, I worship You\nYou are here, moving in our midst\nI worship You, I worship You\nYou are here, working in this place\nI worship You, I worship You",
      "[Chorus]\nYou are\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\nYou are\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are",
      "[Verse 2]\nYou are here, touching every heart\nI worship You, I worship You\nYou are here, healing every heart\nI worship You, I worship You",
      "[Verse 3]\nYou are here, turning lives around\nI worship You, I worship You\nYou are here, mending every heart\nI worship You, yeah, I worship You, Lord",
      "[Chorus]\nAnd You are\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\nYeah, You are the waymaker\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\nYeah, sing it again\nYou are, yeah",
      "[Chorus 2]\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\nOh, it's who You are, Jesus, yeah\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are",
      "[Pre - Chorus]\nSing that is who You are\nOh, that is who You are\nOh, and that is who You are\nMy Jesus, that is who You are\nOh, we lift You up, that is who You are\nMy Jesus",
      "[Chorus]\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\nYes it is, that is who You are\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are",
      "[Bridge 1]\nLet's sing this together, even when I don't see it\nCome on, even when\nEven when I don't see it, You're working\nEven when I don't feel it, You're working\nYou never stop, You never stop working\nYou never stop, You never stop working\nCome on",
      "[Bridge 2]\nAnd even when I don't see it, You're working\nEven when I don't feel it, You're working\nYou never stop, You never stop working\nYou never stop, You never stop working\nOh-oh",
      "[Bridge 3]\nEven when I don't see it, You're working\nEven when I don't feel it, You're working\nYou never stop, You never stop working\nYou never stop, You never stop working\nEven when I don't see it, You're working\nEven when I don't feel it, You're working\nYou never stop, You never stop working\nYou never stop, You never stop working",
      "[Chorus]\nYou are the way maker, yeah\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are",
      "[Pre - Chorus]\nSing that is who You are\nOh, that is who You are\nOh, that is who You are \nThat is who You are \nOh, that is who You are\nOh, it's who You are, my Jesus",
      "[Chorus]\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are\nYou are\nWaymaker, miracle worker\nPromise keeper, light in the darkness\nMy God, that is who You are",
      "[Spontaneous]\nOh, His name is above\nHis name is above depression\nHis name is above loneliness\nOh, His name is above disease\nHis name is above cancer\nHis name is above every other name",
      "[Outro]\nThat is who You are (That is who You are)\nThat is who You are (That is who You are)\nJesus\nThat is who You are (That is who You are)\nOh, I know that is who You are (That is who You are)"
    ]
  },
  {
    "name": "Holy Spirit(Jesus Culture)",
    "lyrics": [
      "[Verse 1]\nThere is nothing worth more\nThat will ever come close\nNo thing can compare\nYou're our living hope\nYour presence Lord",
      "[Verse 2]\nI've tasted and seen\nOf the sweetest of love\nWhen my heart becomes free\nAnd my shame is undone\nYour presence Lord",
      "[Chorus]\nHoly spirit, You are welcome here\nCome flood this place and fill the atmosphere\nYour glory, God, is what our hearts long for\nTo be overcome by Your presence, Lord",
      "[Verse 1]\nThere is nothing worth more\nThat will ever come close\nNo thing can compare\nYou're our living hope\nYour presence Lord",
      "[Verse 2]\nI've tasted and seen\nOf the sweetest of Love\nWhen my heart becomes free\nAnd my shame is undone\nYour presence Lord",
      "[Chorus]\nHoly spirit, You are welcome here\nCome flood this place and fill the atmosphere\nYour glory, God, is what our hearts long for\nTo be overcome by Your presence, Lord",
      "[Verse 3]\nLet us become more aware of Your presence\nLet us experience the glory of Your goodness",
      "[Chorus]\nHoly spirit, You are welcome here\nCome flood this place and fill the atmosphere\nYour glory, God, is what our hearts long for\nTo be overcome by Your presence, Lord"
    ]
  },
  {
    "name": "Lay Me Down(Chris Tomlin)",
    "lyrics": [
      "[Verse 1]\nWith this heart open wide\nFrom the depths from the heights\nI will bring a sacrifice\nWith these hands lifted high\nHear my song, hear my cry\nI will bring a sacrifice\nI will bring a sacrifice",
      "[Chorus]\nI lay me down i’m not my own\nI belong to you alone\nLay me down, lay me down\nHand on my heart this much is true\nThere’s no life apart from you\nLay me down, lay me down\nLay me down, lay me down",
      "[Verse 2]\nLetting go of my pride\nGiving up all my rights\nTake this life and let it shine\nTake this life and let it shine",
      "[Chorus]\nI lay me down i’m not my own\nI belong to you alone\nLay me down, lay me down\nHand on my heart this much is true\nThere’s no life apart from you\nLay me down, lay me down\nLay me down, lay me down",
      "[Bridge]\nIt will be my joy to say your will your way [x2]\nIt will be my joy to say your will your way always"
    ]
  },
  {
    "name": "I Will Follow(Chris Tomlin)",
    "lyrics": [
      "[Intro]\nWhere You go, I'll go\nWhere You stay, I'll stay\nWhen You move, I'll move\nI will follow",
      "[Verse 1]\nAll Your ways are good\nAll Your ways are sure\nI will trust in You alone\nHigher than my sight\nHigh above my life\nI will trust in You alone (trust in You alone)",
      "[Chorus]\nWhere You go, I'll go\nWhere You stay, I'll stay\nWhen You move, I'll move\nI will follow You\nWho You love, I'll love\nHow You serve I'll serve\nIf this life I lose, I will follow You, yeah\nI will follow You, yeah",
      "[Verse 2]\nLight unto the world\nLight unto my life\nI will live for You alone\nYou're the one I seek\nKnowing I will find\nAll I need in You alone, in You alone",
      "[Chorus]\nWhere You go, I'll go\nWhere You stay, I'll stay\nWhen You move, I'll move\nI will follow You\nWho You love, I'll love\nHow You serve, I'll serve\nIf this life I lose, I will follow You, yeah",
      "[Bridge]\nIn You there's life everlasting\nIn You there's freedom for my soul\nIn You there's joy, unending joy\nAnd I will follow",
      "[Chorus]\nWhere You go, I'll go\nWhere You stay, I'll stay\nWhen You move, I'll move\nI will follow You\nWho You love, I'll love\nHow You serve, I'll serve\nIf this life I lose, I will follow You, yeah",
      "[Outro]\nWhere You go, I'll go\nWhere You stay, I'll stay\nWhen You move, I'll move\nI will follow You\nWho You love, I'll love\nHow You serve, I'll serve\nIf this life I lose, I will follow You, yeah\nI will follow You, yeah\nI will follow You, yeah\nI will follow You, yeah"
    ]
  },
  {
    "name": "Salvation Is Here(Hillsong United)",
    "lyrics": [
      "[Verse 1]\nGod above all the world in motion\nGod above all my hopes and fears\nI don't care what the world throws at me now\nIt's gonna be alright",
      "[Verse 2]\nHear the sound of the generations\nMaking loud our freedom song\nAll in all that the world would know Your name\nIt's gonna be alright",
      "[Chorus]\n'Cause I know my God saved the day\nAnd I know His word never fails\nAnd I know my God made a way for me\nSalvation is here",
      "[Verse 1]\nGod above all the world in motion\nGod above all my hopes and fears\nI don't care what the world throws at me now\nIt's gonna be alright",
      "[Chorus]\n'Cause I know my God saved the day\nAnd I know His word never fails\nAnd I know my God made a way for me\nSalvation is here",
      "[Bridge 1]\nSalvation is here\nSalvation is here and He lives in me\nSalvation is here\nSalvation that died just to set me free\nSalvation is here\nSalvation is here and He lives in me\nSalvation is here",
      "[Bridge 2]\nCause You are alive and You live in me\nSalvation is here\nSalvation is here and it lives in me\nSalvation is here\nSavation is here that died just to set me free\nSalvation is here\nSalvation is here and it lives in me",
      "[Chorus]\n'Cause I know my God saved the day\nAnd I know His word never fails\nAnd I know my God made a way for me\nSalvation is here"
    ]
  }
]) as Readable<Song[]>