<template>
  <div id="app-content-full" class="form-basic help-vehicle-outside" style="overflow: auto">
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
              <b-col lg="4" class="pl-0">
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
                        v-model="dataForm['creatDate']"
                        @input="convertDate(dataForm['creatDate'])"
                        :disabled="isEdit || isAdd ? false : true"
                      ></datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <b-form-group label="Ph??? c???p x??ng kh??c">
                      <b-form-input
                        v-model="dataForm['oilAllowanceOutside']"
                        class="text-right"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6">
                    <label style="white-space: nowrap"
                      >Ph??? c???p ngo??i gi??? kh??c</label
                    >
                    <b-form-input
                      v-model="dataForm['overtimeAllowanceOutside']"
                      class="text-right"
                    ></b-form-input>
                  </b-col>
                  <b-col lg="12">
                    <b-form-group label="Ghi ch??">
                      <b-form-textarea
                        rows="2"
                        max-rows="6"
                        v-model="dataForm['note']"
                        :disabled="isEdit || isAdd ? false : true"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="6">
                <div class="table-relative">
                  <div class="d-flex flex-wrap align-items-center">
                    <div class="style-special">*Khu v???c theo ?????nh m???c</div>
                    <!-- <b-button
                      size="sm"
                      variant="primary"
                      class="d-inline-block ml-2 btn-show-modal-select"
                      @click="showModalSelect('section1')"
                      >Ch???n</b-button
                    > -->
                    <b-button
                      size="sm"
                      variant="primary"
                      class="d-inline-block ml-2 btn-show-modal-select"
                      @click="showModalAdd('section1')"
                      >Th??m</b-button
                    >
                  </div>
                  <b-table
                    :items="selectedSection1"
                    :fields="fieldsSelectedSection1"
                    :bordered="true"
                    show-empty
                    head-variant="light"
                  >
                    <template #cell(amount)="row">
                      <b-form-input
                        v-model="row.item.amount"
                        class="text-right"
                      ></b-form-input>
                    </template>
                    <template #cell(delete)>
                      <div class="text-center btn-remove">
                        <div class="text-danger">
                          <i class="fad fa-trash-alt"></i>
                        </div>
                      </div>
                    </template>
                  </b-table>
                </div>
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
      <b-modal
        :id="modalSelectName"
        scrollable
        class="text-center"
        size="lg"
        hide-header
        @ok="handleModalSelect"
        ok-title="X??c nh???n"
        cancel-title="????ng"
      >
        <div class="modal-select-table">
          <h5 class="text-center">{{ modalSelectTitle }}</h5>
          <b-table
            :items="dataTableModalSelect"
            :fields="fieldsTableModalSelect"
            :bordered="true"
            show-empty
            head-variant="light"
          >
            <template #cell(isSelected)="row">
              <div class="d-flex justify-content-center ml-2">
                <b-form-checkbox
                  v-model="row.item.isSelected"
                  :value="true"
                  :unchecked-value="false"
                >
                </b-form-checkbox>
              </div>
            </template>
            <template #empty>
              <div class="text-center">Kh??ng c?? d??? li???u</div>
            </template>
          </b-table>
          <b-pagination
            align="center"
            :total-rows="dataTableModalSelect.length"
            :per-page="perPageTable3"
            v-model="currentPageTable3"
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
      </b-modal>
      <b-modal
        :id="modalAddName"
        scrollable
        class="text-center"
        size="md"
        title="Th??m khu v???c ph??? c???p"
        @ok="handleModalAdd"
        ok-title="Th??m"
        cancel-title="????ng"
        body-class="body-modal-add"
      >
        <template v-if="formModalAdd">
          <template v-if="sectionModalAdd == 'section1'">
            <b-row>
              <b-col lg="12">
                <b-form-group label="Khu v???c">
                  <b-form-select
                    :options="tempData.regionOptions"
                    v-model="formModalAdd.region"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Ph??? c???p x??ng">
                  <b-form-input
                    v-model="formModalAdd.oilAllowance"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Ph??? c???p ngo??i gi???">
                  <b-form-input
                    v-model="formModalAdd.overtimeAllowance"
                    class="text-right"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </template>
        </template>
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
import pcCuuXeBenNgoai from "@/data/modules/npl/pcCuuXeBenNgoai";

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
        pcCuuXeBenNgoai.data?.length > 0 ? pcCuuXeBenNgoai.data[0] : null,
      dataBackup: null,
      fieldsTable: pcCuuXeBenNgoai.fields ?? [],
      typeForm: pcCuuXeBenNgoai.fieldsForm ?? [],
      dataTable: pcCuuXeBenNgoai.data ?? [],
      totalRows:
        pcCuuXeBenNgoai.data?.length > 0 ? pcCuuXeBenNgoai.data.length : 0,
      currentPage: 1,
      perPage: 10,
      currentIndex: 0,
      //options
      danhMuc: {
        KhuVuc: pcCuuXeBenNgoai.optionKhuVuc,
      },
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
      keyComponent: "capCuuXeBenNgoai",
      //title-options
      currentTitle: "?????nh m???c  Ph??? c???p c???u xe b??n ngo??i" ?? null,
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

      ///////
      fieldsSelectedSection1: [
        { key: "region", label: "Khu v???c" },
        { key: "oilAllowance", label: "Ph??? c???p x??ng", tdClass: 'text-right' },
        { key: "overtimeAllowance", label: "Ph??? c???p ngo??i gi???", tdClass: 'text-right' },
        {
          key: "delete",
          label: "X??a",
          thClass: "text-center",
        },
      ],
      fieldsTableSection1: [
        { key: "region", label: "Khu v???c" },
        { key: "amount", label: "S??? ti???n ph??? c???p", tdClass: "text-right" },
        {
          key: "isSelected",
          label: "Ch???n",
          thClass: "text-center",
        },
      ],
      dataTableSection1: [
        {
          region: "TPHCM",
          oilAllowance: '500.000',
          overtimeAllowance: '100.000',
        },
        {
          region: "Long An",
          oilAllowance: '400.000',
          overtimeAllowance: '200.000',
        },
        {
          region: "B??nh Ph?????c",
          oilAllowance: '100.000',
          overtimeAllowance: '100.000',
        },
        {
          region: "B??nh D????ng",
          oilAllowance: '200.000',
          overtimeAllowance: '200.000',
        },
      ],
      fieldsSelectedSection2: [
        { key: "region", label: "Khu v???c" },
        { key: "amount", label: "S??? ti???n ph??? c???p", tdClass: "text-right" },
        {
          key: "delete",
          label: "X??a",
          thClass: "text-center",
        },
      ],
      fieldsTableSection2: [
        { key: "region", label: "Khu v???c" },
        { key: "amount", label: "S??? ti???n ph??? c???p", tdClass: "text-right" },
        {
          key: "isSelected",
          label: "Ch???n",
          thClass: "text-center",
        },
      ],
      dataTableSection2: [
        {
          region: "TPHCM",
          amount: "500.000",
        },
        {
          region: "Long An",
          amount: "100.000",
        },
      ],
      dataTableModalSelect: [],
      fieldsTableModalSelect: [],
      selectedSection1: [],
      selectedSection2: [],
      modalSelectName: "",
      modalSelectTitle: "",
      perPageTable3: 10,
      currentPageTable3: 1,
      titleOption: [
        {
          id: 0,
          label: "?????nh m???c  Ph??? c???p c???u xe b??n ngo??i",
        },
      ],
      modalAddName: '',
      sectionModalAdd: '',
      formModalAdd: null,
      tempData: pcCuuXeBenNgoai
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  created() {
    this.selectedSection1 = this.dataTableSection1;
    this.selectedSection2 = this.dataTableSection2;
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
    showModalSelect(name) {
      this.modalSelectName = `modal-select-${name}`;
      if (name == "section1") {
        this.modalSelectTitle = "Danh m???c khu v???c";

        if (this.dataTableSection1?.length) {
          const arr = [];
          this.dataTableSection1.forEach((item) => {
            // const obj = this.selectedVehicle.find(vehicle => vehicle.licensePlates == item.licensePlates)
            // arr.push({
            //   ...item,
            //   isSelected: obj ? true : false
            // })
            arr.push({
              ...item,
              isSelected: false,
            });
          });
          this.dataTableModalSelect = arr;
          this.fieldsTableModalSelect = this.fieldsTableSection1;
        }
      } else if (name == "section2") {
        this.modalSelectTitle = "Danh m???c khu v???c";

        if (this.dataTableSection2?.length) {
          const arr = [];
          this.dataTableSection2.forEach((item) => {
            // const obj = this.selectedRoute.find(route => route.ID == item.ID)
            // arr.push({
            //   ...item,
            //   isSelected: obj ? true : false
            // })
            arr.push({
              ...item,
              isSelected: false,
            });
          });
          this.dataTableModalSelect = arr;
          this.fieldsTableModalSelect = this.fieldsTableSection2;
        }
      }
      setTimeout(() => {
        this.$bvModal.show(this.modalSelectName);
      }, 300);
    },
    handleModalSelect() {},
    showModalAdd(name) {
      this.modalAddName = `modal-add-${name}`
      this.sectionModalAdd = name

      if(name == 'section1') {
        this.formModalAdd = {}
      }
      else if(name == 'section2') {
        this.formModalAdd = {}
      }

      setTimeout(() => {
        this.$bvModal.show(this.modalAddName);
      }, 300);
    },
    handleModalAdd() {
 
    }
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
<style lang="scss">
.help-vehicle-outside {
  th {
    padding: 0.5rem;
  }
  td {
    white-space: nowrap;
    vertical-align: middle;
    padding: 0.5rem;
  }
}
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
.btn-show-modal-select {
  padding: 0.25rem 0.7rem;
  border-radius: 0;
}
.style-special {
  font-weight: 700;
  font-size: 14px;
}
.body-modal-add {
  .custom-select {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
    height: 36px;
  }
}
</style>
