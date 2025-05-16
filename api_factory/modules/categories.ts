import { GATEWAY_ENDPOINT } from "../axios.config";

interface Category {
    reviewer: string
    rating: number
    topic: string
    review: string
    serviceProviderId: string
}

export const categories_api = {
  $_create_category: (payload: Category) => {
    const url = "/category";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_update_category: (payload: Category) => {
    const url = "/category";
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_delete_category: (id: string) => {
    const url = `/category/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  $_fetch_category: (id: string) => {
    const url = `/category/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_categories: () => {
    const url = "/category";
    return GATEWAY_ENDPOINT.get(url);
  },
};
