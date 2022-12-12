<template>
  <div id="app-content-full" class="npl-categories npl-regions">
    <b-card class="h-100" style="overflow: auto">
      <div v-if="objectData">
        <b-row>
          <b-colxx xxs="12">
            <h1 class="custom-h1">
              <strong>{{ objectData.formName }}</strong>
            </h1>
            <div class="top-right-button-container" @click="handleUpdate">
              <div class="top-right-button-container">
                <b-button variant="primary">{{ $t("button.save") }}</b-button>
              </div>
            </div>
            <div class="mb-lg-2 mt-2"></div>
            <div class="separator mb-2 mb-lg-3"></div>
          </b-colxx>
        </b-row>
      </div>
      <!-- <b-row v-if="dataForm">
        <template v-for="field in dataForm">
          <b-col lg="4" :key="field[0]">
            <b-form-group
              :label="field[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="field[3]"
            >
              <b-form-input v-model="field[1]"></b-form-input>
            </b-form-group>
          </b-col>
        </template>
      </b-row> -->
      <b-row>
        <b-col lg="2" :key="dataForm.Logo[0]">
          <b-form-group
            :label="dataForm.Logo[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.Logo[3]"
          >
            <b-form-input v-model="dataForm.Logo[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.Website[0]">
          <b-form-group
            :label="dataForm.Website[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.Website[3]"
          >
            <b-form-input v-model="dataForm.Website[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="3" :key="dataForm.Name[0]">
          <b-form-group
            :label="dataForm.Name[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.Name[3]"
          >
            <b-form-input v-model="dataForm.Name[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="3" :key="dataForm.NameExtention1[0]">
          <b-form-group
            :label="dataForm.NameExtention1[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.NameExtention1[3]"
          >
            <b-form-input v-model="dataForm.NameExtention1[1]"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" :key="dataForm.Address[0]">
          <b-form-group
            :label="dataForm.Address[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.Address[3]"
          >
            <b-form-input v-model="dataForm.Address[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.AddressExtention1[0]">
          <b-form-group
            :label="dataForm.AddressExtention1[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.AddressExtention1[3]"
          >
            <b-form-input v-model="dataForm.AddressExtention1[1]"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" :key="dataForm.ApprovalIncurredFee[0]">
          <b-form-group
            :label="dataForm.ApprovalIncurredFee[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.ApprovalIncurredFee[3]"
          >
            <b-form-input v-model="dataForm.ApprovalIncurredFee[1]" class="text-right"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.ApprovalOrder[0]">
          <b-form-group
            :label="dataForm.ApprovalOrder[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.ApprovalOrder[3]"
          >
            <b-form-input v-model="dataForm.ApprovalOrder[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.CycleRemindJob[0]">
          <b-form-group
            :label="dataForm.CycleRemindJob[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.CycleRemindJob[3]"
          >
            <b-form-input v-model="dataForm.CycleRemindJob[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.DriverRejectOrder[0]">
          <b-form-group
            :label="dataForm.DriverRejectOrder[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.DriverRejectOrder[3]"
          >
            <b-form-input v-model="dataForm.DriverRejectOrder[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.FormatCurrency[0]">
          <b-form-group
            :label="dataForm.FormatCurrency[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.FormatCurrency[3]"
          >
            <b-form-input v-model="dataForm.FormatCurrency[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.FormatDecimal[0]">
          <b-form-group
            :label="dataForm.FormatDecimal[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.FormatDecimal[3]"
          >
            <b-form-input v-model="dataForm.FormatDecimal[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.Phone[0]">
          <b-form-group
            :label="dataForm.Phone[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.Phone[3]"
          >
            <b-form-input v-model="dataForm.Phone[1]" class="text-right"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.RadiusWrongRoutesAlert[0]">
          <b-form-group
            :label="dataForm.RadiusWrongRoutesAlert[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.RadiusWrongRoutesAlert[3]"
          >
            <b-form-input v-model="dataForm.RadiusWrongRoutesAlert[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.RemindJob[0]">
          <b-form-group
            :label="dataForm.RemindJob[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.RemindJob[3]"
          >
            <b-form-input v-model="dataForm.RemindJob[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.RemindMaintenance[0]">
          <b-form-group
            :label="dataForm.RemindMaintenance[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.RemindMaintenance[3]"
          >
            <b-form-input v-model="dataForm.RemindMaintenance[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.TimeApprovalIncurredFee[0]">
          <b-form-group
            :label="dataForm.TimeApprovalIncurredFee[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.TimeApprovalIncurredFee[3]"
          >
            <b-form-input v-model="dataForm.TimeApprovalIncurredFee[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.TimeBeforeApprovingIncurredFee[0]">
          <b-form-group
            :label="dataForm.TimeBeforeApprovingIncurredFee[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.TimeBeforeApprovingIncurredFee[3]"
          >
            <b-form-input v-model="dataForm.TimeBeforeApprovingIncurredFee[1]"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col lg="4" :key="dataForm.WrongRoutesAlert[0]">
          <b-form-group
            :label="dataForm.WrongRoutesAlert[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.WrongRoutesAlert[3]"
          >
            <b-form-input v-model="dataForm.WrongRoutesAlert[1]"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" :key="dataForm.Note[0]">
          <b-form-group
            :label="dataForm.Note[0]"
            :invalid-feedback="$t('form.no-blank')"
            :state="dataForm.Note[3]"
          >
            <b-form-textarea v-model="dataForm.Note[1]"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";
import handling from "@/constants/handling";
import systemAPI from "@/api/modules/systemAPI";
import nplAPI from "@/api/modules/nplAPI";

export default {
  data() {
    return {
      menuRight: [],
      dataForm: null,
    };
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
  created() {
    this.getListMenuRight();
    this.getData();
  },
  methods: {
    getListMenuRight() {
      let body = {};
      systemAPI
        .getMenus(body)
        .then((val) => {
          this.menuRight = val.status ? val.data : [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      nplAPI
        .getCompanyConfig()
        .then((val) => {
          const data = val.status ? val.data : null;
          if (data.Properties?.length) {
            const obj = data.CompanyInfo[0];
            let newObj = {};
            data.Properties.forEach((item) => {
              if (item.IsHide === 0) {
                newObj = {
                  ...newObj,
                  [item.ClName]: [
                    item.ShwName,
                    obj[item.ClName],
                    item.TypeCol,
                    null,
                  ],
                };
              }
            });
            this.dataForm = {
              ...newObj,
              ID: ["ID", obj.ID, "ID", null],
            };
          } else {
            this.dataForm = null;
          }
        })
        .catch((err) => console.log(err));
    },
    handleUpdate() {
      let body = {};
      for (let key in this.dataForm) {
        let value = this.dataForm[key][1];
        if (key === "FormatDecimal") {
          body = {
            ...body,
            [key]: value.toString(),
          };
        } else {
          body = {
            ...body,
            [key]: value,
          };
        }
      }
      console.log(body);
      nplAPI
        .editCompanyConfig(body)
        .then((val) => {
          if (val.status) {
            this.showNotify("success", this.$t("toast.message"), val.message);
            this.getData();
          } else {
            this.showNotify("error", this.$t("toast.message"), val.message);
          }
        })
        .catch((err) => console.log(err));
    },
    showNotify(type, titleMessage, message) {
      this.$notify(type, titleMessage, message, {
        duration: 3000,
        permanent: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
