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
                <!-- $t chuyển đổi anh việt -->
                &emsp;{{ $t("pages.add") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="editModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-edit"></i>
                &emsp;{{ $t("pages.edit") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="deleteModal(selectedItems)"
                v-if="
                  selectedItems.length === 1 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-trash-alt"></i>
                &emsp;{{ $t("pages.delete") }}
              </b-dropdown-item>
              <b-dropdown-item
                @click="printExternalExcel('custom-table')"
                v-if="
                  items && items.length > 0 && objectData.accessWrite === true
                "
              >
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
              <b-dropdown-item v-else disabled>
                <i class="fad fa-file-excel"></i>
                &emsp; {{ $t("report.action.download-excel-page") }}
              </b-dropdown-item>
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
          <b-row class="rowSearch">
            <b-col cols="7">Tổng số: {{ countData() }} kết quả</b-col>
            <b-col cols="5">
              <b-form-group
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    :placeholder="search_title"
                    style="
                      border-bottom-left-radius: 20px;
                      border-top-left-radius: 20px;
                      font-size: 12px;
                      height: 31px;
                      padding-left: 1rem;
                    "
                  ></b-form-input>
                  <!-- Tim theo -->
                  <b-input-group-append>
                    <b-dropdown
                      :text="$t('cards.find-text')"
                      right
                      variant="primary"
                      size="sm"
                      no-caret
                      style="height: 31px"
                    >
                      <b-form-checkbox-group
                        v-model="filterOn"
                        class="ml-3 mt-1 mr-3 mb-1"
                        style="width: 160px"
                      >
                        <template v-for="(item, key) in fields">
                          <b-form-checkbox :value="item.key" :key="key">
                            <span class="text-small font-weight-bold">
                              {{ item.label }}
                            </span>
                          </b-form-checkbox>
                          <br />
                        </template>
                      </b-form-checkbox-group>
                    </b-dropdown>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-colxx xxs="12" class="mb-4">
              <b-table
                id="npl-table-basic-form"
                class="npl-table-basic-form border-bottom text-center"
                :items="items"
                :fields="fields"
                show-empty
                @row-selected="rowSelected"
                selectable
                :select-mode="'single'"
                :per-page="perPage"
                :current-page="currentPage"
                @filtered="onFiltered"
                :filter="filter"
                :filter-included-fields="filterOn"
                style="max-height: calc(100% - 15px); margin-top: -1px"
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
                    <b-form-checkbox switch size="sm" checked="true" />
                  </template>
                  <template v-else>
                    <b-form-checkbox switch size="sm" />
                  </template>
                </template>
              </b-table>
              <b-pagination
                aria-controls="npl-table-basic-form"
                align="center"
                :total-rows="fields.length"
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
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>
    </b-row>
    <bp-form
      :name-form="nameForm"
      :title-form="titleForm"
      :api-form="apiForm"
      :data-form="dataForm"
      :state-form="stateForm"
      :type-form="typeForm"
      :body-form-default="bodyFormDefault"
      @handle-submit="handleSubmit"
      :data-form-option="dataFormOptions"
      :lightLevelLamps="lightLevelLamps"
    ></bp-form>
    <b-modal
      id="modal-view"
      v-if="dataOptionLevelLight"
      hide-header
      size="lg"
      ok-only
      centered
      scrollable
    >
      <b-row>
        <b-table
          :fields="fieldOptionLevelLight"
          :items="dataOptionLevelLight"
          responsive
          bordered
          class="text-center"
        ></b-table>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import handling from "@/constants/handling";
import CustomTables from "@/components/Table/CustomTables";
import BluePearlForm from "@/components/Table/ModalBluePearl";
import { timer } from "@/constants/config";
import systemAPI from "@/api/modules/systemAPI";
import lightAPI from "@/api/modules/lightAPI";

export default {
  name: "LightLevels",
  components: {
    "custom-table": CustomTables,
    "bp-form": BluePearlForm,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
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
      dataFormOptions: {
        ScheduleLists: [],
      },
      fieldOptionLevelLight: [
        {
          key: "label",
          label: "Đèn",
        },
        {
          key: "value",
          label: "Mức (%)",
        },
      ],
      dataOptionLevelLight: null,
      lightLevelLamps: [
        {
          lamp: "",
          levelLight: "",
        },
      ],
    };
  },
  computed: {
    fields: function () {
      return handling.mergeTableAndData(this.objectKey, this.listColumnShow);
    },
    //chạy for tại thanh menu lấy route và vị trí n-1 của vị trí được chọn
    objectData: function () {
      for (let i = 0; i < this.menuRight.length; i++) {
        if (this.$route.fullPath === "/admin/function/blue-pearl") {
          return {
            // id của vị trí hiện tại được chọn api/menu/GetMenuById
            menuIDCurrent: this.menuRight[240].MenuID.toString(),
            // tên của vị trí được chọn hiện tại
            formName: this.menuRight[240].MenuName.toUpperCase(),
            // convertBitToBoolean nhận giá trị và trả giá trị dạng true fal (Truthy và Falsy)
            accessWrite: handling.convertBitToBoolean(
              this.menuRight[240].AccessWrite
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
  methods: {
    handleClick(item) {
      this.dataOptionLevelLight = [];
      item.forEach((ite) => {
        if (ite && ite.length > 1) {
          let obj = {
            label: ite[0],
            value: ite[1],
          };
          this.dataOptionLevelLight.push(obj);
        }
      });
      setTimeout(() => {
        this.$bvModal.show("modal-view");
      }, this.timer);
    },
    getOptionLightLevelListActive() {
      lightAPI
        .lightLevelListActive()
        .then((val) => {
          if (val.status) {
            if (val.data.length > 0) {
              this.dataFormOptions.ScheduleLists = [];
              for (let i = 0; i < val.data.length; i++) {
                let obj = {
                  text: val.data[i].LightName,
                  value: val.data[i].LightID,
                };
                this.dataFormOptions.ScheduleLists.push(obj);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    getKeyTable() {
      lightAPI
        .scheduleOptionList()
        .then((val) => {
          console.log("val", val);
          this.objectKey =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
        })
        .catch((err) => {
          console.log(err);
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
        .scheduleOptionList()
        .then((val) => {
          ///data

          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data)
            : [];
          this.items.forEach((ite) => {
            let arr = [];
            ite.ScheduleLists = ite.ScheduleLists.split(",");
            ite.ScheduleLists.forEach((ite2) => {
              ite2 = ite2.split(":");
              arr.push(ite2);
            });
            ite.ScheduleLists = arr;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    countData() {
      let count = 0;
      this.fields.forEach((e) => {
        count++;
      });
      return count;
    },
    statusEdit(data) {
      let body = {
        ID: data.ScheduleOptionID,
        IsActive: handling.convertBooleanToBit(data.IsActive),
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI.scheduleOptionChangeStatus(body);
      lightLevelLamps
        .then((val) => {
          if (val.status) {
            setTimeout(() => {
              this.getData();
              this.makeToast(
                "success",
                this.$t("toast.success").toUpperCase(),
                val.message
              );
            }, this.timer);
          } else {
            setTimeout(() => {
              this.getData();
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
    addModal() {
      this.dataForm = handling.showExtensionFormAdd(
        this.columnAdd,
        this.dataFormOptions
      );
      console.log("col", this.columnAdd);
      this.nameForm = "modal-add";
      this.titleForm = this.$t("form.title-add").toUpperCase();
      this.typeForm = "ADD";
      this.apiForm = "/api/CustomActions/Add";
      this.bodyFormDefault = {
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      this.lightLevelLamps = [
        {
          lamp: "",
          levelLight: "",
        },
      ];
      setTimeout(() => {
        this.$bvModal.show(this.nameForm);
      }, this.timer);
    },
    handleSubmit(val) {
      if (val.status) {
        if (!this.items || this.items.length === 0) {
          this.$bvModal.hide(this.nameForm);
          this.getColumn("ScheduleOptions");
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
    editModal(items) {
      this.getDataByID(items[0].ScheduleOptionID);
      setTimeout(() => {
        this.dataForm = handling.showExtensionFormEdit(this.dataByID);
        this.nameForm = "modal-edit";
        this.titleForm = this.$t("form.title-edit").toUpperCase();
        this.typeForm = "EDIT";
        this.apiForm = "/api/CustomActions/Edit";
        this.bodyFormDefault = {
          ID: items[0].ScheduleOptionID,
          MenuIDCurent: this.objectData.menuIDCurrent,
        };
        this.dataByID.ScheduleLists = this.dataByID.ScheduleLists.split(",");
        this.lightLevelLamps = [];
        this.dataByID.ScheduleLists.forEach((ite) => {
          let item = ite.split(":");
          if (item[0] && item[1]) {
            let obj = {
              lamp: item[0],
              levelLight: item[1],
            };
            this.lightLevelLamps.push(obj);
          }
        });
        setTimeout(() => {
          this.$bvModal.show(this.nameForm);
        }, this.timer);
      }, this.timer);
    },
    getDataByID(id) {
      let body = {
        ID: id,
      };
      lightAPI
        .scheduleOptionByID(body)
        .then((val) => {
          this.dataByID = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteModal(items) {
      this.$bvModal
        .msgBoxConfirm(
          this.$t("form.question") + items[0].ScheduleOptionName + "?",
          {
            title: this.$t("form.warning").toUpperCase(),
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: this.$t("form.yes"),
            cancelTitle: this.$t("form.no"),
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value === true) {
            this.handleSubmitDelete(items[0].ScheduleOptionID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmitDelete(id) {
      let body = {
        ID: id,
        MenuIDCurent: this.objectData.menuIDCurrent,
      };
      lightAPI
        .scheduleOptionRemove(body)
        .then((val) => {
          if (val.status) {
            if (this.items.length === 1) {
              this.getColumn("ScheduleOptions");
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
  },
  async created() {
    await this.getListMenuRight();
    await this.getColumn("ScheduleOptions");
    await this.getKeyTable();
    await this.getData();
    await this.getFormAddShow("ScheduleOptions");
    await this.getOptionLightLevelListActive();
    setTimeout(() => {
      this.countData();
    }, 500);
  },
  watch: {
    items() {
      this.getColumn("ScheduleOptions");
      this.getKeyTable();
    },
  },
};
</script>

<style scoped>
.chiTiet {
  background: rgb(0, 0, 139);
  color: aliceblue;
  padding: 5px 10px;
}
.rowSearch {
  margin-bottom: 15px;
}
</style>
