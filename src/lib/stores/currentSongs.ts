import { writable, type Writable } from "svelte/store";
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
    "name": "asdf",
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
]) as Writable<Song[]>;