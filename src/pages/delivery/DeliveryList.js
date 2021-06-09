import { Form, DatePicker, Input, Table, Button, Descriptions } from "antd";
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
import { httpGet, httpUrl } from "../../api/httpClient";

const FormItem = Form.Item;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class DeliveryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      frName: "",
      userName: "",
      userPhone: "",
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const pagination = this.state.pagination;
    httpGet(
      httpUrl.deliveryList,
      [
        this.state.frName,
        pagination.current,
        pagination.pageSize,
        this.state.searchMonth,
        this.state.userName,
        this.state.userPhone,
      ],
      {}
    ).then((res) => {
      if (res.result === "SUCCESS") {
        this.setState({
          list: res.data.orders,
          pagination: {
            ...this.state.pagination,
            current: res.data.currentPage,
            total: res.data.totalPage,
          },
        });
      }
    });
  };
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
        title: "주문번호",
        dataIndex: "idx",
        className: "table-column-center",
        width: "5%",
      },
      {
        title: "주문날짜",
        dataIndex: "orderDate",
        className: "table-column-center",
        width: "10%",
      },
      {
        title: "도착지",
        dataIndex: "destAddr1",
        className: "table-column-center",
        width: "15%",
      },
      {
        title: "가맹점",
        dataIndex: "frName",
        className: "table-column-center",
        width: "10%",
      },
      {
        title: "가맹점 번호",
        dataIndex: "frPhone",
        className: "table-column-center",
        width: "10%",
      },
      {
        title: "라이더명",
        dataIndex: "riderName",
        className: "table-column-center",
        width: "8%",
      },
      {
        title: "라이더 연락처",
        dataIndex: "riderPhone",
        className: "table-column-center",
        width: "10%",
      },
      {
        title: "가격",
        dataIndex: "orderPrice",
        className: "table-column-center",
        width: "8%",
      },
      {
        title: "기본배달요금",
        dataIndex: "basicDeliveryPrice",
        className: "table-column-center",
        width: "8%",
      },
      {
        title: "할증배달요금",
        dataIndex: "extraDeliveryPrice",
        className: "table-column-center",
        width: "8%",
      },
      {
        title: "총배달요금",
        dataIndex: "deliveryPrice",
        className: "table-column-center",
        width: "8%",
      },
    ];

    return (
      <FormItem name="surchargeDate">
        <Search
          placeholder="가맹점 검색"
          enterButton
          allowClear
          onChange={(e) => this.setState({ frName: e.target.value })}
          onSearch={this.getList}
          style={{
            width: 220,
          }}
        />
        <Search
          placeholder="라이더명 검색"
          enterButton
          allowClear
          onChange={(e) => this.setState({ userName: e.target.value })}
          onSearch={this.getList}
          style={{
            width: 220,
            marginLeft: 20,
          }}
        />
        <Search
          placeholder="전화번호 검색"
          enterButton
          allowClear
          onChange={(e) => this.setState({ userPhone: e.target.value })}
          onSearch={this.getList}
          style={{
            width: 220,
            marginLeft: 20,
          }}
        />

        <a href="/admin_bike_templete.xlsx" download>
          <Button
            className="download-btn"
            style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
            onClick={{}}
          >
            <img src={require("../../img/excel.png").default} alt="" />
            엑셀 다운로드
          </Button>
        </a>
        <RangePicker
          style={{ width: 300, float: "right", marginRight: 10 }}
          placeholder={["시작일", "종료일"]}
          onChange={this.onChangeDate}
        />

        <Table
          rowKey={(record) => record}
          dataSource={this.state.list}
          columns={columns}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
        />
      </FormItem>
    );
  }
}

export default DeliveryList;
