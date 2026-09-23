import api from "../api/axios";

export const getAllMarkets = async () => {
  const response = await api.get("/markets");
  return response.data;
};

export const createMarket = async (marketData) => {
  const response = await api.post("/markets", marketData);
  return response.data;
};

export const updateMarket = async (id, marketData) => {
  const response = await api.put(`/markets/${id}`, marketData);
  return response.data;
};

export const deleteMarket = async (id) => {
  const response = await api.delete(`/markets/${id}`);
  return response.data;
};