import { useState, useEffect } from 'react';
import {IConvert,IEvaluate,IMember,IPerformance} from '@/models/report-list';
import {
  useGetConvertList,
  useGetEvaluateList,
  useGetMemberList,
  useGetPerformanceList
} from "@/api";
import moment from 'moment';
import {IOption, IDataStastic} from '@/models/common';
import {
  PerformanceMap, MemberMap, EvaluateMap, ConvertMap,
  PerformanceConfigList, MemberConfigList, EvaluateConfigList, ConvertConfigList
} from '@/enums/common';
import {formatObjectToListByKeyMap} from '@/lib/common';

export default function useReportList() {
  const getConvertListPromise = useGetConvertList();
  const getEvaluateListPromise = useGetEvaluateList();
  const getMemberListPromise = useGetMemberList();
  const getPerformanceListPromise = useGetPerformanceList();
  const [convertList, setConvertList] = useState<IDataStastic[]>([]);
  const [evaluateList, setEvaluateList] = useState<IDataStastic[]>([]);
  const [memberList, setMemberList] = useState<IDataStastic[]>([]);
  const [performanceList, setPerformanceList] = useState<IDataStastic[]>([]);
  async function fetchData(payload) {
    const {appIdArr, dateRange = []} = payload;
    const appIds = appIdArr.join(',');
    const [start = 0, end = 0] = dateRange ?? [];
    const stm = moment(start).format('YYYY-MM-DD');
    const etm = moment(end).format('YYYY-MM-DD');
    const convertInfo = await getConvertListPromise({appIds, stm, etm});
    const convertList = formatObjectToListByKeyMap(convertInfo, ConvertConfigList);
    const evaluateInfo = await getEvaluateListPromise({appIds, stm, etm});
    const evaluateList = formatObjectToListByKeyMap(evaluateInfo, EvaluateConfigList);
    const memberInfo = await getMemberListPromise({appIds, stm, etm});
    const memberList = formatObjectToListByKeyMap(memberInfo, MemberConfigList);
    const performanceInfo = await getPerformanceListPromise({appIds, stm, etm});
    const performanceList = formatObjectToListByKeyMap(performanceInfo, PerformanceConfigList);
    setConvertList(convertList);
    setEvaluateList(evaluateList);
    setMemberList(memberList);
    setPerformanceList(performanceList);
  }

  return {
    convertList,
    evaluateList,
    memberList,
    performanceList,
    fetchData
  };
}