import React, { Fragment } from "react";
import { LoadingIndicator } from "../common/CommonElements";
import Form from "../common/form";
import { getOrderByID } from "../../services/userCoreService";
import { TableBody } from "../Table/TableElements";
import { ButtonPrimary, TableWrapper } from "../common/CommonElements";
import { Link } from "react-router-dom";

class OrderDetail extends Form {
  state = {
    data: {
      order_items: [],
      id: 0,
      status: "",
      total_price: 0,
      destination_adress: "",
      destination_province: "",
      destination_city: "",
      shipping_status: "",
      logistic_status: "",
      payment_method: "",
      payment_channel: "",
      bank_code: "",
      shipment_price: 0,
      paid_amount: 0,
      invoice_url: "",
      created_at: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const orderId = this.props.match.params.id;
    const { data } = await getOrderByID(orderId);

    const order_items = data.order.order_items;
    const status = data.order.status;
    const total_price = data.order.total_price;
    const destination_address = data.shipment.destination_address;
    const destination_province = data.shipment.destination_province;
    const destination_city = data.shipment.destination_city;
    const shipping_status = data.shipment.shipping_status;
    const logistic_status = data.shipment.logistic_status;
    const payment_method = data.payment.payment_method;
    const payment_channel = data.payment.payment_channel;
    const bank_code = data.payment.bank_code;
    const shipment_price = data.payment.shipment_price;
    const paid_amount = data.payment.paid_amount;
    const invoice_url = data.payment.invoice_url;
    const created_at = data.payment.created_at;

    const customObject = {
      order_items: order_items,
      status: status,
      total_price: total_price,
      destination_address: destination_address,
      destination_province: destination_province,
      destination_city: destination_city,
      shipping_status: shipping_status,
      logistic_status: logistic_status,
      payment_method: payment_method,
      payment_channel: payment_channel,
      bank_code: bank_code,
      shipment_price: shipment_price,
      paid_amount: paid_amount,
      invoice_url: invoice_url,
      created_at: created_at,
    };
    this.setState({ data: customObject });
  }

  render() {
    const { order_items } = this.state.data;
    return (
      <Fragment>
        <TableBody>
          <h1>Order Detail</h1>
          <br />
          <TableWrapper>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Colors</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {order_items.map(order_item =>
                <tr key={order_item.id}>
                  <img src={order_item.image_urls}
                    width={100}
                    style={{ borderRadius: "10px", marginLeft: "2.7rem"}}
                    alt= "" />
                  <td>{order_item.name}</td>
                  <td>{order_item.price}</td>
                  <td>{order_item.quantity}</td>
                  <td>{order_item.colors}</td>
                  <td>{order_item.notes}</td>
                </tr>)}
            </tbody>
          </TableWrapper>
          <form>
            <fieldset disabled="disabled">
              {this.renderInput("status", "Status")}
              {this.renderInput("total_price", "Total Price", "number")}
              {this.renderInput("destination_address", "Destination Address")}
              {this.renderInput("destination_province", "Destination Province")}
              {this.renderInput("destination_city", "Destination City")}
              {this.renderInput("shipping_status", "Shipping Status")}
              {this.renderInput("logistic_status", "Logistic Status")}
              {this.renderInput("payment_method", "Payment Method")}
              {this.renderInput("payment_channel", "Payment Channel")}
              {this.renderInput("bank_code", "Bank Code")}
              {this.renderInput("shipment_price", "Shipment Price", "number")}
              {this.renderInput("paid_amount", "Paid Amount", "number")}
              {this.renderInput("invoice_url", "Invoice URL")}
              {this.renderInput("created_at", "Created At")}
            </fieldset>
            <Link to="/marketplace/orders">
              <ButtonPrimary>Back</ButtonPrimary>
            </Link>
          </form>
          <LoadingIndicator />
        </TableBody>
      </Fragment>
    );
  }
}

export default OrderDetail;
