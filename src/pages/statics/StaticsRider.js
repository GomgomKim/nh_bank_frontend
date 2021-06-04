import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Radio } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class StaticsRider extends Component {


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
                riderIdx: '배지현',
                deliveryNum: 15,
                deliveryFee: 3000,
                branchFee: 300000,
                date: '2021-06-03',
            },
            {
                riderIdx: '김진숙',
                deliveryNum: 15,
                deliveryFee: 3000,
                branchFee: 300000,
                date: '2021-06-03',
            },
            {
                riderIdx: '이덕호',
                deliveryNum: 15,
                deliveryFee: 3000,
                branchFee: 300000,
                date: '2021-06-03',
            },
            {
                riderIdx: '김기연',
                deliveryNum: 15,
                deliveryFee: 3000,
                branchFee: 300000,
                date: '2021-06-03',
            },
            {
                riderIdx: '하재훈',
                deliveryNum: 15,
                deliveryFee: 3000,
                branchFee: 300000,
                date: '2021-06-03',
            },
            {
                riderIdx: '윤동혁',
                deliveryNum: 15,
                deliveryFee: 3000,
                branchFee: 300000,
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
                title: "라이더명",
                dataIndex: "riderIdx",
                className: "table-column-center",

            },
            {
                title: "배달건수",
                dataIndex: "deliveryNum",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}</div>

            },
            {
                title: "배달료",
                dataIndex: "deliveryFee",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>

            },
            {
                title: "수수료",
                dataIndex: "branchFee",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>

            },
            {
                title: "날짜",
                dataIndex: "date",
                className: "table-column-center",

            },

        ];
        return (
            <>
                <Radio.Group onChange={this.onChange} style={{ marginTop: 5 }}>
                    <Radio value={1}>일별</Radio>
                    <Radio value={2}>월별</Radio>
                </Radio.Group>

                <Search
                    placeholder="라이더 검색"
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
                    <img src={require("../../img/statistics.png").default} alt="" />
                    그래프 통계
                </Button>

                <RangePicker
                    onChange={this.onChangeDate}
                    showTime={{ format: 'MM:dd' }}
                    style={{ float: 'right' }}
                    placeholder={['시작일', '종료일']} />

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
export default StaticsRider;