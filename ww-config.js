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
  },
  triggerEvents: [
    { name: 'change', label: { en: 'Change' }, event: { value: '' } },
  ],
};
