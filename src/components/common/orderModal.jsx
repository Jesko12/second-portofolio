import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import userCoreService from "../../services/userCoreService";
import ModalForm from "./modalForm";

class OrderModal extends Form {
  state = {
    data: { status: "" },
    errors: {},
  };

  schema = {
    status: Joi.string().required().label("Status"),
  };

  doSubmit = async () => {
    const { order, location } = this.props;
    const { data } = this.state;
    let body = {
      status: data.status,
    };
    toast.info("Updating order...");
    try {
      await userCoreService.updateOrderStatus(order.id, body);
      toast.success("Order status updated!");
      setTimeout(function () {
        window.location = location;
      }, 1000);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        toast.error(e.response.data.error);
      }
    }
  };

  render() {
    const {
      modalShowed,
      onHide,
      options,
      order,
      onChange,
      ...rest
    } = this.props;

    return (
      <ModalForm
        title={"Update Order Status"}
        body={
          <>
            <h4>{order.name}</h4>
            <p>Current Status: {order.status}</p>
            <form onSubmit={this.handleSubmit}>
              {this.renderSelect(
                "status",
                options.filter((option) => option !== order.status),
                "Status"
              )}
              {this.renderButton("Update Status")}
            </form>
          </>
        }
        button={"Close"}
        onHide={onHide}
        {...rest}
      />
    );
  }
}

export default OrderModal;
