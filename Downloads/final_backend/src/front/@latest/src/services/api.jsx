const Api='http://localhost:7000/api/v1/users'

const getUser=async()=>{
    const resp=await fetch(Api)
    const data=await resp.json()
    return data
}
const postUser=async(user)=>{
    const resp=await fetch(Api,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    const data=await resp.json()
    return data
}
const patchUser=async(user,id)=>{
    const resp=await fetch(`${Api}/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    const data=await resp.json()
    return data
}
const deleteUser=async(id)=>{
    const resp=await fetch(`${Api}/${id}`,{
        method:"DELETE"
    })
    const data=await resp.json()
    return data

}
export {getUser,postUser,patchUser,deleteUser}