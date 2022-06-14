import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Drawer, Space, Button } from "antd";
import {IUser} from '@/models/user-mng';
import {IShopStore, ShopStoreStatusEnum} from '@/models/shop-store';
import ShopTableCard from '@/pages/store-mng/shop-table-card';
import {ShopStoreStatusMap} from '@/enums/common';

interface ShopSetDrawerProps {
    visible: boolean;
    current: Partial<IUser> | undefined;
    onSubmit: (values: IShopStore) => void;
    onCancel: () => void;
  }

const ShopSetDrawer: FC<ShopSetDrawerProps> = props => {
    const shopTableRef = useRef<React.Component>(null);
    const { visible, current, onCancel, onSubmit } = props;
    const [selectedApps, setSelectedApps] = useState<string[]>([]);
    useEffect(() => {
        const appIds = current?.apps?.map(item => item.appId);
        setSelectedApps(appIds);
    }, [current]);
    const handleSubmit = () => {
        const appIdList = shopTableRef?.current?.getValue();
        const appIdStr = appIdList.join(',');
        console.log('appIdList:', appIdList);
        if (appIdList.length === 0) {
            message.error("请选择门店！");
            return;
        }
        if (onSubmit) {
            onSubmit({
                appIds: appIdStr,
                userId: current.id,
            });
        }
    };
    const handleCancel = () => {
        onCancel();
    };
    return (
        <Drawer
            className="shop-set-drawer"
            title="数据权限设置"
            width={800}
            onClose={handleCancel}
            visible={visible}
            bodyStyle={{ paddingBottom: 0 }}
            extra={
                <Space>
                  <Button onClick={handleCancel}>取消</Button>
                  <Button onClick={handleSubmit} type="primary">保存</Button>
                </Space>
            }
        >
            {
                visible ? 
                <ShopTableCard
                    filterType=""
                    selectedApps={selectedApps}
                    showSearch={false}
                    showTableTitle={false}
                    shopTableRef={shopTableRef}
                /> : null
            }
            
        </Drawer>
    );
};

export default ShopSetDrawer;