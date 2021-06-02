import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";

const FormItem = Form.Item;
const Option = Select.Option;

class DepositDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 1,
            },
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList()
    }

    handleTableChange = (pagination) => {
        console.log(pagination)
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize
        this.setState({
            pagination: pager,
        }, () => this.getList());
    };

    onClickRow = (index) => {
        return {
            onClick: () => {
                // console.log(record.riderGroup)
                this.setState({
                    rowId: index,
                });
            },
        };
    }
    setRowClassName = (index) => {
        return index === this.state.rowId ? 'clickRowStyl' : '';
    }


    getList = () => {
        var list = [
            {
                // className={ "mypage-left-select " + (depth1.idx == row.idx ? 'active' : '') },
                id: 1,
                riderGroup: 'A',
                proCount: 6,
                withdrawLimit: '100000',
                transferLimit: '500',
            },
            {
                id: 2,
                riderGroup: 'B',
                proCount: 5,
                withdrawLimit: '100000',
                transferLimit: '500',
            },
            {
                id: 3,
                riderGroup: 'C',
                proCount: 4,
                withdrawLimit: '100000',
                transferLimit: '500',
            },
            {
                id: 4,
                riderGroup: 'D',
                proCount: 3,
                withdrawLimit: '100000',
                transferLimit: '500',
            },
            {
                id: 5,
                riderGroup: 'E',
                proCount: 2,
                withdrawLimit: '100000',
                transferLimit: '500',
            },

        ];
        this.setState({
            list: list,
        });
    }

    render() {

        const columns = [
            {
                title: "그룹",
                dataIndex: "riderGroup",
                className: "table-column-center",
                render: (data) => <div>{data == "A" ? "A"
                    : data == "B" ? "B"
                        : data == "C" ? "C"
                            : data == "D" ? "D" : "E"}</div>
            },
            {
                title: "처리건수",
                dataIndex: "proCount",
                className: "table-column-center",
            },
            {
                title: "출금가능",
                className: "table-column-center",
                render: () =>
                    <div>
                        {<Checkbox
                            className="tabBtn riderGroupTab"
                            onClick={() => { this.setState({ workTabOpen: true }) }}
                        ></Checkbox>}
                    </div>
            },
            {
                title: "출금제한 금액",
                dataIndex: "withdrawLimit",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}</div>
            },
            {
                title: "이체제한",
                dataIndex: "transferLimit",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}</div>
            },

        ];


        const { close } = this.props;

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />
                <div className="deposit-Dialog">

                </div>
            </React.Fragment>

        )
    }
}

export default DepositDialog;