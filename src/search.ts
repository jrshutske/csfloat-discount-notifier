import ora from "ora";
import notify from "./notifier";
import { getDiscount } from "./data";
import { logFailure, logFiglet, logItem } from "./log";
import { listingsService } from "./services/listings.service";

const spinner = ora();

export default async function search(): Promise<void> {
  const startTime = new Date();
  spinner.stop();

  await logFiglet();

  try {
    await listingsService.testConnection();
    const responses = await Promise.all(
      wishListItems.map((item) => listingsService.getListing(item))
    );

    responses.forEach((response) => {
      const listing = response[0];
      logItem(listing);
      const discount = getDiscount(listing);
      if (discount > 0) notify(listing);
    });
    wait();
  } catch (error) {
    console.log(error);
    let endTime = new Date();
    logFailure(startTime, endTime);
    wait();
  }
}

function wait() {
  spinner.start("Waiting 10 minutes before retry...");
  setTimeout(() => search(), 600000);
}
