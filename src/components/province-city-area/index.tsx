import { Cascader } from 'antd';
import {ProFormSelect} from "@ant-design/pro-form";
import {IOption} from '@/models/common';

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
        <>
            <ProFormSelect
                key="province"
                name="province"
                label="省"
                width="sm"
                options={provinceOptions}
                placeholder="选择省"
            />
            <ProFormSelect
                key="city"
                name="city"
                label="市"
                width="sm"
                options={CityOptions}
                placeholder="选择市"
            />
            <ProFormSelect
                key="area"
                name="area"
                label="区"
                width="sm"
                options={AreaOptions}
                placeholder="选择区"
            />
        </>
    );
};

export default ProvinceCityArea;