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
              :label="dataForm.LicensePlates[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.LicensePlates[3]"
            >
              <b-form-input
                v-model="dataForm.LicensePlates[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4" xl="4">
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
              :label="dataForm.VehicleTypeID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.VehicleTypeID[3]"
            >
              <b-form-select
                v-model="dataForm.VehicleTypeID[1]"
                :options="dataFormOptions.VehicleTypeID"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col lg="2">
            <b-form-group
              :label="dataForm.VehicleProducerID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.VehicleProducerID[3]"
            >
              <b-form-select
                v-model="dataForm.VehicleProducerID[1]"
                :options="dataFormOptions.VehicleProducerID"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.ProductionYear[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.ProductionYear[3]"
            >
              <b-form-input
                v-model="dataForm.ProductionYear[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.ChassisNumber[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.ChassisNumber[3]"
            >
              <b-form-input
                v-model="dataForm.ChassisNumber[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.EngineNumber[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.EngineNumber[3]"
            >
              <b-form-input
                v-model="dataForm.EngineNumber[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.FuelKindID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.FuelKindID[3]"
            >
              <b-form-select
                v-model="dataForm.FuelKindID[1]"
                :options="dataFormOptions.FuelKindID"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.CylinderCapacity[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.CylinderCapacity[3]"
            >
              <b-form-input
                v-model="dataForm.CylinderCapacity[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.Power[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Power[3]"
            >
              <b-form-input
                v-model="dataForm.Power[1]"
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
              :label="dataForm.MaxOutputRpm[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.MaxOutputRpm[3]"
            >
              <b-form-input
                v-model="dataForm.MaxOutputRpm[1]"
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
              :label="dataForm.Displacement[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.Displacement[3]"
            >
              <b-form-input
                v-model="dataForm.Displacement[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.VehicleColorID[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.VehicleColorID[3]"
            >
              <b-form-select
                v-model="dataForm.VehicleColorID[1]"
                :options="dataFormOptions.VehicleColorID"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.VehicleSize[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.VehicleSize[3]"
            >
              <b-form-input
                v-model="dataForm.VehicleSize[1]"
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
              :label="dataForm.KerbMass[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.KerbMass[3]"
            >
              <b-form-input
                v-model="dataForm.KerbMass[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col lg="2">
            <b-form-group
              :label="dataForm.DesignTotalMass[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.DesignTotalMass[3]"
            >
              <b-form-input
                v-model="dataForm.DesignTotalMass[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="2">
            <b-form-group
              :label="dataForm.TowedMass[0]"
              :invalid-feedback="$t('form.no-blank')"
              :state="dataForm.TowedMass[3]"
            >
              <b-form-input
                v-model="dataForm.TowedMass[1]"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                class="text-right"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <b-row>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.EngineType[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.EngineType[3]"
                >
                  <b-form-select
                    v-model="dataForm.EngineType[1]"
                    :options="engineTypeOption"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.TyresNumber[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.TyresNumber[3]"
                >
                  <b-form-select
                    v-model="dataForm.TyresNumber[1]"
                    :options="tyresNumberOption"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>

              <b-col lg="4">
                <b-form-group
                  :label="dataForm.VehicleTyreID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.VehicleTyreID[3]"
                >
                  <b-form-select
                    v-model="dataForm.VehicleTyreID[1]"
                    :options="dataFormOptions.VehicleTyreID"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4">
                <b-form-group
                  :label="dataForm.DriveHelperID[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.DriveHelperID[3]"
                >
                  <b-form-select
                    v-model="dataForm.DriveHelperID[1]"
                    :options="dataFormOptions.DriveHelperID"
                    :disabled="
                      currentMode === 'adding' || currentMode === 'editing'
                        ? false
                        : true
                    "
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="8">
                <b-form-group
                  :label="dataForm.VehicleDevices[0]"
                  :invalid-feedback="$t('form.no-blank')"
                  :state="dataForm.VehicleDevices[3]"
                >
                  <v-select
                    v-model="dataForm.VehicleDevices[1]"
                    :options="dataFormOptions.VehicleDevices"
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
          <b-col lg="4">
            <b-form-group :label="dataForm.Note[0]">
              <b-form-textarea
                v-model="dataForm.Note[1]"
                rows="2"
                max-rows="6"
                :disabled="
                  currentMode === 'adding' || currentMode === 'editing'
                    ? false
                    : true
                "
                style="height: 113px"
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
      engineTypeOption: [
        { text: "T??? ?????ng", value: '0' },
        { text: "1 c???p", value: '1' },
        { text: "2 c???p", value: '2' },
        { text: "3 c???p", value: '3' },
        { text: "4 c???p", value: '4' },
        { text: "5 c???p", value: '5' },
        { text: "6 c???p", value: '6' },
        { text: "7 c???p", value: '7' },
        { text: "8 c???p", value: '8' },
        { text: "9 c???p", value: '9' },
        { text: "10 c???p", value: '10' },
      ],
      tyresNumberOption: [
        { text: "4 b??nh", value: '4' },
        { text: "6 b??nh", value: '6' },
        { text: "8 b??nh", value: '8' },
        { text: "10 b??nh", value: '10' },
        { text: "12 b??nh", value: '12' },
        { text: "14 b??nh", value: '14' },
        { text: "16 b??nh", value: '16' },
        { text: "18 b??nh", value: '18' },
        { text: "20 b??nh", value: '20' },
        // { text: "22 b??nh", value: '22' },
        // { text: "24 b??nh", value: '24' },
        // { text: "26 b??nh", value: '26' },
      ]
    };
  },
  created() {
    this.getSelect("VehicleTypes", "VehicleTypesName", "VehicleTypeID");
    this.getSelect("VehicleTires", "VehicleTiresName", "VehicleTyreID");
    this.getSelect("FuelKinds", "FuelKindsName", "FuelKindID");
    this.getSelect("VehicleColors", "VehicleColorsName", "VehicleColorID");
    this.getSelect(
      "VehicleProducers",
      "VehicleProducersName",
      "VehicleProducerID"
    );

    this.getDriveHelpers();
    this.getVehicleDevices();
  },
  watch: {
    dataForm(newVal) {
      if (newVal && newVal.VehicleDevices) {
        const stringID = newVal.VehicleDevices[1];
        if (typeof stringID === "string") {
          const arr = newVal.VehicleDevices[1].split(","); //--> m???ng ch???a id
          const newArr = [];
          arr.forEach((item) => {
            const obj = this.dataFormOptions.VehicleDevices.find(
              (item2) => item2.ID == item
            );
            if (obj) {
              newArr.push(obj);
            }
          });
          this.dataForm.VehicleDevices[1] = newArr;
        }
      }
    },
  },
  methods: {
    getDriveHelpers() {
      nplAPI
        .getDriveHelperActive()
        .then((val) => {
          if (val.status && val.data?.length > 0) {
            let data = val.status ? val.data : [];
            let newArr = [];
            if (data.length > 0) {
              data.forEach((item) => {
                const obj = {
                  text: item.nPLDriveHelpersName,
                  value: item.ID,
                };
                newArr.push(obj);
              });
            }
            this.dataFormOptions = {
              ...this.dataFormOptions,
              DriveHelperID: newArr,
            };
          }
        })
        .catch((err) => console.log(err));
    },
    getVehicleDevices() {
      let body = {
        CategoryType: "VehicleDevices",
      };
      nplAPI
        .getCategoryActive(body)
        .then((val) => {
          let data = val.status ? val.data : [];
          let newArr = [];
          if (data.length > 0) {
            data.forEach((item) => {
              const obj = {
                label: item.VehicleDevicesName,
                ID: item.ID,
              };
              newArr.push(obj);
            });
          }
          this.dataFormOptions = {
            ...this.dataFormOptions,
            VehicleDevices: newArr,
          };
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped></style>
