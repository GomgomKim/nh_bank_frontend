import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import { httpGet, httpPost, httpUrl } from '../../api/httpClient';
import '../../css/main.css';
import xlsx from 'xlsx';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class FranchiseFeeHistory extends Component {
    constructor(props) {
        super(props)
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
                pageSize: 100,
            },
            frName: "",
            branchName: "",
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList();
        this.getExcelList();
    }

    getList = () => {
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        httpGet(httpUrl.franchiseFeeHistory, [pageNum, pageSize], {})
            .then((res) => {
                const pagination = { ...this.state.pagination };
                pagination.current = res.data.currentPage;
                pagination.total = res.data.totalCount;
                this.setState({
                    list: res.data.franchises,
                    pagination,
                });
            });
    }

    getExcelList = () => {
        let pageNum = this.state.paginationExcel.current;
        let pageSize = this.state.paginationExcel.pageSize;
        httpGet(httpUrl.franchiseFeeHistory, [pageNum, pageSize], {})
            .then((res) => {
                const pagination = { ...this.state.pagination };
                pagination.current = res.data.currentPage;
                pagination.total = res.data.totalCount;
                this.setState({
                    listExcel: res.data.franchises,
                    pagination,
                });
            });
    }

    onDownload = (data) => {
        // let col6=["PG 사용"];
        // for(let i=0; i<=data.length-1; i++) {
        //   col6.push(data[i].tidNormalRate == 100 ? '미사용' : '사용')
        // };
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        [
          'useridx',
          'branchName',
          '가맹점명',
          '주소',
          '상세주소',
          'addr3',
          'tidNormalRate',
          '가맹점번호',
          '지갑주소',
          'tidNormal',
          'tidPrepay',
          'businessNumber',
          '가맹주',
          'userId',
          'userEmail',
          'userPhone',
          '가맹비',
          '예금주',
          '은행',
          '계좌번호',
        ].forEach((x, idx) => {
          const cellAdd = xlsx.utils.encode_cell({c:idx, r:0});
          ws[cellAdd].v = x;
        })
        // col6.forEach((x, idx) => {
        //     const cellAdd = xlsx.utils.encode_cell({c:6, r:idx});
        //     ws[cellAdd].v = x;
        //     ws[cellAdd].t = "string";
        //   })
        ws['!cols'] = [];
        ws['!cols'][0] = { hidden: true };
        ws['!cols'][1] = { hidden: true };
        ws['!cols'][5] = { hidden: true };
        ws['!cols'][6] = { hidden: true };
        ws['!cols'][9] = { hidden: true };
        ws['!cols'][10] = { hidden: true };
        ws['!cols'][11] = { hidden: true };
        ws['!cols'][13] = { hidden: true };
        ws['!cols'][14] = { hidden: true };
        ws['!cols'][15] = { hidden: true };
        ws['!cols'][2] = { width: 15 };
        ws['!cols'][3] = { width: 30 };
        ws['!cols'][4] = { width: 15 };
        ws['!cols'][7] = { width: 20 };
        ws['!cols'][8] = { width: 20 };
        ws['!cols'][19] = { width: 20 };
        xlsx.utils.book_append_sheet(wb, ws, "sheet1");
        xlsx.writeFile(wb, "가맹비내역.xlsx");
      }


    render() {

        const columns = [
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
                // dataIndex: "addr2",
                className: "table-column-center",
                render: (data, row) => <div>{row.addr1 + " " +row.addr2}</div>,
            },
            {
                title: "가맹주",
                dataIndex: "ownerName",
                className: "table-column-center",
            },
            {
                title: "가맹비",
                dataIndex: "ncashDelta",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "은행",
                dataIndex: "vaccountBank",
                className: "table-column-center",
            },
            {
                title: "예금주",
                dataIndex: "vaccountDepositor",
                className: "table-column-center",
            },
            {
                title: "계좌번호",
                dataIndex: "vaccountNumber",
                className: "table-column-center",
            },
            {
                title: "지갑주소",
                dataIndex: "walletId",
                className: "table-column-center",
            },

        ];

        return (
            <>
                <Search
                    placeholder="가맹점 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearchFranchse}
                    style={{
                        width: 220,
                    }}
                />
                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={() => this.onDownload(this.state.listExcel)}>
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>

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

export default FranchiseFeeHistory;