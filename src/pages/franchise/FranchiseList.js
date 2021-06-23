import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Space } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import ModifyFranDialog from "../../components/dialog/ModifyFranDialog";
import FranFeeDialog from "../../components/dialog/FranFeeDialog";
import ChargeDialog from "../../components/dialog/ChargeDialog";
import '../../css/main.css';
import xlsx from 'xlsx';

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
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            frName: "",
            branchName: "",
            franchiseData: [], //가맹점 수정 데이터
        };
    }

    componentDidMount() {
        this.getList();
    }

    setDate = (date) => {
        console.log(date)
    }


    // 수정 dialog
    openModifyFranDialogModal = (row) => {
        this.setState({ 
            modifyFranDialogOpen: true,
            franchiseData: row
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
            pagination:{
                current: 1,
                pageSize: 10,
              }
          },
          () => {
            this.getList();
          }
        );
    };

    onSearchBranch = (value) => {
        this.setState(
          {
            branchName: value,
            pagination:{
                current: 1,
                pageSize: 10,
              }
          },
          () => {
            this.getList();
          }
        );
    };

    onDownload = (data) => {
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        [
          'useridx',
          '지점명',
          '가맹점명',
          '주소',
          '상세주소',
          'addr3',
          'PG 사용비율\n(0:미사용,100:사용)',
          '가맹점번호',
          'VAN'
        ].forEach((x, idx) => {
          const cellAdd = xlsx.utils.encode_cell({c:idx, r:0});
          ws[cellAdd].v = x;
        })
        ws['!cols'] = [];
        ws['!cols'][0] = { hidden: true };
        ws['!cols'][5] = { hidden: true };
        ws['!cols'][2] = { width: 15 };
        ws['!cols'][3] = { width: 30 };
        ws['!cols'][4] = { width: 15 };
        ws['!cols'][6] = { width: 20 };
        ws['!cols'][7] = { width: 20 };
        xlsx.utils.book_append_sheet(wb, ws, "sheet1");
        xlsx.writeFile(wb, "가맹점목록.xlsx");
      }

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
                render: (data, row) => <div>{row.addr1 + row.addr2}</div>,
            },
            {
                title: "VAN",
                dataIndex: "vanNumber",
                className: "table-column-center",
            },
            {
                title: "PG 사용비율",
                dataIndex: "tidNormalRate",
                className: "table-column-center",
                render: (data) => <div>{data == 0 ? '미사용' : '사용'}</div>,
            },
            {
                title: "가맹비내역",
                dataIndex: "franFeeList",
                className: "table-column-center",
                render: (data, row) => (
                    <Button onClick={this.openFranFeeDialogModal}>
                        가맹비내역
                    </Button>
                )

            },
            {
                title: "충전내역",
                dataIndex: "chargeList",
                className: "table-column-center",
                render: (data, row) => (

                    <Button onClick={this.openChargeDialogModal}>
                        충전내역
                    </Button>
                )
            },
            {
                title: "수정",
                dataIndex: "update",
                className: "table-column-center",
                render: (data, row) => (
                    <Button onClick={() => this.openModifyFranDialogModal(row)}>
                        수정
                    </Button>
                )
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
                        marginLeft: 20
                    }}
                />
                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={() => this.onDownload(this.state.list)}>
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>

                {this.state.modifyFranDialogOpen &&
                    <ModifyFranDialog
                        data={this.state.franchiseData}
                        close={this.closeModifyFranDialogModal}
                        getList={this.getList}
                    />
                }

                {this.state.franFeeDialogOpen &&
                    <FranFeeDialog
                        close={this.closeFranFeeDialogModal}
                    />
                }
                {this.state.chargeDialogOpen &&
                    <ChargeDialog
                        close={this.closeChargeDialogModal}
                    />
                }

                <Table
                    rowKey={(record) => record.idx}
                    rowClassName={(record) => (record.status === 'COMPLETE' ? "table-disabled" : "")}
                    dataSource={this.state.list}
                    columns={columns}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    expandedRowRender={this.expandedRowRender}
                    expandRowByClick={true}
                />

            </>
        )
    }
}
export default FranchiseList;