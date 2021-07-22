import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Space } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class SellProdDeposit extends Component {


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
              prodName: "헬멧(CH-33)",
              category: "헬멧",
              quantity: 2,
              sellProdDeposit: 94000,
            },

            { 
              prodName: "피자가방",
              category: "가방",
              quantity: 4,
              sellProdDeposit: 80000,
            },

            { 
              prodName: "바람막이(DK590)",
              category: "옷",
              quantity: 2,
              sellProdDeposit: 46000,
            },

            { 
              prodName: "반팔티",
              category: "옷",
              quantity: 1,
              sellProdDeposit: 12000,
            },
        ];

        this.setState({
            list: list,
        });
    };


    render() {

        const columns = [
          
            {   
              title: "카테고리",
              dataIndex: "category",
              className: "table-column-center",
            },

            {
              title: "상품명",
              dataIndex: "prodName",
              className: "table-column-center",
            },

            {
              title: "수량",
              dataIndex: "quantity",
              className: "table-column-center",
              render: (data) => <div>{comma(data)}</div>
            },

            {
              title: "물품판매금액",
              dataIndex: "sellProdDeposit",
              className: "table-column-center",
              render: (data) => <div>{comma(data)}원</div>,
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
export default SellProdDeposit;