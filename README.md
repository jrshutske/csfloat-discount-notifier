# CSFloat Discount Notifier

A Node.js app that monitors discounts on specified CSFloat items and notifies you via console messages and Windows toast notifications when discounts appear.

<div style="display: flex; height: 200px;">
  <img src="media/teminal.png" style="width: 50%;" alt="terminal png" />
  <img src="media/toast.gif" style="width: 50%;" alt="toast gif" />
</div>

## Features

- Watches your wishlist items for discounts
- Logs discount details to the console
- Sends native Windows toast notifications for instant alerts
- Configurable with your wishlist data
- Easy to run with Yarn
- Securely stores API key using environment variables

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- Yarn package manager
- Windows OS (for toast notifications)

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/csfloat-discount-notifier.git
   cd csfloat-discount-notifier
   ```

2. Install Dependencies

   ```bash
   yarn install
   ```

3. Create a .env file in the project root with your CSFloat API key:

   ```bash
   CSFLOAT_API_KEY=your_api_key_here
   ```

4. Configure your wishlist items (see wishListItemsData.json)

Run the notifier with:

```bash
yarn start
```

#### The app will:

- Periodically check for discounts on your wishlist items

- Output discount info in the console

- Show toast notifications on Windows when discounts are found

#### Configuration

- Add or edit your wishlist items in wishListItemsData.json

- Update other settings like polling intervals in config files (if applicable)

- The app loads your API key from the .env file automatically via dotenv

#### Troubleshooting

- Ensure you are running on Windows for toast notifications to work

- Verify your .env file exists and the API key is correct

- Check console logs for detailed error messages
