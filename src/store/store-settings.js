const state = {
  settings: {
    'Dictionary': {
      title: 'Dictionary',
      caption: '',
      options: [
        {
          label: 'NWL 2018',
          value: 0
        },
        {
          label: 'CSW 2019',
          value: 1
        }
      ],
      selected: 0
    },
    'Ability': {
      title: 'Doubling Ability Behavior',
      caption: 'For the B, J, and K patents and Q',
      options: [
        {
          label: 'Multiply',
          value: 0
        },
        {
          label: 'Add',
          value: 1
        },
        {
          label: '2x Max',
          value: 2
        }
      ],
      selected: 0
    }
  }
}

const mutations = {
  updateSetting(state, payload) {
    Object.assign(state.settings[payload.id], payload.updates)
  }
}

const actions = {
  updateSetting({ commit }, payload) {
    commit('updateSetting', payload);
  }
}

const getters = {
  settings: (state) => {
    return state.settings
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}