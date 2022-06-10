import moment from 'moment';
import {TimeRangeEnum} from '@/models/common';

// enum TimeRangeEnum {
//     TODAY = 'today',
//     YESTERDAY = 'yesterday',
//     LAST1WEEK = 'last-one-week',
//     LAST1MONTH = 'last-one-month',
//     LAST3MONTH = 'last-three-month',
//     LAST6MONTH = 'last-six-month',
//     LAST1YEAR = 'last-one-year',
//     LAST2YEAR = 'last-two-year',
//     LAST3YEAR = 'last-three-year',
//     LAST30DAYS = 'last-thirty-days',
// }


function getText(type: TimeRangeEnum) {
    switch (type) {
        case TimeRangeEnum.TODAY:
            return '今天';
        case TimeRangeEnum.YESTERDAY:
            return '昨天';
        case TimeRangeEnum.LAST1WEEK:
            return '最近一周';
        case TimeRangeEnum.LAST1MONTH:
            return '最近一月';
        case TimeRangeEnum.LAST3MONTH:
            return '最近三月';
        case TimeRangeEnum.LAST6MONTH:
            return '最近六月';
        case TimeRangeEnum.LAST1YEAR:
            return '最近一年';
        case TimeRangeEnum.LAST2YEAR:
            return '最近二年';
        case TimeRangeEnum.LAST3YEAR:
            return '最近三年';
        case TimeRangeEnum.LAST30DAYS:
            return '过去30天';
        default:
            return '未知区间';
    }
}
function getRange(type: TimeRangeEnum, offset = 1) {
    const baseStartDate = moment().add(1, 'day')
        .subtract(offset, 'day');
    const baseEndDate = moment().subtract(offset, 'day');

    switch (type) {
        case TimeRangeEnum.TODAY:
            return [
                moment(),
                moment(),
            ];
        case TimeRangeEnum.YESTERDAY:
            return [
                moment().subtract(1, 'day'),
                moment().subtract(1, 'day'),
            ];
        case TimeRangeEnum.LAST1WEEK:
            return [
                baseStartDate.subtract(1, 'week'),
                baseEndDate,
            ];
        case TimeRangeEnum.LAST1MONTH:
            return [
                // moment().startOf('month'), moment().endOf('month')
                baseStartDate.subtract(1, 'month'),
                baseEndDate,
            ];
        case TimeRangeEnum.LAST3MONTH:
            return [
                baseStartDate.subtract(3, 'month'),
                baseEndDate,
            ];
        case TimeRangeEnum.LAST6MONTH:
            return [
                baseStartDate.subtract(6, 'month'),
                baseEndDate,
            ];
        case TimeRangeEnum.LAST1YEAR:
            return [
                baseStartDate.subtract(1, 'year'),
                baseEndDate,
            ];
        case TimeRangeEnum.LAST2YEAR:
            return [
                baseStartDate.subtract(2, 'year'),
                baseEndDate,
            ];
        case TimeRangeEnum.LAST3YEAR:
            return [
                baseStartDate.subtract(3, 'year'),
                baseEndDate,
            ];
        case TimeRangeEnum.LAST30DAYS:
            return [
                baseStartDate.subtract(30, 'day'),
                baseEndDate,
            ];
        default:
            throw new Error('错误的时间区间');
    }
}

export const timeRange = {
    // TimeRangeEnum,
    getText,
    getRange
};