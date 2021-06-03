import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
// import ClickSwitch from '../components/input/ClickSwitch';
import '../../css/main.css';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';


const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class SystemKeyDialog extends Component {
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
                list: '배달내역관리',

            },
            {
                list: '가맹점관리',

            },
            {
                list: '선지급관리',

            },
            {
                list: '예치금관리',

            },
            {
                list: '대출관리',

            },
            {
                list: '바이크관리',

            },
            {
                list: '게시글관리',

            },
            {
                list: '시스템관리',

            },

        ];

        this.setState({
            list: list,
        });
    }


    render() {

        const columns = [
            {
                title: "목록",
                dataIndex: "list",
                className: "table-column-center",


            },
            {
                title: "마케팅",
                dataIndex: "marketingManage",
                className: "table-column-center",
                render: () =>
                (<Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}

                />)

            },
            {
                title: "세무",
                dataIndex: "taxManage",
                className: "table-column-center",
                render: () =>
                (<Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}

                />)
            },

            {
                title: "바이크정비",
                dataIndex: "bikeManage",
                className: "table-column-center",
                render: () =>
                (<Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}

                />)

            },
            {
                title: "총관리자",
                dataIndex: "systemManage",
                className: "table-column-center",
                render: () =>
                (<Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                />)

            },

        ];




        const { close, data } = this.props;

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />
                <div className="systemKey-Dialog">

                    <div className="systemKey-content">

                        <div className="systemKey-title">
                            메뉴권한설정
                        </div>
                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="img" />


                        <div className="systemKey-inner">
                            <div className="contentBlock">




                            </div>

                            <div className="contentBlock">


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


                            </div>
                            <Button style={{ float: 'right', marginTop: 10 }} onClick={{}}>
                                설정하기
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment >

        )
    }
}

export default SystemKeyDialog;