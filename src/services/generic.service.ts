import axios from 'axios';

export interface UriParams {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | Date
    | Array<string | unknown | null>
    | unknown
    | undefined;
}

type ApiResponse<T> = {
  data: T;
  cursor?: string;
};

export const genericService = {
  get,
};

async function get<T>(url: string, params: {}): Promise<T> {
  const response = await axios.get<ApiResponse<T>>(url, params);
  return response.data.data;
}
