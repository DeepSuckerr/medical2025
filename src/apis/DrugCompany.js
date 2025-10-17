import $axios from "@/http/http";


export function addCompanyInfo(companyName, companyPhone) {

    return $axios({
        method: 'POST',
        url: '/drug/addCompany',
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
        method: 'DELETE',
        url: "/drug/deleteCompany/" + companyId,
        headers:{
            token : localStorage.getItem("token"),
        }
    })
}



export function handleModifyCompany(companyId,companyName,companyPhone) {
    console.log()
    return $axios({
        method: 'POST',
        url: "/drug/updateCompany",
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
