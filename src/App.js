import React, { Component, Fragment } from "react";
import { Switch, Redirect } from "react-router-dom";
import Index from "./LoginForm";
import MainSkeleton from "./components/mainSkeleton";
import ProtectedRoute from "./components/common/route/protectedRoute";
import MainRoute from "./components/common/route/mainRoute";
import { getCurrentUser } from "./services/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Logout from "./components/common/logout";
import ProductsMarketplace from "./components/Product/productsMarketplace";
import UserMarketplace from "./components/Marketplace/userMarketplace";
import AddProduct from "./components/Product/addProduct";
import EditProduct from "./components/Product/editProduct";
import DiscoversMarketplace from "./components/Discover/discoversMarketplace";
import AddDiscover from "./components/Discover/addDiscover";
import OrdersMarketplace from "./components/Order/ordersMarketplace";
import OrderDetail from "./components/Order/orderDetail";

class App extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <MainSkeleton user={user}>
          <Switch>
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/marketplace/products/add" component={AddProduct} />
            <ProtectedRoute path="/marketplace/discovers/add" component={AddDiscover} />
            <ProtectedRoute path="/marketplace/product/edit/:id" component={EditProduct} />
            <ProtectedRoute path="/marketplace/order/detail/:id" component={OrderDetail} />
            <ProtectedRoute  path="/marketplace/products" component={ProductsMarketplace} />
            <ProtectedRoute  path="/marketplace/discovers" component={DiscoversMarketplace} />
            <ProtectedRoute  path="/marketplace/orders" component={OrdersMarketplace} />
            <ProtectedRoute
              path="/marketplace/users"
              component={UserMarketplace}
            />
            <MainRoute path="/login" component={Index} />
            <Redirect from="/" exact to="/marketplace/users" />
          </Switch>
        </MainSkeleton>
        <ToastContainer />
      </Fragment>
    );
  }
}
export default App;
