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




