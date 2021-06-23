import { Form, DatePicker, Input, Table, Button, Space } from "antd";
import React, { Component } from "react";

import {
  httpGet,
  httpUrl,
  // httpDownload,
  // httpPost,
  // httpPut,
} from "../../api/httpClient";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import "../../css/main.css";
import moment from "moment";
import { feeType, riderGroup } from "../../lib/util/codeUtil";
import { comma } from "../../lib/util/numberUtil";
import xlsx from 'xlsx';

const FormItem = Form.Item;
const Search = Input.Search;
// const ws = xlsx.utils.json_to_sheet(arr);
// const wb = xlsx.utils.book_new();
// xlsx.utils.book_append_sheet(wb, ws, "sheet1");
// xlsx.writeFile(wb, "Test.xlsx");

class DeliveryHistoryRider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      riderName: "",
      riderPhone: "",
      searchMonth:"",
      franchisee: "",
      rider: "",
      Phone: "",
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getList()
  }


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

  // 전화번호 검색
  onSearchPhone = (value) => {
    this.setState(
      {
        riderPhone: value,
      },
      () => {
        this.getList();
      }
    );
  };

  getList = () => {
    let pageNum = this.state.pagination.current;
    let pageSize = this.state.pagination.pageSize;
    let riderName=this.state.riderName;
    let riderPhone=this.state.riderPhone;
    let searchMonth= this.state.searchMonth;
    httpGet(httpUrl.riderDeliveryList, [ pageNum, pageSize, riderName, riderPhone, searchMonth ],{})
    .then((res) => {
      const pagination = { ...this.state.pagination };
      pagination.current = res.data.currentPage;
      pagination.total = res.data.totalCount;
      this.setState({
      list: res.data.incomes,
      pagination,
    });
  });
  }

  // getList = () => {
  //   var list = [
  //     {
  //       monthData: '6월',
  //       userStatus: '사용',
  //       riderName: '김아무개',
  //       riderPhone: '010-1234-4567',
  //       userGroup: 'A',
  //       deliveryPrice: '2000',
  //       deliveryPriceFee: '500',
  //       deliveryPriceFeeType: '정량',
  //       riderRevenue: '30000000'
  //     },
  //     {
  //       monthData: '6월',
  //       userStatus: '사용',
  //       riderName: '지아무개',
  //       riderPhone: '010-1234-4567',
  //       userGroup: 'B',
  //       deliveryPrice: '2000',
  //       deliveryPriceFee: '800',
  //       deliveryPriceFeeType: '정률',
  //       riderRevenue: '40000000'
  //     },
  //     {
  //       monthData: '6월',
  //       userStatus: '사용',
  //       riderName: '하아무개',
  //       riderPhone: '010-1234-4567',
  //       userGroup: 'C',
  //       deliveryPrice: '2000',
  //       deliveryPriceFee: '500',
  //       deliveryPriceFeeType: '정량',
  //       riderRevenue: '28000000'
  //     },
  //     {
  //       monthData: '5월',
  //       userStatus: '사용',
  //       riderName: '김아무개',
  //       riderPhone: '010-1234-4567',
  //       userGroup: 'A',
  //       deliveryPrice: '2000',
  //       deliveryPriceFee: '500',
  //       deliveryPriceFeeType: '정량',
  //       riderRevenue: '30000000'
  //     },
  //     {
  //       monthData: '5월',
  //       userStatus: '사용',
  //       riderName: '지아무개',
  //       riderPhone: '010-1234-4567',
  //       userGroup: 'B',
  //       deliveryPrice: '2000',
  //       deliveryPriceFee: '800',
  //       deliveryPriceFeeType: '정률',
  //       riderRevenue: '40000000'
  //     },
  //     {
  //       monthData: '5월',
  //       userStatus: '사용',
  //       riderName: '하아무개',
  //       riderPhone: '010-1234-4567',
  //       userGroup: 'C',
  //       deliveryPrice: '2000',
  //       deliveryPriceFee: '500',
  //       deliveryPriceFeeType: '정량',
  //       riderRevenue: '28000000'
  //     },


  //   ];
  //   this.setState({
  //     list: list,
  //   });
  // }
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

  pressSearch = () => {
    this.setState({
      pagination:{
        current: 1,
        pageSize: 10,
      }
    }, () => this.getList());
  }

  onDownload = (data) => {
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    [
      'idx',
      'createDate',
      '월',
      'incomeDate',
      'userIdx',
      '수익(원)',
      'memo',
      '라이더명',
      '라이더 연락처',
      '라이더 그룹(1:A,2:B,3:C,4:D,5:E)',
      '수수료방식(0:정량, 1:정률)',
      '수수료(원)',
      '배달요금(원)'
    ].forEach((x, idx) => {
      const cellAdd = xlsx.utils.encode_cell({c:idx, r:0});
      ws[cellAdd].v = x;
    })
    ws['!cols'] = [];
    ws['!cols'][0] = { hidden: true };
    ws['!cols'][1] = { hidden: true };
    ws['!cols'][3] = { hidden: true };
    ws['!cols'][4] = { hidden: true };
    ws['!cols'][6] = { hidden: true };
    ws['!cols'][8] = { width: 12 };
    ws['!cols'][9] = { 
      width: 25,
      render: (data) => <div>{riderGroup[data]}</div>
    }
    ws['!cols'][10] = { 
      width: 22,
      render: (data) => <div>{feeType[data]}</div>
    }
    console.log(ws['!cols'][0]);
    xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    xlsx.writeFile(wb, "라이더배달내역.xlsx");
  }

  render() {

    const columns = [
      {
        title: "월",
        dataIndex: "incomeDate",
        className: "table-column-center",
        width: '5%',
        render: (data) => <div>{moment(data).format("M")+"월"}</div>
      },
      {
        title: "상태",
        dataIndex: "orderStatus",
        className: "table-column-center",
        width: '8%',
      },
      {
        title: "라이더명",
        dataIndex: "riderName",
        className: "table-column-center",
        width: '10%',
      },
      {
        title: "라이더 연락처",
        dataIndex: "riderPhone",
        className: "table-column-center",
        width: '10%',
      },
      {
        title: "라이더그룹",
        dataIndex: "riderGroup",
        className: "table-column-center",
        width: '10%',
        render: (data) => <div>{riderGroup[data]}</div>
      },
      {
        title: "배달요금",
        dataIndex: "deliveryPrice",
        className: "table-column-center",
        width: '8%',
        render: (data) => <div>{comma(data)} 원</div>
      },
      {
        title: "수수료",
        dataIndex: "feeAmount",
        className: "table-column-center",
        width: '8%',
        render: (data) => <div>{comma(data)} 원</div>
      },
      {
        title: "수수료방식",
        dataIndex: "feeType",
        className: "table-column-center",
        width: '8%',
        render:(data) => <div>{feeType[data]}</div>
      },
      {
        title: "수익",
        dataIndex: "incomeAmount",
        className: "table-column-center",
        width: '8%',
        render: (data) => <div>{comma(data)} 원</div>
      },
    ];

    return (
      
      <FormItem>
          <Space direction="vertical">
            <DatePicker
              onChange={(_, dateString) => {
                if (dateString) {
                  this.setState(
                    { searchMonth: dateString,
                    pagination:{
                      current: 1,
                      pageSize: 10,
                    }
                  }, () => this.getList()
                    );
                  }
                else {
                  this.setState(
                    { searchMonth: "",
                    pagination:{
                      current: 1,
                      pageSize: 10,
                    }
                  }, () => this.getList()
                  );
                }
                }}
              picker="month"
              placeholder="월별검색" />
          </Space>

            <Search
              placeholder="라이더명 검색"
              enterButton
              allowClear
              onChange={(e) => this.setState({ riderName: e.target.value })}
              onSearch={this.pressSearch}
              style={{
                width: 220,
                marginLeft: 20,
              }}
            />
            <Search
              placeholder="전화번호 검색"
              enterButton
              allowClear
              onChange={(e) => this.setState({ riderPhone: e.target.value })}
              onSearch={this.pressSearch}
              style={{
                width: 220,
                marginLeft: 20,
              }}
            />


          <Button className="download-btn"
            style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={() => this.onDownload(this.state.list)}>
            <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>


            <Table
              rowKey={(record) => record.idx}
              dataSource={this.state.list}
              columns={columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
            />
          </FormItem>
    )
  }
}


export default DeliveryHistoryRider;
