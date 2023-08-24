import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {allProductsApi} from "../../../services/endpoints.js";

export const getStudentstList = createAsyncThunk(
  "products/getStudentstList",
  async () => {
    try {
      // const {data} = await axios.get(allProductsApi);

      const data = [
        {
          ID: 1,
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: "2023-07-31T12:44:55.403Z",
        },
        {
          ID: 2,
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: "2023-07-31T12:44:55.403Z",
        },
      ];

      return data;
    } catch (error) {
      return console.error("error in getallproducts", error.message);
    }
  }
);
export const deleteRecord = createAsyncThunk(
  "products/getStudentstList",
  async (payload) => {
    try {
      // const {data} = await axios.get(allProductsApi);
      console.log("payload---->", payload);
      return null;
    } catch (error) {
      return console.error("error in getallproducts", error.message);
    }
  }
);
