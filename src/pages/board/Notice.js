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
import { deletedStatus } from '../../lib/util/codeUtil';
import { customAlert, customError, updateError } from "../../api/Modals";



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyNoticeDialog: false, //수정
            isRegistNoticeDialogOpen: false,
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
            showContent: 0,

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


    // 등록 dialog
    openRegistNoticeDialogModal = () => {
        this.setState({ isRegistNoticeDialogOpen: true });
    };

    closeRegistNoticeDialogModal = () => {
        this.setState({ isRegistNoticeDialogOpen: false });
        this.getList()
    }
    
    // 수정 dialog
    openModifyNoticeDialogModal = (row) => {
        this.setState({
            modifyNoticeDialogOpen: true,
            noticeData: row
        });
    };
    closeModifyNoticeDialogModal = () => {
        this.setState({ modifyNoticeDialogOpen: false });
        this.getList()
    };

    //삭제 알림창
    onDelete = (row) => {
        let self = this;
        if (row.deleted === 0) {
        Modal.confirm({
          title:"공지사항 삭제",
          content: "해당 공지사항을 삭제하시겠습니까?",
          okText: "확인",
          cancelText:"취소",
          onOk() {
            httpPost(httpUrl.updateNotice, [], {
              // category:row.category,
              // important:row.important,
              // title:row.title,
             // sortOrder:row.sortOrder,
             // content:row.content,
             // // name: this.formRef.current.getFieldsValue().surchargeName,
             // // extraPrice: this.formRef.current.getFieldsValue().feeAdd,
             // branchCode: self.state.branchCode,
             // createDate: formatDateSecond(row.createDate),
             deleted: 1,
             // name: this.formRef.current.getFieldsValue().surchargeName,
             // extraPrice: this.formRef.current.getFieldsValue().feeAdd,
             // deleteDate: formatDateSecond(today),
             // readDate: row.readDate,
             idx: row.idx,
            })
          .then((result) => {
            if(result.result === "SUCCESS" && result.data === "SUCCESS"){
            customAlert("완료", "해당공지사항을 삭제합니다.")      
          }
            else updateError()
            self.getList();
          })
          .catch((error) => {
            customError("삭제오류", "에러가 발생하였습니다. 다시 시도해주세요.") 
          });
      }});
    }
      else {
        Modal.confirm({
          title:"공지사항 재공지",
          content: "해당 공지사항을 재공지하시겠습니까?",
          okText: "확인",
          cancelText:"취소",
          onOk() {
            httpPost(httpUrl.updateNotice, [], {
             deleted: 0,
             idx: row.idx,
            })
          .then((result) => {
            if(result.result === "SUCCESS" && result.data === "SUCCESS"){
            customAlert("완료", "해당공지사항을 재공지합니다.") 
          }
            else updateError()
            self.getList();
          })
          .catch((error) => {
            updateError()
          });
      }})};
      }


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

    changeShowContent = (idx) =>{
        if (this.state.showContent === idx){
          this.setState({
            showContent:0
          })
        }
        else
        this.setState({
          showContent:idx
        })
      }

    
    render() {

        const columns = [
            {
                title: "번호",
                dataIndex: "idx",
                className: "table-column-center",
                width: "10%"
            },
            {
                title: "제목",
                dataIndex: "title",
                className: "table-column-center",
                render: (data, row) => (
                    <>
                    <div
                    className="noticeTag"
                    onClick={()=>{this.changeShowContent(row.idx)}}>{data}</div>
                    {this.state.showContent === row.idx &&
                      <div className= "table-column-content">
                        {row.content.split('\n').map(line=>{
                          return(<span>{line}<br/></span>)
                        })}
                      </div>
                    }
                    </>
                  ),

            },
            // {
            //     title: "내용",
            //     dataIndex: "content",
            //     className: "table-column-center",
            //     // render: (data, row) => <div>{data && data.length > 10 ? data.substr(0, 10) + '...' : data}</div>
            // },
            {
                title: "노출순위",
                dataIndex: "sortOrder",
                className: "table-column-center",
                width: "10%"
            },
            {
                title: "상태",
                dataIndex: "deleted",
                className: "table-column-center",
                width: "10%",
                render: (data) => <div>{deletedStatus[data]}</div>
            },
            {
                title: "등록일",
                dataIndex: "createDate",
                className: "table-column-center",
                width: "15%",
                render: (data) => <div>{formatDate(data)}</div>
            },
            {
                dataIndex: "update",
                className: "table-column-center",
                width: "6%",
                render: (data, row) => (

                    <Button onClick={() => this.openModifyNoticeDialogModal(row)}>
                        수정
                    </Button>

                )

            },
            {
                dataIndex: "delete",
                className: "table-column-center",
                width: "6%",
                render: (data, row) => (

                    <Button onClick={() => { this.onDelete(row); }}>
                        {row.deleted === 0 ? (
                        <div>삭제</div>
                        ) : (
                        <div>등록</div>
                        )}
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
                    onClick={this.openRegistNoticeDialogModal}
                    style={{marginLeft:20}}>
                    공지사항 등록
                </Button>
                {/* <Space direction="vertical"> */}
                <RangePicker
                    style={{ width: 300, marginBottom: 20, float: 'right' }}
                    onChange={this.onChangeDate}
                    placeholder={['시작일', '종료일']}
                    onChange={(_, dateStrings) => {
                        if (dateStrings[0,1]) {
                          this.setState(
                            { startDate: dateStrings[0],
                              endDate: dateStrings[1],
                            pagination:{
                              current: 1,
                              pageSize: 10,
                            }
                          }, () => this.getList()
                            );
                          }
                        else {
                          // console.log('test')
                          this.setState(
                            { startDate: "",
                              endDate: "",
                            pagination:{
                              current: 1,
                              pageSize: 10,
                            }
                          }, () => this.getList()
                          );
                        }
                        }}
                    />
                {/* </Space> */}

                {this.state.isRegistNoticeDialogOpen &&
                    <ModifyNoticeDialog
                        close={this.closeRegistNoticeDialogModal}
                    />
                }

                {this.state.modifyNoticeDialogOpen &&
                    <ModifyNoticeDialog
                        data={this.state.noticeData}
                        close={this.closeModifyNoticeDialogModal}
                        getList={this.getList}
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