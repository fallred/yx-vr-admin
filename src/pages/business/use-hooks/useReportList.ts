import { useState, useEffect } from 'react';
import {IConvert,IEvaluate,IMember,IPerformance} from '@/models/report-list';
import {
  useGetConvertList,
  useGetEvaluateList,
  useGetMemberList,
  useGetPerformanceList
} from "@/api";
import {PerformanceMap, MemberMap, EvaluateMap, ConvertMap} from '@/enums/common';
import {formatObjectToListByKeyMap} from '@/lib/common';

export default function useReportList() {
  const getConvertListPromise = useGetConvertList();
  const getEvaluateListPromise = useGetEvaluateList();
  const getMemberListPromise = useGetMemberList();
  const getPerformanceListPromise = useGetPerformanceList();
  const [convertList, setConvertList] = useState<IConvert[]>([]);
  const [evaluateList, setEvaluateList] = useState<IEvaluate[]>([]);
  const [memberList, setMemberList] = useState<IMember[]>([]);
  const [performanceList, setPerformanceList] = useState<IPerformance[]>([]);
  function fetchData(appIdArr) {
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