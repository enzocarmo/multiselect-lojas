<template>
  <Multiselect
    v-model="selected"
    :options="options"
    :groups="true"
    mode="multiple"
    label="unid_codigo"
    placeholder="Selecione as lojas"
    :close-on-select="false"
    :hideSelected="false"
    :multiple-label="customMultipleLabel"
    noOptionsText="Nenhuma opção disponível..."
  />
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { ref, watch, onMounted } from "vue";

export default {
  components: { Multiselect },
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: true },
  },
  setup(props, { emit }) { // Destructure emit from the setup context
    const { value: variableResult, setValue: setValue } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: "Value",
        type: "array",
        defaultValue: [],
      });

    const selected = ref([]);
    const options = ref([]);

    let internalChange = false;

    watch(variableResult, (newVal) => {
      if (!internalChange) {
        selected.value = newVal;
      }
      internalChange = false;
    }, { immediate: true, deep: true });

    watch(selected, (newVal) => {
      internalChange = true;
      setValue(newVal);
      emit('trigger-event', { name: 'change', event: { value: newVal } }); // Use emit instead of this.$emit
    });

    watch(() => props.content.data, (newData) => {
      if (Array.isArray(newData)) {
        options.value = newData;
      } else {
        options.value = [];
      }
    }, { immediate: true });

    onMounted(() => {
      selected.value = variableResult.value;
    });

    return { selected, options };
  },
  methods: {
    customMultipleLabel(value) {
      if (value.length === 1) {
        return "1 loja selecionada";
      } else if (value.length > 1) {
        return `${value.length} lojas selecionadas`;
      }
      return "";
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.multiselect {
  align-items: center;
  background: var(--ms-bg, #fff);
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #a4a4a4);
  border-radius: var(--ms-radius, 14px);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-size: 16px !important;
  justify-content: flex-end;
  margin: 0 auto;
  min-height: 50px !important;
  outline: none;
  position: relative;
  width: 100%;
}

.multiselect.is-open {
  border-radius: var(--ms-radius, 14px) var(--ms-radius, 14px) 0 0;
}

.multiselect.is-open-top {
  border-radius: 0 0 var(--ms-radius, 14px) var(--ms-radius, 14px);
}

.multiselect.is-disabled {
  background: var(--ms-bg-disabled, #f3f4f6);
  cursor: default;
}

.multiselect.is-active {
  border: var(--ms-border-width-active, var(--ms-border-width, 1px)) solid
    var(--ms-border-color-active, var(--ms-border-color, #a4a4a4));
  box-shadow: none;
}

.multiselect-wrapper {
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
  outline: none;
  position: relative;
  width: 100%;
}

.multiselect-multiple-label,
.multiselect-placeholder,
.multiselect-single-label {
  align-items: center;
  background: transparent;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  left: 0;
  line-height: var(--ms-line-height, 1.375);
  max-width: 100%;
  padding-left: 12px !important;
  padding-right: calc(1.25rem + var(--ms-px, 0.875rem) * 3);
  pointer-events: none;
  position: absolute;
  top: 0;
  font-family: "Montserrat";
  font-weight: 500;
}

.multiselect-placeholder {
  color: var(--ms-placeholder-color, #b5b5b5);
}

.multiselect-single-label-text {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.multiselect-search {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: var(--ms-bg, #fff);
  border: 0;
  border-radius: var(--ms-radius, 14px);
  bottom: 0;
  box-sizing: border-box;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 500 !important;
  height: 100%;
  left: 0;
  outline: none;
  padding-left: var(--ms-px, 0.875rem);
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}

.multiselect-search::-webkit-search-cancel-button,
.multiselect-search::-webkit-search-decoration,
.multiselect-search::-webkit-search-results-button,
.multiselect-search::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
}

.multiselect-tag,
.multiselect-tags {
  align-items: center;
  display: flex;
  min-width: 0;
}

.multiselect-tag {
  background: var(--ms-tag-bg, #10b981);
  border-radius: var(--ms-tag-radius, 4px);
  color: var(--ms-tag-color, #fff);
  font-size: var(--ms-tag-font-size, 0.875rem);
  font-weight: var(--ms-tag-font-weight, 600);
  line-height: var(--ms-tag-line-height, 1.25rem);
  margin-bottom: var(--ms-tag-my, 0.25rem);
  margin-right: var(--ms-tag-mx, 0.25rem);
  padding: var(--ms-tag-py, 0.125rem) 0 var(--ms-tag-py, 0.125rem)
    var(--ms-tag-px, 0.5rem);
  white-space: nowrap;
}

.multiselect-tag.is-disabled {
  background: var(--ms-tag-bg-disabled, #9ca3af);
  color: var(--ms-tag-color-disabled, #fff);
  padding-right: var(--ms-tag-px, 0.5rem);
}

.multiselect-tag-wrapper {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.multiselect-tag-wrapper-break {
  white-space: normal;
  word-break: break-all;
}

.multiselect-tag-remove {
  align-items: center;
  border-radius: var(--ms-tag-remove-radius, 4px);
  display: flex;
  justify-content: center;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.125rem);
  padding: var(--ms-tag-remove-py, 0.25rem) var(--ms-tag-remove-px, 0.25rem);
}

.multiselect-tag-remove:hover {
  background: rgba(0, 0, 0, 0.063);
}

.multiselect-tag-remove-icon {
  background-color: currentColor;
  display: inline-block;
  height: 0.75rem;
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 320 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'/%3E%3C/svg%3E");
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  opacity: 0.8;
  width: 0.75rem;
}

.multiselect-tags-search-wrapper {
  display: inline-block;
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  margin: 0 var(--ms-tag-mx, 4px) var(--ms-tag-my, 4px);
  position: relative;
}

.multiselect-tags-search-copy {
  display: inline-block;
  height: 1px;
  visibility: hidden;
  white-space: pre-wrap;
  width: 100%;
}

.multiselect-tags-search {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  bottom: 0;
  box-sizing: border-box;
  font-family: "Montserrat";
  font-size: 16px !important;
  font-weight: 500 !important;
  left: 0;
  outline: none;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}

.multiselect-tags-search::-webkit-search-cancel-button,
.multiselect-tags-search::-webkit-search-decoration,
.multiselect-tags-search::-webkit-search-results-button,
.multiselect-tags-search::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.multiselect-inifite {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
  width: 100%;
}

.multiselect-inifite-spinner,
.multiselect-spinner {
  animation: multiselect-spin 1s linear infinite;
  background-color: var(--ms-spinner-color, #10b981);
  flex-grow: 0;
  flex-shrink: 0;
  height: 1rem;
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 512 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m456.433 371.72-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 512 512' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m456.433 371.72-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z'/%3E%3C/svg%3E");
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 1rem;
  z-index: 10;
}

.multiselect-spinner {
  margin: 0 var(--ms-px, 0.875rem) 0 0;
}

.multiselect-clear {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  opacity: 1;
  padding: 0 12px 0 0px;
  position: relative;
  transition: 0.3s;
  z-index: 10;
}

.multiselect-clear:hover .multiselect-clear-icon {
  background-color: var(--ms-clear-color-hover, #6418c3) !important;
}

.multiselect-clear-icon {
  background-color: var(--ms-clear-color, #a4a4a4);
  display: inline-block;
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='%236418c3'%20viewBox='0%200%20256%20256'%3E%3Cpath%20d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z'%3E%3C/path%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='%236418c3'%20viewBox='0%200%20256%20256'%3E%3Cpath%20d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z'%3E%3C/path%3E%3C/svg%3E");
  transition: 0.3s;
}

.multiselect-caret,
.multiselect-clear-icon {
  height: 20px;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 20px;
}

.multiselect-caret {
  background-color: var(--ms-caret-color, #a4a4a4);
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 12px 0 0 !important;
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='%236418c3'%20viewBox='0%200%20256%20256'%3E%3Cpath%20d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,93.66-40,40a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L128,140.69l34.34-34.35a8,8,0,0,1,11.32,11.32Z'%3E%3C/path%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='%236418c3'%20viewBox='0%200%20256%20256'%3E%3Cpath%20d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,93.66-40,40a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L128,140.69l34.34-34.35a8,8,0,0,1,11.32,11.32Z'%3E%3C/path%3E%3C/svg%3E");
  pointer-events: none;
  position: relative;
  transform: rotate(0deg);
  transition: transform 0.3s;
  z-index: 10;
}

.multiselect-caret.is-open {
  pointer-events: auto;
  transform: rotate(180deg);
}

.multiselect-dropdown {
  -webkit-overflow-scrolling: touch;
  background: var(--ms-dropdown-bg, #fff);
  border: var(--ms-dropdown-border-width, 0px) solid
    var(--ms-dropdown-border-color, #fff);
  border-radius: 0 0 var(--ms-dropdown-radius, 14px)
    var(--ms-dropdown-radius, 14px);
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: calc(var(--ms-border-width, 1px) * -1);
  margin-top: calc(var(--ms-border-width, 1px) * -1);
  max-height: var(--ms-max-height, 10rem);
  outline: none;
  overflow-y: scroll;
  position: absolute;
  right: calc(var(--ms-border-width, 1px) * -1);
  transform: translateY(100%);
  z-index: 100;
  box-shadow: 0px 1px 28px 0px rgba(0, 0, 0, 0.12) !important;
}

.multiselect-dropdown.is-top {
  border-radius: var(--ms-dropdown-radius, 14px) var(--ms-dropdown-radius, 14px)
    0 0;
  bottom: auto;
  top: var(--ms-border-width, 1px);
  transform: translateY(-100%);
}

.multiselect-dropdown.is-hidden {
  display: none;
}

.multiselect-options {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}

.multiselect-group {
  margin: 0;
  padding: 0;
}

.multiselect-group-label {
  align-items: center;
  background: var(--ms-group-label-bg, #ffffff);
  box-sizing: border-box;
  color: var(--ms-group-label-color, #1f1f1f);
  cursor: default;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  justify-content: flex-start;
  line-height: var(--ms-group-label-line-height, 1.375);
  padding: 12px;
  text-align: left;
  text-decoration: none;
}

.multiselect-group-label.is-pointable {
  cursor: pointer;
}

.multiselect-group-label.is-pointed {
  background: var(--ms-group-label-bg-pointed, #ffcff2);
  color: var(--ms-group-label-color-pointed, #e328af);
}

.multiselect-group-label.is-selected {
  background: var(--ms-group-label-bg-selected, #e328af);
  color: var(--ms-group-label-color-selected, #ffffff);
}

.multiselect-group-label.is-disabled {
  background: var(--ms-group-label-bg-disabled, #f3f4f6);
  color: var(--ms-group-label-color-disabled, #d1d5db);
  cursor: not-allowed;
}

.multiselect-group-label.is-selected.is-pointed {
  background: var(--ms-group-label-bg-selected-pointed, #e328af);
  color: var(--ms-group-label-color-selected-pointed, #ffffff);
}

.multiselect-group-label.is-selected.is-disabled {
  background: var(--ms-group-label-bg-selected-disabled, #75cfb1);
  color: var(--ms-group-label-color-selected-disabled, #d1fae5);
}

.multiselect-group-options {
  margin: 0;
  padding: 0;
}

.multiselect-option {
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-size: var(--ms-option-font-size, 1rem);
  justify-content: flex-start;
  line-height: var(--ms-option-line-height, 1.375);
  padding: 12px !important;
  text-align: left;
  text-decoration: none;
  font-weight: 500;
  color: #1f1f1f;
}

.multiselect-option.is-pointed {
  background: var(--ms-option-bg-pointed, #f5eeff);
  color: var(--ms-option-color-pointed, #6418c3);
}

.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #6418c3);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect-option.is-disabled {
  background: var(--ms-option-bg-disabled, #fff);
  color: var(--ms-option-color-disabled, #d1d5db);
  cursor: not-allowed;
}

.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #6418c3);
  color: var(--ms-option-color-selected-pointed, #fff);
}

.multiselect-option.is-selected.is-disabled {
  background: var(--ms-option-bg-selected-disabled, #87dcc0);
  color: var(--ms-option-color-selected-disabled, #d1fae5);
}

.multiselect-no-options,
.multiselect-no-results {
  color: var(--ms-empty-color, #4b5563);
  padding: var(--ms-option-py, 0.5rem) var(--ms-option-px, 0.75rem);
}
</style>
