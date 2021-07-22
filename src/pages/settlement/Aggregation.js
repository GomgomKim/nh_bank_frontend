import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Space } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class Aggregation extends Component {


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
                date: 1,
                addCost: 5153000,
                leaseDeposit: 3100000,
                insuranceDeposit: 180000,
                deliveryCost: 51510100,
                feeDeposit: 5700500,
                frDuesDeposit: 98555700,
            },
            {
                date: 2,
                addCost: 3173000,
                leaseDeposit: 3230000,
                insuranceDeposit: 300000,
                deliveryCost: 44510100,
                feeDeposit: 2200500,
                frDuesDeposit: 11555700,
                sellProdDeposit:12000
            },
            {
                date: 3,
                addCost: 5153000,
                leaseDeposit: 3150000,
                insuranceDeposit: 280000,
                deliveryCost: 50540100,
                feeDeposit: 6700400,
                frDuesDeposit: 87665700,
                sellProdDeposit:30000
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
                title: "일자",
                dataIndex: "date",
                className: "table-column-center",
            },
            {
                title: "부가세 예수",
                dataIndex: "addCost",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "리스료 입금",
                dataIndex: "leaseDeposit",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "산재보험 입금",
                dataIndex: "insuranceDeposit",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "배달요금",
                dataIndex: "deliveryCost",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "기사수수료 입금",
                dataIndex: "feeDeposit",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "가맹점회비",
                dataIndex: "frDuesDeposit",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "물품 판매 입금",
                dataIndex: "sellProdDeposit",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },

        ];


        return (
            <>
                {/* <Search
                    placeholder="아이디,이름 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearch}
                    style={{
                        width: 220,
                        marginLeft: 10,
                        marginBottom: 20
                    }}
                /> */}

                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} 
                    // onClick={() => this.onDownload(this.state.list)}
                >
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>

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
export default Aggregation;