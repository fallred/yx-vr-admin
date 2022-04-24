import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import defaultSubject from './defaultSubject';
import {
  TOPIC_GET_USER_INFO,
  TOPIC_GET_USER_MENU_TREE,
  TOPIC_GET_SYSTEM_MENU_TREE,
  TOPIC_GET_PERMISSION_LIST
} from './observerTopics';
import {
  userState,
  userMenuTreeState,
  systemMenuTreeState,
  permissionListState
} from './recoilState';

export const RecoilObserver = () => {
  const setUser = { topic: TOPIC_GET_USER_INFO, cb: useSetRecoilState(userState) };
  const setUserMenuTree = { topic: TOPIC_GET_USER_MENU_TREE, cb: useSetRecoilState(userMenuTreeState) };
  const setSystemMenuTree = { topic: TOPIC_GET_SYSTEM_MENU_TREE, cb: useSetRecoilState(systemMenuTreeState) };

  const setPermissionList = { topic: TOPIC_GET_PERMISSION_LIST, cb: useSetRecoilState(permissionListState) };
  
  const observers = [setUser, setUserMenuTree, setSystemMenuTree, setPermissionList];

  React.useEffect(() => {
    observers.forEach((observer) => {
      defaultSubject.attach(observer);
    });
    return () => {
      observers.forEach((observer) => {
        defaultSubject.detach(observer);
      });
    };
  }, [observers]);

  return null;
};

export default RecoilObserver;
