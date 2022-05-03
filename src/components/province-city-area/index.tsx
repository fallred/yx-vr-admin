import React, { FC, useEffect, useRef, useState, useImperativeHandle } from "react";
import { Select } from 'antd';
import ProForm, {ProFormSelect} from "@ant-design/pro-form";
import FormItem from "../form-item";
import {IOption} from '@/models/common';
import {useGetProvinceList, useGetCityList, useGetAreaList} from '@/api/index';

type IFromData = {
    province: string;
    city: string;
    district: string
};
interface IPCRProps {
}
const { Option } = Select;
const ProvinceCityArea : FC<IPCRProps> = (props) => {
    const { cdRef } = props;
    const {data: provinceList} = useGetProvinceList();
    const getCityPromise = useGetCityList();
    const getAreaPromise = useGetAreaList();
    const [formData, setFormData] = React.useState<IFromData>({});
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
            <FormItem label="地址">
                <Select
                    style={{ width: 160 }}
                    showSearch
                    value={formData.province}
                    placeholder="选择省"
                    showArrow={false}
                    filterOption={false}
                    onChange={handleProvinceChange}
                    notFoundContent={null}
                >
                    {provinceOptions.map(d => <Option key={d.code}>{d.name}</Option>)}
                </Select>
                <Select
                    style={{ width: 160 }}
                    showSearch
                    value={formData.city}
                    placeholder="选择市"
                    showArrow={false}
                    filterOption={false}
                    onChange={handleCityChange}
                    notFoundContent={null}
                >
                    {cityOptions.map(d => <Option key={d.code}>{d.name}</Option>)}
                </Select>
                <Select
                    style={{ width: 160 }}
                    showSearch
                    value={formData.district}
                    placeholder="选择区"
                    showArrow={false}
                    filterOption={false}
                    onChange={handleDistrictChange}
                    notFoundContent={null}
                >
                    {areaOptions.map(d => <Option key={d.code}>{d.name}</Option>)}
                </Select>
            </FormItem>
            {/* <ProFormSelect
                value={formData.province}
                key="province"
                name="province"
                label="省"
                options={provinceOptions}
                
                fieldProps={{
                    fieldNames: {
                      label: 'name',
                      value: 'code'
                    },
                }}
                onChange={handleProvinceChange}
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
            /> */}
        </React.Fragment>
    );
};

export default ProvinceCityArea;