import React, { Component } from "react";
import Table from "../common/table";


class DiscoversTable extends Component {

  columns = [
    { path: "image_urls", label: "Image"},
    { path: "video_url", label: "Video URL"},
    { path: "title", label: "Title" },
    { path: "tag", label: "Tag" },
    { path: "content", label: "Content" },
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

export default DiscoversTable;
