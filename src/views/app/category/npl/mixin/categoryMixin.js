import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import handling from "@/constants/handling.js";
// import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
// import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import ActionsHeaderNPL from "@/views/app/category/npl/component/ActionsHeaderNPL";
import ActionsFooterNPL from "@/views/app/category/npl/component/ActionsFooterNPL";
import Status from "@/components/Badges/StatusColor.vue";
import { mapGetters } from "vuex";
import Title from "@/views/app/category/npl/component/Title.vue";
import TableHistory from "@/views/app/category/npl/component/TableHistory.vue";
import TableListFile from "@/views/app/category/npl/component/TableListFile.vue";

import ModalAttachFile from "@/views/app/category/npl/component/ModalAttachFile";
import ModalPrint from "@/views/app/category/npl/component/ModalPrint";
import ModalFind from "@/views/app/category/npl/component/ModalFind";
import ModalImportExcel from "@/views/app/category/npl/component/ModalImportExcel";
import ModalNotifyImportExcel from "@/views/app/category/npl/component/ModalNotifyImportExcel";

import FormBasic from "@/views/app/category/npl/component/FormBasic.vue";
import Banks from "@/views/app/category/npl/component/FormBanks.vue";
// import ContactTypes from "@/views/app/category/npl/component/FormContactTypes.vue";
// import NPLCustomerGroups from "@/views/app/category/npl/component/FormCustomerGroup.vue";
// import ContainerTypes from "@/views/app/category/npl/component/FormContainerTypes.vue";
// import OrderTypes from "@/views/app/category/npl/component/FormOrderTypes.vue";
import GoodsTypes from "@/views/app/category/npl/component/FormGoodsTypes.vue";
// import NPLUnits from "@/views/app/category/npl/component/FormNPLUnits.vue";
// import RouteGroups from "@/views/app/category/npl/component/FormRouteGroups.vue";
// import ManagementRegions from "@/views/app/category/npl/component/FormManagementRegions.vue";
import InspectionUnits from "@/views/app/category/npl/component/FormInspectionUnits.vue";
import ChargingStations from "@/views/app/category/npl/component/FormChargingStations.vue";
import Ports from "@/views/app/category/npl/component/FormPorts.vue";
import PetrolStations from "@/views/app/category/npl/component/FormPetrolStations.vue";
import nPLStations from "@/views/app/category/npl/component/FormnPLStations.vue";
import MaintenanceJobs from "@/views/app/category/npl/component/FormMaintenanceJobs.vue";
// import Experts from "@/views/app/category/npl/component/FormExperts.vue";
// import JobTypes from "@/views/app/category/npl/component/FormJobTypes.vue";
import MaintenanceSupplies from "@/views/app/category/npl/component/FormMaintenanceSupplies.vue";
// import ChargeJobs from "@/views/app/category/npl/component/FormChargeJobs.vue";
// import ExtendUnits from "@/views/app/category/npl/component/FormExtendUnits.vue";
// import CostIncurreds from "@/views/app/category/npl/component/FormCostIncurreds.vue";
// import Incidents from "@/views/app/category/npl/component/FormIncidents.vue";
import LeaveReasons from "@/views/app/category/npl/component/FormLeaveReasons.vue";
// import DriverRequirements from "@/views/app/category/npl/component/FormDriverRequirements.vue";
import VehicleGroups from "@/views/app/category/npl/component/FormVehicleGroups.vue";
// import VehicleTypes from "@/views/app/category/npl/component/FormVehicleTypes.vue";
// import VehicleProducers from "@/views/app/category/npl/component/FormVehicleProducers.vue";
// import VehicleColors from "@/views/app/category/npl/component/FormVehicleColors.vue";
// import VehicleTires from "@/views/app/category/npl/component/FormVehicleTires.vue";
import FuelKinds from "@/views/app/category/npl/component/FormFuelKinds.vue";
import OutsourcedVehicles from "@/views/app/category/npl/component/FormOutsourcedVehicles.vue";
import OutsourcedVehicleProviders from "@/views/app/category/npl/component/FormOutsourcedVehicleProviders.vue";
// import VehicleDevices from "@/views/app/category/npl/component/FormVehicleDevices.vue";

import Vehicles from "@/views/app/category/npl/component/FormVehicles.vue";
import SMRMs from "@/views/app/category/npl/component/FormSMRMs.vue";
import nPLDrivers from "@/views/app/category/npl/component/FormnPLDrivers.vue";
import nPLDriveHelpers from "@/views/app/category/npl/component/FormnPLDriveHelpers.vue";
import nPLCustomers from "@/views/app/category/npl/component/FormnPLCustomers.vue";


import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";

export default {
  name: "NPLCategories",
  components: {
    "v-select": vSelect,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
    Title,
    ModalAttachFile,
    ModalPrint,
    ModalFind,
    ModalImportExcel,
    ModalNotifyImportExcel,

    FormBasic,
    Banks,
    // ContactTypes,
    // NPLCustomerGroups,
    // ContainerTypes,
    // OrderTypes,
    GoodsTypes,
    // NPLUnits,
    // RouteGroups,
    // ManagementRegions,
    InspectionUnits,
    ChargingStations,
    Ports,
    PetrolStations,
    nPLStations,
    MaintenanceJobs,
    // Experts,
    // JobTypes,
    MaintenanceSupplies,
    // ChargeJobs,
    // ExtendUnits,
    // CostIncurreds,
    // Incidents,
    LeaveReasons,
    // DriverRequirements,
    VehicleGroups,
    // VehicleTypes,
    // VehicleProducers,
    // VehicleColors,
    // VehicleTires,
    FuelKinds,
    OutsourcedVehicles,
    OutsourcedVehicleProviders,
    // VehicleDevices,
    Vehicles,
    SMRMs,
    nPLDrivers,
    nPLDriveHelpers,
    nPLCustomers,
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      currentTab: 0,
      currentPage: 1,
      perPage: 10,

      /////
      heightContent: "",
      heightContent2: "",
      menuRight: [],
      colTypes: [],
      dataTable: [],
      objectKeys: [],
      columnAdd: [],
      currentIndex: -1,
      dataForm: null,
      isCheckIsValid: false,
      isDisabledAdd: false,
      isDisabledEdit: false,
      isDisabledDelete: false,
      isDisabledSave: true,
      isDisabledCancel: true,
      isDisabledLock: false,
      isDisabledAttachFile: false,
      isDisabledPrint: false,
      isDisabledImportExcel: false,
      isDisabledSearch: false,
      currentMode: "readOnly", //readOnly, adding, editing

      showModalAttachFile: false,
      showModalPrint: false,
      showModalImportExcel: false,
      showModalFind: false,

      dataPrint: [],
      dataHistory: [],
      fieldsHistoryVN: [
        { key: "CreateDate", label: "Thời gian" },
        { key: "UserFullName", label: "Người thực hiện" },
        { key: "ActionTypeName", label: "Thao tác" },
        { key: "Note", label: "Ghi chú" },
      ],
      fieldsHistoryEN: [
        { key: "CreateDate", label: "Time" },
        { key: "UserFullName", label: "Performer" },
        { key: "ActionTypeName", label: "Action" },
        { key: "Note", label: "Note" },
      ],
      fieldsHistory: [],
      // fieldsHistory: [
      //   { key: "CreateDate", label: this.$t('table-history.time') },
      //   { key: "UserFullName", label: this.$t('table-history.performer') },
      //   { key: "ActionTypeName", label: this.$t('table-history.action') },
      //   { key: "Note", label: this.$t('table-history.note') },
      // ],
      dataAttachFile: [],
      // fieldsAttachFile: [
      //   { key: "CreateDate", label: "Thời gian" },
      //   { key: "UserFullName", label: "Người thực hiện" },
      //   { key: "Name", label: "Tiêu đề" },
      //   { key: "FileName", label: "", thClass: "d-none", tdClass: "d-none" },
      //   { key: "LinkFile", label: "File đính kèm" },
      //   { key: "Note", label: "Ghi chú" },
      //   { key: "Action", label: "Thao tác" },
      // ],
      fieldsAttachFileVN: [
        { key: "CreateDate", label: "Thời gian" },
        { key: "UserFullName", label: "Người thực hiện" },
        { key: "Name", label: "Tiêu đề" },
        { key: "FileName", label: "", thClass: "d-none", tdClass: "d-none" },
        { key: "LinkFile", label: "File đính kèm" },
        { key: "Note", label: "Ghi chú" },
        { key: "Action", label: "Thao tác" },
      ],
      fieldsAttachFileEN: [
        { key: "CreateDate", label: "Time" },
        { key: "UserFullName", label: "Performer" },
        { key: "Name", label: "Title" },
        { key: "FileName", label: "", thClass: "d-none", tdClass: "d-none" },
        { key: "LinkFile", label: "File attach" },
        { key: "Note", label: "Note" },
        { key: "Action", label: "Action" },
      ],
      fieldsAttachFile: [],

      formEditAttachFile: null,
      //SEARCH
      methodSearch: [],
      dataSearch: [],
      isSearching: false,
      notRequired: ["ID", "Note", "NameExtention1", "AddressExtention1"],
      formDiffList: ['nPLDrivers', 'nPLDriveHelpers', 'LeaveReasons', 'VehicleGroups', 'Vehicles', 'SMRMs', 'FuelKinds', 'OutsourcedVehicles', 'OutsourcedVehicleProviders', 'nPLCustomers', 'Banks', 'GoodsTypes', 'nplRegions', 'InspectionUnits', 'ChargingStations', 'Ports', 'PetrolStations', 'nPLStations', 'MaintenanceJobs', 'MaintenanceSupplies'],

      //NOTIFY IMPORT EXCEL
      showModalNotifyImportExcel: false,
      dataNotifyImportExcel: null,
    };
  },
  computed: {
    ...mapGetters(["currentUser", "getMenuType"]),
    fieldsTable() {
      if (this.objectKeys.length > 0 && this.colTypes.length > 0) {
        let result = handling.mergeKeyDynamic(this.objectKeys, this.colTypes);
        // return result
        // return result.map(item => ({...item, thClass: 'position-sticky'}));
        // console.log(result);
        result.forEach(item => {
          if (item.key === 'OverloadWeight' || item.key === 'OverloadQuantity') {
            item.typeCol = 'Number'
            item.tdClass = "text-right"
            item.sortable = false
          }
          else if (item.key === 'PhoneNumber' || item.key === 'IDCard') {
            item.tdClass = "text-right"
            item.sortable = false
          }
          else {
            item.sortable = false
            item.tdClass = item.tdClass.replace('pt-2', '')
          }
        })
        // return result.map((item) => ({ ...item, sortable: false }));
        return result
      }
    },
    objectData() {
      if (this.menuRight.length) {
        for (let i = 0; i < this.menuRight.length; i++) {
          if (this.$route.fullPath === this.menuRight[i].Link) {
            return {
              menuIDCurrent: this.menuRight[i].MenuID.toString(),
              formName: this.menuRight[i].MenuName.toUpperCase(),
              accessWrite: handling.convertBitToBoolean(
                this.menuRight[i].AccessWrite
              ),
            };
          }
        }
      }
      return {
        menuIDCurrent: '',
        formName: '',
        accessWrite: '',
      }
    },
    FactorID() {
      const path = this.$route.fullPath;
      if (path.includes("category")) {
        return "Category";
      }
      return "";
    },
    CategoryType() {
      return this.$route.name;
    },
    fieldsTableAndMethodSearch() {
      return {
        fieldsTable: this.fieldsTable,
        methodSearch: this.methodSearch,
      };
    },
    renderForm() {
      //những form giống nhau thì sẽ render ra chung 1 form
      if (this.formDiffList.includes(this.CategoryType)) {
        return this.CategoryType
      }
      else {
        return 'FormBasic'
      }
    }
  },
  created() {
    this.setUp()
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.setUp()
      }
    },
    getMenuType() {
      setTimeout(() => {
        this.setHeightContent()
      }, 350)
    },
    $route() {
      //reset lại dữ liệu khi thay đổi route
      this.currentTab = 0
      this.currentPage = 0
      this.currentIndex = -1

      this.dataForm = null
      this.isCheckIsValid = false

      this.isDisabledAdd = false
      this.isDisabledEdit = false
      this.isDisabledDelete = false
      this.isDisabledSave = true
      this.isDisabledCancel = true
      this.isDisabledLock = false
      this.isDisabledAttachFile = false
      this.isDisabledPrint = false
      this.isDisabledImportExcel = false
      this.isDisabledSearch = false
      this.currentMode = "readOnly" //readOnly, adding, editing

      this.showModalAttachFile = false
      this.showModalPrint = false
      this.showModalImportExcel = false
      this.showModalNotifyImportExcel = false
      this.showModalFind = false

      this.dataPrint = []
      this.dataHistory = []
      this.dataAttachFile = []
      this.formEditAttachFile = null,
        this.dataSearch = [],
        this.isSearching = false,
        this.dataNotifyImportExcel = null

      this.getListMenuRight();
      this.getMethodSearch();
      this.getColTypes(this.CategoryType);
      this.getDataAndLastDocument();
      this.getDynamicFormAdd(this.CategoryType);

    },
    currentTab() {
      this.isCheckIsValid = false;
    },
    currentMode(newVal) {
      switch (newVal) {
        case "readOnly":
          this.isDisabledAdd = false;
          // this.isDisabledEdit = false;
          // this.isDisabledDelete = false;
          this.isDisabledEdit = this.currentIndex < 0 ? true : false;
          this.isDisabledDelete = this.currentIndex < 0 ? true : false;
          this.isDisabledSave = true;
          this.isDisabledCancel = true;
          // this.isDisabledLock = false
          // this.isDisabledAttachFile = false
          this.isDisabledLock = this.currentIndex < 0 ? true : false;
          this.isDisabledAttachFile = this.currentIndex < 0 ? true : false;
          this.isDisabledPrint = false;
          this.isDisabledImportExcel = false;
          this.isDisabledSearch = false;
          break;
        case "adding":
          this.isDisabledAdd = true;
          this.isDisabledEdit = true;
          this.isDisabledDelete = true;
          this.isDisabledSave = false;
          this.isDisabledCancel = false;
          this.isDisabledLock = true;
          this.isDisabledAttachFile = true;
          this.isDisabledPrint = true;
          this.isDisabledImportExcel = true;
          this.isDisabledSearch = true;
          break;
        case "editing":
          this.isDisabledAdd = true;
          this.isDisabledEdit = true;
          this.isDisabledDelete = true;
          this.isDisabledSave = false;
          this.isDisabledCancel = false;
          this.isDisabledLock = true;
          this.isDisabledAttachFile = true;
          this.isDisabledPrint = true;
          this.isDisabledImportExcel = true;
          this.isDisabledSearch = true;
          break;
        default:
          break;
      }
    },
    dataTable(newVal) {
      if (newVal.length === 0) {
        this.currentIndex = -1;
        this.dataForm = null;
        this.dataCurrentIndex = null;
        this.dataHistory = [];
        this.dataAttachFile = [];

        this.isDisabledAdd = false;
        this.isDisabledEdit = true;
        this.isDisabledDelete = true;
        this.isDisabledSave = true;
        this.isDisabledCancel = true;
        this.isDisabledLock = true;
        this.isDisabledAttachFile = true;
        this.isDisabledPrint = false;
        this.isDisabledImportExcel = false;
        this.isDisabledSearch = false;
      } else {
        this.objectKeys = Object.keys(this.dataTable[0]);

        this.isDisabledAdd = false;
        this.isDisabledEdit = false;
        this.isDisabledDelete = false;
        this.isDisabledSave = true;
        this.isDisabledCancel = true;
        this.isDisabledLock = false;
        this.isDisabledAttachFile = false;
        this.isDisabledPrint = false;
        this.isDisabledImportExcel = false;
        this.isDisabledSearch = false;
      }
    },
    showModalNotifyImportExcel(newVal) {
      if (!newVal) {
        this.dataNotifyImportExcel = null
      }
    }
  },
  mounted() {
    this.setHeightContent();
    window.addEventListener("resize", this.setHeightContent);
  },
  destroyed() {
    window.removeEventListener("resize", this.setHeightContent);
  },
  methods: {
    setUp() {
      this.getListMenuRight();
      this.getMethodSearch();
      this.getColTypes(this.CategoryType);
      this.getDataAndLastDocument();
      this.getDynamicFormAdd(this.CategoryType);

      if (this.$i18n.locale === 'vn') {
        this.fieldsHistory = [...this.fieldsHistoryVN]
        this.fieldsAttachFile = [...this.fieldsAttachFileVN]
      }
      else if (this.$i18n.locale === 'en') {
        this.fieldsHistory = [...this.fieldsHistoryEN]
        this.fieldsAttachFile = [...this.fieldsAttachFileEN]
      }
    },
    handleDbClick(row) {
      const index = this.dataTable.findIndex((item) => item.ID == row.ID);
      this.currentTab = 1;
      this.loadDocumentByIndex(index);
    },
    updateTab(value) {
      if (this.currentMode == "adding" || this.currentMode == "editing") {
        return this.updateTabWhenNotSave(value);
      }
      this.currentTab = value;
      this.currentMode = 'readOnly'
    },
    handleAdd() {
      if (this.columnAdd && this.columnAdd.length > 0) {
        let newObj = {};
        this.columnAdd.forEach((item) => {
          newObj = {
            ...newObj,
            [item.ClName]: [item.ShwName, null, item.TypeCol, null],
          };
        });
        this.dataForm = { ...newObj };
      } else {
        this.dataForm = null;
      }
    },
    handleEdit() {
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.ID, item.IsActive);
    },
    handleSave() {
      if (!this.dataForm) return;
      this.isCheckIsValid = true;
      if (!this.checkFormValidate()) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      let obj = {};
      for (const key in this.dataForm) {
        obj = {
          ...obj,
          [key]: this.dataForm[key][1],
        };
      }

      let body = {
        ...obj,
        CategoryType: this.CategoryType,
      };
      this.currentMode = "readOnly";

      // console.log(body);
      if (body.ID) {
        nplAPI
          .editCategory(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getData();
              this.getByID(obj.ID, obj.IsActive);
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        nplAPI
          .addCategory(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getDataAndLastDocument();
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      }
    },
    handleCancel() {
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.ID, item.IsActive);
      this.currentMode = 'readOnly'
    },
    handleDelete(id) {
      this.$bvModal
        .msgBoxConfirm(`${this.$t("modal.confirm-delete")} ${id} ?`, {
          title: this.$t('toast.message'),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            let body = {
              ID: id,
            };
            nplAPI
              .deleteCategory(body)
              .then((val) => {
                if (val.status) {
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getDataAndLastDocument();
                } else {
                  this.showNotify("error", this.$t("toast.message"), val.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleAttachFile(obj) {
      this.showModalAttachFile = false;
      try {
        const id = this.dataTable[this.currentIndex].ID;
        const newObj = {
          ...obj,
          OID: id,
          FactorID: this.FactorID,
          EntryID: this.CategoryType,
        };
        let formData = new FormData();
        for (const key in newObj) {
          if (key === "File" && newObj[key] && newObj[key].length > 0) {
            //formData ko có support FileList nên phải chạy thêm vòng for nữa
            for (let i = 0; i < newObj[key].length; i++) {
              formData.append("File", newObj[key][i]);
            }
          } else {
            formData.append(key, newObj[key]);
          }
        }
        let res;
        if (obj.ID) {
          res = await nplAPI.editAttachFile(formData);
        } else {
          res = await nplAPI.addAttachFile(formData);
        }
        if (res.status) {
          this.getAttachFile(id);
          this.showNotify("success", this.$t("toast.message"), res.message);
        } else {
          this.showNotify("error", this.$t("toast.message"), res.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getFormPrint() {
      const body = {
        FactorID: this.FactorID,
        EntryID: this.CategoryType,
      };
      nplAPI
        .getFormPrint(body)
        .then((val) => {
          this.dataPrint = val.status ? val.data : [];
          this.showModalPrint = true;
        })
        .catch((err) => console.log(err));
    },
    handlePrint(obj) {
      switch (obj.PrintType.toUpperCase()) {
        case "DOWNLOAD":
          const link = document.createElement("a");
          link.download = obj.FormPrintName;
          link.href = obj.PrintAction;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        case "CLIENT":
          handling.printExcel(
            "npl-table-basic-form",
            this.objectData.formName,
            null,
            null
            // this.$t("form.page") + " " + this.currentPage
          );
        case "SERVER":
        default:
          break;
      }
      if (obj.PrintType.toUpperCase() === "DOWNLOAD") {
        const link = document.createElement("a");
        link.download = obj.FormPrintName;
        link.href = obj.PrintAction;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      this.showModalPrint = false;
    },
    handleImportExcel(file) {
      let formData = new FormData();
      formData.append("FactorID", this.FactorID)
      formData.append("EntryID", this.CategoryType)
      formData.append("File", file)
      nplAPI
        .importExcel(formData)
        .then((val) => {
          if (val.status) {
            // this.showNotify("success", this.$t("toast.message"), val.message);
            this.dataNotifyImportExcel = val.data
            this.showModalNotifyImportExcel = true
            this.currentTab = 0
            this.getDataAndLastDocument()
          }
          else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.showModalImportExcel = false;
        })
        .catch((err) => console.log(err));
    },
    handleSearch(arr) {
      // this.dataSearchCurrent = [...arr]
      this.isSearching = true
      const ListSearch = [];
      arr.forEach((item) => {
        if (item.Operator) {
          if (item.Param1 || item.Param1 === 0) {
            ListSearch.push({
              Name: item.Name,
              Operator: item.Operator,
              Param1: item.Param1.toString(),
              Param2: item.Param2 ? item.Param2.toString() : "",
            });
          }
        }
      });
      // console.log(ListSearch);
      if (ListSearch.length) {
        this.currentTab = 0;
        const body = {
          ListSearch,
          FactorID: this.FactorID,
          EntryID: this.CategoryType,
        };
        nplAPI
          .search(body)
          .then((val) => {
            this.currentPage = 1;
            this.dataTable = val.status ? val.data : [];
            if (this.dataTable.length) {
              this.loadDocumentByIndex(this.dataTable.length - 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getDataAndLastDocument();
      }
    },
    resetSearch() {
      this.isSearching = false
      this.setDataSearch(this.fieldsTable);
    },
    /////
    setHeightContent() {
      const actionHeader = this.$refs["action-header"];
      const actionFooter = this.$refs["action-footer"];
      const formBasic = this.$refs["form-basic"];
      const height =
        formBasic.offsetHeight -
        actionHeader.offsetHeight -
        actionFooter.offsetHeight;
      this.heightContent = `${height}px`;
      this.heightContent2 = `${height - 37}px`;
    },
    getListMenuRight() {
      let body = {
        GroupID: JSON.parse(localStorage.getItem("user")).GroupID,
      };
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      let body = {
        CategoryType: this.CategoryType,
      };
      nplAPI
        .getCategoryList(body)
        .then((val) => {
          this.dataTable = val.status ? val.data : [];
        })
        .catch((err) => console.log(err));
    },
    getDynamicFormAdd(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.columnAdd = arr.filter((item) => item.IsHide == 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataAndLastDocument() {
      let body = {
        CategoryType: this.CategoryType,
      };
      nplAPI
        .getCategoryList(body)
        .then((val) => {
          this.dataTable = val.status ? val.data : [];
          if (this.dataTable.length) {
            this.loadDocumentByIndex(this.dataTable.length - 1);
          }
        })
        .catch((err) => console.log(err));
    },
    checkIsValid(key) {
      //có bắt đầu kiểm có giá trị
      // let isValid = true
      if (!this.isCheckIsValid) {
        // isValid = true
        return true;
      }
      // const notRequired = ["ID", "Note"];
      if (this.notRequired.includes(key)) {
        // isValid = true
        return true;
      }
      const value = this.dataForm[key][1];
      // console.log(value);
      if (value || value === 0 || value === false) {
        // isValid = true
        // console.log(key);
        return true;
      } else {
        // isValid = false
        return false;
      }
      // return isValid
    },
    checkFormValidate() {
      // let result = true;
      for (const key in this.dataForm) {
        // console.log(key);
        let result = this.checkIsValid(key);
        this.dataForm[key][3] = result;
        // console.log(result);
        if (!result) {
          console.log("invaildKey:", key);
          break;
        }
      }
      this.dataForm = { ...this.dataForm }; //--> gán lại để render lại dataForm
      for (const key in this.dataForm) {
        if (!this.dataForm[key][3]) {
          return false;
        }
      }
      return true;
      // return result;
    },
    checkIsBlankForm() {
      if (!this.dataForm) return true;
      for (let key in this.dataForm) {
        const value = this.dataForm[key][1];
        if (value || value === 0 || value === false) {
          //chỉ cần 1 field trong form có giá trị
          return false;
        }
      }
      return true;
    },
    checkIsInitialForm() {
      if (!this.dataForm) return true;
      for (let key in this.dataForm) {
        const value = this.dataForm[key];
        const initialValue = this.dataBackup[key];
        if (value != initialValue) {
          //chỉ cần 1 field trong form có giá trị với form ban đầu
          return false;
        }
      }
      return true;
    },
    getByID(id, isActive) {
      let body = {
        ID: id,
      };
      nplAPI
        .getCategoryByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataForm = {
              ...newObj,
              ID: ["ID", id, "ID", null],
              IsActive: [this.$t("status.status"), isActive, null, null],
            };
            if (obj.Histories) {
              const arr = [];
              obj.Histories.forEach((item) => {
                arr.push({
                  ...item,
                  CreateDate: handling.convertDateTime(item.CreateDate),
                });
              });
              this.dataHistory = arr;
            }
          } else {
            this.dataForm = null;
            this.dataHistory = [];
            this.dataAttachFile = [];
          }
        })
        .catch((err) => console.log(err));
    },
    getAttachFile(id) {
      //gọi file đính kèm
      let body = {
        OID: id.toString(),
        FactorID: this.FactorID,
        EntryID: this.CategoryType,
      };
      nplAPI
        .getAttachFile(body)
        .then((val) => {
          const arr = val.status ? val.data : [];
          this.dataAttachFile = arr.map((item) => ({
            ...item,
            CreateDate: handling.convertDateTime(item.CreateDate),
          }));
        })
        .catch((err) => console.log(err));
    },
    getMethodSearch() {
      nplAPI
        .getMethodSearch()
        .then((val) => {
          let data = val.status ? val.data : [];
          if (data.length > 0) {
            const arr = [];
            data.forEach((item) => {
              if (item.Valu) {
                arr.push({
                  text: item.Shw,
                  value: item.Valu,
                });
              }
            });
            this.methodSearch = [...arr];
          }
        })
        .catch((err) => console.log(err));
    },
    // checkSkipEditingData() {
    //   console.log("checkSkipEditingData");
    //   if (!this.isAdd && !this.isEdit) {
    //     return true;
    //   }
    //   //đang có dữ liệu chỉnh sửa
    //   this.$bvModal
    //     .msgBoxConfirm(this.$t("modal.question-skip") + "?", {
    //       title: this.$t("form.warning").toUpperCase(),
    //       size: "sm",
    //       buttonSize: "sm",
    //       okVariant: "danger",
    //       okTitle: this.$t("modal.yes"),
    //       cancelTitle: this.$t("modal.no"),
    //       footerClass: "p-2",
    //       hideHeaderClose: false,
    //       centered: true,
    //     })
    //     .then((value) => {
    //       console.log(value);
    //       return value;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    handleChangeIndex(index) {
      if (this.currentTab === 0) {
        this.currentTab = 1;
      }
      if (this.currentMode == "adding" || this.currentMode == "editing") {
        return this.changeIndexWhenNotSave(index);
      }
      this.loadDocumentByIndex(index);
    },
    handleChangeAction(type) {
      switch (type) {
        case "add":
          this.currentMode = "adding";
          this.currentTab = 1;
          this.handleAdd();
          break;
        case "edit":
          this.currentTab = 1;
          this.currentMode = "editing";
          // this.dataForm = { ...this.dataCurrentIndex }; --> dùng như thế này khi dataForm thay đổi dataCurrentIndex cũng thay đổi theo
          this.handleEdit();
          break;
        case "save":
          this.handleSave();
          break;
        case "cancel":
          // this.currentMode = "readOnly";
          this.handleCancel();
          break;
        case "delete":
          this.currentTab = 1;
          this.currentMode = "readOnly";
          this.handleDelete(this.dataForm.ID[1]);
        case "lock":
          break;
        case "attachFile":
          this.currentTab = 3;
          this.currentMode = "readOnly";
          this.showModalAttachFile = true;
          break;
        case "print":
          this.getFormPrint();
          break;
        case "importExcel":
          this.showModalImportExcel = true
          break;
        case "find":
          this.showModalFind = true;
          // if(this.dataSearchCurrent.length > 0) {
          if (!this.isSearching) {
            // this.dataSearch = [...this.dataSearchCurrent]
            this.setDataSearch(this.fieldsTable)
          }
          break;
        default:
          break;
      }
    },
    loadDocumentByIndex(index) {
      this.currentMode = "readOnly";
      this.currentIndex = index;
      const item = this.dataTable[index];
      this.getByID(item.ID, item.IsActive);
      this.getAttachFile(item.ID);
    },
    changeIndexWhenNotSave(index) {
      let result;
      if (this.currentMode === "adding") {
        result = this.checkIsBlankForm();
      }
      else if (this.currentMode === "editing") {
        // result = this.checkIsInitialForm();
        result = false
      }
      if (!result) {
        //đang có dữ liệu sửa chưa save
        this.$bvModal
          .msgBoxConfirm(this.$t("modal.question-skip") + "?", {
            title: this.$t("form.warning").toUpperCase(),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("modal.yes"),
            cancelTitle: this.$t("modal.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            if (value) {
              this.loadDocumentByIndex(index);
              this.currentTab = 1;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.loadDocumentByIndex(index);
        this.currentTab = 1;
      }
    },
    updateTabWhenNotSave(indexTab) {
      let result;
      if (this.currentMode === "adding") {
        result = this.checkIsBlankForm();
      } else if (this.currentMode === "editing") {
        result = false
        // result = this.checkIsInitialForm();
      }
      if (!result) {
        //đang có dữ liệu chưa save
        this.$bvModal
          .msgBoxConfirm(this.$t("modal.question-skip") + "?", {
            title: this.$t("form.warning").toUpperCase(),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("modal.yes"),
            cancelTitle: this.$t("modal.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            if (value) {
              this.currentTab = indexTab;
              this.handleCancel();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.currentTab = indexTab;
        this.handleCancel();
      }
    },
    removeAttachFile(item) {
      let body = {
        ID: item.ID,
      };
      nplAPI
        .deleteAttachFile(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getAttachFile(this.dataTable[this.currentIndex].ID);
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => console.log(err));
    },
    editAttachFile(item) {
      this.showModalAttachFile = true;
      this.formEditAttachFile = { ...item };
    },
    //SEARCH
    setDataSearch(arr) {
      const newArr = [];
      arr.forEach((item) => {
        const obj = {
          Label: item.label,
          Name: item.key,
          Type: item.typeCol,
          Operator: "like",
          OperatorDescription: "Có",
          SearchOption: this.getSearchOptionByType(
            item.typeCol,
            this.methodSearch
          ),
          Param1: null,
          Param2: null,
        }
        //sửa lại các field 'Operator', 'OperatorDescription', 'SearchOption' 
        if (item.key.toUpperCase() === "ISACTIVE") {
          obj.Operator = "="
          obj.OperatorDescription = "Bằng",
            obj.SearchOption = [
              { text: this.$t('npl.using'), value: 1 },
              { text: this.$t('npl.not-use'), value: 0 },
            ]
        }
        else if (item.typeCol.toUpperCase() === 'DATE') {
          obj.Operator = "="
          obj.OperatorDescription = "Bằng"
        }
        newArr.push(obj)
      });
      this.dataSearch = newArr;
    },
    getSearchOptionByType(type, arr) {
      let option = [...arr];
      if (type.toUpperCase() === "STRING" || type.toUpperCase() === "NOTE") {
        option = arr.filter(
          (item) =>
            item.value === "=" ||
            item.value === "like" ||
            item.value === "not like"
        );
      }
      else if (type.toUpperCase() === 'DATE') {
        option = arr.filter(item => item.value !== "like" && item.value !== "not like")
      }
      return option;
    },
    //NOTIFY IMPORT EXCEL
    hiddenModalNotifyImportExcel() {
      this.showModalNotifyImportExcel = false
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
    convertMoneyVN(value) {
      return handling.convertFloat(value);
    },
    convertDate(string) {
      return moment(string).format('DD/MM/YYYY')
    }
  },
};

Address:Array[4]
AddressExtention1:Array[4]
ApprovalIncurredFee:Array[4]
ApprovalOrder:Array[4]
CycleRemindJob:Array[4]
DriverRejectOrder:Array[4]
FormatCurrency:Array[4]
FormatDecimal:Array[4]
ID:Array[4]
Logo:Array[4]
Name:Array[4]
NameExtention1:Array[4]
Note:Array[4]
Phone:Array[4]
RadiusWrongRoutesAlert:Array[4]
RemindJob:Array[4]
RemindMaintenance:Array[4]
TimeApprovalIncurredFee:Array[4]
TimeBeforeApprovingIncurredFee:Array[4]
Website:Array[4]
WrongRoutesAlert:Array[4]
