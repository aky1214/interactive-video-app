export default function ({redirect}){
    if(process.client){
        let loginUser= JSON.parse(localStorage.getItem('user'));
        console.log(loginUser)
        if(loginUser == null || loginUser == undefined){
            this.$router.push(
                this.$route.query.redirectFrom || {
                    path: "/login",
                }
                );
                return redirect('/login')
            }
    
    }

}