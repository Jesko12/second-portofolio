import React from "react";
import Form from "./form";
import { getOrderByID } from "../../services/userCoreService";
import ModalForm from "./modalForm";

class OrderModalDetail extends Form {
  state = {
    errors: {},
  };

async componentDidMount() {
      const { data } = await getOrderByID();
      this.setState( { data });
      console.log(this.state);
  }

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
        title={"Order Detail"}
        body={
          <>
            <h4>{order.name}</h4>
            <p>Current Status: {order.status}</p>
          </>
        }
        button={"Close"}
        onHide={onHide}
        {...rest}
      />
    );
  }
}

export default OrderModalDetail;
