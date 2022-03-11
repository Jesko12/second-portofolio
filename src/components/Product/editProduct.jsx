import React, { Fragment } from "react";
import { LoadingIndicator } from "../common/CommonElements";
import Form from "../common/form";
import Joi from "joi-browser";
import userCoreService, {
  getProductByID,
} from "../../services/userCoreService";
import { toast } from "react-toastify";
import { TableBody } from "../Table/TableElements";
import {
  accentsType,
  beddingAndBathCategories,
  carpetAndRugsCategories,
  collection,
  curtainsAndMaterialCategories,
  decorCategories,
  domain,
  furnitureCategories,
  room,
  seatingTypes,
  storageDisplayTypes,
  superCategories,
  systemFurnitureCategories,
  tableTypes,
} from "./ProductElements";


class EditProduct extends Form {
  state = {
    objectURLs: [],
    data: {
      id: 0,
      sku: "",
      name: "",
      domain: "",
      image_urls: [],
      product_size_width: 0,
      product_size_height: 0,
      product_size_depth: 0,
      detail_size_width: 0,
      detail_size_height: 0,
      detail_size_depth: 0,
      super_category: "",
      category: "",
      type: "",
      price: 0,
      discount_price: 0,
      sale_price: 0,
      weight: 0,
      description: "",
      products_sold: 0,
      quantity: 0,
      material: "",
      finishing: "",
      collection: "",
      room: "",
      colors: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.number().min(0).label("ID"),
    sku: Joi.string().required().label("SKU"),
    name: Joi.string().required().label("Name"),
    domain: Joi.string().required().label("Domain"),
    product_size_width: Joi.number().min(0).label("Product Width"),
    product_size_height: Joi.number().min(0).label("Product Height"),
    product_size_depth: Joi.number().min(0).label("Product Depth"),
    detail_size_width: Joi.number().min(0).label("Detail Width"),
    detail_size_height: Joi.number().min(0).label("Detail Height"),
    detail_size_depth: Joi.number().min(0).label("Detail Depth"),
    super_category: Joi.string().required().label("Super Category"),
    category: Joi.string().required().label("Category"),
    type: Joi.string().allow("").label("Type"),
    price: Joi.number().min(0).label("Price"),
    discount_price: Joi.number().min(0).label("Discount Price"),
    sale_price: Joi.number().min(0).label("Sale Price"),
    weight: Joi.number().min(0).label("Weight"),
    description: Joi.string().allow("").label("Description"),
    quantity: Joi.number().min(0).label("Quantity"),
    material: Joi.string().required().label("Material"),
    products_sold: Joi.number().min(0).label("Product Sold"),
    finishing: Joi.string().required().label("Finishing"),
    collection: Joi.string().required().label("Collection"),
    colors: Joi.string().allow("").label("Colors"),
    room: Joi.string().allow("").label("Room"),
  };

  async componentDidMount() {
    const productId = this.props.match.params.id;
    const { data } = await getProductByID(productId);
    const detail_size_width = data.detail_size.width;
    const detail_size_height = data.detail_size.height;
    const detail_size_depth = data.detail_size.depth;
    const product_size_width = data.product_size.width;
    const product_size_height = data.product_size.height;
    const product_size_depth = data.product_size.depth;

    delete data.detail_size;
    delete data.product_size;
    delete data.image_urls;

    const customObject = {
      ...data,
      detail_size_width: detail_size_width,
      detail_size_height: detail_size_height,
      detail_size_depth: detail_size_depth,
      product_size_width: product_size_width,
      product_size_height: product_size_height,
      product_size_depth: product_size_depth,
    };
    this.setState({ data: customObject });
    console.log(this.state)
  }

  doSubmit = async () => {
    const { data } = this.state;
    const productSizeObject = {
      width: data.product_size_width,
      height: data.product_size_height,
      depth: data.product_size_depth,
    };
    const detailSizeObject = {
      width: data.detail_size_width,
      height: data.detail_size_height,
      depth: data.detail_size_depth,
    };
    delete data.product_size_depth;
    delete data.product_size_height;
    delete data.product_size_width;
    delete data.detail_size_depth;
    delete data.detail_size_height;
    delete data.detail_size_width;

    let body = {
      product_size: productSizeObject,
      detail_size: detailSizeObject,
      sku: data.sku,
      name: data.name,
      domain: data.domain,
      price: data.price,
      discount_price: data.discount_price,
      sale_price: data.sale_price,
      weight: data.weight,
      description: data.description,
      quantity: data.quantity,
      material: data.material,
      finishing: data.finishing,
      super_category: data.super_category,
      category: data.category,
      type: data.type,
      products_sold: data.products_sold,
      collection: data.collection,
      room: data.room,
      colors: data.colors,
    };

    toast.info("Editing Product");
    try {
      const id = data.id;
      await userCoreService.editProduct(id, body);
      toast.success("Product Edited");
      setTimeout(function () {
        window.location = "/marketplace/products";
      }, 1000);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        toast.error(e.response.data.error);
      }
    }
  };

  render() {
    const { super_category, category } = this.state.data;
    return (
      <Fragment>
        <TableBody>
          <h1>Edit Product</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("sku", "SKU*")}
            {this.renderInput("name", "Name*")}
            {this.renderSelect("domain", domain, "Domain*")}
            {this.renderInput("product_size_width", "Product Width", "number")}
            {this.renderInput(
              "product_size_height",
              "Product Height",
              "number"
            )}
            {this.renderInput("product_size_depth", "Product Depth", "number")}
            {this.renderInput("detail_size_width", "Detail Width", "number")}
            {this.renderInput("detail_size_height", "Detail Height", "number")}
            {this.renderInput("detail_size_depth", "Detail Depth", "number")}
            {this.renderSelect(
              "super_category",
              superCategories,
              "Super Category*"
            )}
            {this.renderSelect(
              "category",
              super_category === "Furniture"
                ? furnitureCategories
                : super_category === "System-Furniture"
                ? systemFurnitureCategories
                : super_category === "Artwork"
                ? decorCategories
                : super_category === "Curtains-Material"
                ? curtainsAndMaterialCategories
                : super_category === "Bedding-Bath"
                ? beddingAndBathCategories
                : super_category === "Carpet-Rugs"
                ? carpetAndRugsCategories
                : [],
              "Category*"
            )}
            {this.renderSelect(
              "type",
              category === "Seating"
                ? seatingTypes
                : category === "Storage-Display"
                ? storageDisplayTypes
                : category === "Table"
                ? tableTypes
                : category === "Accents"
                ? accentsType
                : [],
              "Type"
            )}
            {this.renderInput("price", "Price*", "number")}
            {this.renderInput("discount_price", "Discount Price", "number")}
            {this.renderInput("sale_price", "Sale Price", "number")}
            {this.renderInput("weight", "Weight", "number")}
            {this.renderInput("products_sold", "Product Sold*", "number")}
            {this.renderInput("description", "Description")}
            {this.renderInput("quantity", "Quantity*", "number")}
            {this.renderInput("material", "Material*")}
            {this.renderInput("finishing", "Finishing*")}
            {this.renderSelect("collection", collection, "Collection*")}
            {this.renderSelect("room", room, "Room")}
            {this.renderInput("colors", "Colors")}
            {this.renderButton("Update")}
          </form>
          <LoadingIndicator />
        </TableBody>
      </Fragment>
    );
  }
}

export default EditProduct;
