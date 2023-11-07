export interface ListingsResponse {
  id: string;
  created_at: Date;
  type: "string";
  price: number;
  state: "string";
  seller: Seller;
  reference: Reference;
  item: Item;
  is_seller: boolean;
  is_watchlisted: boolean;
  watchers: number;
}

export interface Item {
  asset_id: string;
  def_index: number;
  paint_index: number;
  icon_url: string;
  rarity: number;
  market_hash_name: "string";
  tradable: number;
  has_screenshot: boolean;
  is_commodity: boolean;
  type: "string";
  scm: SCM;
  rarity_name: "string";
  type_name: "string";
  item_name: "string";
}

export interface SCM {
  price: number;
  volume: number;
}

export interface Reference {
  base_price: number;
  predicted_price: number;
  quantity: number;
  last_updated: Date;
}

export interface Seller {
  away: boolean;
  flags: number;
  has_valid_steam_api_key: boolean;
  obfuscated_id?: string;
  online: boolean;
  stall_public: boolean;
  statistics: Statistics;
  verification_mode: "string";
  avatar?: string;
  steam_id?: string;
  username?: "string";
}

export interface Statistics {
  median_trade_time: number;
  total_avoided_trades: number;
  total_failed_trades: number;
  total_trades: number;
  total_verified_trades: number;
}
