<template>
  <div id="app-content-full" class="form-basic" style="overflow: auto">
    <b-card>
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
          ><div class="box-content">
            <b-table
              id="npl-table-basic-form"
              class="npl-table-basic-form"
              :fields="fieldsTable"
              :items="dataTable"
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
                <div>
                  <Status
                    :color="row.item.statusNameColor"
                    :label="row.item.statusName"
                    :showCircle="false"
                  ></Status>
                </div>
              </template>
            </b-table>
            <b-pagination
              align="center"
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
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
            <div class="d-flex flex-wrap">
              <b-col lg="3" class="pl-0">
                <b-row>
                  <b-col lg="6">
                    <b-form-group label="Ch???ng t???">
                      <b-form-input
                        v-model="dataForm['ID']"
                        disabled
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="Ng??y ??p d???ng">
                      <datepicker
                        :language="locale"
                        :format="datePickerFormat"
                        :bootstrap-styling="true"
                        :placeholder="'Ch???n ng??y'"
                        v-model="dataForm['createDate']"
                        @input="convertDate(dataForm['createDate'])"
                        :disabled="isEdit || isAdd ? false : true"
                      ></datepicker>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-form-group label="Kh??ch h??ng">
                      <v-select
                        v-model="dataForm['client']"
                        :options="options.client"
                        :disabled="isEdit || isAdd ? false : true"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="?????a ch???">
                      <b-form-input
                        v-model="dataForm['DiaChi']"
                        :disabled="isEdit || isAdd ? false : true"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-form-group label="Dung sai">
                      <b-form-input
                        v-model="dataForm['dungSai']"
                        class="text-right"
                        :disabled="isEdit || isAdd ? false : true"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="C?? ch???n v?????t h???n m???c">
                      <div class="d-flex">
                        <b-form-radio
                          v-model="dataForm['isPrevent']"
                          name="some-radios"
                          value="C??"
                          class="mr-4"
                          >C??</b-form-radio
                        >
                        <b-form-radio
                          v-model="dataForm['isPrevent']"
                          name="some-radios"
                          value="Kh??ng"
                          >Kh??ng</b-form-radio
                        >
                      </div>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="3">
                <b-row>
                  <b-col lg="6">
                    <b-form-group label="H???n m???c t??n d???ng">
                      <b-form-input
                        v-model="dataForm['hanMucTinDung']"
                        class="text-right"
                        :disabled="isEdit || isAdd ? false : true"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="H???n m???c n???">
                      <b-form-input
                        v-model="dataForm['hanMucNo']"
                        class="text-right"
                        :disabled="isEdit || isAdd ? false : true"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-form-group label="??i???n tho???i">
                      <b-form-input
                        v-model="dataForm['SDT']"
                        :disabled="isEdit || isAdd ? false : true"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="Email">
                      <b-form-input
                        v-model="dataForm['Email']"
                        :disabled="isEdit || isAdd ? false : true"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="6"></b-col>
              <b-col lg="6" class="pl-0">
                <b-form-group label="Ghi ch??">
                  <b-textarea
                    v-model="dataForm['noet']"
                    :disabled="isEdit || isAdd ? false : true"
                  ></b-textarea>
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
                <b-dropdown-item @click="changeTypeSearch('L???n h??n')" href="#">
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
import TitleOption from "@/data/modules/npl/titleOptions";
import dxHanMucTinDung from "@/data/modules/npl/dxHanMucTinDung";

export default {
  props: ["items", "fields", "fieldsForm", "optionByKey", "title"],
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
      dataForm:
        dxHanMucTinDung.data?.length > 0 ? dxHanMucTinDung.data[0] : null,
      dataBackup: null,
      fieldsTable: dxHanMucTinDung.fields ?? [],
      typeForm: dxHanMucTinDung.fieldsForm ?? [],
      dataTable: dxHanMucTinDung.data ?? [],
      totalRows:
        dxHanMucTinDung.data?.length > 0 ? dxHanMucTinDung.data.length : 0,
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
      keyComponent: "debit-limit",
      //title-options
      currentTitle: "????? xu???t h???n m???c t??n d???ng" ?? null,
      // titleOption: TitleOption.data,
      //table-chil-by-key
      fieldsByKey: {},
      dataByKey: {},
      //search
      currentSearch: "Ch???n lo???i t??m ki???m",
      options: this.optionByKey ?? {
        client: dxHanMucTinDung.optionClient,
      },
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
      titleOption: [
        {
          id: 0,
          label: "????? xu???t h???n m???c t??n d???ng",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
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
  },
};
</script>
<style>
.v-select .vs__dropdown-toggle {
  z-index: 9999;
}
.vs--open .vs__dropdown-toggle {
  z-index: 9999;
}
</style>
<style>
.title-dropdown button {
  font-size: 20px;
  padding: 0;
}
</style>
<style>
.npl-table-basic-form .table th {
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.box-content {
  height: calc(100vh - 240px);
  overflow: auto;
}
</style>
