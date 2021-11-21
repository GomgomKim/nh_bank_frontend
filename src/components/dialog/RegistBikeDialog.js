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

class RegistBikeDialog extends Component {
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

    withdraw = () => {
        const close = this.props.close
        const rand = Math.floor(Math.random() * 10000);
        //클라이언트 POST API 요청
        axios.post('https://developers.nonghyup.com/DrawingTransfer.nh', {
            "Header": {
                "ApiNm": "DrawingTransfer",
                "Tsymd": "20211121",
                "Trtm": "112428",
                "Iscd": "001252",
                "FintechApsno": "001",
                "ApiSvcCd": "DrawingTransferA",
                "IsTuno": rand,
                "AccessToken": "58c4f0175e2bb394d2e288dbaaed76024e716e19794303e0a228a9240fd6e457"
              },
              "FinAcno": "00820100012520000000000012826",
              "Tram": "200000",
              "DractOtlt": "3020000005480"
        })
        //성공시 then 실행
        .then(function (response) {
            console.log(JSON.stringify(response, null, 4))
            alert("출금 되었습니다.")
        })
        //실패 시 catch 실행
        .catch(function (error) {
            alert(error);
        });
    }

    deposit = () => {
        let self = this;
        const rand = Math.floor(Math.random() * 10000);
        //클라이언트 POST API 요청
        axios.post('https://developers.nonghyup.com/ReceivedTransferAccountNumber.nh', {
            "Header": {
                "ApiNm": "ReceivedTransferAccountNumber",
                "Tsymd": "20211121",
                "Trtm": "112428",
                "Iscd": "001252",
                "FintechApsno": "001",
                "ApiSvcCd": "ReceivedTransferA",
                "IsTuno": rand,
                "AccessToken": "58c4f0175e2bb394d2e288dbaaed76024e716e19794303e0a228a9240fd6e457"
              },
              "Bncd": "011",
              "Acno": "3020000005480",
              "Tram": "100000",
              "DractOtlt": "3020000005482",
              "MractOtlt": "3020000005480"
        })
        //성공시 then 실행
        .then(function (response) {
            console.log(JSON.stringify(response, null, 4))
            alert("입금 되었습니다.")
            self.props.close();
        })
        //실패 시 catch 실행
        .catch(function (error) {
            alert(error);
        });
    }

    readBalance = () => {
        //클라이언트 POST API 요청
        axios.post('https://developers.nonghyup.com/InquireBalance.nh', {
            "Header": {
                "ApiNm": "InquireBalance",
                "Tsymd": "20211121",
                "Trtm": "112428",
                "Iscd": "001252",
                "FintechApsno": "001",
                "ApiSvcCd": "ReceivedTransferA",
                "IsTuno": "00111220",
                "AccessToken": "58c4f0175e2bb394d2e288dbaaed76024e716e19794303e0a228a9240fd6e457"
            },
            "FinAcno": "00820100012520000000000012826"
        })
        //성공시 then 실행
        .then(function (response) {
            console.log(JSON.stringify(response, null, 4))
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
                            입출금
                        </div>

                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="exit" />

                        <div className="dialog-inner">

                            <div className="dialog-block">

                                <div> 종류 </div>

                                <div>
                                    <Radio.Group
                                        onChange={(e) => {
                                            this.setState({ type: e.target.value });
                                            console.log(e.target.value)
                                        }}
                                        checked={this.state.type}
                                        style={{ verticalAlign: '2px' }}
                                    >
                                        <Radio value={1}>입금</Radio>
                                        <Radio value={2}>출금</Radio>
                                    </Radio.Group>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 금액 </div>
                                <div>
                                    <FormItem
                                        name="bikeModel">
                                        <Input
                                            placeholder="금액을 입력해 주세요."
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
                                    
                                    onClick={() => this.state.type === 1 ? this.deposit() : this.withdraw()}
                                >
                                    확인
                                </Button>
                            </div>

                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

export default RegistBikeDialog;