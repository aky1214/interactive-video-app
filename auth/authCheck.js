
const user1 =  function usercheck(){
    if(process.client){
        var chek = localStorage.getItem('user')
        return chek
    }
}

module.exports = user1