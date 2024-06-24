import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

    export function AxiosIntercepter(props : any){
        let navigate = useNavigate();

        useEffect(() =>{
            axios.interceptors.response.use(response => {
                return response;
              }, (error : AxiosError<any>) => {
                
                switch(error.response?.status){
                  case 400 : 
                  if(error.response?.data.message) {
                    const errors = error.response?.data.message.split('; ').filter((message:string) => message !== '');
                    throw errors;
                  }
                  
                  toast.error(error.response.data.message , {theme : 'colored'});
                  break;
                  case 500 :
                    navigate('server-error',{ state : {error : error.response?.data.message}});
                    break;
                 
              
                  default :
                  if (error.code === "ERR_NETWORK"){
                    navigate('not-found',{ state : {error : error.response?.data.message}});
                 }
                 else{
                    toast.error(error.message , {theme : 'dark'});
                 }
                }
              
                console.log('interceptor is called')
                return Promise.reject(error);
              }, {synchronous : true})
        },[]);
        
        

          return props.children;
    }