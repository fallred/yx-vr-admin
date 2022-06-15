import { atom } from 'recoil';
import { Locale, User } from '@/models/user';
import { IUser } from '@/models/user-mng';
import { IShopStore } from '@/models/shop-store';
import { getGlobalState } from '@/models';

const initialState: User = {
    ...getGlobalState(),
    noticeCount: 0,
    locale: 'zh-cn',
    newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true,
    logged: false,
    menuList: [],
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

export const userInfoState = atom({
  key: 'userInfoState',
  default: {},
});

export const userMenuTreeState = atom({
  key: 'userMenuTreeState',
  default: [],
});

export const systemMenuTreeState = atom({
  key: 'systemMenuTreeState',
  default: [],
});

export const permissionListState = atom({
  key: 'permissionListState',
  default: [],
});
