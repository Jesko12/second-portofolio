import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import clientService from "../../services/clientService";
import ModalForm from "./modalForm";

class ClientModal extends Form {
  state = {
    data: { status: "", salesOrderNumber: "", amount: 0 },
    errors: {},
  };

  schema = {
    status: Joi.string().required().label("Status"),
    salesOrderNumber: Joi.string().allow("").label("Sales Order Number"),
    amount: Joi.number().min(0).label("Amount"),
  };

  doSubmit = async () => {
    const { client, location } = this.props;
    const { data } = this.state;
    let body = {
      status: data.status,
      sales_order_number: data.salesOrderNumber,
      amount: data.amount,
    };
    if (data.salesOrderNumber === "") {
      delete body["sales_order_number"];
    }

    if (data.amount === 0) {
      delete body["amount"];
    }

    toast.info("Updating client...");
    try {
      await clientService.updateClientStatus(client.id, body);
      toast.success("Client status updated!");
      setTimeout(function () {
        window.location = location;
      }, 4000);
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
      client,
      onChange,
      ...rest
    } = this.props;

    const { data } = this.state;

    return (
      <ModalForm
        title={"Update Client Status"}
        body={
          <>
            <h4>{client.name}</h4>
            <p>Current Status: {client.status}</p>
            <form onSubmit={this.handleSubmit}>
              {this.renderSelect(
                "status",
                options.filter((option) => option !== client.status),
                "Status"
              )}
              {data.status === "Menunggu Pembayaran"
                ? this.renderInput("salesOrderNumber", "Sales Order Number")
                : data.status === "Pembayaran Diterima"
                ? this.renderInput("amount", "Amount", "number")
                : null}
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

export default ClientModal;
