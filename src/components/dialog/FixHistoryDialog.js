import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox, Textarea, Modal
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';
import RegistFixHistoryDialog from "../../components/dialog/RegistFixHistoryDialog";
import { httpGet, httpUrl, httpPost } from "../../api/httpClient";
// import Modal from "antd/lib/modal/Modal";
import { customAlert, customError, updateError } from "../../api/Modals";
import { formatDates } from "../../lib/util/dateUtil";
import { bikeType } from "../../lib/util/codeUtil";

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class fixHistoryDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 5,
            },
            isRegistFixOpen: false,
            fixBikeData: [],
            modifyFixDialogOpen: false,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList()
    }

    getList = () => {
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        httpGet(httpUrl.bikeFixHistoryList, [pageNum, pageSize],{})
        .then((res)=>{
            console.log(JSON.stringify(res, null, 4))
            const pagination = {...this.state.pagination};
            pagination.current = res.data.currentPage;
            pagination.total = res.data.totalCount;
            this.setState({
                list: res.data.bikeMaintenances,
                pagination,
            });
        });
    }

    onDelete = (row) => {
        let self = this;
        Modal.confirm({
            title:"정비이력 삭제",
            content:"해당 이력을 삭제하시겠습니까?",
            okText:"확인",
            cancelText:"취소",
            onOk() {
                httpPost(httpUrl.deleteFixList,[],{idx:row.idx})
                .then((result)=>{
                    if(result.result === "SUCCESS" && result.data === "SUCCESS"){
                        customAlert("완료", "해당 이력을 삭제합니다.")      
                      }
                        else updateError()
                        self.getList();
                })
                .catch((error) => {
                    customError("삭제오류", "에러가 발생하였습니다. 다시 시도해주세요.") 
                  });
            }
        });
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

    //   정비이력 등록 모달

      openRegistFixDialog = () => {
        this.setState({ isRegistFixOpen: true });
      };
      closeRegistFixDialog = () => {
        this.setState({ isRegistFixOpen: false });
        this.getList()
      };

    //정비이력 수정 모달
      openModifyFixDialogModal = (row) => {
        this.setState({ 
            modifyFixDialogOpen: true, 
            fixBikeData: row
        });
      };

      closeModifyFixDialogModal = () => {
        this.setState({ modifyFixDialogOpen: false });
        this.getList()
      };

    render() {

        const { close, data } = this.props;

        const columns = [
            {
                title: "날짜",
                dataIndex: "startDate",
                className: "table-column-center",
                width:'15%',
                render: (data) =><div>{formatDates(data)}</div>
            },           
            {
                title: "바이크 종류",
                dataIndex: "modelName",
                className: "table-column-center",
                width:'10%',
                render: (data) => <div>{bikeType[data]}</div>
            },
            {
                title: "바이크 넘버",
                dataIndex: "bikeNumber",
                className: "table-column-center",
                width:'10%',
            },
            {
                title: "정비사항",
                dataIndex: "content",
                className: "table-column-center",
                width:'20%',
            },
            {
                title: "정비사유",
                dataIndex: "reason",
                className: "table-column-center",
                width:'25%',
            },
            {
                title: "소요기간",
                dataIndex: "totalHours",
                className: "table-column-center",
                width:'10%',
                render:(data) => <div>{data} 일</div>
            },
            {
                title: "정비자",
                dataIndex: "worker",
                className: "table-column-center",
                width:'10%',
            },   
            {
                title: "수정",
                dataIndex: "updateFix",
                className: "table-column-center",
                width:'10%',
                render: (data, row) => (
                    <div>
                    <Button onClick={() => this.openModifyFixDialogModal(row)}>
                        수정
                    </Button>
                    </div>
                )
            }, 
            {
                title: "삭제",
                dataIndex: "deleteFix",
                className: "table-column-center",
                width: '10%',
                render: (data, row) => (
                  <div>            
                    <Button onClick={() => {this.onDelete(row)}}>
                      삭제
                    </Button>
                  </div>
                )
              },  
        ];
    

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />
                <div className="registBike-Dialog">

                    <div className="dialog-content">

                        <div className="dialog-title">
                            정비이력
                        </div>

                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="exit" />                       
                       
                        <div className="dialog-inner">

                            <div className="fixHistory-btn">  

                            {this.state.isRegistFixOpen && (
                                <RegistFixHistoryDialog close={this.closeRegistFixDialog} />
                            )}
                                                
                            {this.state.modifyFixDialogOpen &&
                                <RegistFixHistoryDialog
                                    data={this.state.fixBikeData}
                                    close={this.closeModifyFixDialogModal}
                                    getList={this.getList}
                                />
                            }

                                <Button 
                                    style={{ 
                                        backgroundColor:"black", 
                                        borderColor: "black", 
                                        color: "white", 
                                        width: 150, 
                                        height: 40, 
                                        fontSize: 16,
                                    }} 
                                    onClick={this.openRegistFixDialog}
                                >                                    
                                    이력 작성하기
                                </Button>
                            </div>

                            <div className="content-box">
                                <FormItem
                                    name="table"
                                    className="selectItem"
                                    >
                                    <Table
                                    rowKey={(record) => record.idx}
                                    dataSource={this.state.list}
                                    columns={columns}
                                    pagination={this.state.pagination}
                                    onChange={this.handleTableChange}
                                    style={{width:1200}}
                                    />
                                </FormItem>
                            </div>

                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

export default fixHistoryDialog;