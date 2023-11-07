import ora from "ora";
import axios, { AxiosResponse } from "axios";
import notify from "./notifier";
import { getDiscount } from "./data";
import { csFloatUrl } from "./app";
import { logFailure, logFiglet, logItem } from "./log";
import { ListingsResponse, WishListItem } from "../types";

const spinner = ora();
let requestsMade = 0;

export default async function search(): Promise<void> {
  const startTime = new Date();
  spinner.stop();

  await logFiglet();

  try {
    await testConnection();
    const responses = await Promise.all(
      wishListItems.map((item) => getListing(item))
    );

    responses.map((response) => {
      const listing = response.data[0];
      logItem(listing);
      const discount = getDiscount(listing);
      if (discount > 0) notify(listing);
    });
    wait();
  } catch (error) {
    console.log(error);
    let endTime = new Date();
    logFailure(startTime, endTime, requestsMade);
    wait();
  }
}

function wait() {
  spinner.start("Waiting 10 minutes before retry...");
  setTimeout(() => search(), 6_00000);
}

async function getListing(
  item: WishListItem
): Promise<AxiosResponse<ListingsResponse[], any>> {
  requestsMade++;
  const url = `${csFloatUrl}/listings`;
  return await axios.get(url, getSearchParams(item));
}

async function testConnection() {
  const url = `${csFloatUrl}/listings`;
  return await axios.get(url);
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
    // Authorization: API_KEY,
  },
});
