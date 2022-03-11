import React, { Fragment } from "react";
import DiscoversTable from "./discoversTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import { trackPromise } from "react-promise-tracker";
import SearchBox from "../common/searchBox";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { TableBody } from "../Table/TableElements";
import { FlexDisplay } from "../common/CommonElements";
import { getDiscovers } from "../../services/userCoreService";
import { ButtonSubmit } from "../common/CommonElements";
import { LoadingIndicator } from "../common/CommonElements";

class DiscoversMarketplace extends React.Component {
  state = {
    pageSize: 15,
    currentPage: 1,
    discovers: [],
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    await trackPromise(
      getDiscovers().then(({ data: discovers }) => {
        this.setState({ discovers });
      })
    );
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getSortedData = () => {
    const {
      pageSize,
      currentPage,
      discovers,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = discovers;
    if (searchQuery)
      filtered = discovers.filter((discover) =>
        discover.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginatedDiscovers = paginate(sorted, currentPage, pageSize);

    return { totalCount: sorted.length, sortedDiscovers: paginatedDiscovers };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, sortedDiscovers } = this.getSortedData();
    return (
      <Fragment>
        <TableBody>
          <FlexDisplay>
          <Link to="/marketplace/discovers/add">
              <ButtonSubmit>Add Discover</ButtonSubmit>
            </Link>
            <p>Showing {totalCount} discovers in the database</p>
          </FlexDisplay>
          <FlexDisplay>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </FlexDisplay>
          <DiscoversTable
            data={sortedDiscovers}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <LoadingIndicator />
        </TableBody>
      </Fragment>
    );
  }
}

export default DiscoversMarketplace;
