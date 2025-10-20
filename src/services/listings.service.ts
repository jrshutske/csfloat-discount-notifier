import { ListingsResponse, WishListItem } from "../../types";
import { csFloatUrl } from "../app";
import { genericService } from "./generic.service";

export const listingsService = {
  getListing,
  testConnection,
};

async function getListing(item: WishListItem): Promise<ListingsResponse[]> {
  const url = `${csFloatUrl}/listings`;
  return await genericService.get(url, getSearchParams(item));
}

const getSearchParams = ({ def_index, paint_index }: WishListItem) => ({
  params: {
    sort_by: "highest_discount",
    type: "buy_now",
    def_index,
    paint_index,
    limit: 1,
  },
  headers: {
    Authorization: apiKey,
  },
});

async function testConnection() {
  const url = `${csFloatUrl}/listings`;
  return await genericService.get(url, {
    headers: {
      Authorization: apiKey,
    },
  });
}
