import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import defaultSubject from './defaultSubject';
import { TOPIC_GET_USER_INFO, TOPIC_GET_MENU_LIST, TOPIC_GET_PERMISSION_LIST } from './observerTopics';
import { userState, menuListState, permissionListState } from './recoilState';

export const RecoilObserver = () => {
  const setUser = { topic: TOPIC_GET_USER_INFO, cb: useSetRecoilState(userState) };
  const setMenuList = { topic: TOPIC_GET_MENU_LIST, cb: useSetRecoilState(menuListState) };
  const setPermissionList = { topic: TOPIC_GET_PERMISSION_LIST, cb: useSetRecoilState(permissionListState) };

  const observers = [setUser, setMenuList, setPermissionList];

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
