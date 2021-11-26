import { Form, Input, Table, Button, } from "antd";
import React, { Component } from "react";
// import {
//   httpGet,
//   httpUrl,
//   httpDownload,
//   httpPost,
//   httpPut,
// } from "../../api/httpClient";
import {
  bikeStatus
} from "../../lib/util/codeUtil";
import SelectBox from "../../components/input/SelectBox";
import Modal from "antd/lib/modal/Modal";
import "../../css/main.css";
import RegistBikeDialog from "../../components/dialog/RegistBikeDialog";
import FixHistoryDialog from "../../components/dialog/FixHistoryDialog";
import CreatePinAccountDialog from "../../components/dialog/CreatePinAccountDialog";
import ConfirmPinAccountDialog from "../../components/dialog/ConfirmPinAccountDialog";
import CreatePinCardDialog from "../../components/dialog/CreatePinCardDialog";
import ConfirmPinCardDialog from "../../components/dialog/ConfirmPinCardDialog";
import SearchAccountDialog from "../../components/dialog/SearchAccountDialog";
import OtherSearchAccountDialog from "../../components/dialog/OtherSearchAccountDialog";
import WithdrawTransferDialog from "../../components/dialog/WithdrawTransferDialog";
import NonghyupDepositDialog from "../../components/dialog/NonghyupDepositDialog";
import OtherDepositDialog from "../../components/dialog/OtherDepositDialog";
import SearchContentDialog from "../../components/dialog/SearchContentDialog";
import DetailSearchContentDialog from "../../components/dialog/DetailSearchContentDialog";
import InquireBalanceDialog from "../../components/dialog/InquireBalanceDialog";
import InquireCreditCardAuthorizationHistoryDialog from "../../components/dialog/InquireCreditCardAuthorizationHistoryDialog";
import InquireCashierCheckDialog from "../../components/dialog/InquireCashierCheckDialog";
import InquireExchangeRateDialog from "../../components/dialog/InquireExchangeRateDialog";

const FormItem = Form.Item;
const Search = Input.Search;
let PinAccountregistNum = "";
let PinAccountNum = "";
let PinCardregistNum = "";
let PinCardNum = "";
let SearchAccount = "";
let OtherSearchAccount = "";
let WithdrawTransfer = "";
let NonghyupDepositShow = "";
let OtherDepositShow = "";
let SearchContentShow = "";
let InquireBalanceShow = "";
let InquireCreditCardAuthorizationHistoryShow = "";
let InquireCashierCheckShow = "";
let InquireExchangeRateShow = "";
let DetailSearchContent = "";

class DepositWithdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      bikeStatus: 0,
      isRegistBikeOpen: false,
      isFixHistoryOpen: false,
      isCreatePinAccountOpen: false,
      isConfirmPinAccountOpen: false,
      isCreatePinCardOpen: false,
      isConfirmPinCardOpen: false,
      isSearchAccountOpen: false,
      isOtherSearchAccountOpen: false,
      isWithdrawTransferOpen: false,
      isNonghyupDepositOpen: false,
      isOtherDepositOpen: false,
      isSearchContentOpen: false,
      isDetailSearchContentOpen: false,
      isInquireBalanceOpen: false,
      isInquireCreditCardAuthorizationHistoryOpen: false,
      isInquireCashierCheckOpen: false,
      isInquireExchangeRateOpen: false,
      pinAccountregistNumState: "핀-어카운트 등록 번호 없음",
      pinAccountNumState: "핀-어카운트 번호 없음",
      pinCardregistNumState: "핀카드 등록 번호 없음",
      pinCardNumState: "핀카드 번호 없음",
      searchAccountState: "예금주명 없음",
      otherSearchAccountState: "타행 예금주명 없음",
      withdrawMassage: "출금이체 없음",
      nonghyupDeposit: "농협입금이체 없음",
      otherDeposit: "타행입금이체 없음",
      searchContent: "거래내역 조회 없음",
      detailSearchContent:[],
      inquireBalance: "잔액 없음"
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getList()
  }

  // 바이크 검색
  onSearchBike = (value) => {
    this.setState(
      {
        bikeName: value,
      },
      () => {
        this.getList();
      }
    );
  };

  // 라이더 검색
  onSearchRider = (value) => {
    this.setState(
      {
        riderName: value,
      },
      () => {
        this.getList();
      }
    );
  };

  getList = () => {
    var list = [
        {   
            bikeStatus: '',      
            bikeType: 'PCX',
            bikeModel: '2016 년',
            rideDistance: '10546 km',
            rideRider: '도아무개',
            riderPhone: '010-8888-9999',
            rentDate: '2021-04-02',
            returnDate: '',
            bikeMemo: '바퀴상태 불량, 검사 필요',         
        },
        {   
            bikeStatus: '',      
            bikeType: 'NMAX',
            bikeModel: '2018 년',
            rideDistance: '10546 km',
            rideRider: '강아무개',
            riderPhone: '010-8888-9999',
            rentDate: '2021-04-02',
            returnDate: '',
            bikeMemo: '',        
        },
        {   
            bikeStatus: '',      
            bikeType: 'PCX',
            bikeModel: '2005 년',
            rideDistance: '10546 km',
            rideRider: '남아무개',
            riderPhone: '010-8888-9999',
            rentDate: '',
            returnDate: '2021-04-31',
            bikeMemo: '',      
        },
        {   
            bikeStatus: '',      
            bikeType: 'PCX',
            bikeModel: '2011 년',
            rideDistance: '10546 km',
            rideRider: '성아무개',
            riderPhone: '010-8888-9999', 
            rentDate: '2021-03-02',
            returnDate: '',
            bikeMemo: '',         
        },
        {   
            bikeStatus: '',      
            bikeType: 'NMAX',
            bikeModel: '2016 년',
            rideDistance: '10546 km',
            rideRider: '신아무개',
            riderPhone: '010-8888-9999',   
            rentDate: '',
            returnDate: '2021-06-02',   
            bikeMemo: '',    
        },
      
    ];
    this.setState({
      list: list,
    });
  }
  handleTableChange = (pagination) => {
    const pager = {
      ...this.state.pagination,
    };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState(
      {
        pagination: pager,
      },
      () => this.getList()
    );
  };

  // 바이크 등록 모달

  openRegistBikeDialog = () => {
    this.setState({ isRegistBikeOpen: true });
  };
  closeRegistBikeDialog = () => {
    this.setState({ isRegistBikeOpen: false });
  };

  // 핀어카운트 발급
  openCreatePinAccountDialog = () => {
    this.setState({ isCreatePinAccountOpen: true });
  };
  closeCreatePinAccountDialog = (param) => {
    this.setState({ isCreatePinAccountOpen: false, pinAccountregistNumState: param.Rgno});
    // console.log(param);
    // if(param != undefined){
    //   PinAccountregistNum = param.Rgno;
    // }
    // else{
    //   PinAccountregistNum = param.Header.Rsms;
    // }
    
  };

  // 핀어카운트 발급 확인
  openConfirmPinAccountDialog = () => {
    this.setState({ isConfirmPinAccountOpen: true });
  };
  closeConfirmPinAccountDialog = (param) => {
    this.setState({ isConfirmPinAccountOpen: false, pinAccountNumState: param.FinAcno});
    // console.log(param);
    // if (param != undefined) {
    //   PinAccountNum = param.FinAcno;
    // }
    // else{
    //   PinAccountNum = param.Header.Rsms;
    // }
  };

  // 핀카드 발급
  openCreatePinCardDialog = () => {
    this.setState({ isCreatePinCardOpen: true });
  };
  closeCreatePinCardDialog = (param) => {
    this.setState({ isCreatePinCardOpen: false, pinCardregistNumState: param.Rgno });
    // console.log(param);
    // if(param != null){
    //   PinCardregistNum = param.Rgno;
    // }
    // else{
    //   PinCardregistNum = param.Header.Rsms;
    // }
  };

  // 핀카드 발급 확인
  openConfirmPinCardDialog = () => {
    this.setState({ isConfirmPinCardOpen: true});
  };
  closeConfirmPinCardDialog = (param) => {
    this.setState({ isConfirmPinCardOpen: false, pinCardNumState: param.FinCard});
    // console.log(param);
    // if(param != undefined){
    //   PinCardNum = param.FinCard;
    // }
    // else{
    //   PinCardNum = param.Header.Rsms;
    // }
  };

  // 예금주 조회
  openSearchAccountDialog = () => {
    this.setState({ isSearchAccountOpen: true});
  };
  closeSearchAccountDialog = (param) => {
    this.setState({ isSearchAccountOpen: false, searchAccountState: param.Dpnm });
    // console.log(param);
    // if(param != undefined){
    //   SearchAccount = param.Dpnm;
    // }
    // else{
    //   SearchAccount = param.Header.Rsms;
    // }
  };

  // 타행 예금주 조회
  openOtherSearchAccountDialog = () => {
    this.setState({ isOtherSearchAccountOpen: true});
  };
  closeOtherSearchAccountDialog = (param) => {
    this.setState({ isOtherSearchAccountOpen: false, otherSearchAccountState: param.Dpnm });
    // console.log(param);
    // if(param != undefined){
    //   otherSearchAccount = param.Dpnm;
    // }
    // else{
    //   otherSearchAccount = param.Header.Rsms;
    // }
  };

  // 출금이체
  openWithdrawTransferDialog = () => {
    this.setState({ isWithdrawTransferOpen: true});
  };
  closeWithdrawTransferDialog = (param) => {
    console.log(param);
    this.setState({ 
      isWithdrawTransferOpen: false, 
      withdrawMassage : param.Header.Rsms
    });
    // if(param != undefined){
    //   withdrawTransfer = param.Header.Rsms;
    // }
    // else{
    //   withdrawTransfer = param.Header.Rsms;
    // }
  };

  // 농협입금이체
  openNonghyupDepositDialog = () => {
    this.setState({ isNonghyupDepositOpen: true});
  };
  closeNonghyupDepositDialog = (param) => {
    this.setState({ 
      isNonghyupDepositOpen: false,
      nonghyupDeposit : param.Header.Rsms
     });
    // console.log(param);
    // if(param != undefined){
    //   nonghyupDepositShow = param.Header.Rsms;
    // }
    // else{
    //   nonghyupDepositShow = param.Header.Rsms;
    // }
  };

  // 타행입금이체
  openOtherDepositDialog = () => {
    this.setState({ isOtherDepositOpen: true});
  };
  closeOtherDepositDialog = (param) => {
    this.setState({ 
      isOtherDepositOpen: false,
      otherDeposit : param.Header.Rsms
    });
    // console.log(param);
    // if(param != undefined){
    //   otherDepositShow = param.Header.Rsms;
    // }
    // else{
    //   otherDepositShow = param.Header.Rsms;
    // }
  };
  
  // 거래내역조회
  openSearchContentDialog = () => {
    this.setState({ isSearchContentOpen: true});
  };
  closeSearchContentDialog = (param) => {
    let array = [];
    for(let i = 0 ; i < param.REC.length ; i ++)
    {
      array[i] = param.REC[i];  // 거래내역 배열인데 이걸 어째야할지 모르겠어. 콘솔켜보면 나와
      console.log(array[i]);
    }
    
    this.setState({ 
      isSearchContentOpen: false,
      searchContent : "거래내역조회 완료",
      detailSearchContent:array
      // searchContent : array  // 여기다가 표현해줘야할꺼같은데..
    });
    // if(param != undefined){
    //   searchContentShow = param.Header.Rsms;
    // }
    // else{
    //   searchContentShow = param.Header.Rsms;
    // }
  };

  // 거래내역보기
  openDetailSearchContentDialog = () => {
    this.setState({ isDetailSearchContentOpen: true});
  };
  closeDetailSearchContentDialog = () => {
    this.setState({ 
      isDetailSearchContentOpen: false,
      // searchContent : array  // 여기다가 표현해줘야할꺼같은데..
    });
    // console.log(param);
    // if(param != undefined){
    //   searchContentShow = param.Header.Rsms;
    // }
    // else{
    //   searchContentShow = param.Header.Rsms;
    // }
  };

  // 잔액조회
  openInquireBalanceDialog = () => {
    this.setState({ isInquireBalanceOpen: true});
  };
  closeInquireBalanceDialog = (param) => {
    this.setState({ 
      isInquireBalanceOpen: false,
      inquireBalance : param.Ldbl
     });
    // console.log(param);
    // if(param != undefined){
    //   inquireBalanceShow = param.Header.Rsms;
    // }
    // else{
    //   inquireBalanceShow = param.Header.Rsms;
    // }
  };

  // 개인카드 승인내역조회
  openInquireCreditCardAuthorizationHistoryDialog = () => {
    this.setState({ isInquireCreditCardAuthorizationHistoryOpen: true});
  };
  closeInquireCreditCardAuthorizationHistoryDialog = (inquireCreditCardAuthorizationHistory) => {
    this.setState({ isInquireCreditCardAuthorizationHistoryOpen: false });
    // console.log(inquireCreditCardAuthorizationHistory);
    // if(inquireCreditCardAuthorizationHistory != undefined){
    //   inquireCreditCardAuthorizationHistory = inquireCreditCardAuthorizationHistory.Header.Rsms;
    // }
    // else{
    //   inquireCreditCardAuthorizationHistory = inquireCreditCardAuthorizationHistory.Header.Rsms;
    // }
  };

  // 자기앞수표조회
  openInquireCashierCheckDialog = () => {
    this.setState({ isInquireCashierCheckOpen: true});
  };
  closeInquireCashierCheckDialog = (inquireCashierCheck) => {
    this.setState({ isInquireCashierCheckOpen: false });
    // console.log(inquireCashierCheck);
    // if(inquireCashierCheck != undefined){
    //   inquireCashierCheck = inquireCashierCheck.Header.Rsms;
    // }
    // else{
    //   inquireCashierCheck = inquireCashierCheck.Header.Rsms;
    // }
  };

  // 환율조회
  openInquireExchangeRateDialog = () => {
    this.setState({ isInquireExchangeRateOpen: true});
  };
  closeInquireExchangeRateDialog = (inquireExchangeRate) => {
    this.setState({ isInquireExchangeRateOpen: false });
    // console.log(inquireExchangeRate);
    // if(inquireExchangeRate != undefined){
    //   inquireExchangeRate = inquireExchangeRate.Header.Rsms;
    // }
    // else{
    //   inquireExchangeRate = inquireExchangeRate.Header.Rsms;
    // }
  };

  // 정비이력 모달

  openFixHistoryDialog = () => {
    this.setState({ isFixHistoryOpen: true });
  };
  closeFixHistoryDialog = () => {
    this.setState({ isFixHistoryOpen: false });
  };

  //삭제 알림창

  delete = () => {
    // Modal.Confirm({
    //     title: <div> 공지 삭제</div>,
    //     content: <div> 해당 공지를 삭제하시곘습니까? </div>
    // })
    alert('공지사항을 삭제합니다.')
  };
  

  render() {

    const columns = [
      {
        title: "바이크 기종",
        dataIndex: "bikeType",
        className: "table-column-center",
      },
      {
        title: "번호판",
        dataIndex: "bikeNum",
        className: "table-column-center",
        render: () => <div>23가 2053</div>
      },
      {
        title: "연식",
        dataIndex: "bikeModel",
        className: "table-column-center",
      },
      {
        title: "주행거리",
        dataIndex: "rideDistance",
        className: "table-column-center",
      },
      {
        title: "메모",
        dataIndex: "bikeMemo",
        className: "table-column-center",
      },
      {
        title: "보험사",
        dataIndex: "bikeNum",
        className: "table-column-center",
        render: () => <div>한화생명</div>
      },
      {
        title: "상태",
        dataIndex: "bikeStatus",
        className: "table-column-center",
        width: "10%",
        render: (data, row) => (
          <div>
            <SelectBox
              defaultlValue={bikeStatus[1]}
              value={bikeStatus[data]}
              code={Object.keys(bikeStatus)}
              codeString={bikeStatus}
              onChange={(value) => {
                if (parseInt(value) !== this.state.bikeStatus) {
                  this.setState({ bikeStatus: parseInt(value) }, () => this.getList());
                }
              }} />
          </div>
        )
      },
      {
        title: "라이더명",
        dataIndex: "rideRider",
        className: "table-column-center",
      },
      {
        title: "라이더 전화번호",
        dataIndex: "riderPhone",
        className: "table-column-center",
      },
      {
        title: "대여 날짜",
        dataIndex: "rentDate",
        className: "table-column-center",
      },
      {
        title: "반납 날짜",
        dataIndex: "returnDate",
        className: "table-column-center",
      },
      {
        title: "대여 이력",
        dataIndex: "fixHistory",
        className: "table-column-center",
        width: '8%',
        render: (data) => (
          <div>
            <Button onClick={this.openFixHistoryDialog}>
              이력보기
                </Button>
          </div>
        )
      },
      {
        title: "정비 이력",
        dataIndex: "fixHistory",
        className: "table-column-center",
        width: '8%',
        render: (data) => (
          <div>
            <Button onClick={this.openFixHistoryDialog}>
              이력보기
                </Button>
          </div>
        )
      },
      {
        title: "수정",
        dataIndex: "updateBike",
        className: "table-column-center",
        width: '3%',
        render: (data, row) => (
          <div>

            <Button onClick={this.openRegistBikeDialog}>
              수정
              </Button>
          </div>
        )
      },
      {
        title: "삭제",
        dataIndex: "deleteBike",
        className: "table-column-center",
        width: '3%',
        render: (data, row) => (
          <div>
            <Button onClick={() => { this.delete(row.idx); }}>
              삭제
              </Button>
          </div>
        )
      },
    ];


    return (  
      <FormItem>
          <Button 
            onClick={this.openRegistBikeDialog}
            style={{marginLeft:20, marginRight:40}}>
            입출금
          </Button>

          <br></br>
          <br></br>

          <Button 
            onClick={this.openCreatePinAccountDialog}
            style={{marginLeft:20, marginRight:70}}>
            핀-어카운트 직접발급
          </Button>
          {"핀-어카운트 등록 번호 : "}
          {this.state.pinAccountregistNumState}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openConfirmPinAccountDialog}
            style={{marginLeft:20, marginRight:41}}>
            핀-어카운트 직접발급 확인
          </Button>
          {"핀-어카운트 번호 : "}
          {this.state.pinCardNumState}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openCreatePinCardDialog}
            style={{marginLeft:20, marginRight:100}}>
            핀카드 직접발급
          </Button>
          {"핀카드 등록 번호 : "}
          {this.state.pinCardregistNumState}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openConfirmPinCardDialog}
            style={{marginLeft:20, marginRight:72}}>
            핀카드 직접발급 확인
          </Button>
          {"핀카드 번호 : "}
          {this.state.pinCardNumState}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openSearchAccountDialog}
            style={{marginLeft:20, marginRight:130}}>
            예금주조회
          </Button>
          {"예금주명 : "}
          {this.state.searchAccountState}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openOtherSearchAccountDialog}
            style={{marginLeft:20, marginRight:105}}>
            타행예금주조회
          </Button>
          {"타행 예금주명 : "}
          {this.state.otherSearchAccountState}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openWithdrawTransferDialog}
            style={{marginLeft:20, marginRight:143}}>
            출금이체
          </Button>
          {this.state.withdrawMassage}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openNonghyupDepositDialog}
            style={{marginLeft:20, marginRight:117}}>
            농협입금이체
          </Button>
          {this.state.nonghyupDeposit}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openOtherDepositDialog}
            style={{marginLeft:20, marginRight:120}}>
            타행입금이체
          </Button>
          {this.state.otherDeposit}

          <br></br>
          <br></br>

          <Button 
            onClick={this.openSearchContentDialog}
            style={{marginLeft:20, marginRight : 120}}>
            거래내역조회
          </Button>
          {this.state.searchContent}

          <Button 
            onClick={this.openDetailSearchContentDialog}
            style={{marginLeft:40, marginRight : 120}}>
            거래내역보기
          </Button>
          <br></br>
          <br></br>

          <Button 
            onClick={this.openInquireBalanceDialog}
            style={{marginLeft:20, marginRight : 146}}>
            잔액조회
          </Button>
          {this.state.inquireBalance}
          
          <br></br>
          <br></br>

          {/* <Button 
            onClick={this.openInquireCreditCardAuthorizationHistoryDialog}
            style={{marginLeft:20}}>
            개인카드 승인내역조회
          </Button>

          <Button 
            onClick={this.openInquireCashierCheckDialog}
            style={{marginLeft:20}}>
            자기앞수표조회
          </Button>
          
          <Button 
            onClick={this.openInquireExchangeRateDialog}
            style={{marginLeft:20}}>
            환율조회
          </Button> */}

        {this.state.isDetailSearchContentOpen && (
          <DetailSearchContentDialog close={this.closeDetailSearchContentDialog} data={this.state.detailSearchContent}/>
        )}

        {this.state.isInquireExchangeRateOpen && (
          <InquireExchangeRateDialog close={this.closeInquireExchangeRateDialog} />
        )}

        {this.state.isInquireCashierCheckOpen && (
          <InquireCashierCheckDialog close={this.closeInquireCashierCheckDialog} />
        )}

        {this.state.isInquireCreditCardAuthorizationHistoryOpen && (
          <InquireCreditCardAuthorizationHistoryDialog close={this.closeInquireCreditCardAuthorizationHistoryDialog} />
        )}

        {this.state.isInquireBalanceOpen && (
          <InquireBalanceDialog close={this.closeInquireBalanceDialog} />
        )}

        {this.state.isSearchContentOpen && (
          <SearchContentDialog close={this.closeSearchContentDialog} />
        )}

        {this.state.isOtherDepositOpen && (
          <OtherDepositDialog close={this.closeOtherDepositDialog} />
        )}

        {this.state.isNonghyupDepositOpen && (
          <NonghyupDepositDialog close={this.closeNonghyupDepositDialog} />
        )}

        {this.state.isWithdrawTransferOpen && (
          <WithdrawTransferDialog close={this.closeWithdrawTransferDialog} />
        )}

        {this.state.isOtherSearchAccountOpen && (
          <OtherSearchAccountDialog close={this.closeOtherSearchAccountDialog} />
        )}

        {this.state.isSearchAccountOpen && (
          <SearchAccountDialog close={this.closeSearchAccountDialog} />
        )}

        {this.state.isConfirmPinCardOpen && (
          <ConfirmPinCardDialog close={this.closeConfirmPinCardDialog} />
        )}

        {this.state.isCreatePinCardOpen && (
          <CreatePinCardDialog close={this.closeCreatePinCardDialog} />
        )}

        {this.state.isConfirmPinAccountOpen && (
          <ConfirmPinAccountDialog close={this.closeConfirmPinAccountDialog} />
        )}

        {this.state.isCreatePinAccountOpen && (
          <CreatePinAccountDialog close={this.closeCreatePinAccountDialog} />
        )}

        {this.state.isFixHistoryOpen && (
          <FixHistoryDialog close={this.closeFixHistoryDialog} />
        )}

        {this.state.isRegistBikeOpen && (
          <RegistBikeDialog close={this.closeRegistBikeDialog} />
        )}
{/* 
            <Table
              rowKey={(record) => record}
              dataSource={this.state.list}
              columns={columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
            /> */}
          </FormItem>
    )
  }
}


export default DepositWithdraw;
