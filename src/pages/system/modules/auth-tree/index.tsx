import React, { FC, useState, useEffect, useImperativeHandle } from 'react';
import { useRecoilValue } from "recoil";
import { Tree } from 'antd';
import {IFuncMenuTree} from '@/models/menu';
import { systemMenuTreeState } from "@/stores/recoilState";
import { genFuncTree, genSelectedAuthTree, genFuncCheckedKeys } from "@/lib/tree-util";
import { API } from '@/models/typings';
import WithCompLoad from '@/components/with-load/index';
import styles from "./index.module.less";

interface AuthTreeProps {
    leftCheckedKeys: API.IId[];
    rightCheckedKeys: API.IId[];
    halfCheckedKeys: API.IId[];
}

const AuthTree: FC<AuthTreeProps> = (props) => {
    const { leftCheckedKeys, rightCheckedKeys, halfCheckedKeys, cRef } = props;
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
    const WithLoadTree = WithCompLoad(Tree);
    const updateFuncMenuTree = (menuIds: API.IId[]) => {
        const computedTree = genFuncTree('', systemMenuTree, menuIds);
        setFuncMenuTree(computedTree);
        return computedTree;
    };
    const onExpand = (expandedKeysValue: React.Key[]) => {
        // console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue: React.Key[], info: any) => {
        // console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
        const selectedKeys = info.halfCheckedKeys.concat(checkedKeysValue);
        const funcMTree = updateFuncMenuTree(selectedKeys);
        console.log('funcMTree:', funcMTree);
        console.log('checkedKeys1:', checkedKeys1);
        const funcCheckedKeys = genFuncCheckedKeys(funcMTree, checkedKeys1);
        console.log('funcCheckedKeys:', funcCheckedKeys);
        setSelectedKeys1(funcCheckedKeys);
    };

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        // console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const onExpand1 = (expandedKeysValue: React.Key[]) => {
        // console.log('onExpand1', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys1(expandedKeysValue);
        setAutoExpandParent1(false);
    };

    const onCheck1 = (checkedKeysValue: React.Key[], info: any) => {
        // console.log('onCheck', checkedKeysValue);
        setCheckedKeys1(checkedKeysValue);
    };

    const onSelect1 = (selectedKeysValue: React.Key[], info: any) => {
        // console.log('onSelect', info);
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
        // 根据leftCheckedKeys，计算出 左边树选中/半选的节点。
        updateFuncMenuTree(halfCheckedKeys);
    }, [leftCheckedKeys, halfCheckedKeys]);
    useEffect(() => {
        setCheckedKeys1(rightCheckedKeys);
    }, [rightCheckedKeys]);
    return (
        <div className={styles.container}>
            <div key="authTree1" className={styles.menuTree}>
                <WithLoadTree
                    list={systemMenuTree}
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
            </div>
            <div key="authTree2" className={styles.funcTree}>
                <WithLoadTree
                    list={funcMenuTree}
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
        </div>
      );
};
export default AuthTree;
