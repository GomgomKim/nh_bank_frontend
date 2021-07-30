import { Button, DatePicker, Input, Modal, Table } from "antd";
import React, { Component } from "react";
import xlsx from "xlsx";
import { httpGet, httpPost, httpUrl } from "../../api/httpClient";
import { customAlert, customError } from "../../api/Modals";
import ChargeDialog from "../../components/dialog/ChargeDialog";
import FranFeeDialog from "../../components/dialog/FranFeeDialog";
import ModifyFranDialog from "../../components/dialog/ModifyFranDialog";
import RegistVANDialog from "../../components/dialog/RegistVANDialog";
import "../../css/main.css";

const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;
class FranchiseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      franFeeDialog: false, //가맹비내역
      modifyFranDialog: false, //수정
      chargeDialog: false, //충전내역
      registVANdialogOpen: false, //VAN등록요청
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
      branchName: "",
      franchiseData: [], //가맹점 수정 데이터
    };
  }

  componentDidMount() {
    this.getList();
    this.getExcelList();
  }

  setDate = (date) => {
    console.log(date);
  };

  // 수정 dialog
  openModifyFranDialogModal = (row) => {
    this.setState({
      modifyFranDialogOpen: true,
      franchiseData: row,
    });
  };
  closeModifyFranDialogModal = () => {
    this.setState({ modifyFranDialogOpen: false });
  };
  //가맹비내역 dialog
  openFranFeeDialogModal = () => {
    this.setState({ franFeeDialogOpen: true });
  };
  closeFranFeeDialogModal = () => {
    this.setState({ franFeeDialogOpen: false });
  };
  //충전내역 dialog
  openChargeDialogModal = () => {
    this.setState({ chargeDialogOpen: true });
  };
  closeChargeDialogModal = () => {
    this.setState({ chargeDialogOpen: false });
  };
  // VAN등록요청 dialog
  openVANdialogModal = () => {
    this.setState({ registVANdialogOpen: true });
  };
  closeVANdialogModal = () => {
    this.setState({ registVANdialogOpen: false });
  };

  registPG = (userIdx) => {
    let self = this;
    Modal.confirm({
      title: "PG 지갑 등록",
      content:
        "PG사에 가맹점 지갑을 등록합니다. 등록 시 가상계좌도 발급됩니다. 실제 계좌가 발급되니 무분별한 등록은 자제해주세요. 정말 등록하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk() {
        httpPost(httpUrl.registFranchisePG, [userIdx], {})
          .then((result) => {
            if (result.result === "SUCCESS" && result.data) {
              customAlert("완료", "PG에 가맹점이 등록되었습니다..");
            } else
              customError(
                "등록오류",
                "에러가 발생하였습니다. 다시 시도해주세요."
              );
            self.getList();
          })
          .catch((error) => {
            customError(
              "등록오류",
              "에러가 발생하였습니다. 다시 시도해주세요."
            );
          });
      },
    });
  };

  getList = () => {
    const pagination = this.state.pagination;
    httpGet(
      httpUrl.franchiseList,
      [
        this.state.branchName,
        this.state.frName,
        pagination.current,
        pagination.pageSize,
      ],
      {}
    ).then((res) => {
      // alert(JSON.stringify(res))
      if (res.result === "SUCCESS") {
        this.setState({
          list: res.data.franchises,
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

  onSearchFranchse = (value) => {
    this.setState(
      {
        frName: value,
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

  onSearchBranch = (value) => {
    this.setState(
      {
        branchName: value,
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

  getExcelList = () => {
    const pagination = this.state.paginationExcel;
    httpGet(
      httpUrl.franchiseList,
      [
        this.state.branchName,
        this.state.frName,
        pagination.current,
        pagination.pageSize,
      ],
      {}
    ).then((res) => {
      // alert(JSON.stringify(res))
      if (res.result === "SUCCESS") {
        this.setState({
          listExcel: res.data.franchises,
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
        branchName: "지점명",
        frName: "가맹점명",
        frPhone: "가맹점번호",
        addr: "가맹점주소",
        tidNormal: "VAN",
        tidPrepay: "PG",
        tidNormalRate: "PG사용",
        walletId: "PG지갑",
      },
    ];
    this.state.listExcel.forEach((item) => {
      result.push({
        branchName: item.branchName,
        frName: item.frName,
        frPhone: item.frPhone,
        addr: item.addr1 + " " + item.addr2,
        tidNormal: item.tidNormal,
        tidPrepay: item.tidPrepay,
        tidNormalRate: item.tidNormalRate == 100 ? "미사용" : "사용",
        walletId: item.walletId,
      });
    });

    return result;
  };

  onDownload = (data) => {
    const excelJson = this.parseExcelJson(data);
    const ws = xlsx.utils.json_to_sheet(excelJson, { skipHeader: true });
    const wb = xlsx.utils.book_new();
    ws["!cols"] = [];
    ws["!cols"][1] = { width: 20 };
    ws["!cols"][2] = { width: 15 };
    ws["!cols"][3] = { width: 50 };
    ws["!cols"][4] = { width: 15 };
    ws["!cols"][7] = { width: 20 };
    xlsx.utils.book_append_sheet(wb, ws, "sheet1");
    xlsx.writeFile(wb, "가맹점목록.xlsx");
  };

  render() {
    const columns = [
      {
        title: "지점명",
        dataIndex: "branchName",
        className: "table-column-center",
      },

      {
        title: "가맹점명",
        dataIndex: "frName",
        className: "table-column-center",
      },
      {
        title: "가맹점번호",
        dataIndex: "frPhone",
        className: "table-column-center",
      },
      {
        title: "가맹점주소",
        // dataIndex: "franAddr",
        className: "table-column-center",
        render: (data, row) => <div>{row.addr1 + " " + row.addr2}</div>,
      },
      {
        title: "VAN",
        dataIndex: "tidNormal",
        className: "table-column-center",
      },
      {
        title: "PG",
        dataIndex: "tidPrepay",
        className: "table-column-center",
      },
      {
        title: "PG 사용",
        dataIndex: "tidNormalRate",
        className: "table-column-center",
        render: (data) => <div>{data == 100 ? "미사용" : "사용"}</div>,
      },
      {
        title: "가맹비내역",
        dataIndex: "franFeeList",
        className: "table-column-center",
        render: (data, row) => (
          <Button onClick={this.openFranFeeDialogModal}>가맹비내역</Button>
        ),
      },
      {
        title: "충전내역",
        dataIndex: "chargeList",
        className: "table-column-center",
        render: (data, row) => (
          <Button onClick={this.openChargeDialogModal}>충전내역</Button>
        ),
      },
      {
        title: "수정",
        dataIndex: "update",
        className: "table-column-center",
        render: (data, row) => (
          <Button onClick={() => this.openModifyFranDialogModal(row)}>
            수정
          </Button>
        ),
      },
      {
        title: "PG지갑",
        dataIndex: "walletId",
        className: "table-column-center",
        render: (data, row) => {
          return data ? (
            <div>{data}</div>
          ) : (
            <Button onClick={() => this.registPG(row.userIdx)}>PG등록</Button>
          );
        },
      },
    ];

    return (
      <>
        <Search
          placeholder="지점명 검색"
          enterButton
          allowClear
          onSearch={this.onSearchBranch}
          style={{
            width: 220,
          }}
        />
        <Search
          placeholder="가맹점 검색"
          enterButton
          allowClear
          onSearch={this.onSearchFranchse}
          style={{
            width: 220,
            marginLeft: 20,
          }}
        />
        {this.state.registVANdialogOpen && (
          <RegistVANDialog
            close={this.closeVANdialogModal}
            getList={this.getList}
          />
        )}
        <Button
          style={{ marginBottom: 20, marginLeft: 20 }}
          onClick={this.openVANdialogModal}
        >
          VAN 등록요청
        </Button>
        <Button
          className="download-btn"
          style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
          onClick={() => this.onDownload(this.state.listExcel)}
        >
          <img src={require("../../img/excel.png").default} alt="" />
          엑셀 다운로드
        </Button>

        {this.state.modifyFranDialogOpen && (
          <ModifyFranDialog
            data={this.state.franchiseData}
            close={this.closeModifyFranDialogModal}
            getList={this.getList}
          />
        )}

        {this.state.franFeeDialogOpen && (
          <FranFeeDialog close={this.closeFranFeeDialogModal} />
        )}
        {this.state.chargeDialogOpen && (
          <ChargeDialog close={this.closeChargeDialogModal} />
        )}

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
export default FranchiseList;
