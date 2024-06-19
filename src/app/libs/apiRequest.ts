import axios from "axios";
import test from "node:test";

export const generateApiRequest = (endpointMenu: string) => {
  return axios.create({
    baseURL: endpointMenu,
    headers: {
      'Content-Security-Policy': 'default-src https:',
    },
  });
};

export const apiRequest = {
    test: {
        "v1.0": generateApiRequest(process.env.NEXT_TEST_URL)
    }
}