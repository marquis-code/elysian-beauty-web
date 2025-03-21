import { GATEWAY_ENDPOINT } from "../axios.config";

interface Review {
    reviewer: string
    rating: number
    topic: string
    review: string
    serviceProviderId: string
}

export const review_api = {
  $_create_review: (payload: Review) => {
    const url = "/review";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_update_review: (payload: Review) => {
    const url = "/review";
    return GATEWAY_ENDPOINT.put(url, payload);
  },
  $_delete_review: (id: string) => {
    const url = `/review/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  $_fetch_review: (id: string) => {
    const url = `/review/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_reviews: () => {
    const url = "/review";
    return GATEWAY_ENDPOINT.get(url);
  },
};
