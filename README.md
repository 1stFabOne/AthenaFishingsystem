# AthenaFishingsystem

![image](https://user-images.githubusercontent.com/82890183/132276014-99174310-3c77-4941-bc8f-edad3e16d6f3.png)

## Fishingsystem - Setup
This is a Serverside Plugin. It has to be added here: (/src/core/plugins/)

Add this to your import.ts-file:
```typescript 
'./FishingSystem/index',
'./FishingSystem/items'
```
## Fishingsystem - Features
* Fishingrod with durability & rarity (Fishingrod will be removed if its broken.)
* Add as many Fishingpoints as you like
* Interactionpoint for all Fishingspots
* Blips for all Fishingspots
* Players will be forced to look at waters direction
* Random generated Fish output
* Items will stack on each other if they already exist in players-inventory
* Baits for fishing (rainworms)
* Scenario for Fishing (you will have to synchronize fishingrod yourself if you wanna use animation)

## Fishingsystem - Configuration
```typescript
// All Fishingspots to create on bootup of Athena.
const fishingSpots = [
    { "x": 1298.842529296875, "y": 4215.44873046875, "z": 33.90863800048828 - 1 }, // Position of Spot 0
    { "x": 713.6202392578125, "y": 4092.444091796875, "z": 34.72782897949219 - 1 }, // Position of Spot 1
    { "x": 32.982933044433594, "y": 855.7935180664062, "z": 197.73194885253906 - 1 }, // Position of Spot 2
    { "x": -192.7390594482422, "y": 790.7300415039062, "z": 198.10739135742188 - 1 }, // Position of Spot 3
    { "x": -1850.4239501953125, "y": -1250.2908935546875, "z": 8.615777015686035 - 1 } // Position of Spot 4
];

const fishingSpotsRotations = [
    { "x": 0, "y": 0, "z": 3.017235040664673 }, // Rotation from Spot 0
    { "x": 0, "y": 0, "z": -3.0259671211242676 }, // Rotation from Spot 1
    { "x": 0, "y": 0, "z": -2.221445083618164 }, // Rotation from Spot 2
    { "x": 0, "y": 0, "z": 2.640841484069824 }, // Rotation from Spot 3
    { "x": 0, "y": 0, "z": 2.4196646213531494 } // Rotation from Spot 4
];

// Fishingsystem - General Setup
let fishingTime = 200; // Only usefull if you are not using randomDuration.

const useAutoRotation = true; // Will force player to look at water while fishing. default: true
const randomDuration = false; // Use random duration for fishing time? default: true
const minDuration = 5000; // Min duration if using random duration.
const maxDuration = 15000; // Max duration if using random duration.

const interactionDescription = `Start fishing...`;

// Fishingsystem - Progressbar Setup
const useProgressBars = true; // enable progress bars (only seen by player) default: true
const progressBarRGBA = new alt.RGBA(0, 255, 0, 255); // Alpha (last) should always be 255.
const progressBarText = `Fishing...`;

const normalFishoutput = [
    "normal-fish-1", "normal-fish-2" // Add more if needed to items.ts and here.
];

/* Not in use for now. (Try to script by yourself.)

const rareFishoutput = [
    "", ""
];

const epicFishoutput = [
    "", ""
];

Not in use for now. (Try to script by yourself.) */

// Fishingsystem - Blip Setup
const blipSprite = 681; // default: 681
const blipColor = 2; // default: 2
const blipScale = 1; // default: 1
const blipShortRange = true; // default: true
const blipText = `Fishingspot`;
```
