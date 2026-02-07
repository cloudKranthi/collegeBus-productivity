import API from './axios'
export const busregister = async(data)=>{
    const res=await API.post("/bus/registerbus",data);
    await res.data;
}
export const busassign = async(data)=>{
    const res=await API.post('/bus/busassign',data);
    await res.data;
}
export const bustrips=async(data)=>{
    const res=await API.post('/bus/bustrips',data);
    await res.data;
}
export const busStudentDetails=async(cursor=null)=>{
 const url = cursor?`&cursor=${cursor}`:'';
 const res= await API.post(`/bus/busStudentDetails&limit=10${url}`);
 await res.data
}
