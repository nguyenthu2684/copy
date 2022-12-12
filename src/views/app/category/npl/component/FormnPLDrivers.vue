<template>
  <div>
    <template v-if="dataForm">
      <b-col lg="12" class="pl-0">
        <b-row>
          <b-col lg="2" xl="1">
            <b-form-group label="ID">
              <b-form-input
                :value="dataForm.ID ? dataForm.ID[1] : 'AUTO'"
                disabled
                class="text-center"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2" xl="1">
            <b-form-group
              :label="dataForm.LemonID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.LemonID[3]"
            >
              <b-form-input
                v-model="dataForm.LemonID[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.StartDate[0]"
              :invalid-feedback="$t('form.no-blank')"
            >
              <b-form-input
                :value="convertDate(dataForm.StartDate[1])"
                disabled
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.EndDate[0]"
              :invalid-feedback="$t('form.no-blank')"
            >
              <b-form-input
                :value="convertDate(dataForm.EndDate[1])"
                disabled
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.IsActive[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.IsActive[3]"
              v-if="dataForm.IsActive"
            >
              <div class="d-flex">
                <b-form-radio
                  v-model="dataForm.IsActive[1]"
                  :value="1"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                  >{{ $t("npl.using") }}</b-form-radio
                >
                <b-form-radio
                  v-model="dataForm.IsActive[1]"
                  :value="0"
                  class="ml-2"
                  :disabled="
                    currentMode === 'adding' || currentMode === 'editing'
                      ? false
                      : true
                  "
                  >{{ $t("npl.not-use") }}</b-form-radio
                >
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.Name[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Name[3]"
            >
              <b-form-input
                v-model="dataForm.Name[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.Address[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Address[3]"
            >
              <b-form-input
                v-model="dataForm.Address[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.PermanentResidence[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.PermanentResidence[3]"
            >
              <b-form-input
                v-model="dataForm.PermanentResidence[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.NameExtention1[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.NameExtention1[3]"
            >
              <b-form-input
                v-model="dataForm.NameExtention1[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.AddressExtention1[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.AddressExtention1[3]"
            >
              <b-form-input
                v-model="dataForm.AddressExtention1[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              :label="dataForm.PermanentResidenceExtention1[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.PermanentResidenceExtention1[3]"
            >
              <b-form-input
                v-model="dataForm.PermanentResidenceExtention1[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="8">
            <b-row>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.PhoneNumber[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.PhoneNumber[3]"
                >
                  <b-form-input
                    v-model="dataForm.PhoneNumber[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    class="text-right"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.IDCard[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.IDCard[3]"
                >
                  <b-form-input
                    v-model="dataForm.IDCard[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    class="text-right"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.DriverLicense[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.DriverLicense[3]"
                >
                  <b-form-input
                    v-model="dataForm.DriverLicense[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                    class="text-right"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3">
                <b-form-group
                  :label="dataForm.ExpiryDate[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.ExpiryDate[3]"
                >
                  <b-form-datepicker
                    :locale="locale"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }"
                    v-model="dataForm.ExpiryDate[1]"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="3">
                    <b-form-group
                      :label="dataForm.OrderTypeID[0]"
                      :invalid-feedback="$t('form.no-blank')"
                      :state="dataForm.OrderTypeID[3]"
                    >
                      <b-form-select
                        v-model="dataForm.OrderTypeID[1]"
                        :options="dataFormOptions.OrderTypeID"
                        :disabled="
                          currentMode === 'adding' || currentMode === 'editing'
                            ? false
                            : true
                        "
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col lg="9">
                    <b-form-group
                      :label="dataForm.GoodType[0]"
                      :invalid-feedback="$t('form.no-blank')"
                      :state="dataForm.GoodType[3]"
                    >
                      <v-select
                        v-model="dataForm.GoodType[1]"
                        :options="dataFormOptions.GoodType"
                        multiple
                        :disabled="
                          currentMode === 'adding' || currentMode === 'editing'
                            ? false
                            : true
                        "
                      />
                    </b-form-group>
                  </b-col>
            </b-row>
          </b-col>
          <b-col lg="2">
            <b-form-group :label="dataForm.Note[0]">
              <b-form-textarea
                v-model="dataForm.Note[1]"
                rows="2"
                max-rows="6"
                style="height: 113px"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </template>
    <template v-else>
      {{ $t("cards.no-data") }}
    </template>
  </div>
</template>

<script>
import moment from "moment";
import vSelect from "vue-select";
import nplAPI from "@/api/modules/nplAPI";
import dataFormOptions from "../mixin/dataFormOptionsMixin";

export default {
  props: ["dataForm", "currentMode", "CategoryType"],
  mixins: [dataFormOptions],
  components: {
    "v-select": vSelect,
  },
  data() {
    return {
      locale:
        !localStorage.getItem("currentLanguage") ||
        localStorage.getItem("currentLanguage") === "vn"
          ? "vi"
          : localStorage.getItem("currentLanguage"),
    };
  },
  created() {
    this.getSelect("OrderTypes", "OrderTypesName", "OrderTypeID");
    this.getGoodType();
  },
  methods: {
    getGoodType() {
      let body = {
        CategoryType: "GoodsTypes",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              const obj = {
                label: item.GoodsTypesName,
                ID: item.ID,
              };
              newArr.push(obj);
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            GoodType: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
    convertDate(string) {
      return moment(string).format("DD/MM/YYYY");
    },
  },
};
</script>

<style lang="scss" scoped></style>
