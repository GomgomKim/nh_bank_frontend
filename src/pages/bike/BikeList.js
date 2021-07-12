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

const FormItem = Form.Item;
const Search = Input.Search;

class BikeList extends Component {
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
        title: "바이크 기종",
        dataIndex: "bikeType",
        className: "table-column-center",
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
        width: '8%',
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
        width: '8%',
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
            <Search
              placeholder="바이크 검색"
              enterButton
              allowClear
              onChange={(e) => this.setState({ bike: e.target.value })}
              onSearch={this.onSearchBike}
              style={{
                width: 220,
              }}
            />

  
            <Search
              placeholder="라이더명 검색"
              enterButton
              allowClear
              onChange={(e) => this.setState({ rider: e.target.value })}
              onSearch={this.onSearchRider}
              style={{
                width: 220,
                marginLeft: 20,
              }}
            />


          
              <Button 
                onClick={this.openRegistBikeDialog}
                style={{marginLeft:20}}>
                바이크 등록
              </Button>


          <Button className="download-btn"
            style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
            <img src={require("../../img/excel.png").default} alt="" />
                        엑셀 업로드
          </Button>

          <Button className="download-btn"
            style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
            <img src={require("../../img/excel.png").default} alt="" />
                        양식 다운로드
          </Button>


        {this.state.isFixHistoryOpen && (
          <FixHistoryDialog close={this.closeFixHistoryDialog} />
        )}

        {this.state.isRegistBikeOpen && (
          <RegistBikeDialog close={this.closeRegistBikeDialog} />
        )}

            <Table
              rowKey={(record) => record}
              dataSource={this.state.list}
              columns={columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
            />
          </FormItem>




    )
  }
}


export default BikeList;
