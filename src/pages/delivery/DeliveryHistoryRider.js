import { Form, DatePicker, Input, Table, Button, Space } from "antd";
import React, { Component } from "react";

// import {
//   httpGet,
//   httpUrl,
//   httpDownload,
//   httpPost,
//   httpPut,
// } from "../../api/httpClient";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import "../../css/main.css";

const FormItem = Form.Item;
const Search = Input.Search;

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
    var list = [
      {
        monthData: '6월',
        userStatus: '사용',
        riderName: '김아무개',
        riderPhone: '010-1234-4567',
        userGroup: 'A',
        deliveryPrice: '2000',
        deliveryPriceFee: '500',
        deliveryPriceFeeType: '정량',
        riderRevenue: '30000000'
      },
      {
        monthData: '6월',
        userStatus: '사용',
        riderName: '지아무개',
        riderPhone: '010-1234-4567',
        userGroup: 'B',
        deliveryPrice: '2000',
        deliveryPriceFee: '800',
        deliveryPriceFeeType: '정률',
        riderRevenue: '40000000'
      },
      {
        monthData: '6월',
        userStatus: '사용',
        riderName: '하아무개',
        riderPhone: '010-1234-4567',
        userGroup: 'C',
        deliveryPrice: '2000',
        deliveryPriceFee: '500',
        deliveryPriceFeeType: '정량',
        riderRevenue: '28000000'
      },
      {
        monthData: '5월',
        userStatus: '사용',
        riderName: '김아무개',
        riderPhone: '010-1234-4567',
        userGroup: 'A',
        deliveryPrice: '2000',
        deliveryPriceFee: '500',
        deliveryPriceFeeType: '정량',
        riderRevenue: '30000000'
      },
      {
        monthData: '5월',
        userStatus: '사용',
        riderName: '지아무개',
        riderPhone: '010-1234-4567',
        userGroup: 'B',
        deliveryPrice: '2000',
        deliveryPriceFee: '800',
        deliveryPriceFeeType: '정률',
        riderRevenue: '40000000'
      },
      {
        monthData: '5월',
        userStatus: '사용',
        riderName: '하아무개',
        riderPhone: '010-1234-4567',
        userGroup: 'C',
        deliveryPrice: '2000',
        deliveryPriceFee: '500',
        deliveryPriceFeeType: '정량',
        riderRevenue: '28000000'
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

  render() {

    const columns = [
      {
        title: "월",
        dataIndex: "monthData",
        className: "table-column-center",
        width: '5%',
      },
      {
        title: "상태",
        dataIndex: "userStatus",
        className: "table-column-center",
        width: '8%',
      },
      {
        title: "기사명",
        dataIndex: "riderName",
        className: "table-column-center",
        width: '10%',
      },
      {
        title: "기사 연락처",
        dataIndex: "riderPhone",
        className: "table-column-center",
        width: '10%',
      },
      {
        title: "기사그룹",
        dataIndex: "userGroup",
        className: "table-column-center",
        width: '10%',
      },
      {
        title: "배달요금",
        dataIndex: "deliveryPrice",
        className: "table-column-center",
        width: '8%',
      },
      {
        title: "수수료",
        dataIndex: "deliveryPriceFee",
        className: "table-column-center",
        width: '8%',
      },
      {
        title: "수수료방식",
        dataIndex: "deliveryPriceFeeType",
        className: "table-column-center",
        width: '8%',
      },
      {
        title: "수익",
        dataIndex: "riderRevenue",
        className: "table-column-center",
        width: '8%',
      },
    ];

    return (
      
      <FormItem>
          <Space direction="vertical">
            <DatePicker
              onChange={this.onChangeDate}
              picker="month"
              placeholder="월별검색" />
          </Space>

            <Search
              placeholder="기사명 검색"
              enterButton
              allowClear
              onChange={(e) => this.setState({ rider: e.target.value })}
              onSearch={this.onSearchRider}
              style={{
                width: 220,
                marginLeft: 20,
              }}
            />
            <Search
              placeholder="전화번호 검색"
              enterButton
              allowClear
              onChange={(e) => this.setState({ Phone: e.target.value })}
              onSearch={this.onSearchPhone}
              style={{
                width: 220,
                marginLeft: 20,
              }}
            />


          <Button className="download-btn"
            style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
            <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>


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


export default DeliveryHistoryRider;
