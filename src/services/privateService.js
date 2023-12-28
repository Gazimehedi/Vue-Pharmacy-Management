import { axiosPrivate, setPrivateHeaders } from "./axiosInstense";
setPrivateHeaders()
export default{
    getAll(url){
        return axiosPrivate.get(url);
    },
    create(url,payload){
        return axiosPrivate.post(url, payload);
    },
    update(url, payload){
        return axiosPrivate.put(url, payload);
    },
    delete(url){
        return axiosPrivate.delete(url);
    },
}