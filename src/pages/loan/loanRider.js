import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';


const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class LoanRider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            list: [],

        };
    }

    componentDidMount() {
        this.getList();
    }

    setDate = (date) => {
        console.log(date)
    }
    // handleTableChange = (pagination) => {
    //     console.log(pagination)
    //     const pager = { ...this.state.pagination };
    //     pager.current = pagination.current;
    //     pager.pageSize = pagination.pageSize
    //     this.setState({
    //         pagination: pager,
    //     }, () => this.getList());
    // };

    getList = () => {
        // let { pageSize, current } = this.state.pagination;
        // httpGet(httpUrl.inquiryList, [pageSize, current], {}).then((res) => {
        //     const pagination = { ...this.state.pagination };
        //     pagination.current = res.data.currentPage;
        //     pagination.total = res.data.totalCount;
        //     this.setState({
        //         list: res.data.list,
        //         pagination,
        //     });
        // });

        var list = [
            {
                riderIdx: '배지현',
                loanPrice: 20000,
                loanDate: '2021-06-02',
            },
            {
                riderIdx: '배지현',
                loanPrice: 20000,
                loanDate: '2021-06-02',
            },
            {
                riderIdx: '배지현',
                loanPrice: 20000,
                loanDate: '2021-06-02',
            },
            {
                riderIdx: '배지현',
                loanPrice: 20000,
                loanDate: '2021-06-02',
            }
        ];

        this.setState({
            list: list,
        });
    }

    // expandedRowRender = (record) => {
    //     return (
    //         <div style={{ paddingLeft: '100px' }}>
    //             <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top' }}>
    //                 <div style={{ color: 'blue' }}>[문의내용]</div>
    //                 {record.content.split(',').map(row => {
    //                     return (
    //                         <div>{row}</div>
    //                     )
    //                 }
    //                 )}
    //             </div>
    //             <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top' }}>
    //                 <div style={{ color: 'blue' }}>[메모]</div>
    //                 {record.memo.split('\n').map(row => {
    //                     return (
    //                         <div>{row}</div>
    //                     )
    //                 }
    //                 )}
    //             </div>
    //         </div>
    //     )
    // }
    render() {

        const columns = [
            {
                title: "라이더 정보",
                dataIndex: "riderIdx",
                className: "table-column-center",

            },
            {
                title: "대출금액",
                dataIndex: "loanPrice",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>

            },
            {
                title: "대출일시",
                dataIndex: "loanDate",
                className: "table-column-center",
                // render: (data, row) => <div>{categoryString[data]}</div>
            },



        ];
        return (
            <>

                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
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
export default LoanRider;