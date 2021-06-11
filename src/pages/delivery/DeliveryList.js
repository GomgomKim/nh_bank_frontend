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
import { formatDates } from "../../lib/util/dateUtil";
import { comma } from "../../lib/util/numberUtil";

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
      riderName: "",
      frPhone: "",
      endDate: "",
      startDate: "",
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
        this.state.endDate,
        this.state.frName,
        this.state.frPhone,
        pagination.current,
        pagination.pageSize,
        this.state.riderName,
        this.state.startDate,
      ],
      {}
    ).then((res) => {
      if (res.result === "SUCCESS") {
        this.setState({
          list: res.data.orders,
          pagination: {
            ...this.state.pagination,
            current: res.data.currentPage,
            total: res.data.totalCount,
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

  pressSearch = () => {
    this.setState({
      pagination:{
        current: 1,
        pageSize: 10,
      }
    }, () => this.getList());
  }

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
        render: (data) => <div>{formatDates(data)}</div>,
      },
      {
        title: "도착지",
        dataIndex: "destAddr1",
        className: "table-column-center",
        width: "15%",
        render: (data) => <div className="table-column-left">{data}</div>,
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
        render: (data) => <div>{comma(data)}</div>,
      },
      {
        title: "기본배달요금",
        dataIndex: "basicDeliveryPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)}</div>,
      },
      {
        title: "할증배달요금",
        dataIndex: "extraDeliveryPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)}</div>,
      },
      {
        title: "총배달요금",
        dataIndex: "deliveryPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)}</div>,
      },
    ];

    return (
      <FormItem name="surchargeDate">
        <Search
          placeholder="가맹점 검색"
          enterButton
          allowClear
          onChange={(e) => this.setState({ frName: e.target.value })}
          onSearch={this.pressSearch}
          style={{
            width: 220,
          }}
        />
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
          onChange={(e) => this.setState({ frPhone: e.target.value })}
          onSearch={this.pressSearch}
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
          rowKey={(record) => record.idx}
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
