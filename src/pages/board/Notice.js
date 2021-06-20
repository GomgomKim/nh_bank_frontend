import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Space, Modal, Tooltip } from 'antd'
import { reactLocalStorage } from "reactjs-localstorage";
import ModifyNoticeDialog from "../../components/dialog/ModifyNoticeDialog";


import {
    formatDate,
    numberFormat,
    startDateFormat,
    endDateFormat
} from "../../lib/util/dateUtil";
import SelectBox from "../../components/input/SelectBox";


const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyNoticeDialog: false, //수정
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            list: [],
            completeVisible: false,
            memoVisible: false,
            endDate: "",
            startDate: "",
            title: "",
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList();
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


    // 수정 dialog
    openModifyNoticeDialogModal = () => {
        this.setState({ modifyNoticeDialogOpen: true });
    };
    closeModifyNoticeDialogModal = () => {
        this.setState({ modifyNoticeDialogOpen: false });
    };
    //삭제 알림창
    delete = () => {
        // Modal.Confirm({
        //     title: <div> 공지 삭제</div>,
        //     content: <div> 해당 공지를 삭제하시곘습니까? </div>
        // })
        alert('공지사항을 삭제합니다.')
    };


    getList = () => {
        let endDate=this.state.endDate;
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        let startDate=this.state.startDate;
        let title= this.state.title;
        httpGet(httpUrl.noticeList, [ endDate, pageNum, pageSize, startDate, title ],{})
        .then((res) => {
          console.log(res)
          const pagination = { ...this.state.pagination };
          pagination.current = res.data.currentPage;
          pagination.total = res.data.totalCount;
          this.setState({
          list: res.data.notices,
          pagination,
          });
        });
    }

    pressSearch = () => {
        this.setState({
          pagination:{
            current: 1,
            pageSize: 10,
          }
        }, () => this.getList());
      }

    // expandedRowRender = (record) => {
    //     return (
    //         <div style={{ paddingLeft: '100px' }}>
    //             <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top' }}>
    //                 <div style={{ color: 'blue' }}>[문의내용]</div>
    //                 {record.content.split(',').map(row => {
    //                     return (
    //                         <div>{row}</div>
    //                     )
    //                 }
    //                 )}
    //             </div>
    //             <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top' }}>
    //                 <div style={{ color: 'blue' }}>[메모]</div>
    //                 {record.memo.split('\n').map(row => {
    //                     return (
    //                         <div>{row}</div>
    //                     )
    //                 }
    //                 )}
    //             </div>
    //         </div>
    //     )
    // }

    
    render() {

        const columns = [
            {
                title: "번호",
                dataIndex: "idx",
                className: "table-column-center",
            },
            {
                title: "제목",
                dataIndex: "title",
                className: "table-column-center",

            },
            {
                title: "내용",
                dataIndex: "content",
                className: "table-column-center",
                // render: (data, row) => <div>{data && data.length > 10 ? data.substr(0, 10) + '...' : data}</div>
            },
            {
                title: "노출순위",
                dataIndex: "sortOrder",
                className: "table-column-center",
            },
            {
                title: "상태",
                dataIndex: "deleted",
                className: "table-column-center",
            },
            {
                title: "등록일",
                dataIndex: "createDate",
                className: "table-column-center",
                render: (data) => <div>{formatDate(data)}</div>
            },
            {
                title: "수정",
                dataIndex: "update",
                className: "table-column-center",
                render: (data, row) => (

                    <Button onClick={this.openModifyNoticeDialogModal}>
                        수정
                    </Button>

                )

            },
            {
                title: "삭제",
                dataIndex: "delete",
                className: "table-column-center",
                render: (data, row) => (

                    <Button onClick={() => { this.delete(row.idx); }}>
                        삭제
                    </Button>

                )

            },
            // {
            //     title: "메모",
            //     dataIndex: "memo",
            //     className: "table-column-center",
            //     render: (data, row) =>
            //         <div style={{ cursor: 'pointer' }} onClick={(e) => {
            //             e.stopPropagation();
            //             this.setState({ memoVisible: true, selectedRow: row })
            //         }}>
            //             {data ? (data.length > 10 ? data.substr(0, 10) + '...' : data) : '-'}
            //         </div>
            // },
            // {
            //     title: "완료처리",
            //     dataIndex: "idx",
            //     className: "table-column-center",
            //     render: (data, row) => {
            //         if (row.status != 'NEW') return (<></>);
            //         return (
            //             <Button onClick={(e) => {
            //                 e.stopPropagation();
            //                 this.setState({
            //                     selectedRow: row,
            //                     completeVisible: true,
            //                 })
            //             }}>
            //                 완료하기
            //             </Button>
            //         )
            //     }
            // },
        ];
        return (
            <>
                <Search
                    placeholder="제목 검색"
                    enterButton
                    allowClear
                    onChange={(e)=>this.setState({title: e.target.value})}
                    onSearch={this.pressSearch}
                    style={{
                        width: 220,
                    }}
                />
                <Button 
                    onClick={this.openModifyNoticeDialogModal}
                    style={{marginLeft:20}}>
                    공지사항 등록
                </Button>
                {/* <Space direction="vertical"> */}
                <RangePicker
                    style={{ marginBottom: 20, float: 'right' }}
                    onChange={this.onChangeDate}
                    showTime={{ format: 'MM:dd' }}
                    placeholder={['시작일', '종료일']} />
                {/* </Space> */}

                {this.state.modifyNoticeDialogOpen &&
                    <ModifyNoticeDialog
                        close={this.closeModifyNoticeDialogModal}
                    />
                }

                {/* {this.state.franFeeDialogOpen &&
                    <FranFeeDialog
                        close={this.closeFranFeeDialogModal}
                    />
                } */}



                <Table
                    rowKey={(record) => record.idx}
                    // rowClassName={(record) => (record.status === 'COMPLETE' ? "table-disabled" : "")}
                    dataSource={this.state.list}
                    columns={columns}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    // expandedRowRender={this.expandedRowRender}
                    // expandRowByClick={true}
                />

            </>
        )
    }
}
export default Notice;