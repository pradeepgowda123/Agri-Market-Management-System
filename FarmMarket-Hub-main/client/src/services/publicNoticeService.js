import api from "../api/axios";

export const getLatestNotices = async () => {
  const response = await api.get("/notices");
  return response.data;
};