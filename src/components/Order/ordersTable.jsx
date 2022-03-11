import React, { Component } from "react";
import Table from "../common/table";
import OrderModal from "../common/orderModal";
import { Link } from "react-router-dom";
import * as RiIcons from "react-icons/ri";

const options = [
  "In Production",
  "Shipped",
  "Completed",
  "Cancelled",
]

class OrdersTable extends Component {
  state = {
    modalShowed: false,
    currentOrder: {},
    status: "",
  };

  columns = [
    {path: "id", label: "ID"},
    {
      path: "full_name",
      label: "Name",
      content: (order) => (
        <Link
          style={{ textDecoration: "none", color: "#557174" }}
          to={`/marketplace/order/detail/${order.id}`}
        >
          {order.full_name}
        </Link>
      )
    },
    { path: "status", label: "Status" },
    { path: "total_price", label: "Total Price" },
    { path: "created_at", label: "Created at" },
    {
      key: "edit",
      content: (order) => (
        <RiIcons.RiEditBoxLine
          style={{ cursor: "pointer" }}
          onClick={() => this.handleModal(order)}
        />
      ),
    },
  ];

  handleModal = (order) => {
    const modalShowed = !this.state.modalShowed;
    this.setState({ modalShowed, currentOrder: order || {} });

    if (modalShowed === false) {
      window.location = `/marketplace/orders`;
    }
  };

  render() {
    const { currentOrder, modalShowed } = this.state;
    const { data, onSort, sortColumn } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          data={data}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <OrderModal
          order={currentOrder}
          show={modalShowed}
          onHide={() => this.handleModal()}
          options={options}
        />
      </div>
    );
  }
}

export default OrdersTable;
