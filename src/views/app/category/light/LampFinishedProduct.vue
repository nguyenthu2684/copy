<template>
  <div v-if="objectData">
    <b-row>
      <b-colxx xxs="12">
        <h1>
          <strong>{{ objectData.formName }}</strong>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-dropdown right :text="$t('dropdown.action')" variant="primary">
              <b-dropdown-item
                @click="addModal()"
                v-if="objectData.accessWrite === true"
              >
                <i class="fad fa-plus"></i>
                &emsp;{{ $t("pages.finished-product") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.update-deploy") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.update-deploy") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 &&
                  objectData.accessWrite === true &&
                  !selectedItems[0].IsDeploy
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <!-- <b-dropdown-item
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t('report.action.download-excel-page') }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp;
                {{ $t('report.action.download-excel-page') }}
              </b-dropdown-item> -->
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="mb-2 mt-2"></div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" class="mb-4">
        <b-card>
          <custom-table
            ref="tableForm"
            :data-table="items"
            :field-table="fields"
            :column-show="listColumnShow"
            :access-write="objectData.accessWrite"
            :select-mode="selectMode"
            @row-selected="rowSelected"
          ></custom-table>
        </b-card>
      </b-colxx>
    </b-row>
    <custom-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :data-form="dataForm"
      :data-form-option="dataFormOptions"
      :state-form="stateForm"
      :type-form="typeForm"
      :body-form-default="bodyFormDefault"
      :key-show="keyShow"
      @handle-submit="handleSubmit"
    ></custom-form>
    <b-modal
      id="modal-finished-product"
      ref="modal"
      :title="$t('form.add-device')"
      ok-only
      :ok-title="$t('form.submit')"
      @show="resetModalAdd"
      @hidden="resetModalAdd"
      @ok="handleOkAdd"
      hide-header
    >
      <h5 class="text-center">{{ $t("form.add-device") }} ?</h5>
      <!-- <form ref="form" @submit.stop.prevent="handleSubmitAdd">
        <b-form-group
          :state="nameState"
          :label="$t('form.device-id') + ':'"
          label-for="name-input"
          :invalid-feedback="$t('form.device-id-enter')"
        >
          <b-form-input
            id="name-input"
            v-model="nameDevice"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form> -->
    </b-modal>
  </div>
</template>

<script>
import CustomTables from "@/components/Table/CustomTables";
import CustomForm from "./component/FormLight";
import handling from "@/constants/handling";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import lightAPI from "@/api/modules/lightAPI";
import shareAPI from "@/api/modules/shareAPI";

export default {
  components: {
    "custom-table": CustomTables,
    "custom-form": CustomForm,
  },
  data() {
    return {
      timer,
      selectMode: "single",
      listColumnShow: null,
      objectKey: null,
      menuRight: [],
      selectedItems: [],
      items: null,
      nameForm: null,
      titleForm: null,
      apiForm: null,
      bodyFormDefault: null,
      dataForm: null,
      typeForm: "",
      stateForm: null,
      dataByID: null,
      columnAdd: null,
      nameState: null,
      nameDevice: "",
      keyShow: 0,
      dataFormOptions: {
        ConnectTypeID: [],
        PowerTypeID: [],
        RegionID: [],
        CabinetID: [],
      },
    };
  },
  methods: {
    getDataByID(id) {
      let body = {
        ID: id,
      };
      lightAPI
        .lightLampByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editModal(items) {
      this.getDataByID(items[0].LampID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/SLLamps/EditDeploy";
        this.bodyFormDefault = {
          LampID: items[0].LampID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    printExternalExcel(table) {
      handling.printExcel(
        table,
        this.objectData.formName,
        null,
        null,
        this.$t("form.page") + " " + this.$refs["tableForm"].currentPage
      );
    },
    addModal() {
      this.apiForm = "/api/SLLamps/Export";
      setTimeout(() => {
        this.$bvModal.show("modal-finished-product");
      }, this.timer);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModalAdd() {
      this.nameDevice = "";
      this.nameState = null;
    },
    handleOkAdd(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmitAdd();
    },
    handleSubmitAdd() {
      // if (!this.checkFormValidity()) {
      //   return
      // }
      this.$nextTick(() => {
        this.submitAddOK(this.nameDevice);
        this.$bvModal.hide("modal-add");
      });
    },
    submitAddOK(note) {
      let body = {
        // LampID: note,
      };
      systemAPI
        .submitData(this.apiForm, body)
        .then((val) => {
          if (val.status) {
            if (!this.items || this.items.length === 0) {
              this.$bvModal.hide("modal-finished-product");
              this.getColumn("SLLampExports");
              this.getKeyTable();
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.$bvModal.hide("modal-finished-product");
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.$bvModal
              .msgBoxConfirm(this.$t("form.question-add-device"), {
                title: this.$t("form.unsuccessful"),
                size: "sm",
                buttonSize: "sm",
                okVariant: "danger",
                okTitle: this.$t("form.yes"),
                cancelTitle: this.$t("form.no"),
                footerClass: "p-2",
                hideHeaderClose: false,
                centered: true,
              })
              .then((value) => {
                if (value === true) {
                  this.$bvModal.show("modal-finished-product");
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
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("SLLampExports");
          this.getKeyTable();
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        } else {
          this.$bvModal.hide(this.nameForm);
          this.getData();
          setTimeout(() => {
            this.makeToast(
              "success",
              this.$t("toast.success").toUpperCase(),
              val.message
            );
          }, this.timer);
        }
      } else {
        this.$bvModal.hide(this.nameForm);
        this.getData();
        setTimeout(() => {
          this.makeToast(
            "danger",
            this.$t("toast.fail").toUpperCase(),
            val.message
          );
        }, this.timer);
      }
      this.nameForm = null;
      this.titleForm = null;
      this.apiForm = null;
      this.bodyFormDefault = null;
      this.typeForm = "";
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(this.$t("form.question") + items[0].LampName + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(items[0].LampID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleSubmitDelete(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI
        .lightLampRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("SLLampExports");
              this.getKeyTable();
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            } else {
              this.getData();
              setTimeout(() => {
                this.makeToast(
                  "success",
                  this.$t("toast.success").toUpperCase(),
                  val.message
                );
              }, this.timer);
            }
          } else {
            this.getData();
            setTimeout(() => {
              this.makeToast(
                "danger",
                this.$t("toast.fail").toUpperCase(),
                val.message
              );
            }, this.timer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 1000,
      });
    },
    getFormAddShow(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .modalFields(body)
        .then((val) => {
          this.columnAdd = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      lightAPI
        .lightLampExportList()
        .then((val) => {
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getKeyTable() {
      lightAPI
        .lightLampExportList()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.listColumnShow = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
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
    getOptionConnectType() {
      shareAPI
        .shareConnectTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.ConnectTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].ConnectTypeName,
                    value: val.data[i].ConnectTypeID,
                  };
                  this.dataFormOptions.ConnectTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOptionPowerType() {
      shareAPI
        .sharePowerTypeList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.PowerTypeID = [];
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].IsActive === 1) {
                  let obj = {
                    text: val.data[i].PowerTypeName,
                    value: val.data[i].PowerTypeID,
                  };
                  this.dataFormOptions.PowerTypeID.push(obj);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRegion() {
      shareAPI
        .shareRegionList()
        .then((val) => {
          if (val.status) {
            let array = [];
            handling.recursiveTreeSelectRegion(val.data, 0, array);
            this.dataFormOptions.RegionID = array;
            let arrTable = [];
            this.convertKeyTableData(val.data, 0, arrTable, 0);
            this.regionOption = arrTable;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertKeyTableData(array, parentID, arrayTable = [], i) {
      array.forEach((item) => {
        if (item["RegionParentID"] !== parentID) {
          return;
        }
        let obj = {
          IsActive: item["IsActive"],
          Note: item["Note"],
          RegionID: item["RegionID"],
          RegionName: item["RegionName"],
          RegionParentID: item["RegionParentID"],
          Key: i,
        };
        arrayTable.push(obj);
        this.convertKeyTableData(array, item["RegionID"], arrayTable, i + 1);
      });
    },
    getOptionCabinetID() {
      lightAPI
        .lightCabinetList()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.CabinetID = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].CabinetName,
                  value: val.data[i].CabinetID,
                };
                this.dataFormOptions.CabinetID.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("SLLampExports");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("SLLampExports");
    await this.getOptionPowerType();
    await this.getOptionConnectType();
    await this.getRegion();
    await this.getOptionCabinetID();
  },
  watch: {
    items() {
      this.getColumn("SLLampExports");
      this.getKeyTable();
    },
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    objectData: function () {
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
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.columnAdd) {
        let obj = {};
        for (let i = 0; i < this.columnAdd.length; i++) {
          let key = this.columnAdd[i]["ClName"];
          if (
            key.toUpperCase().search("NOTE") === -1 &&
            key.toUpperCase().search("DESCRIPTION") === -1
          ) {
            obj[key] = null;
          }
        }
        this.stateForm = obj;
      }
    }, 500);
  },
};
</script>
