const state = {
    patents: {
        "B": {
          owns: false,
          x: "-100%",
          y: "0%"
        },
        "J": {
          owns: false,
          x: "-100%",
          y: "-399.6%"
        },
        "K": {
          owns: false,
          x: "0%",
          y: "-499.6%"
        },
        "Q": {
          owns: false,
          x: "0%",
          y: "-799.3%"
        },
        "V": {
          owns: false,
          x: "-100%",
          y: "-999.2%"
        },
        "X": {
          owns: false,
          x: "-100%",
          y: "-1099.1%"
        },
        "Z": {
          owns: false,
          x: "-100%",
          y: "-1199%"
        }
    }
  }
  
  const mutations = {
    updatePatent(state, payload) {
        console.log(payload)
      Object.assign(state.patents[payload.id], payload.updates)
    }
  }
  
  const actions = {
    updatePatent({ commit }, payload) {
      commit('updatePatent', payload);
    }
  }
  
  const getters = {
    patents: (state) => {
      return state.patents
    }
  }
  
  export default {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
  }