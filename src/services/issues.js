import api from "./api";
import { APIs } from "../constants";

const getIssues = async (page) => {
  let url = APIs.issues;
  if (page) url += "?page=" + page + "&q=is:issue is:open";
  const method = "get";
  const response = await api({
    url,
    method,
    accept: "application/vnd.github.squirrel-girl-preview",
  });
  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

const getIssue = async (issueNo) => {
  let url = APIs.issues;
  if (issueNo) url += "/" + issueNo;
  const method = "get";
  const response = await api({
    url,
    method,
    accept: "application/vnd.github.squirrel-girl-preview",
  });
  if (response && response.status && response.status === 200) {
    const { data } = response;
    return data;
  }
  return false;
};

export { getIssues, getIssue };
