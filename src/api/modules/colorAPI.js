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
  //attachFile
  getAttachFile: (body) => {
    const url = "/api/AttachFiles/Get";
    return axiosClient.post(url, body);
  },
  addAttachFile: (body) => {
    const url = "/api/AttachFiles/Add";
    return axiosClient.post(url, body);
  },
  editAttachFile: (body) => {
    const url = "/api/AttachFiles/Edit";
    return axiosClient.post(url, body);
  },
  deleteAttachFile: (body) => {
    const url = "/api/AttachFiles/Delete";
    return axiosClient.post(url, body);
  },
  //print
  getFormPrint: (body) => {
    const url = "/api/FormPrint/Get";
    return axiosClient.post(url, body);
  },
  //find
  search: (body) => {
    const url = "/api/Search/Get";
    return axiosClient.post(url, body);
  },
  //importExcel
  importExcel: (body) => {
    const url = "/api/ImportData/ImportExcel";
    return axiosClient.post(url, body);
  },

  //search
  /**method(co- bang- khong co) */
  getMethodSearch: (body) => {
    const url = "/api/customize/GetMethod";
    return axiosClient.post(url, body);
  },
};

export default colorAPI;
