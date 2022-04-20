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

// export const permissionListState = selector({
//     key: "permissionListState",
//     get: ({ get }) => {
//       const count = get(countState);
//       return count ** 2;
//     },
//   });
