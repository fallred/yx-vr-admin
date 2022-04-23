import { atom } from 'recoil';

import { LoginParams, Role } from '@/models/login';
import { Locale, User } from '@/models/user';
import { getGlobalState } from '@/models';

const initialState: User = {
    ...getGlobalState(),
    noticeCount: 0,
    locale: (
        localStorage.getItem('locale')! 
        || (navigator.languages && navigator.languages[0]) 
        || navigator.language ||'en-us') as Locale,
    newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true,
    logged: false,
    menuList: [],
    role: (localStorage.getItem('userName') || '') as Role,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    accessToken: localStorage.getItem('accessToken') || '',
    userName: localStorage.getItem('userName') || '',
    userAccount: localStorage.getItem('userAccount') || '',
    appId: localStorage.getItem('appId') || '',
    identity_type: localStorage.getItem('identity_type') || '',
};

export const userState = atom({
    key: 'userState',
    default: initialState,
});

export const menuListState = atom({
  key: 'menuListState',
  default: [],
});

export const permissionListState = atom({
  key: 'permissionListState',
  default: [],
});
