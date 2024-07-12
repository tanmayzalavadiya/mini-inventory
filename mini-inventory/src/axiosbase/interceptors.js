import axios from "axios";

const authFetch= axios.create({
    baseURL:"http://localhost:8080",
    withCredentials:true,
})

authFetch.interceptors.request.use((request)=>{

    return request;
},(error)=>{
    
    return Promise.reject(error);

})

authFetch.interceptors.response.use((response)=>{

    return response;
},(error)=>{

    console.log(error);

});

export default authFetch;