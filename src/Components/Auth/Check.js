const axios =require("axios")
export var Verify = async  () => {
    const response = await axios.post("http://admin.psej.xyz/auth/test", {"token": localStorage.getItem("usertoken")}); 
    if(!response.data.success){
        return true
    }
    else {
        return false
    }
}