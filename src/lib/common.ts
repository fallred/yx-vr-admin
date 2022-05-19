export function formatObjectToListByKeyMap(dataObj, dataMap) {
    const dataList = Object.keys(dataObj).map(key => {
        const item = {
            value: dataObj[key],
            label: dataMap.get(key)
        };
        return item;
    });
    return dataList;
}

export function formatObjectToListByKeyMap(dataObj, dataMap) {
    const dataList = Object.keys(dataObj).map(key => {
        const item = {
            value: dataObj[key],
            label: dataMap.get(key)
        };
        return item;
    });
    return dataList;
}