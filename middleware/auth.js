import user1 from "../auth/authCheck"
export default function({ redirect, store }) {
    const isAuthenticated = store.state.auth.user ? true : false
    if(!user1()){
      if (!isAuthenticated) {
        redirect({ name: 'login' })
      }      
    }
  }