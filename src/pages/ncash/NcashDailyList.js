import { Input, DatePicker, Table, Button } from "antd";
import React, { Component } from "react";
import SelectBox from '../../components/input/SelectBox';
import { httpGet, httpUrl } from "../../api/httpClient";
import { kindStatus } from '../../lib/util/codeUtil';
import { comma } from "../../lib/util/numberUtil";
import xlsx from "xlsx";

const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class NcashDailyList extends Component {
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
        pageSize: 50000,
      },
      list: [],
      kind: "",
      userId: "",
    };
    // this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getList();
    this.getExcelList();
  }

  getList = () => {
    const pagination = this.state.pagination;
    httpGet(
      httpUrl.ncashDailyList,
      [
        this.state.kind,
        pagination.current,
        pagination.pageSize,
        this.state.userId,
      ],
      {}
    ).then((res) => {
      if (res.result === "SUCCESS") {
        this.setState({
          list: res.data.ncashDailies,
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
      httpUrl.ncashDailyList,
      [
        this.state.kind,
        pagination.current,
        pagination.pageSize,
        this.state.userId,
      ],
      {}
    ).then((res) => {
      if (res.result === "SUCCESS") {
        this.setState({
          listExcel: res.data.ncashDailies,
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
        this.state.kind,
        pagination.current,
        pagination.pageSize,
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



  parseExcelJson = () => {
    let result = [
      {
        createDate: "일시",
        kind: "구분",
        userId: "라이더아이디",
        userName: "라이더명",
        registrationNumber: "주민번호",
        phone: "연락처",
        ncashDelta: "차감금액",
      },
    ];
    this.state.listExcel.forEach((item) => {
      result.push({
        createDate: item.createDate,
        kind: kindStatus[item.kind],
        userId: item.userId,
        userName: item.userName,
        registrationNumber: item.registrationNumber,
        phone: item.phone,
        ncashDelta: item.ncashDelta,
      });
    });

    return result;
  };

  onDownload = (data) => {

    const excelJson = this.parseExcelJson(data);
    const ws = xlsx.utils.json_to_sheet(excelJson, { skipHeader: true });
    const wb = xlsx.utils.book_new();

    ws["!cols"] = [];
    ws["!cols"][0] = { width: 20 };
    ws["!cols"][2] = { width: 15 };
    ws["!cols"][3] = { width: 15 };
    ws["!cols"][4] = { width: 20 };
    ws["!cols"][5] = { width: 20 };
    xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    xlsx.writeFile(wb, "일차감내역.xlsx");
  };


  onChangeStatus = (value) => {
    this.setState({
      kind: value === "0" ? "" : value,
      pagination: {
        current: 1,
        pageSize: 10,
      }
    }, () => {
      this.getList();
      this.getExcelList();
    })
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


  onSearch = () => {
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

  render() {
    const columns = [
      {
        title: "일시",
        dataIndex: "createDate",
        className: "table-column-center"
      },
      {
        title: "구분",
        dataIndex: "kind",
        className: "table-column-center",
        render: (data) => <div>{kindStatus[data]}</div>

      },
      {
        title: "라이더아이디",
        dataIndex: "userId",
        className: "table-column-center"
      },
      {
        title: "라이더이름",
        dataIndex: "userName",
        className: "table-column-center"
      },
      {
        title: "주민번호",
        dataIndex: "registrationNumber",
        className: "table-column-center"
      },
      {
        title: "연락처",
        dataIndex: "phone",
        className: "table-column-center"
      },
      {
        title: "차감금액",
        dataIndex: "ncashDelta",
        className: "table-column-center",
        render: (data) => <div>{comma(data)}원</div>
      },
    ];

    return (
      <>

        <SelectBox
          // placeholder={'전체'}
          style={{ width: 200, marginBottom: 20 }}
          value={this.state.kind === "" ? kindStatus[0] :
            kindStatus[this.state.kind]}
          code={Object.keys(kindStatus)}
          codeString={kindStatus}
          onChange={(value) => {
            if (parseInt(value) !== this.state.kind) {
              this.onChangeStatus(value);
            }
          }}
        />
        <Search
          placeholder="아이디 검색"
          enterButton
          allowClear
          onChange={(e) => this.setState({ userId: e.target.value })}
          onSearch={this.onSearch}
          style={{
            width: 220,
            marginLeft: 20,
          }}
        />
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
          dataSource={this.state.list}
          columns={columns}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
        />
      </>
    );
  }
}
export default NcashDailyList;