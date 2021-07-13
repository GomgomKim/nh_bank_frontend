import { Button, DatePicker, Input, Radio, Table } from "antd";
import React, { Component } from "react";
import LineGraph from "../../components/graph/LineGraph";
import "../../css/main.css";
import { comma } from "../../lib/util/numberUtil";

const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class StaticsBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      list: [],

      graphOpen: false,
    };
  }

  componentDidMount() {
    this.getList();
  }

  setDate = (date) => {
    console.log(date);
  };

  getList = () => {
    var list = [
      {
        branchIdx: "김포1지점",
        deliveryNum: 15,
        deliveryFee: 3000,
        branchFee: 300000,
        date: "2021-06-03",
      },
      {
        branchIdx: "김포2지점",
        deliveryNum: 15,
        deliveryFee: 3000,
        branchFee: 300000,
        date: "2021-06-03",
      },
      {
        branchIdx: "김포3지점",
        deliveryNum: 15,
        deliveryFee: 3000,
        branchFee: 300000,
        date: "2021-06-03",
      },
      {
        branchIdx: "김포4지점",
        deliveryNum: 15,
        deliveryFee: 3000,
        branchFee: 300000,
        date: "2021-06-03",
      },
    ];

    this.setState({
      list: list,
    });
  };

  openGraph = () =>
    this.setState({ graphOpen: true }, () => console.log(this.state.graphOpen));
  closeGraph = () => this.setState({ graphOpen: false });

  render() {
    const columns = [
      {
        title: "지점명",
        dataIndex: "branchIdx",
        className: "table-column-center",
      },
      {
        title: "배달건수",
        dataIndex: "deliveryNum",
        className: "table-column-center",
        render: (data) => <div>{comma(data)}</div>,
      },
      {
        title: "배달료",
        dataIndex: "deliveryFee",
        className: "table-column-center",
        render: (data) => <div>{comma(data)}원</div>,
      },
      {
        title: "수수료",
        dataIndex: "branchFee",
        className: "table-column-center",
        render: (data) => <div>{comma(data)}원</div>,
      },
      {
        title: "날짜",
        dataIndex: "date",
        className: "table-column-center",
      },
    ];

    return (
      <>
        {this.state.graphOpen && (
          <LineGraph
            style={{ zIndex: 10000 }}
            // data={exData}
            close={this.closeGraph}
          />
        )}

        <Radio.Group onChange={this.onChange} style={{ marginTop: 5 }}>
          <Radio value={1}>일별</Radio>
          <Radio value={2}>월별</Radio>
        </Radio.Group>

        <Search
          placeholder="지점명 검색"
          enterButton
          allowClear
          onSearch={this.onSearch}
          style={{
            width: 220,
            marginBottom: 20,
          }}
        />

        <Button
          className="download-btn"
          style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
          onClick={() => this.openGraph()}
        >
          <img src={require("../../img/statistics.png").default} alt="" />
          그래프 통계
        </Button>

        <RangePicker
          onChange={this.onChangeDate}
          showTime={{ format: "MM:dd" }}
          style={{ float: "right" }}
          placeholder={["시작일", "종료일"]}
        />

        <Table
          rowKey={(record) => record.idx}
          rowClassName={(record) =>
            record.status === "COMPLETE" ? "table-disabled" : ""
          }
          dataSource={this.state.list}
          columns={columns}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          expandedRowRender={this.expandedRowRender}
          expandRowByClick={true}
        />
      </>
    );
  }
}
export default StaticsBranch;
