import React, { Component } from 'react'
import { Table, Input, Button, DatePicker, Space } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class DeliveryCost extends Component {


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
                deliveryFee: 51392100,
                date: "2021-06-03",
            },

        ];

        this.setState({
            list: list,
        });
    };



    render() {

        const columns = [
            {
                title: "가맹점명",
                dataIndex: "frName",
                className: "table-column-center",
            },
            {
                title: "라이더명",
                dataIndex: "riderName",
                className: "table-column-center",
            },
            {
                title: "접수일시",
                dataIndex: "startDate",
                className: "table-column-center",
            },
            {
                title: "완료일시",
                dataIndex: "endDate",
                className: "table-column-center",
            },
            {
                title: "도착지",
                dataIndex: "arrive",
                className: "table-column-center",
            },
            {
                title: "금액",
                dataIndex: "price",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>,
            },
            {
                title: "배달료",
                dataIndex: "deliveryPay",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>,
            },
            {
                title: "배달부가세",
                dataIndex: "deliveryTax",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>,
            },
            {
                title: "배달수수료",
                dataIndex: "deliveryFee",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>,
            },

        ];
        const expandedRowRender = (record) => {
            const dropColumns = [
                {
                    title: "가맹점명",
                    dataIndex: "frName",
                    className: "table-column-center",
                },
                {
                    title: "사업자번호",
                    dataIndex: "businessNum",
                    className: "table-column-center",
                },
                {
                    title: "대표자명",
                    dataIndex: "deliveryFee",
                    className: "table-column-center",
                },
                {
                    title: "주소",
                    dataIndex: "addr",
                    className: "table-column-center",
                },
                {
                    title: "이메일",
                    dataIndex: "email",
                    className: "table-column-center",
                },
                {
                    title: "라이더명",
                    dataIndex: "riderName",
                    className: "table-column-center",
                },
                {
                    title: "주민번호",
                    dataIndex: "securityNum",
                    className: "table-column-center",
                },
                {
                    title: "연락처",
                    dataIndex: "phoneNum",
                    className: "table-column-center",
                },

            ];
            return (
                <Table
                    rowKey={(record) => `record: ${record.idx}`}
                    columns={dropColumns}
                    dataSource={[record]}
                    pagination={false}
                />
            );
        };
        return (
            <>
                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>

                <RangePicker
                    onChange={this.onChangeDate}
                    showTime={{ format: "MM:dd" }}
                    style={{ float: "right" }}
                    placeholder={["시작일", "종료일"]}
                />

                <Table
                    dataSource={this.state.list}
                    columns={columns}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    expandedRowRender={expandedRowRender}
                    expandRowByClick={true}
                />


            </>
        )
    }
}
export default DeliveryCost;