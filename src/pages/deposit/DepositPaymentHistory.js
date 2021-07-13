import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { DownloadOutlined, RightCircleFilled } from '@ant-design/icons';
import { Table, Input, Button, DatePicker, Modal, Radio } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import DepositDialog from "../../components/dialog/DepositDialog";
import '../../css/main.css';
import xlsx from 'xlsx';


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
            searchType: 1,
            searchText: '',
        };
    }

    componentDidMount() {
        this.getList();
    }

    openDepositDialogModal = () => {
        this.setState({ depositDialogOpen: true });
    };
    closeDepositDialogModal = () => {
        this.setState({ depositDialogOpen: false });
    };

    getList = () => {
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        let userId = this.state.searchText;
        let userType = this.state.searchType;
        httpGet(httpUrl.depositList, [pageNum, pageSize, userId, userType], {}).then((res) => {
        const pagination = { ...this.state.pagination };
        pagination.current = res.data.currentPage;
        pagination.total = res.data.totalCount;
        this.setState({
            list: res.data.logs,
            pagination,
            });
        });
    };

    onChange = (e) => {
        this.setState({
            searchType: e.target.value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
        })
    }

    onSearch = (value) => {
        this.setState({
            searchText: value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
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

      onDownload = (data) => {
        // let col2=["지급금액"];
        // for(let i=0; i<=data.length-1; i++) {
        //   col2.push(comma(data[i].sendAmount))
        // };
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        [
          '아이디',
          '지급일시',
          '지급금액(원)',
          'category',
        ].forEach((x, idx) => {
          const cellAdd = xlsx.utils.encode_cell({c:idx, r:0});
          ws[cellAdd].v = x;
        })

        // col2.forEach((x, idx) => {
        //     const cellAdd = xlsx.utils.encode_cell({c:2, r:idx});
        //     ws[cellAdd].v = x;
        //     ws[cellAdd].t = "string";
        // })

        ws['!cols'] = [];
        ws['!cols'][3] = { hidden: true };
        ws['!cols'][1] = { width: 20 };
        xlsx.utils.book_append_sheet(wb, ws, "sheet1");
        xlsx.writeFile(wb, "예치금내역.xlsx");
      }

    render() {

        const columns = [
            {
                title: "아이디",
                dataIndex: "userId",
                className: "table-column-center",

            },
            {
                title: "지급금액",
                dataIndex: "sendAmount",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "지급일시",
                dataIndex: "createDate",
                className: "table-column-center",

            },

        ];
        return (
            <>
                <Radio.Group defaultValue={1} onChange={this.onChange} style={{ marginTop: 5 }}>
                    <Radio value={1}>라이더</Radio>
                    <Radio value={2}>가맹점</Radio>
                </Radio.Group>


                <Search
                    placeholder="아이디 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearch}
                    style={{
                        width: 220,
                        marginBottom: 20
                    }}
                />


                {this.state.depositDialogOpen && (
                    <DepositDialog close={this.closeDepositDialogModal} getList={this.getList}/>
                )}
                <Button style={{ marginBottom: 20, marginLeft: 20 }} onClick={this.openDepositDialogModal}>
                    예치금 지급
                </Button>



                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={() => {this.onDownload(this.state.list)}}>
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>

                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
                    <img src={require("../../img/excel.png").default} alt="" />
                        엑셀 업로드
                </Button>

                <a href="/admin_deposit.xlsx" download>
                    <Button className="download-btn"
                        style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
                        <img src={require("../../img/excel.png").default} alt="" />
                            양식 다운로드
                    </Button>
                </a>


                <Table
                    rowKey={(record) => record.idx}
                    rowClassName={(record) => (record.status === 'COMPLETE' ? "table-disabled" : "")}
                    dataSource={this.state.list}
                    columns={columns}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />

            </>
        )
    }
}
export default DepositPaymentHistory;