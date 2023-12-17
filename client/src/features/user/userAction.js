import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API_USERS } from "../../utils/config";
import axios from "axios";

export const loadUsers = createAsyncThunk(
  "user/loadUsers",
  async (_, { dispatch, getState }) => {
    try {
      console.info(`Fetching ${URL_API_USERS}`);
      const response = await axios.get(URL_API_USERS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (formData, { dispatch, getState }) => {
    try {
      console.info(`Sending POST request: ${URL_API_USERS}`);
      const response = await axios.post(URL_API_USERS, formData);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { dispatch, getState }) => {
    try {
      console.info(`Sending DELETE request: ${URL_API_USERS}`);
      await axios.delete(URL_API_USERS, userId);
      return userId;
    } catch (error) {
      throw new Error(error);
    }
  }
);