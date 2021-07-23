import { Button, DatePicker, Form, Input, Table } from "antd";
import React, { Component } from "react";
import xlsx from "xlsx";
import { httpGet, httpUrl } from "../../api/httpClient";
import "../../css/main.css";
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
      paginationExcel: {
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
      () => {
        this.state.startDate === "" ? this.getList() : this.getSearchList();
      }
    );
  };

  pressSearch = () => {
    this.setState(
      {
        pagination: {
          current: 1,
          pageSize: 10,
        },
      },
      () => {
        {
          this.state.startDate === "" ? this.getList() : this.getSearchList();
        }
        {
          this.state.startDate === ""
            ? this.getExcelList()
            : this.getExcelSearchList();
        }
      }
    );
  };

  parseExcelJson = () => {
    let result = [
      {
        idx: "주문번호",
        frName: "가맹점명",
        riderName: "라이더명",
        orderDate: "접수일시",
        completeDate: "완료일시",
        destAddr: "도착지",
        orderPrice: "금액",
        deliveryPrice: "배달료",
        deliveryTax: "배달부가세",
        deliveryPriceFee: "배달수수료",
        businessNumber: "사업자번호",
        ownerName: "대표자명",
        addr: "주소",
        email: "이메일",
        registrationNumber: "주민번호",
        frPhone: "연락처",
      },
    ];
    this.state.listExcel.forEach((item) => {
      result.push({
        idx: item.idx,
        frName: item.frName,
        riderName: item.riderName,
        orderDate: item.orderDate,
        completeDate: item.completeDate,
        destAddr: item.destAddr1 + " " + item.destAddr2,
        orderPrice: item.orderPrice,
        deliveryPrice: item.deliveryPrice,
        deliveryTax: parseInt(item.deliveryPrice * 0.1),
        deliveryPriceFee: item.deliveryPriceFee,
        businessNumber: item.businessNumber,
        ownerName: item.ownerName,
        addr: item.addr1 + " " + item.addr2,
        email: item.email,
        registrationNumber: item.registrationNumber,
        frPhone: item.frPhone,
      });
    });

    return result;
  };

  onDownload = (data) => {
    // console.log(data);
    // const ws = xlsx.utils.json_to_sheet(data);
    // const wb = xlsx.utils.book_new();
    // [
    //   "주문번호",
    //   "주문날짜",
    //   "가격(원)",
    //   "총배달요금(원)",
    //   "기본배달요금(원)",
    //   "할증배달요금(원)",
    //   "주소",
    //   "상세주소",
    //   "지번주소",
    //   "가맹점",
    //   "가맹점 번호",
    //   "주문번호",
    //   "라이더명",
    //   "라이더 연락처",
    //   "배달수수료",
    //   "픽업일시",
    //   "완료일시",

    //   // hidden
    //   "riderLevel",
    //   "riderStatus",
    //   "riderGroup",
    //   "feeType",
    // ].forEach((x, idx) => {
    //   const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
    //   ws[cellAdd].v = x;
    // });

    // ws["!cols"] = [];
    // ws["!cols"][1] = { width: 20 };
    // ws["!cols"][3] = { width: 15 };
    // ws["!cols"][4] = { width: 15 };
    // ws["!cols"][5] = { width: 15 };
    // ws["!cols"][6] = { width: 30 };
    // ws["!cols"][7] = { width: 20 };
    // ws["!cols"][8] = { width: 20 };
    // ws["!cols"][9] = { width: 20 };
    // ws["!cols"][10] = { width: 20 };
    // ws["!cols"][11] = { width: 20 };
    // ws["!cols"][14] = { width: 20 };
    // ws["!cols"][15] = { width: 20 };
    // ws["!cols"][16] = { width: 20 };
    // ws["!cols"][17] = { width: 20 };

    // // 라이더 연락처
    // ws["!cols"][13] = { hidden: true };
    // // riderLevel
    // ws["!cols"][18] = { hidden: true };
    // // riderStatus
    // ws["!cols"][19] = { hidden: true };
    // // feeType
    // ws["!cols"][20] = { hidden: true };

    // xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    // xlsx.writeFile(wb, "배달목록.xlsx");

    const excelJson = this.parseExcelJson(data);
    const ws = xlsx.utils.json_to_sheet(excelJson, { skipHeader: true });
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    xlsx.writeFile(wb, "배달목록.xlsx");
  };

  render() {
    const columns = [
      {
        title: "주문번호",
        dataIndex: "idx",
        className: "table-column-center",
        width: "5%",
      },
      // {
      //   title: "주문날짜",
      //   dataIndex: "orderDate",
      //   className: "table-column-center",
      //   width: "10%",
      //   render: (data) => <div>{formatDates(data)}</div>,
      // },
      {
        title: "가맹점명",
        dataIndex: "frName",
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
        title: "접수일시",
        dataIndex: "orderDate",
        className: "table-column-center",
        render: (data) => <div>{data}</div>,
      },
      {
        title: "완료일시",
        dataIndex: "completeDate",
        className: "table-column-center",
        render: (data) => <div>{data}</div>,
      },
      {
        title: "도착지",
        // dataIndex: "destAddr1",
        className: "table-column-center",
        width: "15%",
        render: (data, row) => (
          <div className="table-column-left">
            {row.destAddr1 + " " + row.destAddr2}
          </div>
        ),
      },
      {
        title: "금액",
        dataIndex: "orderPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
      },
      {
        title: "배달료",
        dataIndex: "basicDeliveryPrice",
        className: "table-column-center",
        width: "8%",
        render: (data) => <div>{comma(data)} 원</div>,
      },
      {
        title: "배달부가세",
        className: "table-column-center",
        render: (data, row) => <div>{row.deliveryPrice * 0.1}원</div>,
      },
      {
        title: "배달수수료",
        dataIndex: "deliveryPriceFee",
        className: "table-column-center",
        render: (data) => <div>{comma(data)}원</div>,
      },

      // 수정
      // {
      //   title: "주문날짜",
      //   dataIndex: "orderDate",
      //   className: "table-column-center",
      //   width: "10%",
      //   render: (data) => <div>{formatDates(data)}</div>,
      // },
      // {
      //   title: "할증배달요금",
      //   dataIndex: "extraDeliveryPrice",
      //   className: "table-column-center",
      //   width: "8%",
      //   render: (data) => <div>{comma(data)} 원</div>,
      // },
      // {
      //   title: "총배달요금",
      //   dataIndex: "deliveryPrice",
      //   className: "table-column-center",
      //   width: "8%",
      //   render: (data) => <div>{comma(data)} 원</div>,
      // },
    ];
    const expandedRowRender = (record) => {
      const dropColumns = [
        {
          title: "가맹점명",
          dataIndex: "frName",
          className: "table-column-center",
        },
        {
          title: "사업자번호",
          dataIndex: "businessNumber",
          className: "table-column-center",
        },
        {
          title: "대표자명",
          dataIndex: "ownerName",
          className: "table-column-center",
        },
        {
          title: "주소",
          className: "table-column-center",
          render: (data, row) => <div>{row.addr1 + " " + row.addr2}</div>,
        },
        {
          title: "이메일",
          dataIndex: "email",
          className: "table-column-center",
        },
        {
          title: "라이더명",
          dataIndex: "riderName",
          className: "table-column-center",
        },
        {
          title: "라이더 주민번호",
          dataIndex: "registrationNumber",
          className: "table-column-center",
        },
        {
          title: "라이더 연락처",
          dataIndex: "riderPhone",
          className: "table-column-center",
        },
      ];
      return (
        <Table
          rowKey={(record) => `record: ${record.idx}`}
          columns={dropColumns}
          dataSource={[record]}
          pagination={false}
        />
      );
    };

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
            if (dateStrings[(0, 1)]) {
              this.setState(
                {
                  startDate: dateStrings[0],
                  endDate: dateStrings[1],
                  pagination: {
                    current: 1,
                    pageSize: 10,
                  },
                },
                () => {
                  this.getSearchList();
                  this.getExcelSearchList();
                }
              );
            } else {
              // console.log('test')
              this.setState(
                {
                  startDate: "",
                  endDate: "",
                  pagination: {
                    current: 1,
                    pageSize: 10,
                  },
                },
                () => {
                  this.getList();
                  this.getExcelList();
                }
              );
            }
          }}
        />

        <Table
          rowKey={(record) => record.idx}
          dataSource={this.state.list}
          columns={columns}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          expandedRowRender={expandedRowRender}
          expandRowByClick={true}
        />
      </FormItem>
    );
  }
}

export default DeliveryList;
