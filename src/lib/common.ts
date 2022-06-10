import moment from "moment";
// export function formatObjectToListByKeyMap(dataObj, dataMap) {
//     const dataList = Object.keys(dataObj).map(key => {
//         const item = {
//             value: dataObj[key],
//             label: dataMap.get(key)
//         };
//         return item;
//     });
//     return dataList;
// }

export function formatObjectToListByKeyMap(dataObj, dataConfigList) {
    const dataList = [];
    dataConfigList.forEach(item => {
        const {valueKey, rateKey, ...rest} = item;
        const itemTemp = {
            ...rest,
            value: dataObj[valueKey],
            rate: dataObj[rateKey],
        };
        dataList.push(itemTemp);
    });
    return dataList;
}

export const dateFormat = (tm: string) => {
    const dateFormatStr= moment(tm).format('YYYY-MM-DD');
    return dateFormatStr;
}
