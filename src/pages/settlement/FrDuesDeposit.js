import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Space } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class FrDuesDeposit extends Component {


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
                frDues: 98395709,
                promotion: "첫가입 10%할인 ",
                date: "2021-07-22",
            },
            {
                frDues: 1672014,
                promotion: "첫가입 10%할인 ",
                date: "2021-07-22",
            },
            {
                frDues: 552152,
                promotion: "",
                date: "2021-07-15",
            },
            {
                frDues: 117370,
                promotion: "",
                date: "2021-07-14",
            },
            {
                frDues: 191980,
                promotion: "",
                date: "2021-07-13",
            },
            {
                frDues: 127700,
                promotion: "",
                date: "2021-07-14",
            },

        ];

        this.setState({
            list: list,
        });
    };



    render() {

        const columns = [
            // {
            //     title: "일자",
            //     dataIndex: "num",
            //     className: "table-column-center",
            // },
            {
                title: "가맹점회비",
                dataIndex: "frDues",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>,
            },
            {
                title: "프로모션",
                dataIndex: "promotion",
                className: "table-column-center",
            },
            {
                title: "날짜",
                dataIndex: "date",
                className: "table-column-center",
            },
        ];


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
                    expandedRowRender={this.expandedRowRender}
                    expandRowByClick={true}
                />


            </>
        )
    }
}
export default FrDuesDeposit;