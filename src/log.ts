import chalk from 'chalk';
import figlet from 'figlet';
import { ListingsResponse } from '../types/listingsResponse';
import { appID } from './app';
import {
  marketPriceFormatter,
  getDiscount,
  getHistoricalAverage,
  getItemUrl,
} from './data';

export async function logFiglet(): Promise<void> {
  return new Promise(function (resolve, reject) {
    figlet(appID, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result) console.log(chalk.yellow(result));
      resolve();
    });
  });
}

export function logItem(listing: ListingsResponse) {
  const discount = getDiscount(listing);
  const averageDiscount = getHistoricalAverage(listing, discount);
  console.log(
    chalk.cyan(listing.item.item_name),
    getAverageComparedDiscountMessage(averageDiscount, discount),
    getDiscountMessage(listing, discount)
  );
}

function getAverageComparedDiscountMessage(
  averageDiscount: number | undefined,
  discount: number
) {
  if (
    averageDiscount !== undefined &&
    Math.abs(discount) < Math.abs(averageDiscount)
  ) {
    const averageCompared = Math.abs(averageDiscount) - Math.abs(discount);
    return chalk.dim(`${averageCompared}% less than average`);
  }

  return '';
}

function getDiscountMessage(listing: ListingsResponse, discount: number) {
  const link = getItemUrl(listing);
  let discountMessage = marketPriceFormatter(discount);
  if (discount < 0) discountMessage = chalk.yellow(discountMessage);
  else if (discount == 0) discountMessage = chalk.green(discountMessage, link);
  else discountMessage = chalk.magenta(discountMessage, link);
  return discountMessage;
}

export function logFailure(startTime: Date, endTime: Date) {
  console.log('Start Time:', chalk.magenta(`${startTime}`));
  console.log('End Time:', chalk.magenta(`${endTime}`));
}
