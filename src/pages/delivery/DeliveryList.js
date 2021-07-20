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
import xlsx from 'xlsx';


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
      paginationExcel:{
        total: 0,
        current: 1,
        pageSize: 1500,
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
    this.getExcelList();
  }

  getList = () => {
    const pagination = this.state.pagination;
    httpGet(
      httpUrl.deliveryList,
      [
        this.state.frName,
        this.state.frPhone,
        pagination.current,
        pagination.pageSize,
        this.state.riderName,
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

  getSearchList = () => {
    const pagination = this.state.pagination;
    httpGet(
      httpUrl.deliverySearchList,
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

  getExcelList = () => {
    const pagination = this.state.paginationExcel;
    httpGet(
      httpUrl.deliveryList,
      [
        this.state.frName,
        this.state.frPhone,
        pagination.current,
        pagination.pageSize,
        this.state.riderName,
      ],
      {}
    ).then((res) => {
      if (res.result === "SUCCESS") {
        this.setState({
          listExcel: res.data.orders,
          pagination: {
            ...this.state.pagination,
            current: res.data.currentPage,
            total: res.data.totalCount,
          },
        });
      }
    });
  };

  getExcelSearchList = () => {
    const pagination = this.state.paginationExcel;
    httpGet(
      httpUrl.deliverySearchList,
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
          listExcel: res.data.orders,
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
      () => {this.state.startDate === "" ? this.getList() : this.getSearchList()}
    );
  };

  pressSearch = () => {
    this.setState({
      pagination:{
        current: 1,
        pageSize: 10,
      }
    }, () => {
      {this.state.startDate === "" ? this.getList() : this.getSearchList()}
      {this.state.startDate === "" ? this.getExcelList() : this.getExcelSearchList()}
  });
  }

  onDownload = (data) => {
    // let col2=["가격"];
    // for(let i=0; i<=data.length-1; i++) {
    //   col2.push(comma(data[i].orderPrice))
    // };
    // let col3=["총배달요금"];
    // for(let i=0; i<=data.length-1; i++) {
    //   col3.push(comma(data[i].deliveryPrice))
    // };
    // let col4=["기본배달요금"];
    // for(let i=0; i<=data.length-1; i++) {
    //   col4.push(comma(data[i].basicDeliveryPrice))
    // };
    // let col5=["기본배달요금"];
    // for(let i=0; i<=data.length-1; i++) {
    //   col5.push(comma(data[i].extraDeliveryPrice))
    // };
    const ws = xlsx.utils.json_to_sheet(data);
    // xlsx.utils.sheet_add_json(ws, json, { origin: -1, display: true, cellDates: true, dateNF: 'YYYY-MM-DD' })
    const wb = xlsx.utils.book_new();
    [
      '주문번호',
      '주문날짜',
      '가격(원)',
      '총배달요금(원)',
      '기본배달요금(원)',
      '할증배달요금(원)',
      '주소',
      '상세주소',
      'addr3',
      '가맹점',
      '가맹점 번호',
      'orderIdx',
      '라이더명',
      '라이더 연락처',
      'deliveryPriceFee',
      'pickupDate',
      'completeDate',
      'riderLevel',
      'riderStatus',
      'riderGroup',
      'feeType',
    ].forEach((x, idx) => {
      const cellAdd = xlsx.utils.encode_cell({c:idx, r:0});
      ws[cellAdd].v = x;
    })

    // col2.forEach((x, idx) => {
    //   const cellAdd = xlsx.utils.encode_cell({c:2, r:idx});
    //   ws[cellAdd].v = x;
    //   ws[cellAdd].t = "string";
    // })
    // col3.forEach((x, idx) => {
    //   const cellAdd = xlsx.utils.encode_cell({c:3, r:idx});
    //   ws[cellAdd].v = x;
    //   ws[cellAdd].t = "string";
    // })
    // col4.forEach((x, idx) => {
    //   const cellAdd = xlsx.utils.encode_cell({c:4, r:idx});
    //   ws[cellAdd].v = x;
    //   ws[cellAdd].t = "string";
    // })
    // col5.forEach((x, idx) => {
    //   const cellAdd = xlsx.utils.encode_cell({c:5, r:idx});
    //   ws[cellAdd].v = x;
    //   ws[cellAdd].t = "string";
    // })

    ws['!cols'] = [];
    ws['!cols'][8] = { hidden: true };
    ws['!cols'][11] = { hidden: true };
    ws['!cols'][14] = { hidden: true };
    ws['!cols'][15] = { hidden: true };
    ws['!cols'][16] = { hidden: true };
    ws['!cols'][17] = { hidden: true };
    ws['!cols'][18] = { hidden: true };
    ws['!cols'][19] = { hidden: true };
    ws['!cols'][20] = { hidden: true };
    ws['!cols'][1] = { width: 20 };
    ws['!cols'][3] = { width: 15 };
    ws['!cols'][4] = { width: 15 };
    ws['!cols'][5] = { width: 15 };
    ws['!cols'][6] = { width: 30 };
    ws['!cols'][7] = { width: 20 };
    ws['!cols'][9] = { width: 20 };
    ws['!cols'][10] = { width: 20 };
    ws['!cols'][13] = { width: 12 };
    xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    xlsx.writeFile(wb, "배달목록.xlsx");
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
        // dataIndex: "destAddr1",
        className: "table-column-center",
        width: "15%",
        render: (data, row) => <div className="table-column-left">{row.destAddr1 + " " + row.destAddr2}</div>,
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
        render: (data) => <div>{comma(data)} 원</div>,
      },
      {
        title: "기본배달요금",
        dataIndex: "basicDeliveryPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
      },
      {
        title: "할증배달요금",
        dataIndex: "extraDeliveryPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
      },
      {
        title: "총배달요금",
        dataIndex: "deliveryPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
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

        {/* <a href="/admin_bike_templete.xlsx" download> */}
          <Button
            className="download-btn"
            style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
            onClick={() => this.onDownload(this.state.listExcel)}
          >
            <img src={require("../../img/excel.png").default} alt="" />
            엑셀 다운로드
          </Button>
        {/* </a> */}
        <RangePicker
          style={{ width: 300, float: "right", marginRight: 10 }}
          placeholder={["시작일", "종료일"]}
          onChange={(_, dateStrings) => {
            if (dateStrings[0,1]) {
              this.setState(
                { startDate: dateStrings[0],
                  endDate: dateStrings[1],
                pagination:{
                  current: 1,
                  pageSize: 10,
                }
              }, () => {
                this.getSearchList();
                this.getExcelSearchList();
              });
              }
            else {
              // console.log('test')
              this.setState(
                { startDate: "",
                  endDate: "",
                pagination:{
                  current: 1,
                  pageSize: 10,
                }
              }, () => {
                this.getList();
                this.getExcelList();
              });
            }
            }}
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
