import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Space } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class PaymentList extends Component {


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
                franIdx: '냠냠박스 1지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                paymentAmount: 450000,
                date: '2021-06-03',
            },
            {
                franIdx: '냠냠박스 1지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                paymentAmount: 450000,
                date: '2021-06-03',
            },
            {
                franIdx: '냠냠박스 1지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                paymentAmount: 450000,
                date: '2021-06-03',
            },
            {
                franIdx: '냠냠박스 1지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                paymentAmount: 450000,
                date: '2021-06-03',
            },
            {
                franIdx: '냠냠박스 1지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                paymentAmount: 450000,
                date: '2021-06-03',
            },
            {
                franIdx: '냠냠박스 1지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                paymentAmount: 450000,
                date: '2021-06-03',
            },
        ];

        this.setState({
            list: list,
        });
    }


    render() {

        const columns = [

            {
                title: "날짜",
                dataIndex: "date",
                className: "table-column-center",

            },
            {
                title: "가맹점명",
                dataIndex: "franIdx",
                className: "table-column-center",

            },
            {
                title: "가맹점번호",
                dataIndex: "franNum",
                className: "table-column-center",

            },
            {
                title: "가맹점주소",
                dataIndex: "franAddr",
                className: "table-column-center",

            },
            {
                title: "지급금액",
                dataIndex: "paymentAmount",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>

            },

        ];
        return (
            <>

                <Search
                    placeholder="가맹점 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearch}
                    style={{
                        width: 220,
                        // marginLeft: 20
                    }}
                />

                <Space direction="vertical">
                    <RangePicker
                        onChange={this.onChangeDate}
                        showTime={{ format: 'MM:dd' }}
                        style={{ float: 'right', marginLeft: 20 }}
                        placeholder={['시작일', '종료일']} />
                </Space>

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
export default PaymentList;