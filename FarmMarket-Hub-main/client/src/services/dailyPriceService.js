import api from "../api/axios";

export const getAllDailyPrices = async () => {
  const response = await api.get("/daily-prices");
  return response.data;
};

export const createDailyPrice = async (data) => {
  const response = await api.post("/daily-prices", data);
  return response.data;
};

export const updateDailyPrice = async (id, data) => {
  const response = await api.put(`/daily-prices/${id}`, data);
  return response.data;
};

export const deleteDailyPrice = async (id) => {
  const response = await api.delete(`/daily-prices/${id}`);
  return response.data;
};