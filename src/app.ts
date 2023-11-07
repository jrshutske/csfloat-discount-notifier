import { WishListItem } from "../types";
import { getWishListItems } from "./data";
import search from "./search";
declare global {
  var wishListItems: WishListItem[];
}
export const csFloatUrl = "https://csfloat.com/api/v1";
export const appID = "CSFloat - Discount Notifier";
global.wishListItems = getWishListItems();

await search();
