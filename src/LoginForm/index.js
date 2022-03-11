import Joi from "joi-browser";
import React from "react";
import Form from "../components/common/form";
import auth from "../services/authService";
import { toast } from "react-toastify";
import {
  LoginContent,
  LoginHeader,
  LoginWrapper,
  MainLoginWrapper,
} from "./LoginFormElements";

class Index extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        toast.error(e.response.data.error);
      }
    }
  };

  render() {
    return (
      <MainLoginWrapper>
        <h1>Monsieur.</h1>
        <LoginWrapper>
          <LoginHeader>
            <h4>Welcome back! Please Login.</h4>
          </LoginHeader>
          <LoginContent>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign In")}
            </form>
          </LoginContent>
        </LoginWrapper>
      </MainLoginWrapper>
    );
  }
}

export default Index;
