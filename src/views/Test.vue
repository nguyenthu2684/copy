<template>
  <b-card>
    <div class="mt-5 ml-5">data :{{ data }}</div>
  </b-card>
</template>

<script>
export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      data: null,
      value: null,
      options: [
        {
          key: "a",
          name: "a",
          subOptions: [
            {
              key: "aa",
              name: "aa",
            },
          ],
        },
      ],
      normalizer(node) {
        console.log(node);
        return {
          id: node.key,
          label: "node.name",
          children: node.subOptions,
        };
      },
    };
  },
  methods: {
    hadleInputData(data) {
      console.log(1, "hadleInputData", data);
      this.data = data;
    },
  },
  created() {
    this.$socket.start({
      log: false, // Active only in development for debugging.
    });
  },
  sockets: {
    // signalrHubConnection.on('someEvent', (data) => this.someActionWithData(data))
    ReceiveLightAction(data) {
      this.hadleInputData(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>