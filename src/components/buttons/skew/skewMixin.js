export default {
  props: {
    text: {
      type: [String, Number],
      default: null,
    },

    color: {
      type: String,
      default: 'blue',
      validator(color) {
        return ['red', 'blue', 'green', 'orange'].indexOf(color) !== -1;
      },
    },

    type: {
      type: String,
      default: 'button',
      validator(type) {
        return ['button', 'pagination'].indexOf(type) !== -1;
      },
    },
  },

  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
