import {
    atom,
    selector,
} from 'recoil';


export const menuListState = atom({
    key: 'menuListState',
    default: [],
});

export const permissionListState = atom({
    key: 'permissionListState',
    default: [],
});
