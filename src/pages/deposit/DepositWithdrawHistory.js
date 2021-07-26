import { Button, DatePicker, Input, Radio, Table } from "antd";
import React, { Component } from "react";
import xlsx from "xlsx";
import { httpGet, httpUrl } from "../../api/httpClient";
import DepositWithdrawDialog from "../../components/dialog/DepositWithdrawDialog";
import "../../css/main.css";
import { comma } from "../../lib/util/numberUtil";

const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class DepositWithdrawHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      paginationExcel: {
        total: 0,
        current: 1,
        pageSize: 20000,
      },
      userId: "",
      list: [],
      // userType: 1,
      searchType: 1,
    };
  }

  componentDidMount() {
    this.getList();
    this.getExcelList();
  }

  setDate = (date) => {
    console.log(date);
  };

  getList = () => {
    let pageNum = this.state.pagination.current;
    let pageSize = this.state.pagination.pageSize;
    let userId = this.state.userId;
    let userType = this.state.searchType;
    httpGet(
      httpUrl.depositWithdrawList,
      [pageNum, pageSize, userId, userType],
      {}
    ).then((res) => {
      const pagination = { ...this.state.pagination };
      pagination.current = res.data.currentPage;
      pagination.total = res.data.totalCount;
      this.setState({
        list: res.data.withdraws,
        pagination,
      });
    });
  };

  getExcelList = () => {
    let pageNum = this.state.paginationExcel.current;
    let pageSize = this.state.paginationExcel.pageSize;
    let userId = this.state.userId;
    let userType = this.state.searchType;
    httpGet(
      httpUrl.depositWithdrawList,
      [pageNum, pageSize, userId, userType],
      {}
    ).then((res) => {
      const pagination = { ...this.state.pagination };
      pagination.current = res.data.currentPage;
      pagination.total = res.data.totalCount;
      this.setState({
        listExcel: res.data.withdraws,
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

  // getList = () => {
  //     var list = [
  //         {
  //             idx: '배지현',
  //             withdrawAccount: '신한은행 1002-000-000000',
  //             withdrawPrice: 20000,
  //             withdrawDate: '2021-06-02',
  //         },
  //         {
  //             idx: '배지현',
  //             withdrawAccount: '신한은행 1002-000-000000',
  //             withdrawPrice: 20000,
  //             withdrawDate: '2021-06-02',
  //         },
  //         {
  //             idx: '배지현',
  //             withdrawAccount: '신한은행 1002-000-000000',
  //             withdrawPrice: 20000,
  //             withdrawDate: '2021-06-02',
  //         },
  //         {
  //             idx: '배지현',
  //             withdrawAccount: '신한은행 1002-000-000000',
  //             withdrawPrice: 20000,
  //             withdrawDate: '2021-06-02',
  //         }
  //     ];

  //     this.setState({
  //         list: list,
  //     });
  // }

  pressSearch = () => {
    this.setState(
      {
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
  };

  onChange = (e) => {
    this.setState(
      {
        searchType: e.target.value,
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
  };

  parseExcelJson = () => {
    let result = [
      {
        userId:"아이디",
        userName: "이름",
        bank: "은행명",
        depositor: "예금주명",
        bankAccount: "출금계좌",
        ncashDelta: "출금금액",
        createDate: "출금일시",
      },
    ];
    this.state.listExcel.forEach((item) => {
      result.push({
        userId:item.userId,
        userName: item.userName,
        bank: item.bank,
        depositor: item.depositor,
        bankAccount: item.bankAccount,
        ncashDelta: item.ncashDelta,
        createDate: item.createDate,
      });
    });

    return result;
  };

  onDownload = (data) => {
    const excelJson = this.parseExcelJson(data);
    const ws = xlsx.utils.json_to_sheet(excelJson, { skipHeader: true });
    const wb = xlsx.utils.book_new();

    ws["!cols"] = [];
    ws["!cols"][0] = { width: 15 };
    ws["!cols"][1] = { width: 15 };
    ws["!cols"][2] = { width: 12 };
    ws["!cols"][4] = { width: 15 };
    ws["!cols"][6] = { width: 20 };
    xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    xlsx.writeFile(wb, "예치금출금.xlsx");
  };

  openDepositWithdrawModal = () => {
    this.setState({ depositWithdrawOpen: true });
  };
  closeDepositWithdrawModal = () => {
    this.setState({ depositWithdrawOpen: false });
  };

  render() {
    const columns = [
      {
        title: "아이디",
        dataIndex: "userId",
        className: "table-column-center",
      },
      {
        title: "이름",
        dataIndex: "userName",
        className: "table-column-center",
      },
      {
        title: "은행명",
        dataIndex: "bank",
        className: "table-column-center",
        render: (data) => <div>{data === null ? "" : data.split(",")[0]}</div>,
      },
      {
        title: "예금주명",
        dataIndex: "depositor",
        className: "table-column-center",
      },
      {
        title: "출금계좌",
        dataIndex: "bankAccount",
        className: "table-column-center",
      },
      {
        title: "출금금액",
        dataIndex: "ncashDelta",
        className: "table-column-center",
        render: (data) => <div>{comma(data)}원</div>,
      },
      {
        title: "출금일시",
        dataIndex: "createDate",
        className: "table-column-center",
      },
    ];
    return (
      <>
        <Radio.Group
          defaultValue={1}
          onChange={this.onChange}
          style={{ marginTop: 5 }}
        >
          <Radio value={1}>라이더</Radio>
          <Radio value={2}>가맹점</Radio>
        </Radio.Group>

        <Search
          placeholder="아이디 검색"
          enterButton
          allowClear
          onChange={(e) => this.setState({ userId: e.target.value })}
          onSearch={this.pressSearch}
          style={{
            width: 220,
            marginBottom: 20,
          }}
        />

        {this.state.depositWithdrawOpen && (
          <DepositWithdrawDialog close={this.closeDepositWithdrawModal} />
        )}
        <Button
          style={{ marginBottom: 20, marginLeft: 20 }}
          onClick={this.openDepositWithdrawModal}
        >
          예치금 출금
        </Button>

        <Button
          className="download-btn"
          style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
          onClick={() => this.onDownload(this.state.listExcel)}
        >
          <img src={require("../../img/excel.png").default} alt="" />
          엑셀 다운로드
        </Button>
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
export default DepositWithdrawHistory;
