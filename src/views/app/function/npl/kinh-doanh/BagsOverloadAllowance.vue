<template>
  <div id="app-content-full" class="form-npl-kinh-doanh" style="overflow: auto">
    <b-card>
      <div class="form-basic npl-table-basic-form crane-allowance">
        <ActionsHeaderNPL
          @first-index="updateFirstIndex"
          @pre-index="updatePreIndex"
          @next-index="updateNextIndex"
          @last-index="updateLastIndex"
          :currentIndex="currentIndex"
          :isAdd="isAdd"
          :isEdit="isEdit"
          :isDelete="isDelete"
          @change-actions="handleChangeActions"
        ></ActionsHeaderNPL>
        
        <b-tabs v-model="currentTab" nav-class="d-none">
          <b-tab
            ><div class="box-content p-1">
              <b-table
                id="npl-table-basic-form"
                class="npl-table-basic-form"
                :fields="tempData.fieldsManagement"
                :items="tempData.dataManagement"
                bordered
                responsive
                show-empty
                head-variant="light"
                selectable
                :select-mode="'single'"
                :current-page="currentPage"
                :per-page="perPage"
                @row-dblclicked="handleDbClick"
              >
                <template v-slot:cell(statusName)="row">
                  <div style="max-width: 120px">
                    <Status
                      :color="row.item.statusColor"
                      :label="row.item.statusName"
                      :showCircle="false"
                    ></Status>
                  </div>
                </template>
              </b-table>
              <b-pagination
                align="center"
                :total-rows="tempData.dataManagement.length"
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
            <div class="box-content">
               <TitleMajor
              :titleOption="titleOption"
              :currentTitle="currentTitle"
            />
              <div class="box-content-detail">
                <!-- <div
                  class="btn-block-non-block bg-primary shadow"
                  v-if="isLock"
                >
                  <i class="fas fa-lock-alt mr-1"></i>
                  ???? kh??a
                </div>
                <div
                  class="btn-block-non-block bg-dark text-light shadow"
                  v-else
                >
                  <i class="fas fa-unlock-alt mr-1"></i>
                  Ch??a kh??a
                </div> -->
                <div class="d-flex flex-wrap">
                  <b-col lg="6" class="pl-0">
                    <b-row>
                      <b-col lg="4">
                        <b-form-group label="Ch???ng t???">
                          <b-form-input
                            v-model="dataForm['ID']"
                            disabled
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="Ng??y ??p d???ng">
                          <datepicker
                            :language="locale"
                            :format="datePickerFormat"
                            :bootstrap-styling="true"
                            :placeholder="'Ch???n ng??y'"
                            v-model="dataForm['date']"
                            @input="convertDate(dataForm['date'])"
                            :disabled="isEdit || isAdd ? false : true"
                          ></datepicker>
                        </b-form-group>
                      </b-col>
                      <b-col lg="4">
                        <b-form-group label="S??? ti???n ph??? c???p/chuy???n">
                          <b-form-input
                            v-model="dataForm['amount']"
                            :disabled="isEdit || isAdd ? false : true"
                            class="text-right"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                </div>
                <b-col lg="6" class="pl-0">
                  <b-form-group label="Ghi ch??">
                    <b-form-textarea
                      rows="2"
                      max-rows="6"
                      v-model="dataForm['note']"
                      :disabled="isEdit || isAdd ? false : true"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </div>
            </div>
          </b-tab>
          <b-tab
            ><div class="box-content">
               <TitleMajor
              :titleOption="titleOption"
              :currentTitle="currentTitle"
            />
              <table-history
                v-if="dataHisAction && dataHisAction.length > 0"
                :fields="fieldsHisAction"
                :items="dataHisAction"
              ></table-history>
              <div v-else class="mt-4 text-center text-muted font-weight-bold">
                Kh??ng t???n t???i d??? li???u !
              </div>
            </div>
          </b-tab>
          <b-tab>
            <div class="box-content">
               <TitleMajor
              :titleOption="titleOption"
              :currentTitle="currentTitle"
            />
              <table-list-file></table-list-file>
            </div>
          </b-tab>
        </b-tabs>
        <ActionsFooterNPL
          :activeFocus="currentTab"
          @change-tab="updateTab"
        ></ActionsFooterNPL>
        <b-modal :id="`modal-import-${keyComponent}`" title="????NH K??M FILE">
          <b-row>
            <b-col lg="12">
              <b-form-group :label="'Ti??u ?????'">
                <b-form-input></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="'File'">
                <b-form-file
                  :placeholder="'Xin m???i ch???n...'"
                  v-model="files"
                  multiple
                  accept="/*"
                  :browse-text="'Ch???n T???p'"
                ></b-form-file>
              </b-form-group>
            </b-col>
            <b-col lg="12">
              <b-form-group :label="'Ghi ch??'">
                <b-form-textarea rows="2" max-rows="6"></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal
          :id="`modal-find-${keyComponent}`"
          title="T??M, L???C D??? LI???U"
          size="lg"
        >
          <template v-for="(field, i) in fieldsTable">
            <div
              :key="i"
              class="d-flex justify-content-between align-items-center mb-1"
            >
              <div style="width: 100%">
                <strong>{{ field.label }}</strong>
              </div>
              <div style="width: 100%" class="text-right">
                <span style="color: #145388"
                  ><b>{{ currentSearch }}</b></span
                >
                <b-dropdown
                  class="title-dropdown ml-1 mr-4"
                  variant="link"
                  toggle-class="text-decoration-none"
                >
                  <b-dropdown-item
                    @click="changeTypeSearch('L???n h??n')"
                    href="#"
                  >
                    L???n h??n</b-dropdown-item
                  >
                  <b-dropdown-item @click="changeTypeSearch('B?? h??n')" href="#">
                    B?? h??n</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="changeTypeSearch('L???n ho???c b???ng')"
                    href="#"
                    >L???n ho???c b???ng</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="changeTypeSearch('B?? ho???c b???ng')"
                    href="#"
                    >B?? ho???c b???ng</b-dropdown-item
                  >
                  <b-dropdown-item @click="changeTypeSearch('B???ng')" href="#"
                    >B???ng</b-dropdown-item
                  >
                  <b-dropdown-item
                    @click="changeTypeSearch('Trong kho???ng')"
                    href="#"
                    >Trong kho???ng</b-dropdown-item
                  >
                </b-dropdown>
              </div>
              <div style="width: 100%" class="mr-2">
                <div>Gi?? tr??? 1</div>
                <b-form-input></b-form-input>
              </div>
              <div style="width: 100%">
                <div>Gi?? tr??? 2</div>
                <b-form-input></b-form-input>
              </div>
            </div>
          </template>
        </b-modal>
        <b-modal
          :id="`modal-print-${keyComponent}`"
          title="DANH S??CH M???U IN"
          size="lg"
          @ok="handlePrint"
        >
          <b-row>
            <b-col lg="12">
              <b-table
                select-mode="single"
                bordered
                :items="dataPrint"
                :fields="fieldsPrint"
                selectable
              >
                <template #cell(actions)>
                  <div>
                    <b-button size="sm" variant="outline-primary">
                      <b>ch???n</b>
                    </b-button>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-modal>
      </div>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";
import { en, vi } from "vuejs-datepicker/dist/locale";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Handling from "@/constants/handling.js";
import ActionsHeaderNPL from "@/containers/npl/ActionsHeaderNPL";
import ActionsFooterNPL from "@/containers/npl/ActionsFooterNPL";
import Status from "@/components/Badges/StatusColor.vue";
import { mapGetters } from "vuex";
import TitleMajor from "@/views/app/function/npl/kinh-doanh/component/TitleMajor.vue";
import TableHistory from "@/components/Table/npl/TableHistory.vue";
import TableListFile from "@/components/Table/npl/TableListFile.vue";
import tempData from "@/data/modules/npl/proposingAllowancesContBagsOverloaded(1.8)";

export default {
  // props: ["items", "fields", "title"],
  components: {
    "v-select": vSelect,
    Status,
    ActionsHeaderNPL,
    ActionsFooterNPL,
    "table-history": TableHistory,
    "table-list-file": TableListFile,
    TitleMajor,
  },
  data() {
    return {
      locale: localStorage.getItem("currentLanguage") == "vn" ? vi : en,
      datePickerFormat: "dd/MM/yyyy",
      currentTab: 0,
      // dataForm: this.items?.length > 0 ? this.items[0] : null,
      dataForm:
        tempData.dataManagement[tempData.dataManagement.length - 1] || null,
      dataBackup: null,
      fieldsTable: tempData.fieldsManagement ?? [],
      dataTable: this.items ?? [],
      totalRows: this.items?.length > 0 ? this.items.length : 0,
      currentPage: 1,
      perPage: 10,
      currentIndex: 0,
      //print
      fieldsPrint: [
        {
          key: "name",
          label: "T??n",
        },
      ],
      dataPrint: [
        {
          name: "M???u In 1",
        },
        {
          name: "M???u In 2",
        },
        {
          name: "M???u In 3",
        },
      ],
      //key-component
      keyComponent: "basic",
      //title-options
      currentTitle: '?????nh m???c ph??? c???p h??ng cont c???p c???, qu?? t???i' ?? null,
      // titleOption: TitleOption.data,
      //table-chil-by-key
      fieldsByKey: {},
      dataByKey: {},
      //search
      currentSearch: "Ch???n lo???i t??m ki???m",
      options: this.optionByKey ?? {},
      //actions-header
      isAdd: false,
      isEdit: false,
      isDelete: false,
      //import-file
      files: null,
      listFile: [],
      //history-actions
      typeAction: null,
      fieldsHisAction: [
        {
          key: "dateTime",
          label: "Th???i gian",
        },
        {
          key: "userName",
          label: "Ng?????i th???c hi???n",
        },
        {
          key: "typeAction",
          label: "Thao t??c",
        },
        {
          key: "note",
          label: "Ghi ch??",
        },
      ],
      dataHisAction: [
        {
          dateTime: "13:10 10/11/2022",
          userName: "Tr???n V??n A",
          typeAction: "add",
          note: "",
        },
        {
          dateTime: "15:10 10/11/2022",
          userName: "Tr???n V??n B",
          typeAction: "edit",
          note: "ph??t sinh abc...",
        },
        {
          dateTime: "12:10 11/11/2022",
          userName: "Tr???n V??n C",
          typeAction: "delete",
          note: "Kh??ng ????? xe v???n t???i",
        },
      ],
      isAdd: false,
      isEdit: false,
      isDelete: false,
      //import-file
      files: null,
      listFile: [],
      //history-actions
      typeAction: null,
      // fieldsHisAction: [
      //   {
      //     key: "dateTime",
      //     label: "Ng??y thao t??c",
      //   },
      //   {
      //     key: "userName",
      //     label: "Ng?????i thao t??c",
      //   },
      //   {
      //     key: "referenceID",
      //     label: "M?? ch???ng t???",
      //   },
      //   {
      //     key: "typeAction",
      //     label: "Lo???i thao t??c",
      //   },
      // ],
      //dataHisAction: [
      //        {
      //          time: "10:15P",
      //          performer: "Tr???n v??n A",
      //          action: "T???o m???i ch???ng t???",
      //          note: "",
      //        },
      //        {
      //          time: "10:20P",
      //          performer: "Tr???n v??n A",
      //          action: "Kh??a ch???ng t???",
      //          note: "",
      //        },
      //      ],
      //fieldsHisAction: [
      //        { key: "time", label: "Th???i gian" },
      //        { key: "performer", label: "Ng?????i th???c hi???n" },
      //        { key: "action", label: "Thao t??c" },
      //        { key: "note", label: "Ghi ch??" },
      //      ],
      dataFileAttach: [
        {
          time: "10:15P",
          performer: "Tr???n v??n A",
          file: "H??a ????n b??n h??ng",
          note: "",
        },
        {
          time: "10:25P",
          performer: "Tr???n v??n A",
          file: "H???p ?????ng giao h??ng",
          note: "",
        },
      ],
      fieldsFileAttach: [
        { key: "time", label: "Th???i gian" },
        { key: "performer", label: "Ng?????i th???c hi???n" },
        { key: "file", label: "File ????nh k??m" },
        { key: "note", label: "Ghi ch??" },
      ],
      ////////
      tempData: tempData,
      title: "ph??? c???p h??ng cont c???p c???, qu?? t???i",
      isLock: false,
      perPageTable2: 10,
      currentPageTable2: 1,
      perPageTable3: 10,
      currentPageTable3: 1,
      modalSelectName: "",
      modalSelectTitle: "",
      dataTableModalSelect: [],
      fieldsTableModalSelect: [],
      titleOption: [
        {
          id: 0,
          label: "?????nh m???c ph??? c???p h??ng cont c???p c???, qu?? t???i",
        },
      ],
      detailCraneRender: [],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  watch: {
    files(val) {
      console.log(1, "files", val);
    },
  },
  methods: {
    handlePrint() {
      this.$notify("warning", "TH??NG B??O", "??ang t???i x??? l??...", {
        duration: 2000,
        permanent: false,
      });
      setTimeout(() => {
        this.$notify("success", "TH??NG B??O", "In th??nh c??ng !", {
          duration: 3000,
          permanent: false,
        });
      }, 2000);
    },
    changeTypeSearch(value) {
      // this.currentSearch = value;
    },
    changeTitle(obj) {
      this.currentTitle = obj.label;
    },
    handleShowImportFile() {
      setTimeout(() => {
        this.$bvModal.show(`modal-import-${this.keyComponent}`);
      }, 500);
    },
    pushHistory() {
      if (this.typeAction) {
        let row = {
          dateTime: Handling.getDateTimeNow(),
          userName: this.currentUser.UserName,
          referenceID: this.dataForm.ID,
          typeAction: this.typeAction,
        };
        this.dataHisAction.unshift(row);
        this.typeAction = null;
      }
    },
    handleChangeActions(bol, key) {
      switch (key) {
        case "add":
          this.typeAction = key;
          this.isAdd = !bol;
          this.isEdit = true;
          this.isDelete = true;
          this.dataBackup = { ...this.dataForm };
          this.currentTab = 1;
          this.handleAdd();
          break;
        case "edit":
          this.typeAction = key;
          this.isEdit = !bol;
          this.isAdd = true;
          this.isDelete = true;
          this.dataBackup = { ...this.dataForm };
          break;
        case "delete":
          this.typeAction = key;
          this.pushHistory();
          this.deleteModal();
          break;
        case "save":
          this.isEdit = false;
          this.isAdd = false;
          this.isDelete = false;
          this.handleSave();
          this.pushHistory();
          break;
        case "cancel":
          this.typeAction = null;
          this.isEdit = false;
          this.isAdd = false;
          this.isDelete = false;
          this.dataForm = { ...this.dataBackup };
          this.dataBackup = null;
          break;
        case "print":
          setTimeout(() => {
            this.$bvModal.show(`modal-print-${this.keyComponent}`);
          }, 500);

          break;
        case "import":
          this.handleShowImportFile();
          break;
        case "find":
          setTimeout(() => {
            this.$bvModal.show(`modal-find-${this.keyComponent}`);
          }, 500);
          break;
      }
    },
    convertDate(key) {
      this.dataForm[key] = Handling.convertDateNPL(this.dataForm[key]);
    },
    updateFirstIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = 0;
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updatePreIndex() {
      if (!this.dataTable?.length > 0) return;
      if (this.currentIndex == 0) {
        this.currentIndex = 0;
      } else {
        this.currentIndex -= 1;
      }
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateNextIndex() {
      if (!this.dataTable?.length > 0) return;
      if (this.currentIndex == this.dataTable.length - 1) {
        this.currentIndex = this.dataTable.length - 1;
      } else {
        this.currentIndex += 1;
      }
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    updateLastIndex() {
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = this.dataTable.length - 1;
      this.dataForm = { ...this.dataTable[this.currentIndex] };
    },
    handleDbClick(row, index) {
      this.currentTab = 1;
      return;
      if (!this.dataTable?.length > 0) return;
      this.currentIndex = index;
      this.dataForm = { ...row };
      this.currentTab = 1;
    },
    updateTab(value) {
      this.currentTab = value;
    },
    handleAdd() {
      for (const key in this.dataForm) {
        this.dataForm[key] = null;
      }
      this.dataForm.ID = moment(new Date()).format("HH:mm:ss").toString();
      this.dataTable.unshift(this.dataForm);
      this.currentIndex = 0;
    },
    handleSave() {
      this.dataTable = this.dataTable.filter(
        (row) => row.ID != this.dataForm.ID
      );
      this.dataTable.unshift(this.dataForm);
      this.currentIndex = 0;
      this.$notify("success", "TH??NG B??O", "X??? l?? th??nh c??ng", {
        duration: 3000,
        permanent: false,
      });
    },
    deleteModal() {
      this.$bvModal
        .msgBoxConfirm(`B???n mu???n x??a ${this.dataForm.ID} ?`, {
          title: "C???NH B??O",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "?????ng ??",
          cancelTitle: "H???y",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.dataTable = this.dataTable.filter(
              (row) => row.ID != this.dataForm.ID
            );
            if (this.dataTable?.length > 0) {
              this.dataForm = { ...this.dataTable[0] };
              this.currentIndex = 0;
              this.$notify("success", "TH??NG B??O", "X??? l?? th??nh c??ng", {
                duration: 3000,
                permanent: false,
              });
            } else {
              this.dataForm = null;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addRow() {
      const newIndex = this.detailCraneRender.length + 1;
      this.detailCraneRender = [
        ...this.detailCraneRender,
        {
          time: newIndex.toString(),
          amount: "",
          isNewRow: true,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.npl-table-basic-form .table th {
  white-space: nowrap;
}
.crane-allowance {
  .title-dropdown button {
    font-size: 20px;
    padding: 0;
  }
  table {
    margin-bottom: 0;
  }
  .table-responsive {
    margin-bottom: 0;
  }
  th {
    padding: 0.5rem;
  }
  td {
    white-space: nowrap;
    vertical-align: middle;
    padding: 0.5rem;
  }
  .box-content-detail {
    position: relative;
  }
  .btn-show-modal-select {
    padding: 0.25rem 0.7rem;
    border-radius: 0;
  }
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
  // .detail-crane-table {
  //   // border-left: 1px solid #d7d7d7;
  //   // border-top: 1px solid #d7d7d7;
  //   display: flex;
  //   flex-wrap: wrap;
  // }
  // .detail-crane-item {
  //   border-left: 1px solid #d7d7d7;
  //   border-top: 1px solid #d7d7d7;
  //   // border-right: 1px solid #d7d7d7;
  //   // border-bottom: 1px solid #d7d7d7;
  //   display: flex;
  //   flex: 0 0 30%;
  // }
  // .detail-crane-label {
  //   background: #f3f3f3;
  //   border-right: 1px solid #d7d7d7;
  //   border-bottom: 1px solid #d7d7d7;
  //   // border-left: 1px solid #d7d7d7;
  //   flex: 1 1 50%;
  //   padding: 0.5rem 0.75rem;
  // }
  // .detail-crane-value {
  //   border-right: 1px solid #d7d7d7;
  //   border-bottom: 1px solid #d7d7d7;
  //   flex: 1 1 50%;
  //   text-align: right;
  //   padding: 0.5rem 0.75rem;
  // }
  .title-dropdown button {
    font-size: 20px;
    padding: 0;
  }
}
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.box-content {
  height: calc(100vh - 235px);
  overflow: auto;
  padding-right: 15px;
}
.btn-remove {
  display: flex;
  justify-content: center;

  div {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #f5f5f5;
    }
  }
}
.style-special {
  font-weight: 700;
  font-size: 14px;
}
</style>
