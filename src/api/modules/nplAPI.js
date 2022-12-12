import axiosClient from "../index";

const nplAPI = {
  //map
  //dashboards
  //category-global-category
  getCategoryList: (body = null) => {
    const url = "/api/NPLCategories/Get";
    return axiosClient.post(url, body);
  },
  getCategoryActive: (body) => {
    const url = "/api/NPLCategories/GetActive";
    return axiosClient.post(url, body);
  },
  getCategoryByID: (body) => {
    const url = "/api/NPLCategories/GetById";
    return axiosClient.post(url, body);
  },
  addCategory: (body) => {
    const url = "/api/NPLCategories/Add";
    return axiosClient.post(url, body);
  },
  editCategory: (body) => {
    const url = "/api/NPLCategories/Edit";
    return axiosClient.post(url, body);
  },
  deleteCategory: (body) => {
    const url = "/api/NPLCategories/Delete";
    return axiosClient.post(url, body);
  },
  changeStatusCategory: (body) => {
    const url = "/api/NPLCategories/ChangeStatus";
    return axiosClient.post(url, body);
  },
  // customer-category
  getCustomerList: (body) => {
    const url = "/api/nPLCustomers/Get";
    return axiosClient.post(url, body);
  },
  getCustomerByID: (body) => {
    const url = "/api/nPLCustomers/GetById";
    return axiosClient.post(url, body);
  },
  changeStatusCustomer: (body) => {
    const url = "/api/nPLCustomers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  deleteCustomer: (body) => {
    const url = "/api/nPLCustomers/Delete";
    return axiosClient.post(url, body);
  },
  editCustomer: (body) => {
    const url = "/api/nPLCustomers/Edit";
    return axiosClient.post(url, body);
  },
  addCustomer: (body) => {
    const url = "/api/nPLCustomers/Add";
    return axiosClient.post(url, body);
  },
  searchCustomer: (body) => {
    const url = "/api/nPLCustomers/Search";
    return axiosClient.post(url, body);
  },
  getCustomersDetail: (body) => {
    const url = "/api/nPLCustomersDetails/Get";
    return axiosClient.post(url, body);
  },
  getCustomersDetailsByID: (body) => {
    const url = "/api/nPLCustomersDetails/GetById";
    return axiosClient.post(url, body);
  },
  addCustomersDetails: (body) => {
    const url = "/api/nPLCustomersDetails/Add";
    return axiosClient.post(url, body);
  },
  editCustomersDetails: (body) => {
    const url = "/api/nPLCustomersDetails/Edit";
    return axiosClient.post(url, body);
  },
  deleteCustomersDetails: (body) => {
    const url = "/api/nPLCustomersDetails/Delete";
    return axiosClient.post(url, body);
  },
  // driver-category
  getDriverList: (body) => {
    const url = "/api/NPLDrivers/Get";
    return axiosClient.post(url, body);
  },
  getDriverByID: (body) => {
    const url = "/api/NPLDrivers/GetById";
    return axiosClient.post(url, body);
  },
  addDriver: (body) => {
    const url = "/api/NPLDrivers/Add";
    return axiosClient.post(url, body);
  },
  editDriver: (body) => {
    const url = "/api/NPLDrivers/Edit";
    return axiosClient.post(url, body);
  },
  deleteDriver: (body) => {
    const url = "/api/NPLDrivers/Delete";
    return axiosClient.post(url, body);
  },
  changeStatusDriver: (body) => {
    const url = "/api/NPLDrivers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  //DriveHelper-category
  getDriveHelperList: (body) => {
    const url = "/api/NPLDriveHelpers/Get";
    return axiosClient.post(url, body);
  },
  getDriveHelperActive: (body) => {
    const url = "/api/NPLDriveHelpers/GetActive";
    return axiosClient.post(url, body);
  },
  getDriveHelperByID: (body) => {
    const url = "/api/NPLDriveHelpers/GetById";
    return axiosClient.post(url, body);
  },
  addDriveHelper: (body) => {
    const url = "/api/NPLDriveHelpers/Add";
    return axiosClient.post(url, body);
  },
  editDriveHelper: (body) => {
    const url = "/api/NPLDriveHelpers/Edit";
    return axiosClient.post(url, body);
  },
  deleteDriveHelper: (body) => {
    const url = "/api/NPLDriveHelpers/Delete";
    return axiosClient.post(url, body);
  },
  changeStatusDriveHelper: (body) => {
    const url = "/api/NPLDriveHelpers/ChangeStatus";
    return axiosClient.post(url, body);
  },
  //Routes-category
  getRoutesList: (body) => {
    const url = "/api/nPLRoutes/Get";
    return axiosClient.post(url, body);
  },
  getRoutesByID: (body) => {
    const url = "/api/nPLRoutes/GetById";
    return axiosClient.post(url, body);
  },
  changeStatusRoutes: (body) => {
    const url = "/api/nPLRoutes/ChangeStatus";
    return axiosClient.post(url, body);
  },
  deleteRoutes: (body) => {
    const url = "/api/nPLRoutes/Delete";
    return axiosClient.post(url, body);
  },
  addRoutes: (body) => {
    const url = "/api/nPLRoutes/Add";
    return axiosClient.post(url, body);
  },
  editRoutes: (body) => {
    const url = "/api/nPLRoutes/Edit";
    return axiosClient.post(url, body);
  },
  //SMRM-category
  getVehiclesList: (body) => {
    const url = "/api/nPLVehicles/Get";
    return axiosClient.post(url, body);
  },
  getVehiclesListActive: (body) => {
    const url = "/api/nPLVehicles/GetActive";
    return axiosClient.post(url, body);
  },
  getVehiclesByID: (body) => {
    const url = "/api/nPLVehicles/GetById";
    return axiosClient.post(url, body);
  },
  addVehicles: (body) => {
    const url = "/api/nPLVehicles/Add";
    return axiosClient.post(url, body);
  },
  editVehicles: (body) => {
    const url = "/api/nPLVehicles/Edit";
    return axiosClient.post(url, body);
  },
  deleteVehicles: (body) => {
    const url = "/api/nPLVehicles/Delete";
    return axiosClient.post(url, body);
  },
  changeStatusVehicles: (body) => {
    const url = "/api/nPLVehicles/ChangeStatus";
    return axiosClient.post(url, body);
  },
  getCustom: () => {
    const url = "";
    return axiosClient.post(url);
  },
  //region
  getRegionsByID: (body) => {
    const url = "/api/NPLRegions/GetById";
    return axiosClient.post(url, body);
  },
  addRegions: (body) => {
    const url = "/api/NPLRegions/Add";
    return axiosClient.post(url, body);
  },
  editRegions: (body) => {
    const url = "/api/NPLRegions/Edit";
    return axiosClient.post(url, body);
  },
  deleteRegions: (body) => {
    const url = "/api/NPLRegions/Delete";
    return axiosClient.post(url, body);
  },
  // security
  getCustom: () => {
    const url = "";
    return axiosClient.post(url);
  },
  // report
  getCustom: () => {
    const url = "";
    return axiosClient.post(url);
  },
  //other
  getUserList: (body) => {
    const url = "/api/user/GetListUser";
    return axiosClient.post(url, body);
  },
  getRegionList: (body) => {
    const url = "/api/NPLRegions/Get";
    return axiosClient.post(url, body);
  },
  getMethodSearch: (body) => {
    const url = "/api/customize/GetMethod";
    return axiosClient.post(url, body);
  },
  getCities: (body) => {
    const url = "/api/NPLRegions/GetByLevel";
    return axiosClient.post(url, body);
  },
  getDistrictsWards: (body) => {
    const url = "/api/NPLRegions/GetByParentID";
    return axiosClient.post(url, body);
  },
  //attachFile
  getAttachFile: (body) => {
    const url = '/api/AttachFiles/Get'
    return axiosClient.post(url, body);
  },
  addAttachFile: (body) => {
    const url = '/api/AttachFiles/Add'
    return axiosClient.post(url, body);
  },
  editAttachFile: (body) => {
    const url = '/api/AttachFiles/Edit'
    return axiosClient.post(url, body);
  },
  deleteAttachFile: (body) => {
    const url = '/api/AttachFiles/Delete'
    return axiosClient.post(url, body);
  },
  //print
  getFormPrint: (body) => {
    const url = '/api/FormPrint/Get'
    return axiosClient.post(url, body);
  },
  //find
  search: (body) => {
    const url = '/api/Search/Get'
    return axiosClient.post(url, body);
  },
  //importExcel
  importExcel: (body) => {
    const url = '/api/ImportData/ImportExcel'
    return axiosClient.post(url, body);
  },
  //config company
  getCompanyConfig: (body) => {
    const url = '/api/ConpanyConfig/Get'
    return axiosClient.post(url, body);
  },
  editCompanyConfig: (body) => {
    const url = '/api/ConpanyConfig/Edit'
    return axiosClient.post(url, body);
  },
};

export default nplAPI;