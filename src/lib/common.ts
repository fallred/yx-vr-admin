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
export const dateMonthFormat = (tm: string) => {
    const dateFormatStr= moment(tm).subtract(1, 'months').format('YYYY-MM');
    return dateFormatStr;
}
export const dateMonthFormat1 = (tm: string) => {
    const dateFormatStr= moment(tm).format('YYYY-MM');
    return dateFormatStr;
}
export const dateTimeFormat = (tm: string) => {
    const dateFormatStr= moment(tm).format('YYYY-MM-DD HH:mm:ss');
    return dateFormatStr;
}