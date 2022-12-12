<template>
  <div>
    <b-card
      v-b-toggle="`id-${data.ID}`"
      :class="isFocus ? 'bg-focus' : 'bg-focus' + ' list-item'"
      no-body
      :id="'modal-detail-' + data.ID"
      @click="changeSelected(data.ID)"
    >
      <b-card-body style="padding: 1rem">
        <b-row>
          <b-col lg="4" md="6" class="text-left pt-2">
            <b class="list-item-heading mb-1 truncate text-small">
              {{ data.LocationName.toUpperCase() }}
              <span v-if="data.IsClose" class="text-danger">
                <!-- ({{ data.CloseDescription.toUpperCase() }}) -->
              </span>
              <span v-else class="text-success">
                <!-- ({{ data.CloseDescription.toUpperCase() }}) -->
              </span>
            </b>
          </b-col>
          <b-col lg="4" md="6" class="text-center pt-1">
            <p class="mb-1 text-small" style="color: #7a7777">
              <b>{{ data.StationAddress }}</b>
            </p>
            <span class="text-muted">
              {{ convertDateTime(data.UpdateTime) }}
            </span>
          </b-col>
          <b-col lg="4" md="12" class="text-right pt-2">
            <b-badge
              pill
              :style="
                'font-size: 90%; color: black; border: 1px solid #d3d0d0f7;background-color:' +
                data.StatusColor.toLowerCase() +
                '!important;'
              "
            >
              <span :style="'color:white'">
                {{ data.StatusName }}
              </span>
            </b-badge>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-collapse visible :id="`id-${data.ID}`">
      <b-card style="box-shadow: none !important" class="card-content">
        <b-row class="mb-2">
          <b-col class="text-muted text-left">
            <strong>GIÁM SÁT THIẾT BỊ</strong>
          </b-col>
          <b-col
            class="text-center d-flex"
            style="flex-wrap: nowrap; white-space: nowrap"
          >
            <template v-for="des in statusColors">
              <strong :key="des.id" class="mr-2">
                <i :style="'color:' + des.color" class="fas fa-circle"></i>
                {{ des.label }}
              </strong>
            </template>
          </b-col>
          <b-col
            class="text-right text-danger"
            style="cursor: pointer; margin-right: -12px"
          >
            <strong @click="showModalDetail"><u>XEM CHI TIẾT</u></strong>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <b-img
              v-img
              :src="data.LinkAvatar"
              style="width: 100% !important; height: 467px; background: #f3f3f3"
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
                      style="font-size: 22px; font-weight: 700; color: black"
                    >
                      {{ data.RoomCount }}
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
                    :src="require('@/assets/img/fire-icon/thietbitaicho.png')"
                    style="height: 60px"
                  ></b-img>
                  <div>
                    <strong
                      style="font-size: 22px; font-weight: 700; color: black"
                    >
                      {{ data.StationCount }}
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
                    :src="require('@/assets/img/fire-icon/thietbitaicho.png')"
                    style="height: 60px"
                  ></b-img>
                  <div>
                    <strong
                      style="font-size: 22px; font-weight: 700; color: black"
                    >
                      {{ data.SpeakerCount }}
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
                      style="font-size: 22px; font-weight: 700; color: black"
                    >
                      {{ data.SpeakerFireErrorCount }}
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
                      style="font-size: 22px; font-weight: 700; color: black"
                    >
                      {{ data.SensorCount }}
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
                      style="font-size: 22px; font-weight: 700; color: black"
                    >
                      {{ data.FireErrorCount }}
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
                    :src="require('@/assets/img/fire-icon/thietbibaochay.png')"
                    style="height: 60px"
                  ></b-img>
                  <div>
                    <strong
                      style="font-size: 22px; font-weight: 700; color: black"
                    >
                      {{ data.FireStatusCount }}
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
                  style="height: 467px; background: #d7d7d7; padding-right: 5px"
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
      </b-card>
    </b-collapse>
    <b-modal
      id="modal-detail-room"
      ref="modal-detail-room"
      :title="titleForm"
      @hidden="resetModalRoom"
      v-if="dataForm"
      scrollable
      class="text-center modal-detail-room"
      size="lg"
      hide-footer
      centered
    >
      <b-tabs content-class="mt-1" fill>
        <b-tab title="THÔNG TIN THIẾT BỊ" active style="height: 100vh">
          <b-row>
            <b-col lg="12">
              <div class="mt-2">
                <b>DANH SÁCH THIẾT BỊ</b>
                <template v-for="(sensor, i) in dataForm.ListSensor">
                  <div
                    :key="i"
                    class="d-flex justify-content-between p-2 mb-1"
                    style="background: #f1f1f1 !important"
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
                <dynamic-table
                  :data-table="items"
                  :field-table="fields"
                ></dynamic-table>
              </div>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="HÌNH ẢNH LẮP ĐẶT" style="height: 100vh">
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
                  <b>{{ img.NodeName }}</b>
                </span>
              </b-col>
            </template>
          </b-row>
          <div v-else class="text-center text-muted mt-4">
            {{ $t("panel.non-data") }}
          </div>
        </b-tab>
      </b-tabs>
    </b-modal>
    <b-modal
      :id="idModal"
      :name="idModal"
      v-if="data"
      hide-header
      size="xl"
      ok-only
      centered
      scrollable
      hide-footer
      @hide="resetModal"
    >
      <fire-popup
        :data-parent="data"
        :object-data="objectData"
        :module="'dashboard'"
      ></fire-popup>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import fireAPI from "@/api/modules/fireAPI";
import DynamicTables from "@/components/Table/DynamicTable";
import FirePopup from "@/views/app/map/popup-modals/FireDetail.vue";
import ContentRoom from "./ContentRoom.vue";

export default {
  async created() {
    await this.getColorStatus();
  },
  props: [
    "data",
    "selected-data",
    "accessWrite",
    "statusEdit",
    "handleDataModal",
    "objectData",
  ],
  components: {
    "dynamic-table": DynamicTables,
    "fire-popup": FirePopup,
    "content-room": ContentRoom,
  },
  data() {
    return {
      isFocus: false,
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer: 500,
      selectMode: "single",
      itemsTable: null,
      keysTable: null,
      statusColors: [],
      images: [],
      listImage: null,
      dataForm: null,
      titleForm: "",
      typed: "FIRE",
      items: [],
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
      options: [
        { text: "Báo cháy", value: "FIRE" },
        { text: "Báo lỗi", value: "ERROR" },
      ],
      images: [],
      idModal: null,
      dataModal: null,
    };
  },
  watch: {
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
  },
  computed: {
    speakers() {
      let arr = [];
      this.data.Nodes.map((room) => {
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
      if (this.data && this.data.Nodes?.length > 0) {
        this.data.Nodes.forEach((e) => {
          if (e.Level == 1) {
            let floor = { ...e };
            floor.chilrens = this.data.Nodes.filter(
              (n) => n.ParentID == floor.ID
            );
            result.push(floor);
          }
        });
      }
      return result;
    },
  },
  methods: {
    resetModal() {
      this.dataModal = null;
      this.idModal = null;
    },
    showModalDetail() {
      this.dataModal = this.data;
      this.idModal = `modal-${this.data.ID}`;
      setTimeout(() => {
        this.$bvModal.show(this.idModal);
      }, 1000);
    },
    resetModalRoom() {
      this.dataForm = null;
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
          this.images = this.dataForm.ListImages;
        })
        .catch((err) => console.log(err));
      this.titleForm = "THÔNG TIN PHÒNG " + room.StationName.toUpperCase();
      setTimeout(() => {
        this.$bvModal.show("modal-detail-room");
      }, 500);
    },
    getColorStatus() {
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
    handleClick(data) {
      this.handleDataModal([data]);
    },
    handleStatus(data) {
      this.$bvModal
        .msgBoxConfirm(
          !data.IsClose
            ? this.$t("dashboards.want-to-close-order") + "?"
            : this.$t("dashboards.want-to-open-order") + "?",
          {
            title: this.$t("modal.change").toUpperCase(),
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
            this.statusEdit([data]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeSelected(value) {
      this.isFocus = !this.isFocus;
      if (this.isFocus) {
        this.selectedData(value);
      } else {
        this.selectedData(null);
      }
    },
    convertDate(string) {
      return handling.convertDate(string);
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
.bg-focus {
  background: #d3d0d0f7;
}
.crossbar {
  background: #f3f3f3;
  min-height: 30px;
}
/* .bg-color-khaki {
  background: khaki !important;
}
.bg-color-green {
  background: lightgreen !important;
} */
.list-item:hover {
  cursor: pointer;
  background: #c7c2c2;
}
</style>
<style>
.card-content .card-body {
  padding-top: 10px !important;
}
.modal .modal-body {
  padding: 10px 15px !important;
}
</style>
