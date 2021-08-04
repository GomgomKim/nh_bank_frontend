import React, { Component, useState, useCallback } from "react";
import {
  httpGet,
  httpUrl,
  httpDownload,
  httpPost,
  httpPut,
} from "../../api/httpClient";
import { Table, Input, Button, DatePicker, Space } from "antd";
import { comma } from "../../lib/util/numberUtil";
import { formatDate } from "../../lib/util/dateUtil";
import "../../css/main.css";

const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class NcashFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      list: [],
    };
  }

  componentDidMount() {
    this.getList();
  }
  getList = () => {
    let pageNum = this.state.pagination.current;
    let pageSize = this.state.pagination.pageSize;
    httpGet(httpUrl.NcashFee, [pageNum, pageSize], {}).then((res) => {
      const pagination = { ...this.state.pagination };
      pagination.current = res.data.currentPage;
      pagination.total = res.data.totalCount;
      this.setState({
        list: res.data.ncash,
        pagination,
      });
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
    const categoryString = {
      NCASH_CHARGE_PROC: '충전수수료',
      WITHDRAW_REQ: '출금수수료'
    }
    const categoryColor = {
      NCASH_CHARGE_PROC: 'blue',
      WITHDRAW_REQ: 'red'
    }
    const columns = [
      // {
      //     title: "일자",
      //     dataIndex: "num",
      //     className: "table-column-center",
      // },
      {
        title: "일시",
        dataIndex: "createDate",
        className: "table-column-center",
        render: (data) => <div>{formatDate(data)}</div>,
      },
      {
        title: "구분",
        dataIndex: "category",
        className: "table-column-center",
        render: (data) => (
          <>
              <div style={{ color: categoryColor[data] }}>{categoryString[data]}</div>
          </>
        ),
      },

      {
        title: "금액",
        dataIndex: "ncashDelta",
        className: "table-column-center",
        render: (data) => <div>{comma(data)}원</div>,
      },
    ];

    return (
      <>
        {/* <Button
          className="download-btn"
          style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
          onClick={{}}
        >
          <img src={require("../../img/excel.png").default} alt="" />
          엑셀 다운로드
        </Button> */}

        <RangePicker
          onChange={this.onChangeDate}
          showTime={{ format: "MM:dd" }}
          style={{ float: "right", marginBottom: 20 }}
          placeholder={["시작일", "종료일"]}
        />

        <Table
          dataSource={this.state.list}
          columns={columns}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          //   expandedRowRender={this.expandedRowRender}
          //   expandRowByClick={true}
        />
      </>
    );
  }
}
export default NcashFee;
