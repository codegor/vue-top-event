import Vue from 'vue';

let strategies = Vue.config.optionMergeStrategies;
strategies.provide = strategies.data;

export default {
  provide() {
    return {
      topHook: (name, data) => this.$emitHook(name, data)
    }
  },
  data() {
    return {
      $hooks: {}
    };
  },
  methods: {
    /**
     * who should register the hook? Component, who provides the hook, user of the component can only subscribe to the hook
     * @param name <string>
     * @param fn <function> ex: fn(data) {}
     */
    $onHook(name, fn){
      if(!this.$data.$hooks.hasOwnProperty(name))
        this.$data.$hooks[name] = [];
      this.$data.$hooks[name].push(fn);
    },

    /**
     * @param name <string>
     * @param data <any>
     * @returns {Promise<any>}
     */
    $emitHook(name, data) {
      // if (this.$debug) console.log('Hook:', name, data);
      if(!this.$data.$hooks.hasOwnProperty(name))
        return new Promise(resolve => resolve(data));

      return new Promise((resolve, reject) => {
        let hs = this.$data.$hooks[name];
        let r = new Promise(resolve => resolve(data));
        // let c = 0;
        for(let i in hs){
          let h = hs[i];
          r = r.then(prev => {
            let t = h(prev);
            // if (this.$debug) console.log('Hook then:', prev, c++, t);
            return t;
          });
        }
        r.then(res => {
          // if (this.$debug) console.log('Hook finish:', res);
          resolve(res);
        });
        r.catch(error => {
          reject(error);
        });
      });
    }
  }
};
