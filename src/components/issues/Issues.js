import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ReactPaginate from "react-paginate";

import { getIssues } from "../../services/issues";
import { getRepo } from "../../services/repo";

const IssuesComponent = () => {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [repo, setRepo] = useState({});

  useEffect(() => {
    getIssuesList(page);
  }, [page]);

  useEffect(() => {
    getRepoDetails();
  }, []);

  const getRepoDetails = async () => {
    const repoData = await getRepo();
    if (repoData) {
      setRepo(repoData);
    }
  };

  const getIssuesList = async (pageNo) => {
    const issuesList = await getIssues(pageNo);
    if (issuesList) {
      setIssues(issuesList);
    }
  };

  const handlePageClick = async ({ selected }) => {
    const selectedPage = selected + 1;
    if (page !== selectedPage) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      <div>
        <p>
          <b>{repo && repo.full_name}</b>
        </p>
      </div>

      <div>
        <p>Issues</p>
        {issues.map((issue) => {
          if (issue.id) {
            return (
              <div key={issue.id} className="border rounded my-2 p-2">
                <Link to={"issue/" + issue.number}>
                  <p>
                    <b>{issue.title}</b>
                  </p>
                </Link>
                <p>
                  #{issue.number} posted on:{" "}
                  {moment(issue.created_at).format("MM/DD/yyyy")} by:{" "}
                  {issue.user.login}
                </p>
              </div>
            );
          }

          return null;
        })}
        {repo && issues.length && (
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={repo.open_issues_count / 30}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            initialPage={page + 1}
          />
        )}
      </div>
    </div>
  );
};

export default IssuesComponent;
