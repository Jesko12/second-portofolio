import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import ModalForm from "./modalForm";
import userService from "../../services/userService";

class UserModal extends Form {
  state = {
    data: { status: "", reason: "" },
    errors: {},
  };

  schema = {
    status: Joi.string().required().label("Status"),
    reason: Joi.string().allow("").label("Reason"),
  };

  doSubmit = async () => {
    const { user } = this.props;
    const { data } = this.state;
    let body = {
      bank_account_status: data.status,
      reason: data.reason,
      email: user.email,
    };

    if (data.reason === "") {
      delete body["reason"];
    }

    toast.info("Verifying User Bank Account...");
    try {
      await userService.verifyUser(body);
      toast.success("User Bank Account Status Updated!");
      setTimeout(function () {
        window.location = "/";
      }, 3000);
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
      user,
      onChange,
      ...rest
    } = this.props;

    const { data } = this.state;

    return (
      <ModalForm
        title={"Verify User Bank"}
        body={
          <>
            <h4>{user.name}</h4>
            <p>Current Status: {user["bank_account_status"]}</p>
            <form onSubmit={this.handleSubmit}>
              {this.renderSelect(
                "status",
                options.filter((option) => option !== user.status),
                "Status"
              )}
              {data.status === "Ditolak"
                ? this.renderInput("reason", "Alasan")
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

export default UserModal;
