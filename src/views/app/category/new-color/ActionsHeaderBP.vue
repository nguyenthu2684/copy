<template>
  <div>
    <!-- start -->
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="currentIndex <= 0 ? true : false"
      @click="emitIndex(0)"
      ><i class="fas fa-chevron-double-left"></i
    ></b-button>
    <!-- back -->
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="currentIndex <= 0 ? true : false"
      @click="emitIndex(currentIndex - 1)"
    >
      <i class="fas fa-chevron-left"></i
    ></b-button>
    <!-- index -->
    <b-button v-if="sIndex" squared variant="outline-secondary" class="mb-1">
      <b>{{ currentIndex + 1 }} / {{ total }}</b>
    </b-button>
    <!-- next -->
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="currentIndex === total - 1 ? true : false"
      @click="emitIndex(currentIndex + 1)"
    >
      <i class="fas fa-chevron-right"></i
    ></b-button>
    <!-- end -->
    <b-button
      v-if="sIndex"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="currentIndex === total - 1 ? true : false"
      @click="emitIndex(total - 1)"
      ><i class="fas fa-chevron-double-right"> </i
    ></b-button>
    <!-- add -->
    <b-button
      squared
      variant="success"
      class="mb-1"
      :disabled="isDisabledAdd ? true : false"
      @click="changeAction('add')"
    >
      <i class="fas fa-plus mr-1"></i>
      <b>{{ $t("action.add") }}</b>
    </b-button>
    <!-- edit -->
    <b-button
      v-if="sEdit"
      squared
      variant="warning"
      class="mb-1"
      :disabled="isDisabledAdd ? true : false"
      @click="changeAction('edit')"
    >
      <i class="fas fa-edit mr-1"></i>
      <b>{{ $t("action.edit") }}</b>
    </b-button>
    <!-- delete -->
    <b-button
      v-if="sDelete"
      squared
      variant="danger"
      class="mb-1"
      :disabled="isDisabledDelete ? true : false"
      @click="changeAction('delete')"
    >
      <i class="fas fa-trash-alt mr-1"></i>
      <b>{{ $t("action.delete") }}</b>
    </b-button>
    <!-- save -->
    <b-button
      v-if="sSave"
      squared
      variant="primary"
      class="mb-1"
      :disabled="isDisabledSave ? true : false"
      @click="changeAction('save')"
    >
      <i class="fas fa-save mr-1"></i>
      <b>{{ $t("action.save") }}</b>
    </b-button>
    <!-- cancel -->
    <b-button
      v-if="sCancel"
      squared
      class="mb-1"
      :disabled="isDisabledCancel ? true : false"
      @click="changeAction('cancel')"
    >
      <i class="fas fa-undo-alt mr-1"></i>
      <b>{{ $t("action.cancel") }}</b>
    </b-button>

    <!-- <b-button
      v-if="sBlock"
      squared
      variant="outline-danger"
      class="mb-1"
      @click="changeAction('lock')"
    >
      <i class="fas fa-lock-alt mr-1"></i>
      <b>{{ $t("action.lock") }}</b>
    </b-button> -->

    <!-- Dinh Kem file -->
    <b-button
      v-if="sAttachFile"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="isDisabledAttachFile ? true : false"
      @click="changeAction('attachFile')"
    >
      <i class="fas fa-upload mr-1"></i>
      <b>{{ $t("action.attach-file") }}</b>
    </b-button>
    <!-- in -->
    <b-button
      v-if="sPrint"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="isDisabledPrint ? true : false"
      @click="changeAction('print')"
    >
      <i class="fas fa-print mr-1"></i>
      <b>{{ $t("action.print") }}</b>
    </b-button>
    <!-- nhap Ex -->
    <b-button
      v-if="sImportExcel"
      squared
      variant="outline-secondary"
      class="mb-1"
      :disabled="isDisabledImportExcel ? true : false"
      @click="changeAction('importExcel')"
    >
      <i class="fas fa-file-arrow-up mr-1"></i>
      <b>{{ $t("action.import-excel") }}</b>
    </b-button>
    <!-- search -->
    <b-button
      v-if="sFind"
      squared
      variant="outline-info"
      class="mb-1"
      :disabled="isDisabledSearch ? true : false"
      @click="changeAction('find')"
    >
      <i class="fas fa-search mr-1"></i>
      <b>{{ $t("action.search") }}</b>
    </b-button>
  </div>
</template>

<script>
export default {
  props: [
    "currentIndex",
    "isAdd",
    "isEdit",
    "isDelete",
    "showAdd",
    "showEdit",
    "showDelete",
    "showSave",
    "showCancel",
    "showBlock",
    "showPrint",
    "showImport",
    "showFind",
    "showIndex",
    "total",
    "isPermission",
    "isDisabledAdd",
    "isDisabledEdit",
    "isDisabledDelete",
    "isDisabledSave",
    "isDisabledCancel",
    "isDisabledLock",
    "isDisabledAttachFile",
    "isDisabledPrint",
    "isDisabledImportExcel",
    "isDisabledSearch",
  ],
  data() {
    return {
      sIndex: this.showIndex ?? true,
      sAdd: this.showAdd ?? true,
      sEdit: this.showEdit ?? true,
      sDelete: this.showDelete ?? true,
      sSave: this.showSave ?? true,
      sCancel: this.showCancel ?? true,
      sBlock: this.showBlock ?? true,
      sPrint: this.showPrint ?? true,
      sAttachFile: this.showAttachFile ?? true,
      sImportExcel: this.showImportExcel ?? true,
      sFind: this.showFind ?? true,
    };
  },
  methods: {
    emitIndex(index) {
      // this.currentIndex = index;
      if (index >= 0 && index < this.total) {
        this.$emit("change-index", index);
      }
    },
    changeAction(type) {
      this.$emit("change-action", type);
    },
  },
};
</script>

<style lang="scss" scoped></style>
