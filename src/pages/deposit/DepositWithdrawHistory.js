import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Radio } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';



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
                idx: '배지현',
                withdrawAccount: '신한은행 1002-000-000000',
                withdrawPrice: 20000,
                withdrawDate: '2021-06-02',
            },
            {
                idx: '배지현',
                withdrawAccount: '신한은행 1002-000-000000',
                withdrawPrice: 20000,
                withdrawDate: '2021-06-02',
            },
            {
                idx: '배지현',
                withdrawAccount: '신한은행 1002-000-000000',
                withdrawPrice: 20000,
                withdrawDate: '2021-06-02',
            },
            {
                idx: '배지현',
                withdrawAccount: '신한은행 1002-000-000000',
                withdrawPrice: 20000,
                withdrawDate: '2021-06-02',
            }
        ];

        this.setState({
            list: list,
        });
    }


    render() {

        const columns = [
            {
                title: "이름",
                dataIndex: "idx",
                className: "table-column-center",

            },
            {
                title: "출금계좌",
                dataIndex: "withdrawAccount",
                className: "table-column-center",

            },
            {
                title: "출금금액",
                dataIndex: "withdrawPrice",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "출금일시",
                dataIndex: "withdrawDate",
                className: "table-column-center",

            },

        ];
        return (
            <>

                <Radio.Group onChange={this.onChange} style={{ marginTop: 5 }}>
                    <Radio value={1}>라이더</Radio>
                    <Radio value={2}>가맹점</Radio>
                </Radio.Group>


                <Search
                    placeholder="아이디 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearch}
                    style={{
                        width: 220,
                        marginBottom: 20
                    }}
                />

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
export default DepositWithdrawHistory;