<template>
  <div>
    <b-table
      sticky-header
      :items="items"
      head-variant="light"
      style="max-height: calc(100% - 15px); margin-top: -1px"
    ></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
        {
          heading1: "table cell",
          heading2: "table cell",
          heading3: "table cell",
        },
      ],
    };
  },
};
</script>
