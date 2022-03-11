import React, { Fragment } from "react";
import { LoadingIndicator } from "../common/CommonElements";
import Form from "../common/form";
import Joi from "joi-browser";
import userCoreService, { getProducts } from "../../services/userCoreService";
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
  Images,
  ImageUpload,
  room,
  seatingTypes,
  storageDisplayTypes,
  superCategories,
  systemFurnitureCategories,
  tableTypes,
} from "./ProductElements";
import storage from "../../services/firebase";

class AddProduct extends Form {
  state = {
    images: [],
    objectURLs: [],
    data: {
      sku: "",
      name: "",
      domain: "",
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
      sale_price:  0,
      discount_price: 0,
      weight: 0,
      description: "",
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
    finishing: Joi.string().required().label("Finishing"),
    collection: Joi.string().required().label("Collection"),
    colors: Joi.string().required().label("Colors"),
    room: Joi.string().allow("").label("Room"),
  };

  async componentDidMount() {
    const { data } = await getProducts();
    this.setState({ products: data });
  }

  uploadImage = async (image) => {
    const environment = process.env.REACT_APP_ENVIRONMENT;
    const ref = storage.ref(`/${environment}/${image.name}`);
    return await ref
      .put(image)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .catch((error) => toast.error(`Error upload photo: ${error}`));
  };

  doSubmit = async () => {
    const { images, data } = this.state;
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

    if (images.isEmpty) {
      return;
    }

    const promise = [];
    images.forEach((image) => {
      promise.push(this.uploadImage(image));
    });

    Promise.all(promise).then((result) => {
      let urls = [];
      for (let i = 0; i < result.length; i++) {
        urls.push(result[i]);
      }
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
        image_urls: urls,
        material: data.material,
        finishing: data.finishing,
        super_category: data.super_category,
        category: data.category,
        type: data.type,
        collection: data.collection,
        room: data.room,
        colors: data.colors
      };
      toast.info("Adding Product");
      try {
        userCoreService.addProduct(body);
        toast.success("Product Added");
        setTimeout(function () {
          window.location = "/marketplace/products";
        }, 1000);
      } catch (e) {
        if (e.response && e.response.status === 400) {
          toast.error(e.response.data.error);
        }
      }
    });
  };

  render() {
    const { objectURLs } = this.state;
    const { super_category, category } = this.state.data;
    return (
      <Fragment>
        <TableBody>
          <h1>Add Product</h1>
          <form onSubmit={this.handleSubmit}>
            <Images>
              {objectURLs &&
                objectURLs.map((url) => (
                  <img key={url} src={url} alt="" width={100} />
                ))}
              <ImageUpload>
                <label
                  style={{ margin: 0, cursor: "pointer" }}
                  htmlFor="image_urls"
                >
                  Upload
                </label>
              </ImageUpload>
            </Images>
            {this.renderInputFile("image_urls", "", "file", true)}
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
            {this.renderInput("description", "Description")}
            {this.renderInput("quantity", "Quantity*", "number")}
            {this.renderInput("material", "Material*")}
            {this.renderInput("finishing", "Finishing*")}
            {this.renderSelect("collection", collection, "Collection*")}
            {this.renderSelect("room", room, "Room")}
            {this.renderInput("colors", "Colors")}
            {this.renderButton("Add Product")}
          </form>
          <LoadingIndicator />
        </TableBody>
      </Fragment>
    );
  }
}

export default AddProduct;
