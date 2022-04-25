export enum PageFuncEnum {
    'LIST' = 'list',
    'ADD' = 'add',
    'EDIT' = 'edit',
    'DELETE' = 'delete',
}

export enum StatusEnum {
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