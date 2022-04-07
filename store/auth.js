export const state = () => ({
    user: null,
    pass: null
  })
  
  export const mutations = {
    setUser(state, user) {
      state.user = user
    },
    setPass(state, pass) {
      state.pass = pass
    }
  }