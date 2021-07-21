import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Radio } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';
import xlsx from 'xlsx';




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
                pageSize: 300,
            },
            userId: "",
            list: [],
            // userType: 1,
            searchType: 1
        };
    }

    componentDidMount() {
        this.getList();
        this.getExcelList();
    }

    setDate = (date) => {
        console.log(date)
    }

    getList = () => {
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        let userId = this.state.userId;
        let userType = this.state.searchType;
        httpGet(httpUrl.depositWithdrawList, [ pageNum, pageSize, userId, userType ],{})
        .then((res) => {
          const pagination = { ...this.state.pagination };
          pagination.current = res.data.currentPage;
          pagination.total = res.data.totalCount;
        this.setState({
            list: res.data.withdraws,
            pagination,
        });
        });
    }

    getExcelList = () => {
        let pageNum = this.state.paginationExcel.current;
        let pageSize = this.state.paginationExcel.pageSize;
        let userId = this.state.userId;
        let userType = this.state.searchType;
        httpGet(httpUrl.depositWithdrawList, [ pageNum, pageSize, userId, userType ],{})
        .then((res) => {
          const pagination = { ...this.state.pagination };
          pagination.current = res.data.currentPage;
          pagination.total = res.data.totalCount;
        this.setState({
            listExcel: res.data.withdraws,
            pagination,
        });
        });
    }

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
        this.setState({
          pagination:{
            current: 1,
            pageSize: 10,
          }
        }, () => {
            this.getList();
            this.getExcelList();
        });
      }

    onChange = (e) => {
        this.setState({
            searchType: e.target.value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
            this.getExcelList();
        })
    }

    onDownload = (data) => {
        // let col9=["출금금액"];
        // for(let i=0; i<=data.length-1; i++) {
        //   col9.push(comma(data[i].reqAmount))
        // };
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        [
          'idx',
          '아이디',
          'createDate',
          'userIdx',
          '은행명',
          '출금계좌',
          '예금주명',
          '출금일시',
          'withdrawStatus',
          '출금금액(원)',
          'procDate',
          'adminId',
          'memo'
        ].forEach((x, idx) => {
          const cellAdd = xlsx.utils.encode_cell({c:idx, r:0});
          ws[cellAdd].v = x;
        })

        // col9.forEach((x, idx) => {
        //     const cellAdd = xlsx.utils.encode_cell({c:9, r:idx});
        //     ws[cellAdd].v = x;
        //     ws[cellAdd].t = "string";
        // })

        ws['!cols'] = [];
        ws['!cols'][0] = { hidden: true };
        ws['!cols'][2] = { hidden: true };
        ws['!cols'][3] = { hidden: true };
        ws['!cols'][8] = { hidden: true };
        ws['!cols'][10] = { hidden: true };
        ws['!cols'][11] = { hidden: true };
        ws['!cols'][12] = { hidden: true };
        ws['!cols'][5] = { width: 12 };
        ws['!cols'][7] = { width: 20 };
        xlsx.utils.book_append_sheet(wb, ws, "sheet1");
        xlsx.writeFile(wb, "예치금출금.xlsx");
      }


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
                render: (data) => <div>
                    {data === null ? '' : data.split(',')[0]}
                </div>

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
                dataIndex: "reqAmount",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "출금일시",
                dataIndex: "reqDate",
                className: "table-column-center",

            },

        ];
        return (
            <>

                <Radio.Group defaultValue={1} onChange={this.onChange} style={{ marginTop: 5 }}>
                    <Radio value={1}>라이더</Radio>
                    <Radio value={2}>가맹점</Radio>
                </Radio.Group>


                <Search
                    placeholder="아이디 검색"
                    enterButton
                    allowClear
                    onChange={(e) => this.setState({ userId: e.target.value})}
                    onSearch={this.pressSearch}
                    style={{
                        width: 220,
                        marginBottom: 20
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
export default DepositWithdrawHistory;