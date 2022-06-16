import { ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { notification } from 'antd';
import { AxiosTransformer } from 'axios';
import qs from 'qs';
import {downloadData} from '@/lib/export';
import {useAxios} from './config';

// const noAuthPath = '/vrAdmin/login';
const noAuthPath = '/login';

const transformPagination = (pagination: any) => {
    if (!pagination) return;

    const page = pagination.current ? pagination.current : pagination.defaultCurrent;
    const pageSize = pagination.pageSize ? pagination.pageSize : pagination.defaultPageSize;
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
                completeRes: true,
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
                params,
            }
        );
        return data;
        // if (config?.completeRes) {
        //     return data;
        // }
        // else {
        //     return data?.data;
        // }
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
        return data;
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
        return data;
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
        return data;
    });
}

const useUpdate = <T>(url: string,  config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (item: T) => {
        const data: T = await axios.patch(
            `${url}`,
            item
        );
        return data;
    });
}

const useDelete = <T>(url: string, config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (id: number) => {
        const data: T = await axios.delete(
            `${url}?id=${id}`,
        );
        return data;
    });
}

const useBatch = (url: string,  config?: IRequestConfig = {completeRes: false}) => {
    const axios = useAxios();
    return useMutation(async (ids: number[]) => {
        const data = await axios.post(
            `${url}`,
            { idList: ids },
        );
        return data;
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
        return data;
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
                },
                completeRes: true,
            }
        );
        // downloadData(response);
        // console.log('useExport response:', response);
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
