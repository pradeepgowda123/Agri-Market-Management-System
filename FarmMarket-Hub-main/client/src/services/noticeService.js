import api from "../api/axios";

export const getAllNotices = async () => {
  const response = await api.get("/notices");
  return response.data;
};

export const createNotice = async (data) => {
  const response = await api.post("/notices", data);
  return response.data;
};

export const updateNotice = async (id, data) => {
  const response = await api.put(`/notices/${id}`, data);
  return response.data;
};

export const deleteNotice = async (id) => {
  const response = await api.delete(`/notices/${id}`);
  return response.data;
};