import API from "./axios";
export  const tripcreate=async (data)=>{
const res=await API.post("/trip/tripcreate",data);
await res.data;
}
export const tripTransiction =async(data)=>{
    const res= await API.post('/trip/tripTransiction',data);
    await res.data;
}
export const tripCancel = async(data)=>{
    const res=await API.post('/trip/tripCancel',data);
    await res.data;
}
export const getalltrips=async(data)=>{
    const res=await API.post('/trip/trips',data);
    await res.data;
}