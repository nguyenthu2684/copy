<template>
  <div>
    <b-table
      id="npl-table-basic-form"
      class="npl-table-basic-form border-bottom text-center"
      :items="dataAttachFile"
      :fields="fieldsAttachFile"
      show-empty
      :select-mode="'single'"
      head-variant="light"
      bordered="bordered"
      style="max-height: calc(100% - 15px); margin-top: -1px"
    >
      <template #empty>
        <div class="text-center font-italic text-muted">
          {{ $t("data.non-data") }}
        </div>
      </template>
      <template #cell(LinkFile)="row">
        <div v-for="(item, index) in row.item.LinkFile.split(';')" :key="index">
          <a :href="item" download>{{ row.item.FileName.split(",")[index] }}</a>
        </div>
      </template>
      <template #cell(Action)="row">
        <!-- <div>{{ row.item }}</div> -->
        <div class="text-center" style="cursor: pointer">
          <i
            @click="removeFile(row.item)"
            class="fas fa-trash-alt text-danger mr-2"
          ></i>
          <i @click="editFile(row.item)" class="fas fa-edit mr-2"></i>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["dataAttachFile", "fieldsAttachFile"],
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
  },
  methods: {
    removeFile(item) {
      this.$bvModal
        .msgBoxConfirm(this.$t("modal.confirm-delete") + " ?", {
          title: this.$t("form.warning").toUpperCase(),
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: this.$t("form.yes"),
          cancelTitle: this.$t("form.no"),
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$emit("removeFile", item);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editFile(item) {
      this.$emit("editFile", item);
    },
  },
};
</script>

<style scoped></style>
