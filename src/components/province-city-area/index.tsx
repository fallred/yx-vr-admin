import React, { FC, useEffect, useRef, useState } from "react";
import { Cascader } from 'antd';
import ProForm, {ProFormSelect} from "@ant-design/pro-form";
import {IOption} from '@/models/common';
import {useGetProvinceList, useGetCityList, useGetAreaList} from '@/api/index';

const ProvinceCityArea = () => {
    const {data: provinceResp} = useGetProvinceList();
    const [provinceOptions, setProvinceOptions] = React.useState<IOption[]>([]);
    const [cityOptions, setCityOptions] = React.useState<IOption[]>([]);
    const [areaOptions, setAreaOptions] = React.useState<IOption[]>([]);

    const updateCityData = (provinceCode: string) => {
        const {data: cityResp} = useGetCityList(provinceCode);
        setCityOptions(cityResp?.data);
    };
    const updateAreaData = (cityCode: string) => {
        const {data: areaResp} = useGetAreaList();
        setAreaOptions(areaResp?.data);
    };

    const handleProvinceChange = (provinceCode: string) => {
        updateCityData(provinceCode);
        updateAreaData([]);
    };
    const handleCityChange = (cityCode: string) => {
        updateAreaData(cityCode);
    };

    useEffect(() => {
        setProvinceOptions(provinceResp?.data);
      }, [provinceResp]);

    return (
        <React.Fragment colSize={12}>
            <ProFormSelect
                key="province"
                name="province"
                label="省"
                options={provinceOptions}
                placeholder="选择省"
                // width="md"
                // colSize={4}
            />
            <ProFormSelect
                key="city"
                name="city"
                label="市"
                options={cityOptions}
                placeholder="选择市"
                // width="md"
                // colSize={4}
            />
            <ProFormSelect
                key="district"
                name="district"
                label="区"
                options={areaOptions}
                placeholder="选择区"
                // width="md"
                // colSize={4}
            />
        </React.Fragment>
    );
};

export default ProvinceCityArea;