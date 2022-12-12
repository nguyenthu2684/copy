<template>
  <div>
    <b-row>
      <b-colxx md="12">
        <h3 class="text-center font-weight-bold">
          <template v-if="dataModal.LocationName">
            {{ dataModal.LocationName.toUpperCase() }}
          </template>
          <template v-else>
            {{ dataModal.StationName.toUpperCase() }}
          </template>
        </h3>
        <p class="text-center">
          <span class="font-italic">{{ $t("other.address") + ": " }}</span>
          <span class="font-weight-bold">
            {{ dataModal.StationAddress }}
          </span>
          <span>/</span>
          <span class="font-italic">
            {{ $t("map.lng") + " - " + $t("map.lat") + ": " }}
          </span>
          <span class="font-weight-bold">
            <template v-if="!dataModal.StationLat && !dataModal.StationLong">
              {{ dataModal.Long + ", " + dataModal.Lat }}
            </template>
            <template v-else>
              {{ dataModal.StationLong + ", " + dataModal.StationLat }}
            </template>
          </span>
          <span>/</span>
          <span class="font-italic">
            {{ $t("other.update-time") + ": " }}
          </span>
          <span class="text-danger font-weight-bold">
            {{ dataModal.UpdateTime }}
          </span>
        </p>
      </b-colxx>
      <b-colxx lg="3" md="12"></b-colxx>
      <b-colxx lg="6" md="12">
        <b-alert
          :class="['text-center', 'led-' + dataModal.StatusColor]"
          style="color: white; letter-spacing: 4px"
          show
        >
          <strong v-if="dataModal.StatusName">
            {{ dataModal.StatusName.toUpperCase() }}
          </strong>
        </b-alert>
      </b-colxx>
      <b-colxx lg="3" md="12"></b-colxx>
      <b-col lg="12">
        <b-tabs content-class="mt-1" fill>
          <b-tab title="THÔNG TIN CHI TIẾT" active style="height: 60vh">
            <b-row class="mb-2 mt-2">
              <b-col class="text-muted text-left">
                <strong>GIÁM SÁT THIẾT BỊ</strong>
              </b-col>
              <b-col
                class="text-right d-flex"
                style="
                  flex-wrap: nowrap;
                  white-space: nowrap;
                  width: 100%;
                  justify-content: flex-end;
                "
              >
                <template v-for="des in statusColors">
                  <strong :key="des.id" class="mr-2">
                    <i :style="'color:' + des.color" class="fas fa-circle"></i>
                    {{ des.label }}
                  </strong>
                </template>
              </b-col>
              <!-- <b-col
                class="text-right text-danger"
                style="cursor: pointer; margin-right: -12px"
              >
                <strong @click="showModalDetail"><u>XEM CHI TIẾT</u></strong>
              </b-col> -->
            </b-row>
            <b-row>
              <b-col lg="4">
                <b-img
                  v-img
                  :src="dataModal.LinkAvatar"
                  style="
                    width: 100% !important;
                    height: 467px;
                    background: #f3f3f3;
                  "
                />
              </b-col>
              <b-col lg="3">
                <b-row>
                  <b-col lg="12" class="mb-2" style="background: #d7d7d7">
                    <div class="d-flex" style="height: 60px; color: #2a93d5">
                      <b-img
                        :src="require('@/assets/img/fire-icon/tongphong.png')"
                        style="height: 60px"
                      ></b-img>
                      <div>
                        <strong
                          style="
                            font-size: 22px;
                            font-weight: 700;
                            color: black;
                          "
                        >
                          {{ dataModal.RoomCount }}
                        </strong>
                        <div
                          class="text-small font-weight-bold"
                          style="color: #7a7777"
                        >
                          {{ $t("fire.installation-area").toUpperCase() }}
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="12" class="mb-2" style="background: #d7d7d7">
                    <div class="d-flex" style="height: 60px; color: #2a93d5">
                      <b-img
                        :src="
                          require('@/assets/img/fire-icon/thietbitaicho.png')
                        "
                        style="height: 60px"
                      ></b-img>
                      <div>
                        <strong
                          style="
                            font-size: 22px;
                            font-weight: 700;
                            color: black;
                          "
                        >
                          {{ dataModal.StationCount }}
                        </strong>
                        <div
                          class="text-small font-weight-bold"
                          style="color: #7a7777"
                        >
                          TỦ QUẢN LÍ THIẾT BỊ
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="12" class="mb-2" style="background: #d7d7d7">
                    <div class="d-flex" style="height: 60px; color: #2a93d5">
                      <b-img
                        :src="
                          require('@/assets/img/fire-icon/thietbitaicho.png')
                        "
                        style="height: 60px"
                      ></b-img>
                      <div>
                        <strong
                          style="
                            font-size: 22px;
                            font-weight: 700;
                            color: black;
                          "
                        >
                          {{ dataModal.SpeakerCount }}
                        </strong>
                        <div
                          class="text-small font-weight-bold"
                          style="color: #7a7777"
                        >
                          TỦ BÁO CHÁY
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="12" class="mb-2" style="background: #d7d7d7">
                    <div class="d-flex" style="height: 60px; color: #2a93d5">
                      <b-img
                        :src="require('@/assets/img/fire-icon/thietbiloi.png')"
                        style="height: 60px"
                      ></b-img>
                      <div>
                        <strong
                          style="
                            font-size: 22px;
                            font-weight: 700;
                            color: black;
                          "
                        >
                          {{ dataModal.SpeakerFireErrorCount }}
                        </strong>
                        <div
                          class="text-small font-weight-bold"
                          style="color: #7a7777"
                        >
                          TỦ BÁO CHÁY LỖI
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="12" class="mb-2" style="background: #d7d7d7">
                    <div class="d-flex" style="height: 60px; color: #2a93d5">
                      <b-img
                        :src="require('@/assets/img/fire-icon/tongthietbi.png')"
                        style="height: 60px"
                      ></b-img>
                      <div>
                        <strong
                          style="
                            font-size: 22px;
                            font-weight: 700;
                            color: black;
                          "
                        >
                          {{ dataModal.SensorCount }}
                        </strong>
                        <div
                          class="text-small font-weight-bold"
                          style="
                            color: #7a7777;
                            width: 100%;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                          "
                        >
                          THIẾT BỊ BÁO CHÁY
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="12" class="mb-2" style="background: #d7d7d7">
                    <div class="d-flex" style="height: 60px; color: #2a93d5">
                      <b-img
                        :src="require('@/assets/img/fire-icon/thietbiloi.png')"
                        style="height: 60px"
                      ></b-img>
                      <div>
                        <strong
                          style="
                            font-size: 22px;
                            font-weight: 700;
                            color: black;
                          "
                        >
                          {{ dataModal.FireErrorCount }}
                        </strong>
                        <div
                          class="text-small font-weight-bold"
                          style="color: #7a7777"
                        >
                          THIẾT BỊ BÁO CHÁY LỖI
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col lg="12" class="mb-2" style="background: #d7d7d7">
                    <div class="d-flex" style="height: 60px; color: #2a93d5">
                      <b-img
                        :src="
                          require('@/assets/img/fire-icon/thietbibaochay.png')
                        "
                        style="height: 60px"
                      ></b-img>
                      <div>
                        <strong
                          style="
                            font-size: 22px;
                            font-weight: 700;
                            color: black;
                          "
                        >
                          {{ dataModal.FireStatusCount }}
                        </strong>
                        <div
                          class="text-small font-weight-bold"
                          style="color: #7a7777"
                        >
                          ĐANG CẢNH BÁO CHÁY
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="5">
                <b-row>
                  <b-col lg="12">
                    <vue-perfect-scrollbar
                      class="scroll dashboard-list-with-thumbs"
                      :settings="{
                        suppressScrollX: true,
                        wheelPropagation: false,
                      }"
                      style="
                        height: 467px;
                        background: #d7d7d7;
                        padding-right: 5px;
                      "
                    >
                      <content-room
                        :dataNodes="dataNodes"
                        :speakers="speakers"
                        @return-room="handleRoomClick"
                      ></content-room>
                    </vue-perfect-scrollbar>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- <hr /> -->
          </b-tab>
          <b-tab title="BÁO CÁO" style="height: 60vh">
            <b-row class="mt-4">
              <b-colxx lg="4">
                <b-form-group :label="$t('other.view') + ':'">
                  <b-form-select
                    v-model="typed"
                    :options="options"
                    plain
                    @change="changeOption(typed, from, to)"
                  />
                </b-form-group>
              </b-colxx>
              <b-colxx lg="4">
                <b-form-group :label="$t('other.from-date') + ':'">
                  <b-form-datepicker
                    :locale="locale"
                    v-model="from"
                    @input="changeOption(typed, from, to)"
                  ></b-form-datepicker>
                </b-form-group>
              </b-colxx>
              <b-colxx lg="4">
                <b-form-group :label="$t('other.to-date') + ':'">
                  <b-form-datepicker
                    :locale="locale"
                    v-model="to"
                    plain
                    @input="changeOption(typed, from, to)"
                  ></b-form-datepicker>
                </b-form-group>
              </b-colxx>
            </b-row>
            <b-row>
              <b-col lg="12">
                <dynamic-table
                  :data-table="dataTable"
                  :field-table="fieldsTable"
                ></dynamic-table>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="HÌNH ẢNH LẮP ĐẶT" style="height: 60vh">
            <b-row v-if="images && images.length > 0">
              <template v-for="(img, index) in images">
                <b-col :key="index" lg="4" class="p-2 pos-parent">
                  <b-img
                    v-img
                    class="h-100 w-100"
                    :src="img.ImageLink"
                    alt="image"
                  ></b-img>
                  <span class="pos-chilren-title">
                    <b>{{ img.LocationName }}</b>
                  </span>
                </b-col>
              </template>
            </b-row>
            <div v-else class="text-center text-muted mt-4">
              {{ $t("data.non-data") }}
            </div>
          </b-tab>
          <!-- <b-tab title="THIẾT BỊ KHÁC">
            <div class="mt-4">
              <template v-for="(sensor, i) in dataModal.Speakers">
                <div
                  :key="i"
                  class="d-flex justify-content-between bg-light p-2 mb-1"
                >
                  <span class="text-muted w-25">
                    Vị trí lắp đặt:
                    <b>{{ sensor.LocationName }}</b>
                  </span>
                  <span class="text-muted w-25">
                    Thiết bị:
                    <b>{{ sensor.SpeakerName }}</b>
                  </span>
                  <span class="text-muted w-25">
                    Thời gian:
                    <b>{{ convertDateTime(sensor.UpdateTime) }}</b>
                  </span>
                  <span class="text-muted w-25">
                    <b>
                      <i
                        :style="'color:' + sensor.StatusColor"
                        class="fas fa-circle mr-2"
                      ></i>
                      {{ sensor.StatusName }}
                    </b>
                  </span>
                </div>
              </template>
            </div>
          </b-tab> -->
        </b-tabs>
      </b-col>
    </b-row>
    <b-modal
      id="modal-detail-room"
      ref="modal-detail-room"
      :title="titleForm"
      @hidden="resetModalRoom"
      v-if="dataForm"
      scrollable
      class="text-center"
      size="lg"
      centered
      hide-footer
    >
      <b-tabs content-class="mt-1" fill>
        <b-tab title="THÔNG TIN THIẾT BỊ" active style="height: 100vh">
          <b-row>
            <b-col lg="12">
              <div>
                <b>DANH SÁCH THIẾT BỊ</b>
                <template v-for="(sensor, i) in dataForm.ListSensor">
                  <div
                    :key="i"
                    class="d-flex justify-content-between bg-light p-2 mb-1"
                  >
                    <span class="text-muted w-50">
                      Vị trí lắp đặt:
                      <b>{{ sensor.NodeName }}</b>
                    </span>
                    <span class="text-muted w-25">
                      Pin:
                      <b>{{ sensor.Pin }} %</b>
                    </span>
                    <span class="text-muted w-25">
                      <b>
                        <i
                          :style="'color:' + sensor.StatusColor"
                          class="fas fa-circle mr-2"
                        ></i>
                        {{ sensor.StatusName }}
                      </b>
                    </span>
                  </div>
                </template>
              </div>
            </b-col>
            <b-col lg="12" class="mt-2">
              <div>
                <div class="d-flex justify-content-between">
                  <b style="margin-top: 4px">BÁO CÁO LỊCH SỬ</b>
                  <b-form-radio-group
                    id="radio-type-fire"
                    v-model="typed"
                    :options="options"
                    name="radio-options-type-fire"
                  />
                </div>
                <!-- <custom-table
                  ref="tableForm"
                  :data-table="items"
                  :field-table="fields"
                  :access-write="objectData.accessWrite"
                  :select-mode="selectMode"
                  :rowPage="10"
                  :bordered="true"
                  :colSearch="7"
                ></custom-table> -->
              </div>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="HÌNH ẢNH LẮP ĐẶT" style="height: 100vh">
          <b-row v-if="imagesRoom && imagesRoom.length > 0">
            <template v-for="(img, index) in imagesRoom">
              <b-col :key="index" lg="4" class="p-2 pos-parent">
                <b-img
                  v-img
                  class="h-100 w-100"
                  :src="img.ImageLink"
                  alt="image"
                ></b-img>
                <span class="pos-chilren-title">
                  <b>{{ img.NodeName }}</b>
                </span>
              </b-col>
            </template>
          </b-row>
          <div v-else class="text-center text-muted mt-4">
            {{ $t("data.non-data") }}
          </div>
        </b-tab>
      </b-tabs>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import fireAPI from "@/api/modules/fireAPI";
import systemAPI from "@/api/modules/systemAPI";
import DynamicTable from "@/components/Table/DynamicTable";
import ContentRoom from "@/views/app/dashboards/fire/component/ContentRoom";

String.prototype.allReplace = function (obj) {
  let retStr = this;
  for (let i in obj) {
    retStr = retStr.replace(new RegExp(i, "g"), obj[i]);
  }
  return retStr;
};

export default {
  name: "fire-popup",
  components: {
    "dynamic-table": DynamicTable,
    "content-room": ContentRoom,
  },
  props: ["dataMapNow", "dataParent", "objectData"],
  data() {
    return {
      dataModal: this.dataParent ?? null,
      statusColors: [],
      images: [],
      imagesRoom: [],
      listImage: null,
      dataForm: null,
      titleForm: "",
      selectMode: "single",
      typed: "FIRE",
      items: [],
      itemsOtherSetting: [],
      fields: [
        {
          key: "NodeName",
          label: "Vị trí lắp đặt",
          tdClass: "text-left",
        },
        {
          key: "StartTime",
          label: "Bắt đầu",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
        {
          key: "FinishTime",
          label: "Kết thúc",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
      fieldsOtherSetting: [
        {
          key: "NodeName",
          label: "Tên tủ",
          tdClass: "text-left",
        },
        {
          key: "StartTime",
          label: "Trạng thái kích hoạt",
          tdClass: "text-center",
        },
      ],
      options: [
        { text: "Báo cháy", value: "FIRE" },
        { text: "Báo lỗi", value: "ERROR" },
      ],
      dataTable: [],
      fieldsTable: null,
      columnShowTable: null,
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
      from: handling.convertDateToPicker(handling.getDateSubtract(30)),
      to: handling.convertDateToPicker(handling.getDateNow()),
    };
  },
  computed: {
    data() {
      let result = [];
      if (this.dataModal && this.dataModal.Nodes?.length > 0) {
        this.dataModal.Nodes.forEach((e) => {
          if (e.Level == 1) {
            let floor = { ...e };
            floor.chilrens = this.dataModal.Nodes.filter(
              (n) => n.ParentID == floor.ID
            );
            result.push(floor);
          }
        });
      }
      return result;
    },
    speakers() {
      let arr = [];
      this.dataModal.Nodes.map((room) => {
        if (room.Speakers?.length > 0) {
          room.Speakers.forEach((p) => {
            arr.push(p);
          });
        }
      });
      return arr;
    },
    dataNodes() {
      let result = [];
      if (this.dataModal && this.dataModal.Nodes?.length > 0) {
        this.dataModal.Nodes.forEach((e) => {
          if (e.Level == 1) {
            let floor = { ...e };
            floor.chilrens = this.dataModal.Nodes.filter(
              (n) => n.ParentID == floor.ID
            );
            result.push(floor);
          }
        });
      }
      return result;
    },
  },
  watch: {
    dataParent(val) {
      this.dataModal = { ...val };
    },
    dataMapNow(arr) {
      arr.forEach((modul) => {
        if (
          modul.DataTypeName.toUpperCase() ==
          this.dataParent.moduleType.toUpperCase()
        ) {
          modul.DataProperties.forEach((item) => {
            if (item.ID == this.dataParent.ID) {
              this.dataModal = { ...this.dataParent, ...item };
            }
          });
        }
      });
    },
    typed() {
      if (this.dataForm) {
        if (this.typed == "FIRE") {
          this.items = this.dataForm.ListFireHistories;
        } else {
          this.items = this.dataForm.ListErrorHistories;
        }
      } else {
        this.items = [];
      }
    },
    dataTable() {
      this.getColumn("ReportFires");
    },
  },
  async created() {
    await this.getData();
    await this.getColumn("ReportFires");
    await this.getDataReport(this.typed, this.from, this.to);
  },
  mounted() {
    this.getImages();
  },
  methods: {
    convertDate(string) {
      return handling.convertDate(string);
    },
    showModalDetail() {
      setTimeout(() => {
        this.$bvModal.show("modal-detail");
      }, 500);
    },
    getColumn(string) {
      let body = {
        ObjectName: string,
      };

      systemAPI
        .tableFields(body)
        .then((val) => {
          this.columnShowTable = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeOption(typed, from, to) {
      this.getDataReport(typed, from, to);
    },
    getDataReport(typed, from, to) {
      let body = {
        ErrorType: typed,
        LocationID: this.dataModal.ID,
        FromDate: from.toString().allReplace({ "-": "/" }),
        ToDate: to.toString().allReplace({ "-": "/" }),
      };
      fireAPI
        .getReportTotal(body)
        .then((val) => {
          let keys =
            val.status && val.data.length > 0 ? Object.keys(val.data[0]) : [];
          this.fieldsTable = handling.mergeTableAndData(
            keys,
            this.columnShowTable
          );
          this.dataTable = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSettingOther() {
      setTimeout(() => {
        this.$bvModal.show("modal-setting-other");
      }, 500);
    },
    handleRoomClick(room) {
      let body = {
        LocationID: room.ID,
      };
      fireAPI
        .getRoomByID(body)
        .then((val) => {
          this.dataForm = val.status ? val.data : null;
          this.typed = "FIRE";
          this.items = this.dataForm.ListFireHistories;
          this.imagesRoom = this.dataForm.ListImages;
        })
        .catch((err) => console.log(err));
      this.titleForm = "THÔNG TIN PHÒNG " + room.StationName.toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("modal-detail-room");
      }, 500);
    },
    resetModalRoom() {
      this.dataForm = null;
    },
    getImages() {
      if (this.dataModal && this.dataModal.Images?.length > 0) {
        return (this.images = this.dataModal.Images);
      } else {
        return (this.images = []);
      }
    },
    getData() {
      fireAPI
        .getStatusColors()
        .then((val) => {
          let result = val.status ? val.data : [];
          this.statusColors = [];
          result.forEach((e) => {
            let obj = {
              id: e.StatusID,
              color: e.StatusColor,
              label: e.StatusName,
            };
            this.statusColors.push(obj);
          });
        })
        .catch((err) => console.log(err));
    },
    convertDateTime(string) {
      let date = moment(string, "YYYY-MM-DD'T'HH:mm:ss");
      return date.format("HH:mm:ss DD/MM/YYYY");
    },
  },
};
</script>

<style scoped>
.pos-parent {
  position: relative;
  height: 200px;
  cursor: pointer;
}
.pos-chilren-title {
  position: absolute;
  color: white;
  background: black;
  z-index: 2;
  right: 5px;
  bottom: 10px;
  padding: 5px;
}
.floors {
  height: 30px;
  padding: 5px;
  border: 1px solid grey;
  color: white;
}
.rooms {
  padding: 5px;
  border: 1px solid gray;
  margin-right: 10px;
  color: white;
  cursor: pointer;
}
.led-red {
  background-color: #f00;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}

@-webkit-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-moz-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-ms-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@-o-keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

@keyframes blinkRed {
  from {
    background-color: #f00;
  }
  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }
  to {
    background-color: #f00;
  }
}

.led-green {
  background-color: rgb(60, 250, 50);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px,
    rgb(60, 250, 50) 0 2px 12px;
}

.led-blue {
  background-color: rgb(0, 225, 255);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #007272 0 -1px 9px,
    rgb(0, 255, 255) 0 2px 12px;
}

.led-gray {
  background-color: rgb(200, 200, 200);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #afafaf 0 -1px 9px,
    rgb(200, 200, 200) 0 2px 12px;
}

.led-orange {
  background-color: rgb(255, 200, 0);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #705400 0 -1px 9px,
    rgb(255, 200, 0) 0 2px 12px;
}
.card-custom-map-mini .card-body {
  padding: 0;
}

.border-map-mini {
  width: 100%;
  height: 320px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.border-map-mini .map-control {
  height: 240px;
  /*padding: .5rem;*/
}

.border-map-mini .list-station-control {
  height: 104px;
  padding: 1rem;
}

.info-station {
  /* height: 350px; */
}

.info-station .card-body {
  padding: 0;
}

.info-station .card-body .custom-title-control {
  font-size: 15px;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f6f6f6;
  width: 100%;
  font-weight: bold;
}

.custom-list-collapse {
  list-style: none;
  margin: 0;
  padding: 0;
}

.custom-list-collapse-label {
  display: block;
  cursor: pointer;
  padding: 0.75rem;
  border-bottom: none;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
  margin-bottom: 0;
}

.custom-list-collapse-label:hover {
  background: #d7d7d7;
}

.custom-list-collapse-label.last {
  /*border-bottom: 1px solid #fff;*/
}

input[type="checkbox"] {
  position: absolute;
  left: -9999px;
}

input[type="checkbox"] ~ .cabinet-control {
  height: 0;
  transform: scaleY(0);
}

input[type="checkbox"]:checked ~ .cabinet-control {
  height: 100%;
  transform-origin: top;
  transition: transform 0.2s ease-out;
  transform: scaleY(1);
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}

input[type="checkbox"]:checked + .custom-list-collapse-label {
  background: #d7d7d7;
  /*border-bottom: 1px solid #fff;*/
}

.ps-container {
  margin-right: -5px;
  padding-right: 5px;
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
  top: 100px;
  left: 0;
  width: 100%;
}

#dropConnect {
  background-color: #e7f2e8;
  border: 1px solid #88cf8f;
}

#dropFire {
  background-color: #fcdfe0;
  border: 1px solid #db888b;
}
#dropDisconnect {
  background-color: #f0eaea;
  border: 1px solid #909090;
}
#dropLowPin {
  background-color: #f8d7a5;
  border: 1px solid #f89500;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.show-list-custom {
  display: block;
}

.none-click {
  pointer-events: none;
}

.button-wrapper .custom-type-load-label {
  font-size: 10px;
  padding: 5px 10px;
}

.button-wrapper .custom-type-load-li {
  height: 26px;
}

.button-wrapper .custom-type-load-li:first-child {
  margin-left: 0;
}

.button-wrapper .custom-type-load-li {
  margin-left: 20px;
}
.activeFireBG {
  background-color: rgba(254, 47, 55, 0.1);
}
</style>
<style scoped>
#fullscreen-wallpaper {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

#fullscreen-wallpaper .image-wallpaper {
  width: 100%;
  height: 100%;
}

#fullscreen-wallpaper .button-close-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

#fullscreen-wallpaper .button-close-wallpaper .btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0.6rem;
}

#fullscreen-wallpaper .button-close-wallpaper .btn i {
  font-size: 20px;
}
</style>
