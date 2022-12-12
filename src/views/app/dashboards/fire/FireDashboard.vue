<template>
  <div v-if="objectData">
    <b-row v-if="data">
      <b-col lg="12">
        <b-row class="mb-4">
          <b-col lg="3" class="mb-2">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/fire-icon/tongchungcu.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.LocationCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">VỊ TRÍ LẮP ĐẶT</div>
            </b-card>
          </b-col>
          <b-col lg="3" class="mb-2">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/fire-icon/tongphong.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.RoomCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">KHU VỰC LẮP ĐẶT</div>
            </b-card>
          </b-col>
          <b-col lg="3" class="mb-2">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/fire-icon/thietbitaicho.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.StationCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">TỦ QUẢN LÍ THIẾT BỊ</div>
            </b-card>
          </b-col>
          <b-col lg="3" class="mb-2">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/fire-icon/thietbitaicho.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.SpeakerCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">TỦ BÁO CHÁY</div>
            </b-card>
          </b-col>
          <b-col lg="3" class="mb-2">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/fire-icon/thietbiloi.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.SpeakerFireErrorCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">TỦ BÁO CHÁY LỖI</div>
            </b-card>
          </b-col>
          <b-col lg="3" class="mb-2">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/fire-icon/thietbilapdat.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.SensorCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">THIẾT BỊ BÁO CHÁY</div>
            </b-card>
          </b-col>
          <b-col lg="3" class="mb-2">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/fire-icon/thietbiloi.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.FireErrorCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">THIẾT BỊ BÁO CHÁY LỖI</div>
            </b-card>
          </b-col>
          <b-col lg="3" class="mb-2">
            <b-card class="box_header">
              <div class="d-flex">
                <span class="box_header-icon">
                  <b-img
                    :src="require('@/assets/img/fire-icon/thietbibaochay.png')"
                    style="height: 100%"
                  ></b-img>
                </span>
                <span class="box_header-value">
                  <div class="text-center mt-2">
                    {{ data.FireStatusCount }}
                  </div>
                </span>
              </div>
              <div class="box_header-bottom">ĐANG CẢNH BÁO CHÁY</div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="12">
        <b-row>
          <b-col xl="6" lg="6">
            <b-row>
              <b-col xl="12">
                <b-card class="mb-4" style="height: 400px">
                  <div class="border-map-mini-two">
                    <multi-map-mini
                      ref="multiMapMini"
                      :data-map-now="dataMapNow"
                    ></multi-map-mini>
                  </div>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="6" lg="6">
            <b-card class="mb-4" style="height: 400px">
              <div>
                <template v-if="historys && historys.length > 0">
                  <b-table
                    class="history-dashboard-table text-center text-small mb-0"
                    :responsive="true"
                    :sticky-header="true"
                    :no-border-collapse="true"
                    :bordered="true"
                    :hover="true"
                    :items="historys"
                    :fields="fieldsHistory"
                    head-variant="light"
                  >
                  </b-table>
                </template>
                <template v-else>
                  <p class="p-3 text-muted text-small font-italic">
                    {{ $t("map.no-data") }}
                  </p>
                </template>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <!-- </b-card> -->
      <b-col xl="12">
        <b-row>
          <b-col>
            <h5 class="text-muted">
              <strong> DANH SÁCH CHUNG CƯ </strong>
            </h5>
          </b-col>
          <b-col class="text-right">
            <div class="pt-1">
              <b-button
                variant="empty"
                class="pt-0 pl-0 d-inline-block d-md-none"
                v-b-toggle.displayOptions
              >
                <i class="simple-icon-arrow-down align-middle" />
              </b-button>
              <b-collapse id="displayOptions" class="d-md-block">
                <div
                  class="apply-el d-block d-md-inline-block"
                  style="margin-top: -1rem"
                >
                  <div
                    class="search-sm d-inline-block float-md-left mr-1 align-top"
                  >
                    <b-input
                      :placeholder="$t('fire.customer-name')"
                      v-model="search"
                    />
                  </div>
                </div>
              </b-collapse>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <div class="separator mb-3" />
      <template v-if="convertItems && convertItems.length > 0">
        <b-col lg="12" class="mt-2 mb-4">
          <b-row>
            <b-colxx
              xxs="12"
              class="mb-3"
              v-for="(item, index) in convertItems"
              :key="index"
              :id="item.ID"
            >
              <list-item
                :key="item.ID"
                :data="item"
                :accessWrite="objectData.accessWrite"
                :selected-data="handleSelect"
                :objectData="objectData"
              />
            </b-colxx>
          </b-row>
          <b-row>
            <b-colxx xxs="12">
              <b-pagination
                :total-rows="totalRows"
                v-model="page"
                :per-page="perPage"
                size="sm"
                align="center"
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
        </b-col>
      </template>
      <template v-else>
        <b-col lg="12" class="mb-4">
          <p class="text-muted text-small font-italic">
            {{ $t("map.no-data") }}
          </p>
        </b-col>
      </template>
    </b-row>
  </div>
</template>
<script>
import handling from "@/constants/handling";
import fireAPI from "@/api/modules/fireAPI";
import systemAPI from "@/api/modules/systemAPI";
import ListItem from "./component/ListItem";
import MultiMapMini from "@/components/Map/MultiMapMini";
export default {
  components: {
    "list-item": ListItem,
    "multi-map-mini": MultiMapMini,
  },
  data() {
    return {
      userID: JSON.parse(localStorage.getItem("user")).UserID,
      timer: 500,
      selectMode: "single",
      menuRight: [],
      selectedItems: [],
      data: null,
      page: 1,
      perPage: 10,
      totalRows: 0,
      search: "",
      filterItems: null,
      convertItems: null,
      latLng: [],
      typeLayer: null,
      dataMapNow: null,
      historys: [],
      fieldsHistory: [
        {
          key: "StatusData",
          label: "Trạng thái",
          tdClass: "text-left font-weight-bold pl-3",
        },
        {
          key: "LocalName",
          label: "Tên",
          tdClass: "text-left font-weight-bold pl-3",
        },
        {
          key: "StartTime",
          label: "Bắt đầu",
          tdClass: "text-muted text-left",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
        {
          key: "FinishTime",
          label: "Kết thúc",
          tdClass: "text-muted text-left",
          formatter: (value, key, item) => {
            return this.convertDateTime(value);
          },
        },
      ],
    };
  },
  methods: {
    handleSelect(value) {
      this.selectedItems = this.items.filter((item) => item.ID === value);
    },
    searchData(data, string) {
      let newArr = [];
      data.forEach((i) => {
        let status = false;
        Object.keys(i).forEach((j) => {
          if (j === "LocationName") {
            if (
              i[j].toString().toLowerCase().indexOf(string.toLowerCase()) > -1
            ) {
              status = true;
            }
          }
        });
        if (status) {
          newArr.push(i);
        }
      });
      return newArr;
    },
    paginationData(page, perPage, array) {
      let newArray = [];
      array.forEach((val, index) => {
        if (page === 1) {
          if (index < perPage) {
            newArray.push(val);
          }
        } else {
          if (index >= perPage * (page - 1) && index < perPage * page) {
            newArray.push(val);
          }
        }
      });
      return newArray;
    },
    rowSelected(data) {
      this.selectedItems = data;
    },
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 3000,
      });
    },
    getData() {
      fireAPI
        .getDashboard()
        .then((val) => {
          this.data = val.status ? val.data.Dashboards[0] : [];
          if (this.data) {
            this.dataMapNow = [
              {
                DataTypeName: "FIRE",
                DataProperties: val.data.ListLocations,
              },
            ];
          }
          if (val.data.ListLocations && val.data.ListLocations.length > 0) {
            this.latLng = [];
            this.typeLayer = val.data.ListLocations[0].GeoCode;
            val.data.ListLocations.forEach((item) => {
              if (item.Lat && item.Long) {
                this.latLng.push([item.Lat, item.Long, item.StatusColor]);
              }
            });
          }
          //search
          this.items = val.status
            ? handling.convertDataBitToBoolean(val.data.ListLocations)
            : [];
          if (this.search.length > 0) {
            let newArr = [];
            this.items.forEach((item) => {
              this.filterItems.forEach((ele) => {
                if (item.ID === ele.ID) {
                  newArr.push(item);
                }
              });
              this.convertItems = newArr;
            });
          } else {
            this.filterItems = null;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              this.items
            );
            this.totalRows = this.items.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHistorys() {
      fireAPI
        .getHistory()
        .then((val) => {
          this.historys = val.status ? val.data : [];
        })
        .catch((err) => console.log(err));
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
    convertDateTime(string) {
      return handling.convertDateTime(string);
    },
    timeLoadData(time) {
      this.getData();
      this.getHistorys();
      setTimeout(() => {
        this.timeLoadData(time);
      }, time);
    },
  },
  async created() {
    await this.getListMenuRight();
    await this.timeLoadData(this.timer * 60);
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.getData();
        this.getHistorys();
      }
    },
    search(to, from) {
      if (this.items.length > 0) {
        this.page = 1;
        if (to.length > 0) {
          let newArr = this.searchData(this.items, to);
          if (newArr.length > 0) {
            this.filterItems = newArr;
            this.convertItems = this.paginationData(
              this.page,
              this.perPage,
              newArr
            );
            this.totalRows = newArr.length;
          } else {
            this.filterItems = null;
            this.convertItems = null;
            this.totalRows = 0;
          }
        } else {
          this.filterItems = null;
          this.convertItems = this.paginationData(
            this.page,
            this.perPage,
            this.items
          );
          this.totalRows = this.items.length;
        }
      }
    },
    page(to, from) {
      if (this.filterItems) {
        this.convertItems = this.paginationData(
          to,
          this.perPage,
          this.filterItems
        );
        this.totalRows = this.filterItems.length;
      } else {
        this.convertItems = this.items
          ? this.paginationData(to, this.perPage, this.items)
          : null;
        this.totalRows = this.items.length;
      }
    },
  },
  computed: {
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
<style>
.history-dashboard-table .table th {
  white-space: nowrap;
}
</style>
<style>
.box_header .card-body {
  padding: 10px;
}
</style>
<style scoped>
.border-map-mini-two {
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
.box_header-icon {
  width: 80px;
  height: 70px;
}
.box_header-value {
  color: hsl(185 31% 15%);
  font-size: 40px;
  font-weight: 700;
  text-align: center;
}
.box_header-bottom {
  color: hsl(185 31% 15%);
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list_item {
  padding: 10px;
  background: #f3f3f3;
  font-size: 15px;
  border-radius: 5px;
}
</style>
