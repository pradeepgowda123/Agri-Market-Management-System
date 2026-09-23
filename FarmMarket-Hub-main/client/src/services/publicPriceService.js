import api from "../api/axios";

export const getLatestPrices = async () => {
  const response = await api.get("/daily-prices");
  return response.data;
};