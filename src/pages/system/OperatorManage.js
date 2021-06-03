import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker } from 'antd'

import { comma } from "../../lib/util/numberUtil";
import SystemKeyDialog from "../../components/dialog/SystemKeyDialog";
import '../../css/main.css';

const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class OperatorManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemKeyDialogOpen: false, //메뉴권한설정
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
    openSystemKeyDialogModal = () => {
        this.setState({ systemKeyDialogOpen: true });
    };
    closeSystemKeyDialogModal = () => {
        this.setState({ systemKeyDialogOpen: false });
    };
    getList = () => {
        var list = [
            {
                Idx: '배지현',
                phone: '010-7645-7620',
                updateDate: '2021-06-03',
                lastAccessTime: '10:46 AM',
                lastAccessIP: '127.0.0.1.',
            },
            {
                Idx: '배지현',
                phone: '010-7645-7620',
                updateDate: '2021-06-03',
                lastAccessTime: '10:46 AM',
                lastAccessIP: '127.0.0.1.',
            },
            {
                Idx: '배지현',
                phone: '010-7645-7620',
                updateDate: '2021-06-03',
                lastAccessTime: '10:46 AM',
                lastAccessIP: '127.0.0.1.',
            },
            {
                Idx: '배지현',
                phone: '010-7645-7620',
                updateDate: '2021-06-03',
                lastAccessTime: '10:46 AM',
                lastAccessIP: '127.0.0.1.',
            }
        ];

        this.setState({
            list: list,
        });
    }


    render() {

        const columns = [
            {
                title: "이름",
                dataIndex: "Idx",
                className: "table-column-center",

            },
            {
                title: "핸드폰번호",
                dataIndex: "phone",
                className: "table-column-center",

            },
            {
                title: "등록일",
                dataIndex: "updateDate",
                className: "table-column-center",
                // render: (data, row) => <div>{categoryString[data]}</div>
            },
            {
                title: "최종접속 시간",
                dataIndex: "lastAccessTime",
                className: "table-column-center",

            },
            {
                title: "최종접속 IP",
                dataIndex: "lastAccessIP",
                className: "table-column-center",

            }

        ];
        return (
            <>

                {this.state.systemKeyDialogOpen && (
                    <SystemKeyDialog close={this.closeSystemKeyDialogModal} />
                )}
                <Button style={{ marginBottom: 20 }} onClick={this.openSystemKeyDialogModal}>
                    메뉴권한 설정
                </Button>

                <Button style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
                    {/* <DownloadOutlined /> */}
                    엑셀다운로드
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
export default OperatorManage;