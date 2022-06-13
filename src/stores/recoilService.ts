import {IButtonItem} from '@/models/menu';
import defaultSubject from './defaultSubject';
import {
  TOPIC_GET_USER_INFO,
  TOPIC_GET_USER_BASE_INFO,
  TOPIC_GET_USER_MENU_TREE,
  TOPIC_GET_SYSTEM_MENU_TREE,
  TOPIC_GET_PERMISSION_LIST
} from './observerTopics';

const getUserBaseInfo = (userInfo) => {
  defaultSubject.notify(TOPIC_GET_USER_BASE_INFO, userInfo);
};

const getUserInfo = (userInfo) => {
  defaultSubject.notify(TOPIC_GET_USER_INFO, userInfo);
};

const getUserMenuTree = currentMenuTree => {
  defaultSubject.notify(TOPIC_GET_USER_MENU_TREE, currentMenuTree);
};

const getSystemMenuTree = systemMenuTree => {
  defaultSubject.notify(TOPIC_GET_SYSTEM_MENU_TREE, systemMenuTree);
};

const getPermissionList = (permissionList: IButtonItem[]) => {
  const authCodeList = permissionList.map(item => {
    const splitList = item.code?.split(':') ?? [];
    const opCoode = splitList?.[1];
    return opCoode;
  });
  defaultSubject.notify(TOPIC_GET_PERMISSION_LIST, authCodeList);
};

export const recoilService = {
  getUserInfo,
  getUserMenuTree,
  getSystemMenuTree,
  getPermissionList
};
export default recoilService;
