import axios from "axios";

export const postUtil = (url, data) =>
  axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
