<template>
  <div id="app-content-full" class="npl-categories-colors">
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
            <div
              class="box-content mt-2"
              style="overflow: hidden; height: 62vh"
            >
              <b-table
                id="npl-table-basic-form"
                class="npl-table-basic-form border-bottom text-center"
                sticky-header
                :items="dataTable"
                :fields="fieldsTable"
                bordered
                responsive
                show-empty
                head-variant="light"
                selectable
                :select-mode="'single'"
                @row-dblclicked="handleDbClick"
                ref="selectableTable"
                style="max-height: calc(100% - 15px); margin-top: -1px"
                @row-selected="rowSelected"
              >
                <template #empty>
                  <div class="text-center font-italic text-muted">
                    {{ $t("data.non-data") }}
                  </div>
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
              <!-- <b-pagination
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
              </b-pagination> -->
            </div>
          </b-tab>
          <b-tab>
            <span class="title-category">QUẢN LÝ: DANH MỤC MÀU SẮC</span>
            <FormAddCom
              :dataForm="dataForm"
              :currentMode="currentMode"
            ></FormAddCom>
          </b-tab>
          <b-tab>
            <span class="title-category">QUẢN LÝ: DANH MỤC MÀU SẮC</span>
            <HistoryActionColorBP
              :dataTableHistory="dataTableHistory"
              :fieldsTableHistory="fieldsTableHistory"
            >
            </HistoryActionColorBP>
          </b-tab>
          <b-tab>
            <span class="title-category">QUẢN LÝ: DANH MỤC MÀU SẮC</span>
            <TableListFileBP
              v-if="dataAttachFile && dataAttachFile.length > 0"
              :dataAttachFile="dataAttachFile"
              :fieldsAttachFile="fieldsAttachFile"
              @removeFile="removeAttachFile"
              @editFile="editAttachFile"
            />
            <TableListFileBP v-else>{{ $t("cards.no-data") }} </TableListFileBP>
          </b-tab>
        </b-tabs>
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
        <ModalAttachBP
          :show="showModalAttachFile"
          :formEdit="formEditAttachFile"
          @hidden="showModalAttachFile = false"
          @submitData="handleAttachFile"
        />
        <ModalPrintBP
          :dataPrint="dataPrint"
          :show="showModalPrintFile"
          @hidden="showModalPrintFile = false"
          @formPrint="handlePrint"
        />
        <ModalImportExBP
          :show="showModalExFile"
          :dataNotify="dataNotifyImportExcel"
          @hidden="showModalExFile = false"
          @submitData="handleImportExcel"
        />
        <ModalSearchBP
          :show="showModalSearch"
          :methodSearch="methodSearch"
          @hidden="showModalSearch = false"
          @search="handleSearch"
          @resetSearch="resetSearch"
          :dataSearch="dataSearch"
        />
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
import HistoryActionColorBP from "./component/HistoryActionColorBP.vue";
import TableListFileBP from "./component/TableListFileBP.vue";
import ModalAttachBP from "./component/ModalAttractBP.vue";
import ModalPrintBP from "./component/ModalPrintBP.vue";
import ModalImportExBP from "./component/ModalImportExBP.vue";
import ModalSearchBP from "./component/ModalSearchBP.vue";
import { database } from "firebase";

export default {
  // props: ["items", "fields", "fieldsForm", "optionByKey", "title"],
  components: {
    ActionsHeaderNPL,
    ActionsFooterNPL,
    HistoryActionColorBP,
    TableListFileBP,
    ModalAttachBP,
    ModalPrintBP,
    ModalImportExBP,
    ModalSearchBP,
    FormAddCom: formCon,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      currentTab: 0,
      dataTable: [],
      showModalExFile: false,
      showModalSearch: false,
      dataSearch: [],
      methodSearch: [],
      isSearching: false,
      showModalPrintFile: false,
      dataPrint: [],
      showModalAttachFile: false,
      formEditAttachFile: [],
      dataAttachFile: [],
      fieldsAttachFile: [
        { key: "CreateDate", label: "Thời gian" },
        { key: "UserFullName", label: "Người thực hiện" },
        { key: "Name", label: "Tiêu đề" },
        { key: "FileName", label: "", thClass: "d-none", tdClass: "d-none" },
        { key: "LinkFile", label: "File đính kèm" },
        { key: "Note", label: "Ghi chú" },
        { key: "Action", label: "Thao tác" },
      ],
      dataTableHistory: [],
      fieldsTableHistory: [
        {
          key: "ActionTypeID",
          label: "Mã hành động",
          thClass: "d-none",
          tdClass: "d-none",
        },
        {
          key: "CreateDate",
          label: "Thời gian",
          thClass: " text-left ",
        },
        {
          key: "UserFullName",
          label: "Người thực hiện",
        },
        {
          key: "ActionTypeName",
          label: "Thao tác",
        },
        {
          key: "ErrDescription",
          label: "Thông báo xử lý",
          thClass: "d-none",
          tdClass: "d-none",
        },
        {
          key: "ID",
          label: "ID",
          thClass: "d-none",
          tdClass: "d-none",
        },
        {
          key: "Note ",
          label: "Ghi chú",
        },
        {
          key: "Valuerr",
          label: "Giá trị",
          thClass: "d-none",
          tdClass: "d-none",
        },
      ],
      objectKey: null,
      colTypes: null,
      objectKeyHistory: null,
      colTypesHistory: null,
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
      dataNotifyImportExcel: null,
      // showModalNotifyImportExcel: false,
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
  watch: {
    // showModalNotifyImportExcel(newVal) {
    //   if (!newVal) {
    //     this.dataNotifyImportExcel = null;
    //   }
    // },
  },
  async created() {
    await this.getData();
    await this.getMethodSearch();
    await this.getAttachFile(this.currentIndex);
    await this.getColTypes(this.keyString);
    await this.getKeyTable();
    await this.getDynamicFormAdd(this.keyString);
    await this.getDataHistory(this.currentIndex);
  },

  computed: {
    totalPage() {
      return this.dataTable.length;
    },

    //
    FactorID() {
      const path = this.$route.fullPath;
      if (path.includes("category")) {
        return "Category";
      }
      return "";
    },

    //
    CategoryType() {
      return this.keyString;
    },

    //show data table
    fieldsTable() {
      return handling.mergeKeyDynamic(this.objectKey, this.colTypes);
    },
    fieldsTableAndMethodSearch() {
      return {
        fieldsTable: this.fieldsTable,
        methodSearch: this.methodSearch,
      };
    },
  },

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
      if (this.currentTab === 2) {
        this.currentIndex = index;
        return this.getDataHistory(this.currentIndex);
      }
      if (this.currentTab === 3) {
        this.currentIndex = index;
        return this.getAttachFile(this.currentIndex);
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

    //
    changeIndexWhenNotSaveTab(index) {
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
            this.currentMode = "readOnly";
            this.disableCancel();
            this.currentTab = index;
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
      /**if value id of form != null => call API edit */
      if (body.ID) {
        colorAPI
          .editColor(body)
          .then((val) => {
            if (val.status) {
              this.showNotify("success", this.$t("toast.message"), val.message);
              // this.getData();
              this.disableSave();
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
              this.disableSave();
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
      if (value || value === 0 || value === false) {
        return true;
      } else {
        return false;
      }
      // return isValid
    },
    checkFormValidate() {
      // let result = true;
      for (const key in this.dataForm) {
        let result = this.checkIsValid(key);
        this.dataForm[key][3] = result;

        if (!result) {
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

    ////getAll data table
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

    //getData History Color by id
    getDataHistory(index) {
      colorAPI
        .getListColor()
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          const item = this.dataTable[index];
          let body = {
            ID: item.ColorID,
          };
          /** */
          colorAPI.getColorByID(body).then((val) => {
            let obj = val.status ? val.data.Histories : [];
            this.dataTableHistory = handling.convertDataBitToBoolean(obj);
            const arr = [];
            obj.forEach((item) => {
              arr.push({
                ...item,
                CreateDate: handling.convertDateTime(item.CreateDate),
              });
            });
            this.dataTableHistory = arr;
          });
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
              this.getByID(item.ColorID);
              this.currentMode = "readModel";
            } else {
              this.currentTab = 0;
            }
          } else {
            if (this.dataTable.length) {
              this.currentIndex = this.dataTable.length - 1;
              const item = this.dataTable[this.dataTable.length - 1];
              this.getByID(item.ColorID);
            } else {
              this.currentTab = 0;
            }
          }
        })
        .catch((err) => console.log(err));

      // this.getData();
    },

    ///ATTRACH FILE
    //getData Attrach file Color by id
    getAttachFile(index) {
      colorAPI.getListColor().then((val) => {
        this.dataTable = val.status
          ? handling.convertDataBitToBoolean(val.data)
          : [];
        index = this.currentIndex;
        const item = this.dataTable[index].ColorID;
        let body = {
          OID: item.toString(),
          FactorID: this.FactorID,
          EntryID: this.CategoryType,
        };
        colorAPI
          .getAttachFile(body)
          .then((val) => {
            const arr = val.status ? val.data : [];
            this.dataAttachFile = arr.map((item) => ({
              ...item,
              CreateDate: handling.convertDateTime(item.CreateDate),
            }));
          })
          .catch((err) => console.log(err));
      });
    },

    //
    async handleAttachFile(obj) {
      this.showModalAttachFile = false;
      try {
        const id = this.dataTable[this.currentIndex].ColorID;

        const newObj = {
          ...obj,
          OID: id,
          FactorID: this.FactorID,
          EntryID: this.keyString,
        };
        let formData = new FormData();
        for (const key in newObj) {
          if (key === "File" && newObj[key] && newObj[key].length > 0) {
            for (let i = 0; i < newObj[key].length; i++) {
              formData.append("File", newObj[key][i]);
            }
          } else {
            formData.append(key, newObj[key]);
          }
        }
        let res;
        if (obj.ID) {
          res = await colorAPI.editAttachFile(formData);
        } else {
          res = await colorAPI.addAttachFile(formData);
        }
        if (res.status) {
          this.getAttachFile(this.currentIndex);
          this.showNotify("success", this.$t("toast.message"), res.message);
        } else {
          this.showNotify("error", this.$t("toast.message"), res.message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //
    removeAttachFile(item) {
      let body = {
        ID: item.ID,
      };
      colorAPI
        .deleteAttachFile(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getAttachFile(this.currentIndex);
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => console.log(err));
    },

    //
    editAttachFile(item) {
      this.showModalAttachFile = true;
      this.formEditAttachFile = { ...item };
    },

    /// PRINT
    //get form modal print
    getFormPrint() {
      const body = {
        FactorID: this.FactorID,
        EntryID: this.CategoryType,
      };
      console.log("fac", this.FactorID);
      console.log("entry", this.CategoryType);
      colorAPI
        .getFormPrint(body)
        .then((val) => {
          console.log("val", val);
          this.dataPrint = val.status ? val.data : [];
          this.showModalPrintFile = true;
        })
        .catch((err) => console.log(err));
    },

    //Button Print
    handlePrint(obj) {
      switch (obj.PrintType.toUpperCase()) {
        case "DOWNLOAD":
          /**gan the a cho thanh phan */
          const link = document.createElement("a");
          console.log("link", link);
          /**get name file */
          link.download = obj.FormPrintName;
          /**get link file */
          link.href = obj.PrintAction;
          document.body.appendChild(link);
          console.log("app", document.body.appendChild(link));
          link.click();
          document.body.removeChild(link);
          break;
        case "CLIENT":
          let formName = "Phân loại màu lá/hoa";
          handling.printExcel(
            "npl-table-basic-form",
            formName.toUpperCase(),
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
      this.showModalPrintFile = false;
    },

    /// IMPORT
    //
    handleImportExcel(file) {
      console.log(file);
      let formData = new FormData();
      formData.append("FactorID", this.FactorID);
      formData.append("EntryID", this.CategoryType);
      formData.append("File", file);
      colorAPI
        .importExcel(formData)
        .then((val) => {
          if (val.status) {
            console.log("valI", val);
            // this.showNotify("success", this.$t("toast.message"), val.message);
            this.dataNotifyImportExcel = val.data;
            // this.showModalNotifyImportExcel = true;
            this.currentTab = 0;
            this.getData();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
          this.showModalExFile = false;
        })
        .catch((err) => console.log(err));
    },

    ///SEARCH
    //

    getDataAndLastDocument() {
      colorAPI
        .getListColor()
        .then((val) => {
          this.dataTable = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          if (this.dataTable.length) {
            this.loadDocumentByIndex(this.dataTable.length - 1);
          }
        })
        .catch((err) => console.log(err));
    },

    loadDocumentByIndex(index) {
      this.currentMode = "readOnly";
      this.currentIndex = index;
      const item = this.dataTable[index];
      this.getByID(item.ColorID);
    },

    handleSearch(arr) {
      this.dataSearchCurrent = [...arr];
      console.log("dataS", arr);
      this.isSearching = true;
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
        colorAPI
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
      this.isSearching = false;
      this.setDataSearch(this.fieldsTable);
    },

    //
    //SEARCH
    setDataSearch(arr) {
      console.log("arrSet", arr);
      const newArr = [];
      arr.forEach((item) => {
        console.log("arrSearch", item);
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
        };
        console.log("arrobj", obj);
        console.log("method", this.methodSearch);
        if (item.key.toUpperCase() === "ISACTIVE") {
          obj.Operator = "=";
          (obj.OperatorDescription = "Bằng"),
            (obj.SearchOption = [
              { text: this.$t("npl.using"), value: 1 },
              { text: this.$t("npl.not-use"), value: 0 },
            ]);
        } else if (item.typeCol.toUpperCase() === "DATE") {
          obj.Operator = "=";
          obj.OperatorDescription = "Bằng";
        }
        newArr.push(obj);
      });
      this.dataSearch = newArr;
    },

    getMethodSearch() {
      colorAPI
        .getMethodSearch()
        .then((val) => {
          console.log("valMethod", val);
          let data = val.status ? val.data : [];
          if (data.length > 0) {
            const arr = [];
            data.forEach((item) => {
              if (item.Valu) {
                console.log("valMethod", item);
                arr.push({
                  text: item.Shw,
                  value: item.Valu,
                });
              }
            });
            this.methodSearch = [...arr];
            console.log("method", this.methodSearch);
          }
        })
        .catch((err) => console.log(err));
    },

    getSearchOptionByType(type, arr) {
      let option = [...arr];
      console.log("op", arr);
      if (type.toUpperCase() === "STRING" || type.toUpperCase() === "NOTE") {
        option = arr.filter(
          (item) =>
            item.value === "=" ||
            item.value === "like" ||
            item.value === "not like"
        );
      } else if (type.toUpperCase() === "DATE") {
        option = arr.filter(
          (item) => item.value !== "like" && item.value !== "not like"
        );
      }
      return option;
    },

    ///
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
          // this.disableSave();
          this.handleSave();
          break;
        case "attachFile":
          this.currentTab = 3;
          this.showModalAttachFile = true;
          this.currentMode = "readOnly";
          break;
        case "print":
          this.getFormPrint();
          this.showModalPrintFile = true;
          this.currentMode = "readOnly";
          break;
        case "importExcel":
          this.showModalExFile = true;
          this.currentMode = "readOnly";
          break;
        case "find":
          this.showModalSearch = true;
          this.currentMode = "readOnly";
          if (!this.isSearching) {
            // this.dataSearch = [...this.dataSearchCurrent]
            this.setDataSearch(this.fieldsTable);
          }
          break;
        default:
          this.currentTab = 0;

          break;
      }
    },

    //Change tab
    updateTab(value) {
      switch (value) {
        case 0:
          if (this.currentMode == "adding" || this.currentMode == "editing") {
            return this.changeIndexWhenNotSaveTab(0);
          }
          this.currentTab = 0;
          break;
        case 1:
          this.currentTab = 1;
          this.currentMode = "readOnly";
          this.handleEdit();
          break;
        case 2:
          if (this.currentMode == "adding" || this.currentMode == "editing") {
            return this.changeIndexWhenNotSaveTab(2);
          }
          this.currentTab = 2;
          this.currentMode = "readOnly";
          this.getDataHistory(this.currentIndex);
          break;
        case 3:
          if (this.currentMode == "adding" || this.currentMode == "editing") {
            return this.changeIndexWhenNotSaveTab(3);
          }
          this.currentTab = 3;
          this.currentMode = "readOnly";
          break;
        default:
          break;
      }
    },

    //
    // hiddenModalNotifyImportExcel() {
    //   this.showModalNotifyImportExcel = false;
    // },

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
.box-content {
  overflow: auto;
}
</style>
