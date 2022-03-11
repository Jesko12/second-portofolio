import React, { Fragment } from "react";
import { LoadingIndicator } from "../common/CommonElements";
import Form from "../common/form";
import Joi from "joi-browser";
import userCoreService, { getDiscovers } from "../../services/userCoreService";
import { toast } from "react-toastify";
import { TableBody } from "../Table/TableElements";
import { Images, ImageUpload } from "./DiscoverElements";
import storage from "../../services/firebase";

const type = ["Designer", "Agenda", "Article", "Video"];

class AddDiscover extends Form {
  state = {
    images: [],
    objectURLs: [],
    data: {
      video_url: "",
      title: "",
      tag: "",
      content: "",
      type: ""
    },
    errors: {},
  };

  schema = {
    video_url: Joi.string().allow(null, "").label("Video URL"),
    title: Joi.string().required().label("Title"),
    tag: Joi.string().required().label("Tag"),
    content: Joi.string().required().label("Content"),
    type: Joi.string().label("Type"),
  };

  async componentDidMount() {
    const { data } = await getDiscovers();
    this.setState({ discovers: data });
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
        video_url: data.video_url,
        title: data.title,
        image_urls:  urls,
        tag: data.tag,
        likes: data.likes,
        shares: data.shares,
        content: data.content,
        type: data.type,
      };

      toast.info("Adding Discover");
      try {
        userCoreService.addDiscover(body);
        toast.success("Discover Added");
        setTimeout(function () {
          window.location = "/marketplace/discovers";
        }, 4000);
      } catch (e) {
        if (e.response && e.response.status === 400) {
          toast.error(e.response.data.error);
        }
      }
    });
  };

  render() {
    const { objectURLs, data } = this.state;
    return (
      <Fragment>
        <TableBody>
          <h1>Add Discover</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderSelect("type", type, "Type")}
            {["Article", "Agenda", "Designer"].includes(data.type) ? 
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
              </Images> : null}
            {this.renderInputFile("image_urls", "", "file", true)}
            {data.type === "Video"
              ? this.renderInput("video_url", "Video URL")
              : null}
            {this.renderInput("title", "Title")}
            {this.renderInput("tag", "Tag")}
            {this.renderInput("content", "Content")}
            {this.renderButton("Add Discover")}
          </form>
          <LoadingIndicator />
        </TableBody>
      </Fragment>
    );
  }
}

export default AddDiscover;
