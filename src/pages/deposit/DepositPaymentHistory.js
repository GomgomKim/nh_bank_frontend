import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { DownloadOutlined, RightCircleFilled } from '@ant-design/icons';
import { Table, Input, Button, DatePicker, Modal, Radio } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import DepositDialog from "../../components/dialog/DepositDialog";
import '../../css/main.css';

const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class DepositPaymentHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            depositDialogOpen: false, //예치금 지급
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

    openDepositDialogModal = () => {
        this.setState({ depositDialogOpen: true });
    };
    closeDepositDialogModal = () => {
        this.setState({ depositDialogOpen: false });
    };

    // downloadExcel = () => {
    //     if (this.state.raffleDate == '') {
    //         Modal.info({
    //             title: "엑셀 다운로드",
    //             content: "",
    //             okText: '확인'
    //         });
    //         return;
    //     }
    //     // httpDownload(httpUrl.winnerListExcel, [100000, 1, this.state.raffleDate, this.state.resId], {}).then((res) => {
    //     //     fileDownload(res, 'WINNER_' + this.state.raffleDate + '.xlsx');
    //     // }).catch((err) => { });
    // }


    getList = () => {
        var list = [
            {
                idx: '배지현',
                payPrice: 20000,
                payDate: '2021-06-02',
            },
            {
                idx: '배지현',
                payPrice: 20000,
                payDate: '2021-06-02',
            },
            {
                idx: '배지현',
                payPrice: 20000,
                payDate: '2021-06-02',
            },
            {
                idx: '배지현',
                payPrice: 20000,
                payDate: '2021-06-02',
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
                dataIndex: "idx",
                className: "table-column-center",

            },
            {
                title: "지급금액",
                dataIndex: "payPrice",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "지급일시",
                dataIndex: "payDate",
                className: "table-column-center",

            },

        ];
        return (
            <>
                {this.state.depositDialogOpen && (
                    <DepositDialog close={this.closeDepositDialogModal} />
                )}
                <Button style={{ marginBottom: 20 }} onClick={this.openDepositDialogModal}>
                    예치금 지급
                </Button>




                <Button style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
                    {/* <DownloadOutlined /> */}
                    엑셀다운로드
                </Button>

                <Search
                    placeholder="아이디를 입력하세요"
                    enterButton="조회"
                    allowClear
                    onSearch={this.onSearch}
                    style={{
                        width: 250,
                        float: 'right',
                        marginBottom: 20
                    }}
                />

                <Radio.Group onChange={this.onChange} style={{ float: 'right', marginTop: 5 }}>
                    <Radio value={1}>라이더</Radio>
                    <Radio value={2}>가맹점</Radio>
                </Radio.Group>


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
export default DepositPaymentHistory;