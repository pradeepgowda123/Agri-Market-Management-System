import api from "../api/axios";

export const getMarkets = async () => {
  const response = await api.get("/markets");
  return response.data;
};