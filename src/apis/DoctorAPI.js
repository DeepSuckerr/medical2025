import $axios from "@/http/http";


export function addDoctorInfo(doctorData) {

    return $axios({
        method: "post",
        url: "/doctor/addDoctor",
        data: {
            name: doctorData.name,
            phone: doctorData.phoneNumber, // 注意这里使用 phoneNumber
            age: doctorData.age,
            sex: doctorData.sex,
            levelId: doctorData.levelId,
            typeId: doctorData.typeId,
            password: doctorData.pwd, // 将 pwd 映射到 password
        },

    })



}

export function updateDoctorInfo(doctorData) {
    return $axios({
        method: "post",
        url: "/doctor/updateDoctor",
        data: {
            id: doctorData.id, // 添加医生ID
            name: doctorData.name,
            phone: doctorData.phoneNumber,
            age: doctorData.age,
            sex: doctorData.sex,
            levelId: doctorData.levelId,
            typeId: doctorData.typeId,


        }
    })
}

export function deleteDoctorInfo(id) {
    return $axios({
        method: "DELETE",
        url: "/doctor/deleteDoctor",
        params: {
            id: id
        }
    })
}




// 获取所有医生级别
export function getAllLevels() {
    return $axios({
        method: "get",
        url: "/doctor/level/getAll",
    })
}

// 获取所有科室
export function getAllTypes() {
    return $axios({
        method: "get",
        url: "/doctor/type/getAll",
    })
}