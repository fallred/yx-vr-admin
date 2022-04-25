import React, { FC, useState, useEffect, useImperativeHandle } from 'react';
import { useRecoilValue } from "recoil";
import { Tree } from 'antd';
import {IFuncMenuTree} from '@/models/menu.interface';
import { systemMenuTreeState } from "@/stores/recoilState";
import { genFuncTree, genSelectedAuthTree } from "@/lib/tree-util";
import { API } from '@/models/typings';
import styles from "./index.module.less";

interface AuthTreeProps {
    leftCheckedKeys: API.IId[];
    rightCheckedKeys: API.IId[];
}

const AuthTree: FC<AuthTreeProps> = (props) => {
    const { leftCheckedKeys, rightCheckedKeys, cRef } = props;
    const systemMenuTree = useRecoilValue(systemMenuTreeState);
    const [funcMenuTree, setFuncMenuTree] = useState<IFuncMenuTree>([]);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const [expandedKeys1, setExpandedKeys1] = useState<React.Key[]>([]);
    const [checkedKeys1, setCheckedKeys1] = useState<React.Key[]>([]);
    const [selectedKeys1, setSelectedKeys1] = useState<React.Key[]>([]);
    const [autoExpandParent1, setAutoExpandParent1] = useState<boolean>(true);
    
    const updateFuncMenuTree = (menuIds: API.IId[]) => {
        const computedTree = genFuncTree('', systemMenuTree, menuIds);
        setFuncMenuTree(computedTree);
    };
    const onExpand = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue: React.Key[], info: any) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
        const selectedKeys = info.halfCheckedKeys.concat(checkedKeysValue);
        updateFuncMenuTree(selectedKeys);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const onExpand1 = (expandedKeysValue: React.Key[]) => {
        console.log('onExpand1', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys1(expandedKeysValue);
        setAutoExpandParent1(false);
    };

    const onCheck1 = (checkedKeysValue: React.Key[], info: any) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys1(checkedKeysValue);
    };

    const onSelect1 = (selectedKeysValue: React.Key[], info: any) => {
        console.log('onSelect', info);
        setSelectedKeys1(selectedKeysValue);
    };
    useImperativeHandle(cRef, () => ({
        // changeVal 就是暴露给父组件的方法
        getValue: () => {
            const selectedTree = genSelectedAuthTree(systemMenuTree, checkedKeys, checkedKeys1);
            return selectedTree;
        },
    }));
    useEffect(() => {
        setCheckedKeys(leftCheckedKeys);
        updateFuncMenuTree(leftCheckedKeys);
    }, [leftCheckedKeys]);
    useEffect(() => {
        setCheckedKeys1(rightCheckedKeys);
    }, [rightCheckedKeys]);
    return (
        <div className={styles.container}>
            <Tree
              className={styles.menuTree}
              key="authTree1"
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={systemMenuTree}
              fieldNames={{title: 'menuName', key: 'menuId', children: 'children'}}
            />
    
            <Tree
                className={styles.funcTree}
                key="authTree2"
                checkable
                onExpand={onExpand1}
                expandedKeys={expandedKeys1}
                autoExpandParent={autoExpandParent1}
                onCheck={onCheck1}
                checkedKeys={checkedKeys1}
                onSelect={onSelect1}
                selectedKeys={selectedKeys1}
                treeData={funcMenuTree}
                fieldNames={{title: 'menuName', key: 'id', children: 'children'}}
            />
        </div>
      );
};
export default AuthTree;
