import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { getIssue } from "../../services/issues";
import { getRepo } from "../../services/repo";

const IssueComponent = ({ match }) => {
  const [issue, setIssue] = useState({});
  const [repo, setRepo] = useState({});
  const issueNumber = (match && match.params && match.params.number) || null;
  useEffect(() => {
    if (issueNumber) {
      getIssueDetails(issueNumber);
    }
  }, [issueNumber]);

  useEffect(() => {
    getRepoDetails();
  }, []);

  const getRepoDetails = async () => {
    const repoData = await getRepo();
    if (repoData) {
      setRepo(repoData);
    }
  };

  const getIssueDetails = async (issueNo) => {
    const issueData = await getIssue(issueNo);
    if (issueData) {
      setIssue(issueData);
    }
  };

  return (
    <div>
      <div>
        <p>
          <b>{repo && repo.full_name}</b>
        </p>
      </div>

      {issue && issue.id && (
        <div>
          <p>
            <b>
              {issue.title} #{issue.number}
            </b>
            {issue.labels &&
              issue.labels.map((label) => (
                <span
                  className="badge badge-pill"
                  style={{ backgroundColor: "#" + label.color }}
                >
                  {label.name}
                </span>
              ))}
          </p>
          <div key={issue.id} className="border rounded my-2 p-2">
            <h2>
              <span
                className={
                  "badge badge-pill badge-" +
                  (issue.state ? "success" : "primary")
                }
              >
                {issue.state}
              </span>
            </h2>
            <p>
              <b>{issue.user.login}</b> opened this issue on{" "}
              {moment(issue.created_at).format("MM/DD/yyyy")}
            </p>
            <pre>{issue.body}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueComponent;
