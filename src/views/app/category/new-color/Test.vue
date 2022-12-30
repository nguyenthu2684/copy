<template>
  <div id="app-content-full" class="npl-categories">
    <b-card>
      <div ref="form-basic" class="h-100">
        <div ref="action-header">
          <ActionsHeaderNPL
            :currentIndex="currentIndex"
            :total="dataTable.length"
            :isDisabledAdd="isDisabledAdd"
            :isDisabledEdit="isDisabledEdit"
            :isDisabledDelete="isDisabledDelete"
            :isDisabledSave="isDisabledSave"
            :isDisabledCancel="isDisabledCancel"
            :isDisabledAttachFile="isDisabledAttachFile"
            :isDisabledPrint="isDisabledPrint"
            :isDisabledImportExcel="isDisabledImportExcel"
            :isDisabledSearch="isDisabledSearch"
            @change-index="handleChangeIndex"
            @change-action="handleChangeAction"
            @change-tab="updateTab"
            :showBlock="false"
          ></ActionsHeaderNPL>
        </div>
        <b-tabs v-model="currentTab" nav-class="d-none">
          <b-tab>
            <div>
              <b-table
                id="npl-table-basic-form"
                class="npl-table-basic-form border-bottom text-center"
                :items="dataTable"
                :fields="fieldsTable"
                show-empty
                @row-selected="rowSelected"
                ref="selectableTable"
                selectable
                :select-mode="'single'"
                :per-page="perPage"
                :current-page="currentPage"
                @filtered="onFiltered"
                :filter="filter"
                :filter-included-fields="filterOn"
                head-variant="light"
                bordered="bordered"
                style="max-height: calc(100% - 15px); margin-top: -1px"
                @row-dblclicked="handleDbClick"
              >
                <template #empty>
                  <div class="text-center font-italic text-muted">
                    {{ $t("data.non-data") }}
                  </div>
                </template>
                <template #cell(ScheduleLists)>
                  <span class="rounded-pill chiTiet">Xem chi tiết</span>
                </template>
                <template #cell(IsActive)="row">
                  <template v-if="row.item.IsActive === true">
                    <div :style="'padding-left: 35%; '">
                      <div
                        class="has-use"
                        :style="'border: 2px solid; color: green; '"
                      >
                        <div :style="'color: black; font-weight: 600;'">
                          Đang dùng
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div :style="'padding-left: 35%; '">
                      <div
                        class="not-use"
                        :style="'border: 2px solid; color: gray'"
                      >
                        <div :style="'color: black; font-weight: 600;'">
                          Không dùng
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </b-table>
              <b-pagination
                align="center"
                :total-rows="dataTable.length"
                :per-page="perPage"
                v-model="currentPage"
                size="sm"
              >
                <template v-slot:next-text>
                  <i class="simple-icon-arrow-right" />
                </template>
                <template v-slot:prev-text>
                  <i class="simple-icon-arrow-left" />
                </template>
                <template v-slot:first-text>
                  <i class="simple-icon-control-start" />
                </template>
                <template v-slot:last-text>
                  <i class="simple-icon-control-end" />
                </template>
              </b-pagination>
            </div>
          </b-tab>
          <b-tab>
            <span class="title-category">QUẢN LÝ: DANH MỤC MÀU SẮC</span>
            <FormAddCom
              :dataForm="dataForm"
              :currentMode="currentMode"
            ></FormAddCom>
          </b-tab>
        </b-tabs>
        <p id="test"></p>
        <div ref="action-footer">
          <ActionsFooterNPL
            @clear-row="clearSelected"
            :activeFocus="currentTab"
            :titleTab0="$t('footer-tab.list')"
            :titleTab1="$t('footer-tab.detail')"
            :titleTab2="$t('footer-tab.action-history')"
            :titleTab3="$t('footer-tab.file-attach')"
            @change-tab="updateTab"
          />
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import handling from "@/constants/handling.js";
import ActionsHeaderNPL from "@/views/app/category/new-color/ActionsHeaderBP";
import ActionsFooterNPL from "@/views/app/category/npl/component/ActionsFooterNPL";
import systemAPI from "@/api/modules/systemAPI";
import colorAPI from "@/api/modules/colorAPI";
import formCon from "./component/FormColorBP.vue";
import { database } from "firebase";

export default {
  // props: ["items", "fields", "fieldsForm", "optionByKey", "title"],
  components: {
    ActionsHeaderNPL,
    ActionsFooterNPL,
    FormAddCom: formCon,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      currentTab: 0,
      dataTable: [],
      objectKey: null,
      colTypes: null,
      keyString: "Colors",
      currentMode: "readOnly",
      objData: null,
      columnAdd: null,
      dataForm: null,
      currentIndex: 0,
      isCheckIsValid: false,
      notRequired: [
        "ID",
        "Note",
        "NameExtention1",
        "AddressExtention1",
        "IsActive",
      ],
      isDisabledAdd: false,
      isDisabledEdit: false,
      isDisabledDelete: false,
      isDisabledSave: true,
      isDisabledCancel: true,
      isDisabledAttachFile: false,
      isDisabledPrint: false,
      isDisabledImportExcel: false,
      isDisabledSearch: false,
    };
  },
  watch: {},
  async created() {
    await this.getData();
    await this.getColTypes(this.keyString);
    await this.getDynamicFormAdd(this.keyString);
    await this.getKeyTable();
  },
  computed: {
    totalPage() {
      return this.dataTable.length;
    },

    //show data table
    fieldsTable() {
      return handling.mergeTableAndData(this.objectKey, this.colTypes);
      // if (this.dataTable && this.dataTable.length > 0) {
      //   const keys = Object.keys(this.dataTable[0]);
      //   let result = handling.mergeTableAndData(this.objectKey, this.colTypes);
      //   return result;
      // }
    },
  },
  destroyed() {},
  methods: {
    //Double click view imformation data row
    handleDbClick(row) {
      /* ColorID of row data*/
      const index = this.dataTable.findIndex(
        (item) => item.ColorID == row.ColorID
      );
      /* get data row typeof obj*/
      const item = this.dataTable[index];
      /* get data by id*/
      this.getByID(item.ColorID);
      /* navigation tab 1*/
      this.currentTab = 1;
      /* set Mode */
      this.currentMode = "readOnly";
      this.currentIndex = index;
    },

    // Set currentIndex click rows
    rowSelected(items) {
      /** value currentIndex == value sum row */
      this.currentIndex = this.dataTable.length - 1;
      if (items != null) {
        var idColor;
        /**  get id of value row select */
        items.forEach((el) => {
          idColor = el.ColorID;
        });
        var count = 0;
        /** Compare id value row select with  id value dataTable and count number assign curentIndex  */
        this.dataTable.forEach((element) => {
          count++;
          if (element.ColorID == idColor) {
            this.currentIndex = count - 1;
            return;
          }
        });
      }
    },

    //
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

    //Change number and view data
    handleChangeIndex(index) {
      if (this.currentTab === 0) {
        this.currentTab = 1;
      }
      if (this.currentMode == "adding" || this.currentMode == "editing") {
        return this.changeIndexWhenNotSave(index);
      }
      this.currentIndex = index;
      this.currentMode = "readOnly";
      const item = this.dataTable[index];
      this.getByID(item.ColorID);
    },

    //
    changeIndexWhenNotSave(index) {
      this.$bvModal
        .msgBoxConfirm(this.$t("modal.question-skip") + "?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("modal.yes"),
          cancelTitle: this.$t("modal.no"),
          headerClass: "p-2 border-bottom-1",
          footerClass: "p-2 border-top-1",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.currentIndex = index;
            this.currentMode = "readOnly";
            this.currentTab = 1;
            const item = this.dataTable[index];
            this.getByID(item.ColorID);
            this.disableCancel();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // view form add data
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

    // view form edit data
    handleEdit() {
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.ColorID);
    },

    //
    handleDelete(id) {
      // console.log(this.dataTable[this.currentIndex].ColorID);
      const item = this.dataTable[this.currentIndex];
      this.getByID(item.ColorID);
      this.currentMode = "readOnly";
      this.$bvModal
        .msgBoxConfirm(
          `${this.$t("modal.confirm-delete")} màu ${
            this.dataTable[this.currentIndex].ColorName
          } ?`,
          {
            title: this.$t("toast.message"),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("modal.yes"),
            cancelTitle: this.$t("modal.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            let body = {
              ID: id,
            };
            colorAPI
              .deleteColor(body)
              .then((val) => {
                if (val.status) {
                  // alert("delete sussce");
                  this.showNotify(
                    "success",
                    this.$t("toast.message"),
                    val.message
                  );
                  this.getDataAfterSave();
                } else {
                  this.showNotify(
                    "error",
                    this.$t("toast.message"),
                    val.message
                  );
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

    //save of after add or edit
    handleSave() {
      /** not data is return and finish */
      if (!this.dataForm) return;
      /**assign isCheckIsValid = true */
      this.isCheckIsValid = true;
      /**Check value null toast mess */
      if (!this.checkFormValidate()) {
        return this.showNotify(
          "warning",
          this.$t("toast.message"),
          this.$t("toast.content")
        );
      }
      /** get value form */
      let obj = {};
      for (const key in this.dataForm) {
        obj = {
          ...obj,
          [key]: this.dataForm[key][1],
        };
      }
      /**assign value form valiable body */
      let body = {
        ...obj,
      };
      /**assign currentMode */
      // this.currentMode = "readOnly";

      // console.log(body);
      /**if value id of form != null => call API edit */
      if (body.ID) {
        colorAPI
          .editColor(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              // this.getData();
              this.getDataAfterSave();
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      } else {
        /**else call API add */
        this.currentMode = "readOnly";
        this.currentTab = 1;
        colorAPI
          .addListColor(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              this.getDataAfterSave();
            } else {
              this.showNotify("error", this.$t("toast.message"), val.message);
            }
          })
          .catch((err) => console.log(err));
      }
    },

    //
    handleCancel() {
      if (this.dataTable.length) {
        const item = this.dataTable[this.currentIndex];
        this.getByID(item.ColorID);
        this.currentMode = "readOnly";
      } else {
        this.currentTab = 0;
      }
    },

    //Check value notNull
    checkIsValid(key) {
      console.log("key", key);
      /**this.isCheckIsValid: false*/
      if (!this.isCheckIsValid) {
        return true;
      }
      /**notRequired: ["ID", "Note", "NameExtention1", "AddressExtention1"], */
      /**compare key with notRequired */
      if (this.notRequired.includes(key)) {
        return true;
      }
      const value = this.dataForm[key][1];
      console.log("value", value);
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
      console.log("form", this.dataForm);
      for (const key in this.dataForm) {
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
        /** !a a not value */
        /** !a <=> a == false || a == null || a == 0 || ... */
        if (!this.dataForm[key][3]) {
          return false;
        }
      }
      return true;
      // return result;
    },

    //call API getListColor
    getKeyTable() {
      colorAPI
        .getListColor()
        .then((val) => {
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //
    getColTypes(string) {
      let body = {
        ObjectName: string,
      };
      systemAPI
        .tableFields(body)
        .then((val) => {
          this.colTypes = val.status ? val.data : [];
        })
        .catch((err) => {});
    },

    //
    getData() {
      colorAPI
        .getListColor()
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          this.currentIndex = this.dataTable.length - 1;
        })
        .catch((err) => console.log(err));
    },

    //
    getByID(id) {
      let body = {
        ID: id,
      };
      colorAPI
        .getColorByID(body)
        .then((val) => {
          let obj = val.status ? val.data : null;
          if (obj) {
            let newObj = handling.showExtensionFormEdit(obj);
            this.dataForm = {
              ...newObj,
              ID: ["ID", id, "ID", null],
              // IsActive: [this.$t("status.status"), isActive, null, null],
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
          }
        })
        .catch((err) => console.log(err));
    },

    getDataAfterSave() {
      colorAPI
        .getListColor()
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (this.currentMode == "editing") {
            if (this.dataTable.length) {
              // this.currentIndex = this.dataTable.length - 1;
              const item = this.dataTable[this.currentIndex];
              console.log(this.currentIndex);
              this.getByID(item.ColorID);
              this.currentMode = "readModel";
            } else {
              this.currentTab = 0;
            }
          } else {
            if (this.dataTable.length) {
              this.currentIndex = this.dataTable.length - 1;
              const item = this.dataTable[this.dataTable.length - 1];
              console.log(this.currentIndex);
              this.getByID(item.ColorID);
            } else {
              this.currentTab = 0;
            }
          }
        })
        .catch((err) => console.log(err));

      // this.getData();
    },

    //
    // loadDocumentByIndex(index) {
    //   this.currentMode = "readOnly";
    //   this.currentIndex = index;
    //   const item = this.dataTable[index];
    //   this.getByID(item.ID);
    //   this.getAttachFile(item.ID);
    // },

    //
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },

    //
    handleChangeAction(key) {
      switch (key) {
        case "add":
          this.currentMode = "adding";
          this.currentTab = 1;
          this.handleAdd();
          this.disableAdd();

          break;
        case "edit":
          this.currentMode = "editing";
          this.currentTab = 1;
          this.handleEdit();
          this.disableEdit();

          break;
        case "delete":
          this.currentMode = "readOnly";
          this.currentTab = 1;
          this.disableDelete();
          this.handleDelete(this.dataTable[this.currentIndex].ColorID);
          break;
        case "cancel":
          this.currentMode = "readOnly";
          this.currentTab = 1;
          this.disableCancel();
          this.handleEdit();
          break;
        case "save":
          this.disableSave();
          this.handleSave();
          break;
        default:
          this.currentTab = 0;

          break;
      }
    },

    //
    updateTab(value) {
      switch (value) {
        case 0:
          this.currentTab = 0;
          // this.currentIndex = this.dataTable.length - 1;
          break;
        case 1:
          this.currentTab = 1;
          this.currentMode = "readOnly";
          this.handleEdit();
          break;
        default:
          break;
      }
    },

    //show notifi after handle button
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },

    ///disable
    /**Disable ADD */
    disableAdd() {
      this.isDisabledAdd = true;
      this.isDisabledEdit = true;
      this.isDisabledDelete = true;
      this.isDisabledSave = false;
      this.isDisabledCancel = false;
      this.isDisabledAttachFile = true;
      this.isDisabledPrint = true;
      this.isDisabledImportExcel = true;
      this.isDisabledSearch = true;
    },

    /**Disable EDIT */
    disableEdit() {
      this.isDisabledAdd = true;
      this.isDisabledEdit = true;
      this.isDisabledDelete = true;
      this.isDisabledSave = false;
      this.isDisabledCancel = false;
      this.isDisabledAttachFile = true;
      this.isDisabledPrint = true;
      this.isDisabledImportExcel = true;
      this.isDisabledSearch = true;
    },

    /**Disable DELETE */
    disableDelete() {
      this.isDisabledAdd = false;
      this.isDisabledEdit = false;
      this.isDisabledDelete = false;
      this.isDisabledSave = true;
      this.isDisabledCancel = true;
      this.isDisabledAttachFile = false;
      this.isDisabledPrint = false;
      this.isDisabledImportExcel = false;
      this.isDisabledSearch = false;
    },

    /**Disable SAVE */
    disableSave() {
      this.isDisabledAdd = false;
      this.isDisabledEdit = false;
      this.isDisabledDelete = false;
      this.isDisabledSave = true;
      this.isDisabledCancel = true;
      this.isDisabledAttachFile = false;
      this.isDisabledPrint = false;
      this.isDisabledImportExcel = false;
      this.isDisabledSearch = false;
    },

    /**Disable CANCEL */
    disableCancel() {
      this.isDisabledAdd = false;
      this.isDisabledEdit = false;
      this.isDisabledDelete = false;
      this.isDisabledSave = true;
      this.isDisabledCancel = true;
      this.isDisabledAttachFile = false;
      this.isDisabledPrint = false;
      this.isDisabledImportExcel = false;
      this.isDisabledSearch = false;
    },
  },
};
</script>
<style scoped>
.has-use,
.not-use {
  border-radius: 20px;
  max-width: 150px;
  height: 30px;
  text-align: center;

  white-space: nowrap;
  margin-top: 3px;
  margin-left: 1px;
  margin-right: 1px;
  padding-left: 5px;
  padding-right: 5px;
}
.title-category {
  display: inline-block;
  height: 37px;
  border-bottom: 1px solid #d7d7d7;
  padding-left: 5px;
  line-height: 37px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: #005aab;
  margin-bottom: 20px;
}
</style>
