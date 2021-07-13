import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
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
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList()
    }


    getList = () => {
        var list = [
            {
                franIdx: '냠냠박스1지점',
                franFee: 150000,
                date: '2021-06-03'

            },
            {
                franIdx: '냠냠박스1지점',
                franFee: 150000,
                date: '2021-05-03'

            },
            {
                franIdx: '냠냠박스1지점',
                franFee: 150000,
                date: '2021-04-03'

            },
            {
                franIdx: '냠냠박스1지점',
                franFee: 150000,
                date: '2021-03-03'

            },
            {
                franIdx: '냠냠박스1지점',
                franFee: 150000,
                date: '2021-02-03'

            },


        ];

        this.setState({
            list: list,
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
                dataIndex: "franNum",
                className: "table-column-center",


            },
            {
                title: "가맹점주소",
                dataIndex: "franAddr",
                className: "table-column-center",


            },

            {
                title: "가맹비",
                dataIndex: "franFee",
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
                <Search
                    placeholder="가맹점 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearchFranchse}
                    style={{
                        width: 220,
                        marginLeft: 20
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