import * as alt from 'alt-server';
import { playerFuncs } from '../../server/extensions/Player';
import { BlipController } from '../../server/systems/blip';
import { InteractionController } from '../../server/systems/interaction';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { getFromRegistry } from '../../shared/items/itemRegistry';

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
let fishingTime = 1000; // Only usefull if you are not using randomDuration.

const useAutoRotation = true; // Will force player to look at water while fishing. default: true
const randomDuration = true; // Use random duration for fishing time? default: true
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

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, loadAllFishingSpots)
function loadAllFishingSpots() {
    fishingSpots.forEach((spot, index) => {
        InteractionController.add({
            identifier: `FishingInteraction-${spot[index]}`,
            type: 'FishingInteraction',
            position: fishingSpots[index],
            description: interactionDescription,
            callback: handleFishing
        });
        BlipController.add({
            pos: fishingSpots[index],
            sprite: blipSprite,
            color: blipColor,
            shortRange: blipShortRange,
            scale: blipScale,
            text: blipText
        });
    });
    alt.log(`Creating ${fishingSpots.length} Fishing Spot(s)...`);
}

function handleFishing(player: alt.Player) {
    const itemFromRegistry = getFromRegistry(normalFishoutput[getRandomNumber(normalFishoutput.length)]);
    const fishExists = playerFuncs.inventory.isInInventory(player, { name: itemFromRegistry.name });
    const emptySlot = playerFuncs.inventory.getFreeInventorySlot(player);
    const rodEquipped = playerFuncs.inventory.isInToolbar(player, { name: getFromRegistry('normal fishingrod').name });
    const hasBait = playerFuncs.inventory.isInInventory(player, { name: getFromRegistry('rainworm').name });
    if (!rodEquipped || !hasBait) { // Player does not have a fishing rod in his toolbar or a bait in his inventory.
        return false;
    } else if (rodEquipped && hasBait) {
        const fishingRod = player.data.toolbar[rodEquipped.index];
        if (useAutoRotation) {
            fishingSpots.forEach((spot, index) => {
                if (player.pos.isInRange(fishingSpots[index], 2)) {
                    player.rot = fishingSpotsRotations[index] as alt.Vector3;
                }
            });
        }
        // Do Fishing stuff....
        if (!player.getMeta("isFishing") == true && fishingRod) {
            player.setMeta("isFishing", true);
            if (randomDuration) {
                fishingTime = getRandomInt(minDuration, maxDuration);
            }
            if (useProgressBars) {
                playerFuncs.emit.createProgressBar(player, {
                    uid: `Fishingbar-${player.data._id}`,
                    position: player.pos,
                    color: progressBarRGBA as alt.RGBA,
                    milliseconds: fishingTime,
                    distance: 5,
                    text: progressBarText
                });
            }
            playerFuncs.emit.scenario(player, "WORLD_HUMAN_STAND_FISHING", fishingTime);
            alt.setTimeout(() => {
                if (fishingRod.data.durability <= 1) {
                    player.deleteMeta("isFishing");
                    playerFuncs.inventory.toolbarRemove(player, fishingRod.slot);
                    playerFuncs.emit.notification(player, `Seems like an shark ate your fishing rod.`);
                    return;
                }
                // Fishing Rewards...
                if (player.data.inventory[hasBait.tab][hasBait.index].quantity <= 0) { return; }
                player.data.inventory[hasBait.tab][hasBait.index].quantity -= 1;
                fishingRod.data.durability -= 1;
                if (!fishExists) {
                    playerFuncs.inventory.inventoryAdd(player, itemFromRegistry, emptySlot.slot, emptySlot.tab);
                    playerFuncs.emit.notification(player, `You've catched a ${itemFromRegistry.name}`);
                } else if (fishExists) {
                    player.data.inventory[fishExists.tab][fishExists.index].quantity += itemFromRegistry.quantity;
                    playerFuncs.emit.notification(player, `You've catched a ${itemFromRegistry.name}`);
                }
                player.setMeta("isFishing", false);
                playerFuncs.save.field(player, 'inventory', player.data.inventory);
                playerFuncs.save.field(player, 'toolbar', player.data.toolbar);
                playerFuncs.sync.inventory(player);
            }, fishingTime);
        }
    }
    return true;
}
function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}