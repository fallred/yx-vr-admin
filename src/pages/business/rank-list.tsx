import React, { useEffect, useRef, useState } from "react";
import { Radio, Card } from 'antd';
import { PageContainer } from "@ant-design/pro-layout";
import {RankTypeEnum} from '@/models/rank';
import {RankTypeOptions} from '@/enums/common';
import RankList from "./modules/rank-list";

const RankListPage: React.FC<{}> = () => {
  // const tabListNoTitle = [
  //   {
  //     key: 'summary',
  //     tab: '营业额总榜',
  //   },
  //   {
  //     key: 'comment',
  //     tab: '好评能力榜',
  //   },
  //   {
  //     key: 'transfer',
  //     tab: '会员转化能力榜',
  //   },
  // ];
  const [activeTabKey, setActiveTabKey] = useState(RankTypeEnum.SUMMARY);
  const onTabChange = key => {
    setActiveTabKey(key);
  };
  return (
    <PageContainer className="rank-list-page">
      {/* <Radio.Group value={size} onChange={this.handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group> */}
      <Card
        className="rank-list-card"
        style={{ width: '100%' }}
        tabList={RankTypeOptions}
        activeTabKey={activeTabKey}
        // tabBarExtraContent={<a href="#">More</a>}
        onTabChange={onTabChange}
      >
        <RankList type={activeTabKey} />
      </Card>
    </PageContainer>
  );
};

export default RankListPage;
