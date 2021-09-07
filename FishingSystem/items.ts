import { ITEM_TYPE } from '../../shared/enums/itemTypes';
import { Item } from '../../shared/interfaces/Item';
import { appendToItemRegistry } from '../../shared/items/itemRegistry';
import { deepCloneObject } from '../../shared/utility/deepCopy';

// >> Fishing Rods
const commonFishingRodItem: Item = {
    name: 'Normal Fishingrod',
    description: 'DEBUG: An normal Fishingrod, not so nice. :(.',
    icon: 'crate',
    slot: 0,
    quantity: 1,
    behavior:
        ITEM_TYPE.CAN_TRADE |
        ITEM_TYPE.IS_TOOLBAR |
        ITEM_TYPE.SKIP_CONSUMABLE |
        ITEM_TYPE.CAN_DROP,
    data: {
        rarity: 'Normal',
        durability: 50,
        category: 'Fishingrods'
    }
}
const registerCommonFishingRod: Item = deepCloneObject<Item>(commonFishingRodItem);
appendToItemRegistry(registerCommonFishingRod);
/* 
const rareFishingRodItem: Item = {
    name: 'Rare Fishingrod',
    description: 'DEBUG: An rare Fishingrod, nice.',
    icon: 'crate',
    slot: 0,
    quantity: 1,
    behavior:
        ITEM_TYPE.CAN_TRADE |
        ITEM_TYPE.IS_TOOLBAR |
        ITEM_TYPE.SKIP_CONSUMABLE |
        ITEM_TYPE.CAN_DROP,
    data: {
        rarity: 'Rare',
        durability: 200,
        category: 'Fishingrods'
    }
}
const registerRareFishingRod: Item = deepCloneObject<Item>(rareFishingRodItem);
appendToItemRegistry(registerRareFishingRod);

const epicFishingRodItem: Item = {
    name: 'Epic Fishingrod',
    description: 'DEBUG: An epic Fishing Rod, wow amazing!',
    icon: 'crate',
    slot: 0,
    quantity: 1,
    behavior:
        ITEM_TYPE.CAN_TRADE |
        ITEM_TYPE.IS_TOOLBAR |
        ITEM_TYPE.SKIP_CONSUMABLE |
        ITEM_TYPE.CAN_DROP,
    data: {
        rarity: 'Epic',
        durability: 500,
        category: 'Fishingrods'
    }
}
const registerEpicFishingRod: Item = deepCloneObject<Item>(epicFishingRodItem);
appendToItemRegistry(registerEpicFishingRod); */

const nomralFishOneItem: Item = {
    name: 'Normal-Fish-1',
    description: 'DEBUG: Placeholderfish',
    icon: 'crate',
    slot: 0,
    quantity: 1,
    behavior:
        ITEM_TYPE.CAN_TRADE |
        ITEM_TYPE.SKIP_CONSUMABLE |
        ITEM_TYPE.CAN_DROP |
        ITEM_TYPE.CAN_STACK,
    data: {
        // N/A.
    }
}
const registerNormalFishOne: Item = deepCloneObject<Item>(nomralFishOneItem);
appendToItemRegistry(registerNormalFishOne);

const normalFishTwoItem: Item = {
    name: 'Normal-Fish-2',
    description: 'DEBUG: Placeholderfish',
    icon: 'crate',
    slot: 0,
    quantity: 1,
    behavior:
        ITEM_TYPE.CAN_TRADE |
        ITEM_TYPE.SKIP_CONSUMABLE |
        ITEM_TYPE.CAN_DROP |
        ITEM_TYPE.CAN_STACK,
    data: {
        // N/A.
    }
}
const registerNormalFishTwo: Item = deepCloneObject<Item>(normalFishTwoItem);
appendToItemRegistry(registerNormalFishTwo);

// Bait Items
const wormBaitItem: Item = {
    name: 'Rainworm',
    description: 'DEBUG: Rainworm Bait',
    icon: 'crate',
    slot: 0,
    quantity: 125,
    behavior:
        ITEM_TYPE.CAN_TRADE |
        ITEM_TYPE.SKIP_CONSUMABLE |
        ITEM_TYPE.CAN_DROP |
        ITEM_TYPE.CAN_STACK,
    data: {
        // N/A.
    }
}
const registerWormBaitItem: Item = deepCloneObject<Item>(wormBaitItem);
appendToItemRegistry(registerWormBaitItem);