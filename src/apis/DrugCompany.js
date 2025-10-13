import $axios from "@/http/http";


export function addCompanyInfo(companyName, companyPhone) {

    return $axios({
        method: 'POST',
        url: '/drugCompany/addCompany',
        data: {
            companyName: companyName,
            companyPhone: companyPhone

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
        }
    })
}
