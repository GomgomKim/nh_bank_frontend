// 바이크 - 상태
 const bikeStatus = {
    0: "사용",
    1: "미사용",
    2: "수리",
    3: "폐차",
 };

 const feeType = [
    "정량",
    "정률"
 ]

 const riderGroup = {
   1: "A",
   2: "B",
   3: "C",
   4: "D",
   5: "E",
 }

 const riderLevel = [
   "",
   "라이더",
   "부팀장",
   "팀장",
   "부본부장",
   "본부장",
   "부지점장",
   "지점장",
   "부센터장",
   "센터장",
 ]

//  예치금 지급
const searchType =[
  "라이더",
  "가맹점"
]

 export {
    bikeStatus,
    riderGroup,
    feeType,
    riderLevel,
    searchType,
  };
  