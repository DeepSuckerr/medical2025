import axios from "axios";
import $axios from "@/http/http";


export  function  addCompanyInfo(companyName,companyPhone){

    return $axios({
        method: 'POST',
        url: '/drugCompany/addCompany',
        data:{
            companyName:companyName,
            companyPhone:companyPhone

        }
    })



}



