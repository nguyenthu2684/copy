import axiosClient from "../index";

const colorAPI = {
  //colorAPI
  getListColor: (body = null) => {
    const url = "/api/Colors/GetListColor";
    return axiosClient.post(url, body);
  },
  getColorByID: (body) => {
    const url = "/api/Colors/GetColorById";
    return axiosClient.post(url, body);
  },
  addListColor: (body) => {
    const url = "/api/Colors/AddColor";
    return axiosClient.post(url, body);
  },
  editColor: (body) => {
    const url = "/api/Colors/EditColor";
    return axiosClient.post(url, body);
  },
  deleteColor: (body) => {
    const url = "/api/Colors/DeleteColor";
    return axiosClient.post(url, body);
  },
};

export default colorAPI;
