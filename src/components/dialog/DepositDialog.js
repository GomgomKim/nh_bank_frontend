import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Modal
} from "antd";
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { searchType } from "../../lib/util/codeUtil";
import '../../css/main.css';
import SearchRiderDialog from "../dialog/SearchRiderDialog"
import SearchFranDialog from "../dialog/SearchFranDialog"
import { customAlert, customError, updateError } from "../../api/Modals";

const Search = Input.Search;
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

            searchType: 0,
            openSearchRiderModal : false,
            selectedRider: null,

            openSearchFranModal : false,
            selectedFran:null,

            
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        // this.getList()
    }

    onCheckType = (e) => {
        this.setState({ searchType: e.target.value });
      };
    
    openSearchRiderModal =() => {
        this.setState({ openSearchRiderModal: true})
    };
    closeSerchRiderModal = () => {
        this.setState({ openSearchRiderModal: false})
    };

    openSearchFranModal =() => {
        this.setState({ openSearchFranModal: true})
    };
    closeSearchFranModal = () => {
        this.setState({ openSearchFranModal: false})
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        let self = this;
        const form = this.formRef.current;
        if(this.state.searchType === 0){
        Modal.confirm({
            title: "예치금 지금",
            content: this.state.selectedRider.riderName + " 라이더에 " + " 예치금 " 
            + form.getFieldValue('ncashAmount') + " 원을 지급하시겠습니까?",
            okText: "확인",
            cancelText:"취소",
            onOk() {
                httpPost(httpUrl.depositSend, [], {
                    receiveUserIdx: self.state.selectedRider.userIdx,
                    ...self.formRef.current.getFieldsValue(),
                    userType: 1
                }).then((result) =>{
                    if(result.result === "SUCCESS" && result.data === "SUCCESS") {
                        customAlert('예치금 지급 완료', '해당 라이더에게 예치금을 지급하였습니다.')
                        self.props.close()
                        self.props.getList()
                    } 
                        else {
                        customError('예치금 지급 에러', '서버 에러로 인해 예치금 지급에 실패하였습니다')
                        }
                    })
                    .catch((e) => {
                        customError('예치금 지급 에러', '서버 에러로 인해 예치금 지급에 실패하였습니다')
                    });
                }});
        }
        else 
        Modal.confirm({
            title: "예치금 지금",
            content: self.state.selectedFran.frName + " 가맹점에 " + " 예치금 " 
            + form.getFieldValue('ncashAmount') + " 원을 지급하시겠습니까?",
            okText: "확인",
            cancelText:"취소",
            onOk() {
            httpPost(httpUrl.depositSend, [], {
                receiveUserIdx: self.state.selectedFran.userIdx,
                ...self.formRef.current.getFieldsValue(),
                userType: 2
            }).then((result) =>{
                if(result.result === "SUCCESS" && result.data === "SUCCESS") {
                    customAlert('예치금 지급 완료', '해당 가맹점에 예치금을 지급하였습니다.')
                    self.props.close()
                    self.props.getList()
                } 
                else {
                    customError('예치금 지급 에러', '서버 에러로 인해 예치금 지급에 실패하였습니다')
                }
            })
            .catch((e) => {
                customError('예치금 지급 에러', '서버 에러로 인해 예치금 지급에 실패하였습니다')
                });
            }}); 
        
    }

    render() {

        const { close, data } = this.props;

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />

                <div className="deposit-Dialog">

                    <div className="deposit-content">

                        <div className="deposit-title">
                            예치금 지급
                        </div>
                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="img" />
                        <div className="deposit-inner">
                        <Form ref={this.formRef} onFinish={(e) => this.handleSubmit(e)}>
                            <div className="contentBlock">                                
                                <Radio.Group
                                    onChange={this.onCheckType}
                                    value={this.state.searchType}
                                    defaultValue={searchType[0]}
                                    style={{marginRight:19}}>

                                    {Object.entries(searchType).map(([key, value]) => {
                                    return <Radio value={parseInt(key)}>{value}</Radio>;
                                    })}                                    
                                </Radio.Group>

                                    {this.state.openSearchRiderModal && (
                                        <SearchRiderDialog
                                            onSelect={(selectedRider) =>
                                            this.setState({ selectedRider })
                                            }
                                            close={this.closeSerchRiderModal}
                                        />
                                    )}

                                    {this.state.openSearchFranModal && (
                                        <SearchFranDialog
                                            onSelect={(selectedFran) =>
                                            this.setState({ selectedFran })
                                            }
                                            close={this.closeSearchFranModal}
                                        />
                                    )}

                                {this.state.searchType === 0? 
                                    <Button style={{ marginBottom: 20, marginLeft: 77 }} onClick={this.openSearchRiderModal}>
                                        라이더 검색
                                    </Button>
                                :
                                    <Button style={{ marginBottom: 20, marginLeft: 77 }} onClick={this.openSearchFranModal}>
                                        가맹점 검색
                                    </Button>
                                }
                            </div>

                            <div className="contentBlock">

                                {/* <div className="contentBlock-inner"> */}
                                {this.state.searchType === 0? (
                                    <div>
                                        <div className="mainTitle">라이더명</div>
                                        <div className="serach-input">         
                                                <Input
                                                    value={
                                                    this.state.selectedRider
                                                        ? this.state.selectedRider.riderName
                                                        : ""
                                                    }
                                                    className="override-input"
                                                    placeholder="검색해주세요."
                                                    disabled
                                                />   
                                        </div>
                                    </div>
                                 ) : (
                                    <div>
                                        <div className="mainTitle">가맹점명</div>  
                                        <div className="serach-input">
                                            <Input
                                                value={
                                                    this.state.selectedFran
                                                    ? this.state.selectedFran.frName
                                                    : ""
                                                }
                                                className="override-input"
                                                placeholder="검색해주세요."
                                                disabled
                                                />
                                        </div>
                                    </div>
                               )}
                                {/* </div> */}
                            </div>

                            <div className="contentBlock">
                                {/* <div className="contentBlock-inner"> */}
                                <div className="mainTitle">지급금액</div>
                                <div className="formItem">
                                    <FormItem
                                        name="ncashAmount"
                                        className="selectItem"
                                        style={{ marginLeft: 25, width: 230 }}
                                        rules={[
                                            {
                                                required: true,
                                                message: "금액을 입력해주세요",
                                            },
                                        ]}
                                        initialValue={data ? data.price : ""}
                                    >
                                        <Input
                                            placeholder="금액을 입력해주세요."
                                            className="override-input"
                                        />
                                    </FormItem>
                                </div>
                                {/* </div> */}
                            </div>
                            <Button type="primary" htmlType="submit" style={{ float: 'right'}}>
                                지급하기
                            </Button>
                            </Form>
                        </div>
                    </div>

                </div>
            </React.Fragment >

        )
    }
}

export default DepositDialog;