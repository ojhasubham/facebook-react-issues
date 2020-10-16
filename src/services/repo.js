import api from "./api";
import { APIs } from "../constants";

const getRepo = async () => {
  let url = APIs.repo;
  const method = "get";
  const response = await api({ url, method });
  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

export { getRepo };
