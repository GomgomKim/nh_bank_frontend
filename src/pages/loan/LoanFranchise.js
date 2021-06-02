import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker } from 'antd'

import { comma } from "../../lib/util/numberUtil";
import SelectBox from "../../components/input/SelectBox";

const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class LoanFranchise extends Component {
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

    getList = () => {
        var list = [
            {
                franIdx: '배지현',
                loanPrice: 20000,
                loanDate: '2021-06-02',
            },
            {
                franIdx: '배지현',
                loanPrice: 20000,
                loanDate: '2021-06-02',
            },
            {
                franIdx: '배지현',
                loanPrice: 20000,
                loanDate: '2021-06-02',
            },
            {
                franIdx: '배지현',
                loanPrice: 20000,
                loanDate: '2021-06-02',
            }
        ];

        this.setState({
            list: list,
        });
    }


    render() {

        const columns = [
            {
                title: "가맹점 정보",
                dataIndex: "franIdx",
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

                <Button style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
                    {/* <DownloadOutlined /> */}
                    엑셀다운로드
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
export default LoanFranchise;