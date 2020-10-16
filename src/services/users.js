import api from "./api";
import { APIs } from "../constants";

const getUsers = async () => {
  const url = APIs.users;
  const method = "get";
  const response = await api({ url, method });
  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

export { getUsers };
