import defaultSubject from './defaultSubject';
import {
  TOPIC_GET_USER_INFO,
  TOPIC_GET_USER_MENU_TREE,
  TOPIC_GET_SYSTEM_MENU_TREE,
  TOPIC_GET_PERMISSION_LIST
} from './observerTopics';

const getUserInfo = (userInfo) => {
  defaultSubject.notify(TOPIC_GET_USER_INFO, userInfo);
};

const getUserMenuTree = currentMenuTree => {
  defaultSubject.notify(TOPIC_GET_USER_MENU_TREE, currentMenuTree);
};

const getSystemMenuTree = systemMenuTree => {
  defaultSubject.notify(TOPIC_GET_SYSTEM_MENU_TREE, systemMenuTree);
};

const getPermissionList = (permissionList) => {
  defaultSubject.notify(TOPIC_GET_PERMISSION_LIST, permissionList);
};

export const recoilService = {
  getUserInfo,
  getUserMenuTree,
  getSystemMenuTree,
  getPermissionList
};
export default recoilService;
