import axios from "axios";

const WHEEL_API_URL = "https://api.wheel-size.com/v1";
const API_USER_KEY = "461bc346eb79252100b02229c60abdcc";

const api = {
  getManufacters: () =>
    axios
      .get(`${WHEEL_API_URL}/makes/`, {
        params: { user_key: API_USER_KEY },
      })
      .then((response) => response.data),
  getYears: (make: string) =>
    axios
      .get(`${WHEEL_API_URL}/years/`, {
        params: { user_key: API_USER_KEY, make },
      })
      .then((response) => response.data),

  getModels: (make: string, year: string) =>
    axios
      .get(`${WHEEL_API_URL}/models/`, {
        params: { user_key: API_USER_KEY, make, year },
      })
      .then((response) => response.data),
  getCarByModel: (make: string, year: string, model: string) =>
    axios
      .get(`${WHEEL_API_URL}/search/by_model/`, {
        params: {
          user_key: API_USER_KEY,
          make,
          year,
          model,
        },
      })
      .then((response) => response.data),
};
export default api;

export interface WheelDataOption {
  slug: string;
  name: string;
}
