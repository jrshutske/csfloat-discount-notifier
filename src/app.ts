import { WishListItem } from '../types';
import { getWishListItems } from './data';
import search from './search';
import dotenv from 'dotenv';
dotenv.config();

declare global {
  var wishListItems: WishListItem[];
  var apiKey: string;
}
export const csFloatUrl = 'https://csfloat.com/api/v1';
export const appID = 'CSFloat - Discount Notifier';
global.wishListItems = getWishListItems();
global.apiKey = process.env.CSFLOAT_API_KEY ?? ""
await search();
