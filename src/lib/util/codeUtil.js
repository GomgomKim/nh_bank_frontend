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
 ];

 const riderGroup = {
   1: "A",
   2: "B",
   3: "C",
   4: "D",
   5: "E",
 };

 const pgUseRate = {
  0:"사용",
  100:"미사용",
};

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
];
 const deletedStatus = [
   "등록",
   "삭제"
 ];
 const bikeType = {
   1:"PCX",
   2:"NMAX"
  };
  
const categoryStatus = {
  NONE: "전체",
  BATCH_WORK_NCASH: "일차감",
  BUY_PRODUCT: "몰 상품 구매",
  BUY_PRODUCT_CANCEL: "몰 상품 구매 취소",
  DELIVERY_PRICE_RECEIVE: "배송비 받기",
  DELIVERY_PRICE_SEND: "배송비 보내기",
  DUES_PAY: "가맹비 지급",
  NCASH_CHARGE_PROC: "충전 처리",
  NCASH_SEND: "예치금 전송",
  NCASH_SEND_BY_ADMIN: "관리자 예치금 추가/차감",
  WITHDRAW_PROC: "출금 처리",
  WITHDRAW_REQ: "출금 요청",
};

const kindStatus = [
  "전체",
  "리스비",
  "대출 상환",
  "산재 보험비"
];

 export {
    bikeStatus,
    riderGroup,
    feeType,
    riderLevel,
    searchType,
    pgUseRate,
    deletedStatus,
    bikeType,
    categoryStatus,
    kindStatus,
  };
  