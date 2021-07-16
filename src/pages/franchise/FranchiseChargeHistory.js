import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { httpGet, httpPost, httpUrl } from '../../api/httpClient';
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class FranchiseChargeHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            frName: "",
            branchName: "",
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList()
    }

    getList = () => {
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        httpGet(httpUrl.franchiseChargeHistory, [pageNum, pageSize], {})
            .then((res) => {
                const pagination = { ...this.state.pagination };
                pagination.current = res.data.currentPage;
                pagination.total = res.data.totalCount;
                this.setState({
                    list: res.data.franchises,
                    pagination,
                });
            });
    }



    render() {

        const columns = [
            {
                title: "번호",
                dataIndex: "userIdx",
                className: "table-column-center",
            },
            {
                title: "가맹점명",
                dataIndex: "franName",
                className: "table-column-center",
            },
            {
                title: "가맹점번호",
                dataIndex: "franPhone",
                className: "table-column-center",
            },
            {
                title: "가맹점주소",
                dataIndex: "addr1",
                className: "table-column-center",
            },
            {
                title: "가맹주",
                dataIndex: "ownerName",
                className: "table-column-center",
            },
            {
                title: "사업자번호",
                dataIndex: "businessNumber",
                className: "table-column-center",
            },

            {
                title: "충전금액",
                dataIndex: "ncashDelta",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "날짜",
                dataIndex: "date",
                className: "table-column-center",
            },

        ];


        const { close, data } = this.props;

        return (
            <>
                <Search
                    placeholder="가맹점 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearchFranchse}
                    style={{
                        width: 220,
                        marginBottom: 20,
                    }}
                />

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

export default FranchiseChargeHistory;