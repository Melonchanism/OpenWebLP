import { Service, type song } from "$lib/types";
import { writable, type Writable } from "svelte/store";

export const myServiceStore = writable(new Service("myService", [8, 9, 10, 1]));

export let allSongs: Writable<song[]> = writable([
  {
    name: "Reign in Us",
    artist: "Starfield",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "You thought of us before the world began to breathe\n" +
          "And you knew our names before we came to be\n" +
          "You saw the very day we'd fall away from you\n" +
          "And how desperately we need to be redeemed\n",
      },
      {
        type: "Pre-Chorus",
        number: 1,
        text: "Lord Jesus come lead us\n" + "We're desperate for your touch",
      },
      {
        type: "Chorus",
        number: 1,
        text:
          "Oh Great and Mighty One, with one desire we come\n" +
          "That you would reign, that you would reign in us\n" +
          "We're offering up our lives, a living sacrifice\n" +
          "That you would reign, that you would reign in us",
      },
      {
        type: "Verse",
        number: 2,
        text:
          "Spirit of the Living God fall fresh again\n" +
          "Come search our hearts and purify our lives\n" +
          "We need your perfect love\n" +
          "We need your discipline\n" +
          "We're lost unless you guide us with your light",
      },
      {
        type: "Tag",
        number: 1,
        text:
          "We cry out\n" +
          "For your love to refine us cry out\n" +
          "For your love to define us cry out\n" +
          "For your mercy to keep us blameless until you return",
      },
      {
        type: "Bridge",
        number: 1,
        text:
          "So reign, please reign in us\n" +
          "Come purify our hearts we need your touch\n" +
          "Come cleanse us like a flood and send us out\n" +
          "So the world may know you reign, you reign in us",
      },
    ],
  },
  {
    name: "Yes I Will",
    artist: "Vertical Worship",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "I count on one thing\n" +
          "The same God that never fails\n" +
          "Will not fail me now\n" +
          "You won't fail me now\n" +
          "In the waiting\n" +
          "The same God who's never late\n" +
          "Is working all things out\n" +
          "You're working all things out\n",
      },
      {
        type: "Chorus",
        number: 1,
        text:
          "Yes I will, lift You high in the lowest valley\n" +
          "Yes I will, bless Your name\n" +
          "Oh, yes I will, sing for joy when my heart is heavy\n" +
          "All my days, oh, yes I will",
      },
      {
        type: "Bridge",
        number: 1,
        text:
          "And I choose to praise\n" +
          "To glorify, glorify\n" +
          "The Name of all names\n" +
          "That nothing can stand against",
      },
    ],
  },
  {
    name: "Solution",
    artist: "Hillsong United",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "It is not a human right to stare not fight\n" +
          "While broken nations dream\n" +
          "Open up our eyes so blind that we might find\n" +
          "The mercy for the need",
      },
      {
        type: "Pre-Chorus",
        number: 1,
        text:
          "Hey now fill our hearts with Your compassion\n" +
          "Hey now as we hold to our confession",
      },
      {
        type: "Verse",
        number: 2,
        text:
          "It is not too far a cry too much to try\n" +
          "And help the least of these\n" +
          "Politics will not decide if we should rise\n" +
          "And be Your hands and feet",
      },
      {
        type: "Chorus",
        number: 1,
        text:
          "Woah oh oh\n" +
          "God be the solution\n" +
          "Woah oh oh\n" +
          "And we will be Your hands and be Your feet",
      },
      {
        type: "Verse",
        number: 3,
        text:
          "Higher than all circumstance Your promise stands\n" +
          "Your love for all to see\n" +
          "Higher than our protest line and dollar signs\n" +
          "Your love is all we need",
      },
      {
        type: "Bridge",
        number: 1,
        text:
          "Only You can mend the broken heart\n" +
          "And cause the blind to see\n" +
          "Erase complete the sinner's past\n" +
          "And set the captives free\n" +
          "Only You can take the widow's cry\n" +
          "And cause her heart to sing\n" +
          "Be the Father to the fatherless\n" +
          "Our Saviour and our King",
      },
      {
        type: "Bridge",
        number: 2,
        text:
          "We will be Your hands\n" +
          "We will be Your feet\n" +
          "We will run this race for the least of these\n" +
          "In the darkest place we will be Your light\n" +
          "We will be Your light",
      },
    ],
  },
  {
    name: "Here Again",
    artist: "Elevation Worship",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "Can't go back to the beginning\n" +
          "Can't control what tomorrow will bring\n" +
          "But I know here in the middle\n" +
          "Is the place where You promise to be",
      },
      {
        type: "Chorus",
        number: 1,
        text:
          "I'm not enough unless You come\n" +
          "Will You meet me here again\n" +
          "'Cause all I want is all You are\n" +
          "Will You meet me here again",
      },
      {
        type: "Verse",
        number: 2,
        text:
          "As I walk now through the valley\n" +
          "Let Your love rise above every fear\n" +
          "Like the sun shaping the shadow\n" +
          "In my weakness Your glory appears",
      },
      {
        type: "Bridge",
        number: 1,
        text:
          "Not for a minute\n" +
          "Was I forsaken\n" +
          "The Lord is in this place\n" +
          "The Lord is in this place\n" +
          "Come Holy Spirit\n" +
          "Dry bones awaken\n" +
          "The Lord is in this place\n" +
          "The Lord is in this place",
      },
    ],
  },
  {
    name: "Unchanging",
    artist: "Chris Tomlin",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "Great is Your faithfulness\n" +
          "Great is Your faithfulness\n" +
          "You never change\n" +
          "You never fail, O God\n",
      },
      {
        type: "Verse",
        number: 2,
        text:
          "True are Your promises\n" +
          "True are Your promises\n" +
          "You never change\n" +
          "You never fail, O God",
      },
      {
        type: "Chorus",
        number: 1,
        text:
          "So we raise up holy hands\n" +
          "To praise the Holy One\n" +
          "Who was and is and is to come",
      },
      {
        type: "Verse",
        number: 3,
        text:
          "Wide is Your love and grace\n" +
          "Wide is Your love and grace\n" +
          "You never change\n" +
          "You never fail, O God",
      },
      {
        type: "Bridge",
        number: 1,
        text: "You were, You are\n" + "You will always be",
      },
    ],
  },
  {
    name: "Arms of Love",
    artist: "Vineyard",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "I Sing A Simple Song Of Love,\n" +
          "To My Saviour, To My Jesus.\n" +
          "I’m Grateful For The Things You’ve Done,\n" +
          "My Loving Saviour, Oh Precious Jesus",
      },
      {
        type: "Pre-Chorus",
        number: 1,
        text:
          "My Heart Is Glad That You Called Me Your Own.\n" +
          "There’s No Place I’d Rather Be",
      },
      {
        type: "Chorus",
        number: 1,
        text:
          "Than In Your Arms Of Love,\n" +
          "In Your Arms Of Love,\n" +
          "Holding Me Still, Holding Me Near,\n" +
          "In Your Arms Of Love",
      },
    ],
  },
  {
    name: "O Come to the Altar",
    artist: "Elevation Worship",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "Are you hurting and broken within?\n" +
          "Overwhelmed by the weight of your sin?\n" +
          "Jesus is calling\n" +
          "\n" +
          "Have you come to the end of yourself?\n" +
          "Do you thirst for a drink from the well?\n" +
          "Jesus is calling",
      },
      {
        type: "Chorus",
        number: 1,
        text:
          "O come to the altar\n" +
          "The Father's arms are open wide\n" +
          "Forgiveness was bought with\n" +
          "The precious blood of Jesus Christ",
      },
      {
        type: "Verse",
        number: 2,
        text:
          "Leave behind your regrets and mistakes\n" +
          "Come today, there's no reason to wait\n" +
          "Jesus is calling\n" +
          "\n" +
          "Bring your sorrows and trade them for joy\n" +
          "From the ashes, a new life is born\n" +
          "Jesus is calling (Oh-oh)",
      },
      {
        type: "Bridge",
        number: 1,
        text:
          "Oh, what a Savior\n" +
          "Isn't He wonderful?\n" +
          "Sing Hallelujah, Christ is risen\n" +
          "Bow down before Him\n" +
          "For He is Lord of all\n" +
          "Sing Hallelujah, Christ is risen",
      },
      {
        type: "Ending",
        number: 1,
        text:
          "Bear your cross as you wait for the crown\n" +
          "Tell the world of the treasure you found",
      },
    ],
  },
  {
    name: "Second Chance",
    artist: "Hillsong United",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "You called my name\n" +
          "Reached out Your hand\n" +
          "Restored my life\n" +
          "And I was redeemed\n" +
          "The moment You entered my life",
      },
      {
        type: "Verse",
        number: 2,
        text:
          "Amazing grace\n" +
          "Christ gave that day\n" +
          "My life was changed\n" +
          "When from my shoulders\n" +
          "Fell the weight of my sin",
      },
      {
        type: "Chorus",
        number: 1,
        text:
          "So it's with everything I am\n" +
          "I reach out for Your hand\n" +
          "The hope for change\n" +
          "The second chance I've gained" +
          "\n" +
          "On You I throw my life\n" +
          "Casting all my fears aside\n" +
          "How could greater love than this\n" +
          "Ever possibly exist",
      },
      {
        type: "Verse",
        number: 3,
        text:
          "Consume my thoughts\n" +
          "As I rest in You\n" +
          "I'm now in love\n" +
          "With a Saviour\n" +
          "Bearing the marks of His love",
      },
      {
        type: "Bridge",
        number: 1,
        text:
          "So I'll wait upon You now\n" +
          "With my hands released to You\n" +
          "Where a little faith's enough\n" +
          "To see mountains lift and move\n" +
          "\n" +
          "And I'll wait upon You now\n" +
          "Dedicated to Your will\n" +
          "To this love that will remain\n" +
          "A love that never fails",
      },
    ],
  },
  {
    name: "Your Grace is Enough",
    artist: "Chris Tomlin",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text:
          "Great is Your faithfulness, o God\n" +
          "You wrestle with the sinner's heart\n" +
          "You lead us by still waters and to mercy\n" +
          "And nothing can keep us apart\n",
      },
      {
        type: "Pre-Chorus",
        number: 1,
        text: `So remember Your people
Remember Your children
Remember Your promise, o God`,
      },
      {
        type: "Chorus",
        number: 1,
        text: `Your grace is enough
Your grace is enough
Your grace is enough for me`,
      },
      {
        type: "Verse",
        number: 2,
        text: `Great is Your love and justice, God
You use the weak to lead the strong
You lead us in the song of Your salvation
And all Your people sing along`,
      },
      {
        type: "Ending",
        number: 1,
        text: `Yeah, Your grace is enough
Heaven reaching down to us
Your grace is enough for me

God, I see Your grace is enough
I'm covered in Your love
Your grace is enough for me, for me`,
      },
    ],
  },
  {
    name: "Blessed be Your Name",
    artist: "Matt Redman",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text: `Blessed Be Your Name
In the land that is plentiful
Where Your streams of abundance flow
Blessed be Your name`,
      },
      {
        type: "Verse",
        number: 2,
        text: `Blessed Be Your name
When I'm found in the desert place
Though I walk through the wilderness
Blessed Be Your name`,
      },
      {
        type: "Pre-Chorus",
        number: 1,
        text: `Every blessing You pour out
I'll turn back to praise
When the darkness closes in, Lord
Still I will say`,
      },
      {
        type: "Chorus",
        number: 1,
        text: `Blessed be the name of the Lord
Blessed be Your name
Blessed be the name of the Lord
Blessed be Your glorious name`,
      },
      {
        type: "Verse",
        number: 3,
        text: `Blessed be Your name
When the sun's shining down on me
When the world's 'all as it should be'
Blessed be Your name`,
      },
      {
        type: "Verse",
        number: 4,
        text: `Blessed be Your name
On the road marked with suffering
Though there's pain in the offering
Blessed be Your name`,
      },
      {
        type: "Bridge",
        number: 1,
        text: `You give and take away
You give and take away
My heart will choose to say
Lord, blessed be Your name`,
      },
    ],
  },
  {
    name: "Make a Way",
    artist: "I am They",
    lyrics: [
      {
        type: "Verse",
        number: 1,
        text: `You brought me to the desert
so You could be my water
You brought me to the fire
so You could be my shield
You brought me to the darkness
so You could be my morning light
If You brought me this far,
if You brought me this far`,
      },
      {
        type: "Chorus",
        number: 1,
        text: `Wherever You lead me, I know You won't leave me
Wherever You call me, You will make a way
Wherever we're goin', I will be holdin'
To the promise You have made
You will make a way, ay, ay
You will make a way ay, ay`,
      },
      {
        type: "Verse",
        number: 2,
        text: `And when I'm in the valley
You will be my comfort
And when I'm at the end of me
I'll find You there
And when I'm in the battle
You will be my present peace
'Cause You brought me this far,
You brought me this far`,
      },
      {
        type: "Bridge",
        number: 1,
        text: `'Cause You brought me this far
You brought me this far
You brought me this far,
You will make a way`,
      },
      {
        type: "Bridge",
        number: 2,
        text: `You brought me this far
You brought me this far
You brought me this far
My God will make a way`,
      },
    ],
  },
]);
