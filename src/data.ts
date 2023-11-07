import { ListingsResponse } from "../types/listingsResponse";
import { WishListItem } from "../types/wishListItem";
import wishListItemsData from "../wishListItemsData.json" assert { type: "json" };

export function getDiscount(listing: ListingsResponse) {
  return formatNumber(
    100 - (listing.price / listing.reference.predicted_price) * 100
  );
}

export function marketPriceFormatter(discount: number) {
  if (discount < 0) return `${Math.abs(discount)}% over market price`;
  else if (discount == 0) return "market price";
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
      i.def_index == listing.item.def_index &&
      i.paint_index == listing.item.paint_index
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

  if (averageDiscount == undefined) return undefined;
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
  return wishListItemsData;
}
