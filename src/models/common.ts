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
export interface IPCRParams {
    provincecode?: string;
    citycode?: string;
};