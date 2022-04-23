import defaultSubject from './defaultSubject';
import { TOPIC_GET_USER_INFO, TOPIC_GET_MENU_LIST, TOPIC_GET_PERMISSION_LIST } from './observerTopics';

const getUserInfo = (userInfo) => {
  defaultSubject.notify(TOPIC_GET_USER_INFO, userInfo);
};

const getMenuList = (menuList) => {
  defaultSubject.notify(TOPIC_GET_MENU_LIST, menuList);
};

const getPermissionList = (permissionList) => {
  defaultSubject.notify(TOPIC_GET_PERMISSION_LIST, permissionList);
};

export const recoilService = { getUserInfo, getMenuList, getPermissionList };
export default recoilService;
