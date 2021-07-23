import { Input, DatePicker, Table, Button } from "antd";
import React, { Component } from "react";

const Search =Input.Search;
const RangePicker =DatePicker.RangePicker;

class NcashDailyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            list: [],
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        var list = [
            {
                date: "2021-06-12",
                type: "리스료",
                riderId: "rider03",
                riderName: "rider03",
                registrationNumber: "930507-1000000",
                riderPhone: "010-1111-2222",
                ncashDelta: 50000
            },
            {
                date: "2021-06-23",
                type: "산재보험",
                riderId: "rider04",
                riderName: "rider04",
                registrationNumber: "950721-2000000",
                riderPhone: "010-1212-3333",
                ncashDelta: 30000
            },
            {
                date: "2021-07-15",
                type: "기타",
                riderId: "rider06",
                riderName: "rider06",
                registrationNumber: "941108-1000000",
                riderPhone: "010-2121-1111",
                ncashDelta: 20000
            }
        ]
        this.setState({
            list:list,
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

    render() {
        const columns = [
            {
                title: "일시",
                dataIndex: "date",
                className: "table-column-center"
            },
            {
                title: "구분",
                dataIndex: "type",
                className: "table-column-center"
            },
            {
                title: "라이더아이디",
                dataIndex: "riderId",
                className: "table-column-center"
            },
            {
                title: "라이더이름",
                dataIndex: "riderName",
                className: "table-column-center"
            },
            {
                title: "주민번호",
                dataIndex: "registrationNumber",
                className: "table-column-center"
            },
            {
                title: "연락처",
                dataIndex: "riderPhone",
                className: "table-column-center"
            },
            {
                title: "차감금액",
                dataIndex: "ncashDelta",
                className: "table-column-center"
            },
        ];

        return (
        <>
            <Button
                className="download-btn"
                style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
                onClick={() => this.onDownload(this.state.listExcel)}
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
        );
    }
}
export default NcashDailyList;