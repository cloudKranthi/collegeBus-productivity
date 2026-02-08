import API from'./axios'
export const tripdata=async (cursor=null)=>{
    const path=cursor?`&cursor=${cursor}`:'';
    const res = await  API.post(`/trip/trips?limit=10${path}`)
    return res.data;
}