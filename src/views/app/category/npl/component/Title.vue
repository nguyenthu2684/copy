<template>
  <div class="title-category">
    {{ titleModify }}
  </div>
</template>

<script>
export default {
  props: ["title"],
  computed: {
    titleModify() {
      return `${this.$t("npl.management")}: ${this.$t("npl.category")} ${
        this.title
      }`;
    },
  },
};
</script>

<style lang="scss" scoped>
.title-category {
  display: inline-block;
  height: 37px;
  border-bottom: 1px solid rgb(215, 215, 215);
  padding-left: 5px;
  line-height: 37px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: rgb(0, 90, 171);
}
</style>
