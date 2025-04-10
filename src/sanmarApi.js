// src/api/sanmarApi.js
import axios from "axios";
import { SANMAR_API } from "../config/sanmarConfig";

const sanmarApi = axios.create({
  baseURL: SANMAR_API.baseURL,
  auth: {
    username: SANMAR_API.username,
    password: SANMAR_API.password,
  },
});

export const fetchSanMarProducts = async () => {
  try {
    const response = await sanmarApi.get("/products"); // Update with actual endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching SanMar products:", error);
    return [];
  }
};

export default sanmarApi;
