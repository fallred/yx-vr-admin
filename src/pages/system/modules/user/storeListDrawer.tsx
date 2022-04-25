import { Drawer, List, Avatar, Divider, Col, Row, Rate, Descriptions } from 'antd';
import {IUser} from '@/models/user.interface';
import {IShopStore} from '@/models/shop-store.interface';
import {ShopStoreStatusMap} from '@/enums/common';

interface OperationDrawerProps {
    visible: boolean;
    current: Partial<IUser> | undefined;
    onSubmit: (values: IUser) => void;
    onCancel: () => void;
}

const StoreItem = (store: IShopStore) => {
    const addressFormat = () => {
        const addrInfo = [
            store.province ?? '--',
            store.city ?? '--',
            store.district ?? '',
            store.address ?? ''
        ];
        return addrInfo.join('-');
    };
    return (
        <Descriptions title={store.appId} key={store.appId}>
            <Descriptions.Item label="门店名称">{store.nm}</Descriptions.Item>
            <Descriptions.Item label="门店编码">{store.code}</Descriptions.Item>
            <Descriptions.Item label="地址">{addressFormat}</Descriptions.Item>
            <Descriptions.Item label="加盟商">{store.franchisee}</Descriptions.Item>
            <Descriptions.Item label="店长">{store.manager}</Descriptions.Item>
            <Descriptions.Item label="合伙人">{store.partner}</Descriptions.Item>
            <Descriptions.Item label="状态">
                {ShopStoreStatusMap.get(store.status)}
            </Descriptions.Item>
            <Descriptions.Item label="评级">
                <Rate allowHalf disabled defaultValue={store.grade} />
            </Descriptions.Item>
            <Descriptions.Item label="签约时间">
                {store.tm}
            </Descriptions.Item>
        </Descriptions>
      )
};

const StoreListDrawer: FC<OperationDrawerProps> = (props) => {
    const { visible, current = {}, onCancel, onSubmit } = props;
    const {apps} = current;
    const getStoreList = () => {
        const list = [];
        for(let store of apps) {
            list.push(<StoreItem store={store} />);
        }
        return list;
    };
    return (
        <Drawer
            title="查看数据权限"
            width={500}
            onClose={onCancel}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
        >
            {getStoreList()}
        </Drawer>
    );
};

export default StoreListDrawer;