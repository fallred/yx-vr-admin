import React, { FC, useEffect, useRef, useState, useImperativeHandle } from "react";
import { Cascader } from 'antd';
import ProForm, {ProFormSelect} from "@ant-design/pro-form";
import {IOption} from '@/models/common';
import {useGetProvinceList, useGetCityList, useGetAreaList} from '@/api/index';

type IFromData = {
    province: string;
    city: string;
    district: string
};
interface IPCRProps {
}
const ProvinceCityArea : FC<IPCRProps> = (props) => {
    const { cdRef } = props;
    const {data: provinceList} = useGetProvinceList();
    const getCityPromise = useGetCityList();
    const getAreaPromise = useGetAreaList();
    const [formData, setFormData] = React.useState<IFromData>({});
    // const [province, setProvince] = React.useState<IFromData>();
    // const [city, setCity] = React.useState<IFromData>();
    // const [district, setDistrict] = React.useState<IFromData>();

    const [provinceOptions, setProvinceOptions] = React.useState<IOption[]>([]);
    const [cityOptions, setCityOptions] = React.useState<IOption[]>([]);
    const [areaOptions, setAreaOptions] = React.useState<IOption[]>([]);

    const updateCityData = async (provinceCode: string) => {
        const cityList = await getCityPromise({provinceCode});
        setCityOptions(cityList);
    };
    const updateAreaData = async (cityCode: string) => {
        const areaList = await getAreaPromise({cityCode});
        setAreaOptions(areaList);
    };

    const handleProvinceChange = (provinceCode: string) => {
        updateCityData(provinceCode);
        setFormData({
            ...formData,
            province: provinceCode,
            city: undefined,
            district: undefined
        });
        // updateAreaData([]);
        setAreaOptions([]);
    };
    const handleCityChange = (cityCode: string) => {
        updateAreaData(cityCode);
        setFormData({
            ...formData,
            city: cityCode,
            district: undefined
        });
    };
    const handleDistrictChange = (district: string) => {
        setFormData({
            ...formData,
            district,
        });
    };
    const getValue = () => {
        return formData
    };
    useImperativeHandle(cdRef, () => ({
        // changeVal 就是暴露给父组件的方法
        getValue: () => {
            return formData;
        },
    }));
    useEffect(() => {
        setProvinceOptions(provinceList);
    }, [provinceList]);

    return (
        <React.Fragment>
            <ProFormSelect
                value={formData.province}
                key="province"
                name="province"
                label="省"
                options={provinceOptions}
                placeholder="选择省"
                fieldProps={{
                    fieldNames: {
                      label: 'name',
                      value: 'code'
                    },
                }}
                onChange={handleProvinceChange}
                // width="md"
                // colSize={4}
            />
            <ProFormSelect
                value={formData.city}
                key="city"
                name="city"
                label="市"
                options={cityOptions}
                placeholder="选择市"
                fieldProps={{
                    fieldNames: {
                      label: 'name',
                      value: 'code'
                    },
                }}
                onChange={handleCityChange}
                // width="md"
                // colSize={4}
            />
            <ProFormSelect
                value={formData.district}
                key="district"
                name="district"
                label="区"
                options={areaOptions}
                fieldProps={{
                    fieldNames: {
                      label: 'name',
                      value: 'code'
                    },
                }}
                placeholder="选择区"
                onChange={handleDistrictChange}
                // width="md"
                // colSize={4}
            />
        </React.Fragment>
    );
};

export default ProvinceCityArea;