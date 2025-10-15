import $axios from "@/http/http";


export function addCompanyInfo(companyName, companyPhone) {

    return $axios({
        method: 'POST',
        url: '/drugCompany/addCompany',
        data: {
            companyName: companyName,
            companyPhone: companyPhone

        },
        headers:{
            token : localStorage.getItem("token"),
        }
    })
}


export function deleteCompanyById(companyId) {
    console.log(companyId)
    return $axios({
        method: 'POST',
        url: "/drugCompany/deleteCompany",
        params: {
            companyId : companyId
        },
        headers:{
            token : localStorage.getItem("token"),
        }
    })
}



export function handleModifyCompany(companyId,companyName,companyPhone) {
    console.log()
    return $axios({
        method: 'POST',
        url: "/drugCompany/updateCompany",
        data: {
            companyId: companyId,
            companyName : companyName,
            companyPhone : companyPhone

        },
        headers:{
            token : localStorage.getItem("token"),
        }

    })
}
