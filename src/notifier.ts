import { dirname, join } from "path";
import open from "open";
import notifier from "node-notifier";
import { fileURLToPath } from "url";
import { appID } from "./app";
import { marketPriceFormatter, getDiscount, getItemUrl } from "./data";
import { PreviouslyNotified, ListingsResponse } from "../types";

export let notifiedCases: PreviouslyNotified[] = [];

const filename = fileURLToPath(import.meta.url);
const icon = join(dirname(filename), "../icon.png");

export default async function notify(listing: ListingsResponse): Promise<void> {
  return new Promise((resolve) => {
    const discount = getDiscount(listing);
    const notified = notifiedCases.find(
      (notifiedCase) =>
        listing.item.def_index == notifiedCase.def_index &&
        listing.item.paint_index == notifiedCase.paint_index &&
        discount == notifiedCase.discount
    );

    if (notified) return;

    notifiedCases.push({
      def_index: listing.item.def_index,
      paint_index: listing.item.paint_index,
      discount,
    });

    notifier.notify(
      {
        appID,
        title: listing.item.item_name,
        message: marketPriceFormatter(discount),
        sound: true,
        icon,
        wait: true,
      },
      (_err, response, _metadata) => {
        if (response != "dismissed" && response != "timeout") {
          open(getItemUrl(listing));
          notifiedCases = notifiedCases.filter(
            (notifiedCase) =>
              listing.item.def_index != notifiedCase.def_index &&
              listing.item.paint_index != notifiedCase.paint_index
          );
        }
      }
    );
    resolve();
  });
}
