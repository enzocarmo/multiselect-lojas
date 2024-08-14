export default {
  editor: {
    label: {
      en: "MultiSelect Lojas",
    },
  },
  properties: {
    data: {
      label: {
        en: "Data",
      },
      type: "Array",
      defaultValue: [],
      bindable: true,
      section: "Settings"
    },
     required: {
            type: 'OnOff',
            label: {
                en: 'Required',
                fr: 'Required',
            },
            defaultValue: false,
            bindable: true,
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the input is required: `true | false`',
            },
            /* wwEditor:end */
        }
  },
  triggerEvents: [
    { name: 'change', label: { en: 'Change' }, event: { value: '' } },
  ],
};
