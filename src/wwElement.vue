<template>
  <Multiselect
    v-model="selected"
    :options="options"
    mode="multiple"
    :close-on-select="false"
  />
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  components: { Multiselect },
  data() {
    return {
      selected: [],
      options: [
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
        { label: "Option 3", value: 3 },
      ],
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
