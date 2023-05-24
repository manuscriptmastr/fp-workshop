import o from '../composers/o';

export const wait = ms => new Promise(res => setTimeout(res, ms));

export const untilTime = timestamp => timestamp * 1000 - Date.now();

export const waitUntil = o(wait, untilTime);
