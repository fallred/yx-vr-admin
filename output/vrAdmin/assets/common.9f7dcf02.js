var O=(E=>(E.LIST="list",E.ADD="add",E.EDIT="edit",E.DELETE="delete",E))(O||{}),a=(E=>(E[E.FEMALE=0]="FEMALE",E[E.MALE=1]="MALE",E))(a||{}),L=(E=>(E[E.PLATFORM=1]="PLATFORM",E[E.RELATION=2]="RELATION",E))(L||{}),M=(E=>(E[E.NORMAL=0]="NORMAL",E[E.FREEZE=1]="FREEZE",E[E.DISABLED=2]="DISABLED",E))(M||{}),e=(E=>(E[E.NORMAL=1]="NORMAL",E[E.DISABLED=2]="DISABLED",E))(e||{}),A=(E=>(E.SUMMARY="0",E.GOOD_COMMENT="1",E.MEMBER_CONVERT="2",E))(A||{});const B=new Map([[O.LIST,"\u67E5\u8BE2"],[O.ADD,"\u65B0\u589E"],[O.EDIT,"\u4FEE\u6539"],[O.DELETE,"\u5220\u9664"]]),R=new Map([[M.NORMAL,"\u6B63\u5E38"],[M.FREEZE,"\u51BB\u7ED3"],[M.DISABLED,"\u7981\u7528"]]),u=new Map([[e.NORMAL,"\u6B63\u5E38"],[e.DISABLED,"\u7981\u7528"]]),l=new Map([[a.FEMALE,"\u5973"],[a.MALE,"\u7537"]]),t=new Map([[L.PLATFORM,"\u5E73\u53F0\u7528\u6237"],[L.RELATION,"\u5173\u8054\u4EBA\u7528\u6237"]]),N=[{label:l.get(a.FEMALE),value:a.FEMALE},{label:l.get(a.MALE),value:a.MALE}],T=[{label:t.get(L.PLATFORM),value:L.PLATFORM},{label:t.get(L.RELATION),value:L.RELATION}],s=[{label:R.get(M.NORMAL),value:M.NORMAL},{label:R.get(M.DISABLED),value:M.DISABLED},{label:R.get(M.FREEZE),value:M.FREEZE}];u.get(e.NORMAL),e.NORMAL,u.get(e.DISABLED),e.DISABLED;const D=new Map([[A.SUMMARY,"\u8425\u4E1A\u989D\u603B\u699C"],[A.GOOD_COMMENT,"\u597D\u8BC4\u80FD\u529B\u699C"],[A.MEMBER_CONVERT,"\u4F1A\u5458\u8F6C\u5316\u80FD\u529B\u699C"]]),F=[{tab:D.get(A.SUMMARY),key:A.SUMMARY},{tab:D.get(A.GOOD_COMMENT),key:A.GOOD_COMMENT},{tab:D.get(A.MEMBER_CONVERT),key:A.MEMBER_CONVERT}];export{T as I,O as P,A as R,N as S,s as U,B as a,e as b,u as c,a as d,R as e,M as f,F as g};