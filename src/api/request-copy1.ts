import { createContext, ReactNode, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { notification } from 'antd';
import Axios, { AxiosInstance, AxiosTransformer } from 'axios';
import qs from 'qs';
import {downloadData} from '@/lib/export';

type IRequestConfig = {
    completeRes: boolean;
};
// const errorPath = '/vrAdmin/login';
const errorPath = '/login';

console.log('baseurl:', import.meta.env.VITE_BASE_URL);
const axios = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + '',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.request.use((config) => {
    // Read token for anywhere, in this case directly from localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.accessToken = token;
    }

    return config;
});

// response interceptor
axios.interceptors.response.use(
    (response) => {
        // const {code, data, msg} = response.data;
        // const {completeRes, alertOnError = true} = response.config;
        const data = response.data;
        console.log('response:', response);
        if (response.status === 200) {
            return data;
            // return completeRes ? response.data : data;
        }

        notification.error({
            message: `请求错误 ${response.statusText}: ${response}`,
            description: data || response.statusText || 'Error',
        });

        if (response.status === 401) {
            window.location.href = errorPath;
        }

        return Promise.reject(new Error(response.statusText || 'Error'));
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

export const AxiosContext = createContext<AxiosInstance>(
    new Proxy(axios, {
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

const transformPagination = (pagination: any) => {
    if (!pagination) return;

    const page = pagination.current ? pagination.current : pagination.defaultCurrent;
    const pageSize = pagination.pageSize ? pagination.pageSize : pagination.defaultPageSize;

    // let offset = 0;
    // if (current && pageSize) {
    //     offset = (current - 1) * pageSize;
    // }

    return {
        page,
        rows: pageSize,
    }
}

const transformFilters = (filters: any) => {
    if (!filters) return;
    let result: any[] = [];
    for (let key in filters) {
        if (!filters[key] || filters[key] === null) continue;
        result = [...result, [key + ':eq:' + filters[key]]]
    }
    return result;
}

const transformSorter = (sorter: any) => {
    if (!sorter) return;

    let result = '';
    if (sorter.field && sorter.order) {
        let order: string = 'desc';
        if (sorter.order === 'ascend') order = 'asc';
        result = sorter.field + ' ' + order;;
    }

    return result;
}

type listParams = {
    limit?: number;
    offset?: number;
    filter?: string[];
    order?: string;
}
const useGetList = <T>(key: string, url: string, pagination?: any, filters?: any, sorter?: any) => {
    const axios = useAxios();

    const service = async () => {
        let params: listParams = {};
        const pageTemp = transformPagination(pagination);
        // const filters = transformFilters(filters);
        params = { ...pageTemp, ...filters  };
        const transformRequest: AxiosTransformer = (data, headers) => {
        }
        console.log('params: ', params);
        const data: T = await axios.get(
            `${url}`,
            {
                params,
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'repeat' })
                },
                transformRequest,
            }
        );

        return data;

    }
    return useQuery(key, () => service());

}

const useGetOne = <T>(key: string, url: string, params?: any, config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();

    const service = async () => {
        const data: T = await axios.get(
            `${url}`,
            {
                params
            }
        );
        if (config?.completeRes) {
            return data;
        }
        else {
            return data?.data;
        }
    }
    return useQuery(key, () => service());
}

// get query
const useQueryGet = <T, U>(url: string, config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return async (params: T) => {
        const data: U = await axios.get(
            `${url}`,
            {
                params
            }
        );
        if (config?.completeRes) {
            return data;
        }
        else {
            return data?.data;
        }
    };
}

// post body
const useCreate = <T, U>(url: string, config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (params: T) => {
        const data: U = await axios.post(
            `${url}`,
            params
        );
        if (config?.completeRes) {
            return data;
        }
        else {
            return data?.data;
        }
    });
}

// post query
const useCreateByQuery = <T, U>(url: string, config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (params: T) => {
        const data: U = await axios.post(
            `${url}`,
            {},
            {
                params
            }
        );
        if (config?.completeRes) {
            return data;
        }
        else {
            return data?.data;
        }
    });
}

const useUpdate = <T>(url: string,  config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (item: T) => {
        const data: T = await axios.patch(
            `${url}`,
            item
        );
        if (config?.completeRes) {
            return data;
        }
        else {
            return data?.data;
        }
    });
}

const useDelete = <T>(url: string, config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (id: number) => {
        const data: T = await axios.delete(
            `${url}?id=${id}`,
        );
        if (config?.completeRes) {
            return data;
        }
        else {
            return data?.data;
        }
    });
}

const useBatch = (url: string,  config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (ids: number[]) => {
        const data = await axios.post(
            `${url}`,
            { idList: ids },
        );
        if (config?.completeRes) {
            return data;
        }
        else {
            return data?.data;
        }
    });
}

const useUpload = (url: string,  config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (file: File) => {
        const data = await axios.post(
            url,
            file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        if (config?.completeRes) {
            return data;
        }
        else {
            return data?.data;
        }
    });
}

const useExport = (url: string,  config?: IRequestConfig = {completeRes: true}) => {
    const axios = useAxios();
    return async (params: T) => {
        const response: U = await axios.get(
            `${url}`,
            {
                params,
                headers: {
                    responseType: 'blob',
                }
            }
        );
        downloadData(response);
        // console.log('useExport response:', response);
        /*
        console.log('useExport data:', response.data);
        let headerContentType = '';
        if (response) {
            headerContentType = response.headers['content-type'];
        }
        else {
            throw response;
        }
        if (headerContentType.indexOf('application/json') !== -1) {
            throw response.data;
        }
        // application/vnd.ms-excel;charset=utf-8
        else if (headerContentType.indexOf('application/vnd.ms-excel') !== -1
            || headerContentType.indexOf('application/octet-stream') !== -1) {
            if (response.status === 200) {
                if (response.data) {
                    downloadData(response);
                }
                else {
                    notification.error({
                        message: `导出数据不存在${response.statusText}: ${response}`,
                        description: response.data || response.statusText || 'Error',
                    });
                }
            }
            else {
                throw response.data;
            }
        }
        else {
            throw response;
        }
        */
        // if (config?.completeRes) {
        //     return response;
        // }
        // else {
        //     return response?.data;
        // }
    };
}

export {
    useGetOne,
    useGetList,
    useUpdate,
    useCreate,
    useDelete,
    useBatch,
    useCreateByQuery,
    useQueryGet,
    useExport
};

export default axios;