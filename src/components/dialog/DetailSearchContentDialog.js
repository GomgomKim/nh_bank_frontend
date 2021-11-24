import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox, DatePicker, Dropdown 
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import SelectBox from '../../components/input/SelectBox';
import moment from "moment";
import { httpGet, httpUrl, httpPost } from "../../api/httpClient";
import '../../css/main.css';
import axios from 'axios';

const Search = Input.Search;
const FormItem = Form.Item;
const dateFormat = "YYYY/MM/DD";
const today = new Date();
const Option = Select.Option;

let year = today.getFullYear().toString();
let month = (today.getMonth()+1).toString();
let date = today.getDate().toString();

if(month.length == 1)
{
    month = "0"+month;
}

if(date.length == 1)
{
    date = "0"+date;
}

let curDate = year + month + date;

class DetailSearchContentDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 1,
            },
            type: 1,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.data) {
            console.log(this.props.data);
        }
    }
    
    // detailSearchContent = () => {
    //     const rand = Math.floor(Math.random() * 10000);
    //     let self = this;
        
    //     //클라이언트 POST API 요청
    //     axios.post('https://developers.nonghyup.com/InquireTransactionHistory.nh', {
    //         "Header": {
    //           "ApiNm": "InquireTransactionHistory",
    //           "Tsymd": curDate,
    //           "Trtm": "112428",
    //           "Iscd": this.formRef.current.getFieldsValue().Iscd,
    //           "FintechApsno": "001",
    //           "ApiSvcCd": "ReceivedTransferA",
    //           "IsTuno": rand,
    //           "AccessToken": this.formRef.current.getFieldsValue().AccessToken
    //         },
    //         "Bncd": this.formRef.current.getFieldsValue().Bncd,
    //         "Acno": this.formRef.current.getFieldsValue().Acno,
    //         "Insymd": this.formRef.current.getFieldsValue().Insymd,
    //         "Ineymd": this.formRef.current.getFieldsValue().Ineymd,
    //         "TrnsDsnc": "A",
    //         "Lnsq": "DESC",
    //         "PageNo": "1",
    //         "Dmcnt": "100"
    //       })
    //     //성공시 then 실행
    //     .then(function (response) {
    //         console.log(JSON.stringify(response, null, 4));
            
    //         if(response.data.Header.Rpcd == "00000"){
    //             alert(response.data.Header.Rsms);
    //             self.props.close(response.data)
    //         }else{
    //             alert(response.data.Header.Rsms);
    //             self.props.close(response.data);
    //         }
    //     })
    //     //실패 시 catch 실행
    //     .catch(function (error) {
    //         alert(error);
    //     });
    // }

    render() {

        const { close, data } = this.props;

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />
                <div className="registBike-Dialog">

                    <div className="dialog-content">

                        <div className="dialog-title">
                            거래내역보기
                        </div>

                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="exit" />
                        {/* <Form ref={this.formRef} onFinish={this.detailSearchContent}> */}
                        <div className="dialog-inner">

                            <div className="dialog-block">

                                <div> 내역 </div>
                                <div>
                                    <FormItem>
                                    <SelectBox
                                        placeholder={'전체'}
                                        style={{width:250, marginBottom: 20}}
                                        value={"111"}
                                        onChange={(value) => {
                                            // if (parseInt(value) !== this.state.category) {
                                            //     this.onChangeStatus(value);
                                            // }
                                        }}
                                        />
                                    </FormItem>
                                </div>
                                
                            </div>

                            <div className="dialog-block">
                                <div> 거래일자 </div>
                                <div>
                                    <FormItem
                                        name="Trdd">
                                        <Input
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 거래시각 </div>
                                <div>
                                    <FormItem
                                        name="Txtm">
                                        <Input
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 입금출금구분 </div>
                                <div>
                                    <FormItem
                                        name="MnrcDrotDsnc">
                                        <Input
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 거래금액 </div>
                                <div>
                                    <FormItem
                                        name="Tram">
                                        <Input
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 거래후잔액 </div>
                                <div>
                                    <FormItem
                                        name="AftrBlnc">
                                        <Input
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 통장인자내용 </div>
                                <div>
                                    <FormItem
                                        name="BnprCntn">
                                        <Input
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="registBike-btn">
                                <Button
                                    style={{
                                        backgroundColor: "black",
                                        borderColor: "black",
                                        color: "white",
                                        width: 100,
                                        height: 40,
                                        fontSize: 16,
                                        marginTop: 60,
                                    }}
                                    htmlType="submit"
                                    // onClick={() => this.createPinAccount()}
                                >
                                    확인
                                </Button>
                            </div>
                        </div>
                        {/* </Form> */}
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

export default DetailSearchContentDialog;