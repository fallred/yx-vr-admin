import React, { FC, useEffect, useRef, useState, useImperativeHandle } from "react";
import { Select } from 'antd';
import FormItem from "../form-item";
import {
    IOption, IProvinceCityDistrict,
    IProvince, ICity, IArea
} from '@/models/common';
import {useGetProvinceList, useGetCityList, useGetAreaList} from '@/api/index';

interface IPCRProps {
    cdRef: any;
    hasFormItemWrap: boolean;
    pcdData: IProvinceCityDistrict;
}
const { Option } = Select;
const ProvinceCityArea : FC<IPCRProps> = props => {
    const { cdRef, hasFormItemWrap = true, pcdData = {}} = props;
    const {data: provinceList} = useGetProvinceList();
    const getCityPromise = useGetCityList();
    const getAreaPromise = useGetAreaList();
    const [formData, setFormData] = React.useState<IProvinceCityDistrict>({});
    const [provinceOptions, setProvinceOptions] = React.useState<IProvince[]>([]);
    const [cityOptions, setCityOptions] = React.useState<ICity[]>([]);
    const [areaOptions, setAreaOptions] = React.useState<IArea[]>([]);

    const updateCityData = async (provincecode: string) => {
        const cityList = await getCityPromise({provincecode});
        setCityOptions(cityList);
    };
    const updateAreaData = async (citycode: string) => {
        const areaList = await getAreaPromise({citycode});
        setAreaOptions(areaList);
    };

    const handleProvinceChange = (provincecode: string) => {
        updateCityData(provincecode);
        setFormData({
            ...formData,
            province: provincecode,
            city: undefined,
            district: undefined
        });
        // props.change({
        //     province: provincecode,
        //     city: undefined,
        //     district: undefined
        // });
        setAreaOptions([]);
    };
    const handleCityChange = (citycode: string) => {
        updateAreaData(citycode);
        setFormData({
            ...formData,
            city: citycode,
            district: undefined
        });
        // props.change({
        //     province: provincecode,
        //     city: citycode,
        //     district: undefined
        // });
    };
    const handleDistrictChange = (district: string) => {
        setFormData({
            ...formData,
            district,
        });
    };
    const queryItemByCode = (code: string, opts: any[]) => {
        const item = opts.find((item: { code: any; }) => item.code === code);
        console.log('queryItemByCode item:', item);
        return item;
    };
    const getValue = () => {
        const {province, city, district} = formData;
        let provinceItem = {};
        let cityItem = {};
        let districtItem = {};
        if (province) {
            provinceItem = queryItemByCode(province, provinceOptions);
        }
        if (city) {
            cityItem = queryItemByCode(city, cityOptions);
        }
        if (district) {
            districtItem = queryItemByCode(district, areaOptions);
        }
        return {
            ...formData,
            provinceName: provinceItem.name,
            cityName: cityItem.name,
            districtName: districtItem.name,
        };
    };
    useImperativeHandle(cdRef, () => ({
        // changeVal 就是暴露给父组件的方法
        getValue,
    }));
    useEffect(() => {
        setProvinceOptions(provinceList);
    }, [provinceList]);
    useEffect(() => {
        // setFormData({...pcdData});
        // updateCityData(province);
        // updateAreaData(city);
    }, [pcdData]);
    const selectTpl = (
        <>
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
        {/* <ProFormSelect
            value={formData.province}
            key="province"
            name="province"
            label=""
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
            label=""
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
            label=""
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
        </>
    );
    const groupSelectTpl = (
        <FormItem label="地址">
            {selectTpl}
        </FormItem>
    );
    return (
        <React.Fragment>
            {hasFormItemWrap ? groupSelectTpl : selectTpl}
        </React.Fragment>
    );
};

export default ProvinceCityArea;