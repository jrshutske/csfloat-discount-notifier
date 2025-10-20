import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { ListingsResponse } from "../types/listingsResponse";
import { WishListItem } from "../types/wishListItem";

// Load wishlist from JSON file
function loadWishlist(): WishListItem[] {
  const wishlistPath = join(process.cwd(), "wishlist.json");

  if (!existsSync(wishlistPath)) {
    console.error("❌ wishlist.json not found!");
    console.error("   Create wishlist.json in the same directory as this app.");
    process.exit(1);
  }

  try {
    const content = readFileSync(wishlistPath, "utf-8");
    const items = JSON.parse(content);
    console.log(`✅ Loaded ${items.length} items from wishlist.json`);
    return items;
  } catch (error) {
    console.error("❌ Error loading wishlist.json:", error);
    process.exit(1);
  }
}

const wishListItems = loadWishlist();

export function getDiscount(listing: ListingsResponse) {
  return formatNumber(
    100 - (listing.price / listing.reference.predicted_price) * 100
  );
}

export function marketPriceFormatter(discount: number) {
  if (discount < 0) return `${Math.abs(discount)}% over market price`;
  else if (discount === 0) return "market price";
  else return `${Math.abs(discount)}% under market price`;
}

function formatNumber(num: number) {
  return parseFloat(num.toFixed(2));
}

export function getHistoricalAverage(
  listing: ListingsResponse,
  discount: number
) {
  const itemIndex = wishListItems.findIndex(
    (i) =>
      i.def_index === listing.item.def_index &&
      i.paint_index === listing.item.paint_index
  );
  const historicalDiscounts = wishListItems[itemIndex].historical_discounts;
  let total = 0;
  let averageDiscount = undefined;
  historicalDiscounts?.map((historicalDiscount) => {
    total += historicalDiscount;
  });

  if (historicalDiscounts)
    averageDiscount = total / historicalDiscounts?.length;
  if (!historicalDiscounts) wishListItems[itemIndex].historical_discounts = [];
  wishListItems[itemIndex].historical_discounts?.push(discount);

  if (averageDiscount === undefined) return undefined;
  return formatNumber(averageDiscount);
}

export function getItemUrl(listing: ListingsResponse) {
  let url = `https://csfloat.com/search?sort_by=highest_discount&type=buy_now`;
  url += `&def_index=${listing.item.def_index}`;
  if (listing.item.paint_index)
    url += `&paint_index=${listing.item.paint_index}`;
  return url;
}

export function getWishListItems(): WishListItem[] {
  return wishListItems;
}
