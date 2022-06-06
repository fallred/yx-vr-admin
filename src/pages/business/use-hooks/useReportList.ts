import { useState, useEffect } from 'react';
import {IConvert,IEvaluate,IMember,IPerformance} from '@/models/report-list';
import {
  useGetConvertList,
  useGetEvaluateList,
  useGetMemberList,
  useGetPerformanceList
} from "@/api";
import {IOption, IDataStastic} from '@/models/common';
import {PerformanceMap, MemberMap, EvaluateMap, ConvertMap} from '@/enums/common';
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
  async function fetchData(appIdArr) {
    const appIds = appIdArr.join(',');
    const convertInfo = await getConvertListPromise({appIds});
    const convertList = formatObjectToListByKeyMap(convertInfo, ConvertMap);
    const evaluateInfo = await getEvaluateListPromise({appIds});
    const evaluateList = formatObjectToListByKeyMap(evaluateInfo, EvaluateMap);
    const memberInfo = await getMemberListPromise({appIds});
    const memberList = formatObjectToListByKeyMap(memberInfo, MemberMap);
    const performanceInfo = await getPerformanceListPromise({appIds});
    const performanceList = formatObjectToListByKeyMap(performanceInfo, PerformanceMap);
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