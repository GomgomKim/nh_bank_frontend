import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Space } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class LeaseDeposit extends Component {


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

    getList = () => {
        var list = [
            {
                name: "rider03",
                date: "2021-07-01",
                leaseDeposit: 3100000,
            },
            {
                name: "rider04",
                date: "2021-07-02",
                leaseDeposit: 3230000,
            },
            {
                name: "rider07",
                date: "2021-07-03",
                leaseDeposit: 3150000,
            }
        ];
        this.setState({
            list: list,
        })

    }

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

    setDate = (date) => {
        console.log(date)
    }



    render() {
        const columns = [
            {
                title: "이름",
                dataIndex: "name",
                className: "table-column-center",
            },
            {
                title: "일자",
                dataIndex: "date",
                className: "table-column-center",
            },
            {
                title: "리스료 입금 금액",
                dataIndex: "leaseDeposit",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
        ];



        return (
            <>
                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} 
                    // onClick={() => this.onDownload(this.state.list)}
                >
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>

                <RangePicker
                    style={{ width: 300, float: "right", marginRight: 10 }}
                    placeholder={["시작일", "종료일"]}
                />

                <Table
                    rowKey={(record) => record.idx}
                    dataSource={this.state.list}
                    columns={columns}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />


            </>
        )
    }
}
export default LeaseDeposit;