import { createContext, ReactNode, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { notification } from 'antd';
import Axios, { AxiosInstance, AxiosTransformer } from 'axios';
import qs from 'qs';
import cloneDeep from 'lodash/cloneDeep';

// const errorPath = '/vrAdmin/login';
const errorPath = '/login';
console.log('baseurl:', import.meta.env.VITE_BASE_URL);
export const opt = {
    timeout: 10000,
    method: 'post',
    withCredentials: true,
    baseURL: import.meta.env.VITE_BASE_URL + '',
    headers: {
        'content-type': 'application/json;charset=UTF-8',
    },
    params: {
        _: new Date().valueOf(),
        // login_key: (function() {
        //     const c = document.cookie
        //         .split(';')
        //         .map(s => s.trim())
        //         .filter(s => /^robot_center_login_key/.test(s));
        //     return c.length > 0 ? c[0].split('=')[1].trim() : '';
        // })()
    },
};

const optTemp = cloneDeep(opt);
const $axios = Axios.create(optTemp);

addInterceptors($axios);

export function addInterceptors(axiosInstance) {
    axiosInstance.interceptors.request.use((config) => {
        // Read token for anywhere, in this case directly from localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.accessToken = token;
        }
        return config;
    });
    axiosInstance.interceptors.response.use(
        response => {
            console.log('response:', response);
            return response;
            // const {status, data, msg} = response.data;
            // const {completeRes = true, alertOnError = true} = response.config;
            // const codeOK = 200;
            // const codeUnauth = 712;
            // switch (status) {
            //     case codeOK:
            //         // return completeRes ? response.data : data;
            //         return response;
            //     case codeUnauth:
            //         window.location.href = '/login';
            //         break;
            //     default:
            //         if (alertOnError) {
            //             notification.error({
            //                 message: `请求错误 ${response.statusText}: ${response}`,
            //                 description: data || response.statusText || 'Error',
            //             });
            //         }
            //         return Promise.reject(new Error(response.statusText || 'Error'));
            //         // return Promise.reject(completeRes ? response.data : data);
            // }
        },
        (error) => {
            console.log('err:', error, error.response); // for debug
            let msg = "请求错误";
            if (error.response && error.response.status) {
                switch (error.response.status) {
                    // 401: 未登录                
                    // 未登录则跳转登录页面，并携带当前页面的路径                
                    // 在登录成功后返回当前页面，这一步需要在登录页操作。 
                    case 401:
                        window.location.href = errorPath;
                        break;
                    // 403 token过期                    
                    // 登录过期对用户进行提示                    
                    // 清除本地token和清空vuex中token对象                    
                    // 跳转登录页面   
                    case 403:
                        window.location.href = errorPath;
                        break;
                    // 404请求不存在                
                    case 404:
                        notification.error({
                            message: `请求不存在`,
                            description: error.response.data?.msg || 'Error',
                        });
                        break;
                    case 406:
                        notification.error({
                            message: `请求参数有误`,
                            description: error.response.data?.msg || 'Error',
                        });
                        break;
                    default:
                        notification.error({
                            message: `请求错误`,
                            description: error.response.data?.msg || 'Error',
                        });
    
                }
            }
    
            // throw new Error(error);
            return Promise.reject(error);
        },
    );
}

export const AxiosContext = createContext<AxiosInstance>(
    new Proxy($axios, {
        apply: () => {
            throw new Error('You must wrap your component in an AxiosProvider');
        },
        get: () => {
            throw new Error('You must wrap your component in an AxiosProvider');
        },
    }),
);

export const useAxios = () => {
    return useContext(AxiosContext);
}
export default $axios;
