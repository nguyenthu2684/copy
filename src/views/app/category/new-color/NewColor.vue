<template>
  <div role="group">
    <label for="input-live">Name:</label>
    <b-form-input
      id="input-live"
      v-model="name"
      :state="nameState"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Enter your name"
      trim
    ></b-form-input>

    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      {{ $t("form.no-blank") }}
    </b-form-invalid-feedback>
    <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>

    <!-- This is a form text block (formerly known as help block) -->
    <b-form-text id="input-live-help">Your full name.</b-form-text>
  </div>
</template>

<script>
export default {
  computed: {
    nameState() {
      if (this.myToggle == true) {
        this.myToggle = true;
        return this.name.length > 2 ? true : false;
      }
    },
  },
  data() {
    return {
      myToggle: false,
      name: "",
    };
  },
};
</script>
