import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio
} from "antd";
import { searchType } from "../../lib/util/codeUtil";
import '../../css/main.css';
import SearchRiderDialog from "../dialog/SearchRiderDialog"
import SearchFranDialog from "../dialog/SearchFranDialog"

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
    closeSerchFranModal = () => {
        this.setState({ openSearchFranModal: false})
    };

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
                                            this.setState({ selectedRider: selectedRider })
                                            }
                                            close={this.closeSerchRiderModal}
                                        />
                                    )}

                                    {this.state.openSearchFranModal && (
                                        <SearchFranDialog
                                            onSelect={(selectedFran) =>
                                            this.setState({ selectedFran: selectedFran })
                                            }
                                            close={this.closeSerchFranModal}
                                        />
                                    )}

                                {this.state.searchType === 0? 
                                    <Button style={{ marginBottom: 20, marginLeft: 20 }} onClick={this.openSearchRiderModal}>
                                        라이더 검색
                                    </Button>
                                :
                                    <Button style={{ marginBottom: 20, marginLeft: 20 }} onClick={this.openSearchFranModal}>
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
                                                        ? this.state.selectedRider.searchRider
                                                        : this.props.data
                                                        ? this.props.data.searchRider
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
                                                    ? this.state.selectedFran.searchFran
                                                    : this.props.data
                                                    ? this.props.data.searchFran
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
                                        name="price"
                                        className="selectItem"
                                        style={{ marginLeft: 30 }}
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
                            <Button style={{ float: 'right'}} onClick={{}}>
                                지급하기
                            </Button>
                        </div>
                    </div>

                </div>
            </React.Fragment >

        )
    }
}

export default DepositDialog;