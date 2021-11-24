import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox, DatePicker 
} from "antd";
import { comma } from "../../lib/util/numberUtil";
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

class SearchContentDialog extends Component {
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
    
    searchContnet = () => {
        const rand = Math.floor(Math.random() * 10000);
        let self = this;
        
        //클라이언트 POST API 요청
        axios.post('https://developers.nonghyup.com/InquireTransactionHistory.nh', {
            "Header": {
              "ApiNm": "InquireTransactionHistory",
              "Tsymd": curDate,
              "Trtm": "112428",
              "Iscd": this.formRef.current.getFieldsValue().Iscd,
              "FintechApsno": "001",
              "ApiSvcCd": "ReceivedTransferA",
              "IsTuno": rand,
              "AccessToken": this.formRef.current.getFieldsValue().AccessToken
            },
            "Bncd": this.formRef.current.getFieldsValue().Bncd,
            "Acno": this.formRef.current.getFieldsValue().Acno,
            "Insymd": this.formRef.current.getFieldsValue().Insymd,
            "Ineymd": this.formRef.current.getFieldsValue().Ineymd,
            "TrnsDsnc": "A",
            "Lnsq": "DESC",
            "PageNo": "1",
            "Dmcnt": "100"
          })
        //성공시 then 실행
        .then(function (response) {
            console.log(JSON.stringify(response, null, 4));
            
            if(response.data.Header.Rpcd == "00000"){
                alert(response.data.Header.Rsms);
                self.props.close(response.data)
            }else{
                alert(response.data.Header.Rsms);
                self.props.close(response.data);
            }
        })
        //실패 시 catch 실행
        .catch(function (error) {
            alert(error);
        });
    }

    render() {

        const { close, data } = this.props;

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />
                <div className="registBike-Dialog">

                    <div className="dialog-content">

                        <div className="dialog-title">
                            거래내역조회
                        </div>

                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="exit" />
                        <Form ref={this.formRef} onFinish={this.searchContnet}>
                        <div className="dialog-inner">

                            <div className="dialog-block">

                                <div> 기관코드 </div>
                                <div>
                                    <FormItem
                                        name="Iscd">
                                        <Input
                                            placeholder="기관코드를 입력해 주세요."
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                                
                            </div>

                            <div className="dialog-block">
                                <div> 인증키 </div>
                                <div>
                                    <FormItem
                                        name="AccessToken">
                                        <Input
                                            placeholder="인증키를 입력해 주세요."
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 은행코드 </div>
                                <div>
                                    <FormItem
                                        name="Bncd">
                                        <Input
                                            placeholder = "은행코드를 입력해 주세요"
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 계좌번호 </div>
                                <div>
                                    <FormItem
                                        name="Acno">
                                        <Input
                                            placeholder = "계좌번호를 입력해 주세요"
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 조회시작일자 </div>
                                <div>
                                    <FormItem
                                        name="Insymd">
                                        <Input
                                            placeholder = "조회시작일자을 입력해 주세요"
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 조회종료일자 </div>
                                <div>
                                    <FormItem
                                        name="Ineymd">
                                        <Input
                                            placeholder = "조회종료일자을 입력해 주세요"
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
                        </Form>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

export default SearchContentDialog;