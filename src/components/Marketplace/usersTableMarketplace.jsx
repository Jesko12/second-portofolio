import React, { Component } from "react";
import Table from "../common/table";

class UsersTableMarketplace extends Component {
  columns = [
    { path: "full_name", label: "First Name" },
    { path: "referral_code", label: "Referral Code" },
    { path: "mobile_number", label: "Phone" },
    { path: "email", label: "E-mail" },
  ];

  render() {
    const { data, onSort, sortColumn } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          data={data}
          onSort={onSort}
          sortColumn={sortColumn}
        />
      </div>
    );
  }
}

export default UsersTableMarketplace;
