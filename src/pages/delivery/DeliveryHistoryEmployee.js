import { Button, DatePicker, Form, Input, Space, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { httpGet, httpUrl } from "../../api/httpClient";
import "../../css/main.css";
import { riderLevel } from "../../lib/util/codeUtil";
import { comma } from "../../lib/util/numberUtil";
import xlsx from 'xlsx';


const FormItem = Form.Item;
const Search = Input.Search;

class DeliveryHistoryEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      searchMonth: "",
      staffName: "",
      staffPhone: "",
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const pagination = this.state.pagination;
    httpGet(
      httpUrl.staffDeliveryList,
      [
        pagination.current,
        pagination.pageSize,
        this.state.searchMonth,
        this.state.staffName,
        this.state.staffPhone,
      ],
      {}
    ).then((res) => {
      this.setState({
        list: res.data.incentives,
        pagination: {
          ...this.state.pagination,
          current: res.data.currentPage,
          total: res.data.totalCount,
        },
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

  onChangeInput = (e, stateKey) => {
    let newState = this.state;
    newState[stateKey] = e.target.value;
    this.setState(newState);
  };

  onDownload = (data) => {
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    [
      'idx',
      'userIdx',
      '월',
      'incenDate',
      'category',
      'incenPayed',
      '기본건수',
      '배달건수',
      'defaultDeliveryPrice',
      'payedAmount',
      '관리인센티브(원)',
      '가맹점 인센티브(원)',
      '추가 인센티브(원)',
      '직원명',
      '직원 연락처',
      '기본배달료(원)',
      '직급\n(2:부팀장,3:팀장,4:부본부장,5:본부장,6:부지점장,7:지점장,8:부센터장,9:센터장)',
    ].forEach((x, idx) => {
      const cellAdd = xlsx.utils.encode_cell({c:idx, r:0});
      ws[cellAdd].v = x;
    })
    ws['!cols'] = [];
    ws['!cols'][0] = { hidden: true };
    ws['!cols'][1] = { hidden: true };
    ws['!cols'][3] = { hidden: true };
    ws['!cols'][4] = { hidden: true };
    ws['!cols'][5] = { hidden: true };
    ws['!cols'][8] = { hidden: true };
    ws['!cols'][9] = { hidden: true };
    ws['!cols'][10] = { width: 15 };
    ws['!cols'][11] = { width: 18 };
    ws['!cols'][12] = { width: 15 };
    ws['!cols'][14] = { width: 25 };
    ws['!cols'][15] = { width: 15 };
    ws['!cols'][16] = { width: 65 }
    console.log(ws['!cols'][0]);
    xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    xlsx.writeFile(wb, "정직원배달내역.xlsx");
  }

  render() {
    const columns = [
      {
        title: "월",
        dataIndex: "monthData",
        className: "table-column-center",
        width: "5%",
        render: (data) => <div>{moment(data).format("M") + "월"}</div>,
      },
      {
        title: "직급",
        dataIndex: "staffLevel",
        className: "table-column-center",
        width: "5%",
        render: (data) => <div>{riderLevel[data]}</div>,
      },
      {
        title: "직원명",
        dataIndex: "staffName",
        className: "table-column-center",
        width: "10%",
      },
      {
        title: "직원 연락처",
        dataIndex: "staffPhone",
        className: "table-column-center",
        width: "10%",
      },
      {
        title: "상태",
        dataIndex: "userStatus",
        className: "table-column-center",
        width: "8%",
      },
      {
        title: "기본건수",
        dataIndex: "defaultCnt",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 건</div>,
      },
      {
        title: "배달건수",
        dataIndex: "deliveryCnt",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 건</div>,
      },
      {
        title: "기본배달료",
        dataIndex: "basicDeliveryPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
      },
      {
        title: "관리 인센티브",
        dataIndex: "manageIncenAmount",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
      },
      {
        title: "가맹점 인센티브",
        dataIndex: "frIncenAmount",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
      },
      {
        title: "추가 인센티브",
        dataIndex: "additionalIncenAmount",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
      },
    ];

    return (
      <FormItem>
        <Space direction="vertical">
          <DatePicker
            picker="month"
            placeholder="월별검색"
            onChange={(_, dateString) => {
              if (dateString) {
                this.setState(
                  {
                    searchMonth: dateString,
                    pagination: {
                      current: 1,
                      pageSize: 10,
                    },
                  },
                  () => this.getList()
                );
              } else {
                this.setState(
                  {
                    searchMonth: "",
                    pagination: {
                      current: 1,
                      pageSize: 10,
                    },
                  },
                  () => this.getList()
                );
              }
            }}
          />
        </Space>

        <Search
          placeholder="직원명 검색"
          enterButton
          allowClear
          onChange={(e) => this.onChangeInput(e, "staffName")}
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
          onChange={(e) => this.onChangeInput(e, "staffPhone")}
          onSearch={this.getList}
          style={{
            width: 220,
            marginLeft: 20,
          }}
        />

        <Button
          className="download-btn"
          style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
          onClick={() => this.onDownload(this.state.list)}
        >
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
    );
  }
}

export default DeliveryHistoryEmployee;
