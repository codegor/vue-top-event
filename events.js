import Vue from 'vue';

let strategies = Vue.config.optionMergeStrategies;
strategies.provide = strategies.data;

export default {
  provide() {
    return {
      topEvent: (name, ...params) => this.$emit(name, ...params)
    }
  }
};
