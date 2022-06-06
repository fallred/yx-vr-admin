export type IValue = string | number;
export enum PageFuncEnum {
    'LIST' = 'list',
    'ADD' = 'add',
    'EDIT' = 'edit',
    'DELETE' = 'delete',
}

export enum StatusEnum {
}

export enum SexEnum {
    'FEMALE' = 0,
    'MALE' = 1,
}

export interface IProvince {
    id: number;
    code: string;
    name: string;
}
export interface ICity {
    id: number;
    code: string;
    name: string;
    provincecode: string;
}
export interface IArea {
    id: number;
    code: string;
    name: string;
    citycode: string;
}

export interface IOption {
    label: IValue;
    value: IValue;
}

export interface IDataStastic {
    key: string;
    value: string;
    name: string;
    radio: number;
}
export interface IPCRParams {
    provincecode?: string;
    citycode?: string;
};

export enum TimeRangeEnum {
    TODAY = 'today',
    YESTERDAY = 'yesterday',
    LAST1WEEK = 'last-one-week',
    LAST1MONTH = 'last-one-month',
    LAST3MONTH = 'last-three-month',
    LAST6MONTH = 'last-six-month',
    LAST1YEAR = 'last-one-year',
    LAST2YEAR = 'last-two-year',
    LAST3YEAR = 'last-three-year',
    LAST30DAYS = 'last-thirty-days',
}