import API from './axios'
export const busregister = async(data)=>{
    const res=await API.post("/bus/registerbus",data);
    await res.save();
}
export const busassign = async(data)=>{
    const res=await API.post('/bus/busassign',data);
    await res.save();
}
export const bustrips=async(data)=>{
    const res=await API.post('/bus/bustrips',data);
    await res.save();
}
