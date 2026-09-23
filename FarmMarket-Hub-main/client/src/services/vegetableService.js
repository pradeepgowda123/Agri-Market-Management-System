import api from "../api/axios";

export const getAllVegetables = async () => {
  const response = await api.get("/vegetables");
  return response.data;
};

export const createVegetable = async (vegetableData) => {
  const response = await api.post("/vegetables", vegetableData);
  return response.data;
};

export const updateVegetable = async (id, vegetableData) => {
  const response = await api.put(`/vegetables/${id}`, vegetableData);
  return response.data;
};

export const deleteVegetable = async (id) => {
  const response = await api.delete(`/vegetables/${id}`);
  return response.data;
};
