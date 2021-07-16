import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import { httpGet, httpPost, httpUrl } from '../../api/httpClient';
import '../../css/main.css';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class FranchiseFeeHistory extends Component {
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
                title: "가맹점명",
                dataIndex: "franIdx",
                className: "table-column-center",
            },
            {
                title: "가맹점번호",
                dataIndex: "frPhone",
                className: "table-column-center",
            },
            {
                title: "가맹점주소",
                dataIndex: "addr2",
                className: "table-column-center",
            },
            {
                title: "가맹주",
                dataIndex: "ownerName",
                className: "table-column-center",
            },
            {
                title: "가맹비",
                dataIndex: "franFee",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "은행",
                dataIndex: "vaccountBank",
                className: "table-column-center",
            },
            {
                title: "예금주",
                dataIndex: "vaccountDepositor",
                className: "table-column-center",
            },
            {
                title: "계좌번호",
                dataIndex: "vaccountNumber",
                className: "table-column-center",
            },
            {
                title: "지갑주소",
                dataIndex: "walletId",
                className: "table-column-center",
            },

        ];

        return (
            <>
                <Search
                    placeholder="가맹점 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearchFranchse}
                    style={{
                        width: 220,
                    }}
                />
                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={() => this.onDownload(this.state.list)}>
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

export default FranchiseFeeHistory;