import { WishListItem } from "../types";
import { getWishListItems } from "./data";
import search from "./search";
import dotenv from "dotenv";
dotenv.config();

declare global {
  var wishListItems: WishListItem[];
  var apiKey: string;
}

export const csFloatUrl = "https://csfloat.com/api/v1";
export const appID = "CSFloat - Discount Notifier";

// Initialize global state
global.wishListItems = getWishListItems();
global.apiKey = process.env.CSFLOAT_API_KEY ?? "";

// Validate API key
if (!global.apiKey) {
  console.error("Error: CSFLOAT_API_KEY is not set in .env file");
  console.error("Please create a .env file with your API key:");
  console.error("CSFLOAT_API_KEY=your_api_key_here");
  process.exit(1);
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nShutting down gracefully...");
  process.exit(0);
});

// Start the application
(async () => {
  await search();
})().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
