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
            Trdd : "",
            Txtm : "",
            MnrcDrotDsnc : "",
            AftrBlnc : "",
            Tram : "",
            BnprCntn : "",
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.data) {
            console.log(this.props.data);
        }
    }
    
    handleChange(arg){
        let idx = arg;
        let MnrcDrotDsncTemp = "";
        if(this.props.data[idx].MnrcDrotDsnc == "1"){
            MnrcDrotDsncTemp = "신규(입금)";
        }else if(this.props.data[idx].MnrcDrotDsnc == "2"){
            MnrcDrotDsncTemp = "입금";
        }else if(this.props.data[idx].MnrcDrotDsnc == "3"){
            MnrcDrotDsncTemp = "출금";
        }else if(this.props.data[idx].MnrcDrotDsnc == "4"){
            MnrcDrotDsncTemp = "해지(출금)";
        }
        this.setState({
            Trdd : this.props.data[idx].Trdd,
            Txtm : this.props.data[idx].Txtm,
            MnrcDrotDsnc : MnrcDrotDsncTemp,
            AftrBlnc : this.props.data[idx].AftrBlnc+"원",
            Tram : this.props.data[idx].Tram+"원",
            BnprCntn : this.props.data[idx].BnprCntn
        })
    }

    render() {
        const { close, data } = this.props;

        let BnprCntn = new Array();

        for(let i = 0 ; i < this.props.data.length ; i ++){

            let BnprCntnTemp = new Object();

            BnprCntnTemp.value = i;
            BnprCntnTemp.label = this.props.data[i].BnprCntn+"("+(i+1)+")";

            BnprCntn.push(BnprCntnTemp);
        }

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
                                    <Select
                                        placeholder={'선택'}
                                        style={{width:250, marginBottom: 20}}
                                        options={BnprCntn}
                                        // value=
                                        onChange={(option) => this.handleChange(option)}>
                                        
                                        </Select>
                                    </FormItem>
                                </div>
                                
                            </div>

                            <div className="dialog-block">
                                <div> 거래일자 </div>
                                <div>
                                    <FormItem>
                                        
                                        <Input
                                            value= {this.state.Trdd.substr(0,4)+"년 "+this.state.Trdd.substr(4,2)+"월 "+this.state.Trdd.substr(6,2)+"일"}
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 거래시각 </div>
                                <div>
                                    <FormItem>
                                        <Input
                                            value={this.state.Txtm.substr(0,2)+"시 "+this.state.Txtm.substr(2,2)+"분 "+this.state.Txtm.substr(4,2)+"초"}
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 입금출금구분 </div>
                                <div>
                                    <FormItem>
                                        <Input
                                            value={this.state.MnrcDrotDsnc}
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 거래금액 </div>
                                <div>
                                    <FormItem>
                                        <Input
                                            value = {this.state.Tram}
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 거래후잔액 </div>
                                <div>
                                    <FormItem>
                                        <Input
                                            value={this.state.AftrBlnc}
                                            readOnly
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>
                            </div>

                            <div className="dialog-block">
                                <div> 통장인자내용 </div>
                                <div>
                                    <FormItem>
                                        <Input
                                            value={this.state.BnprCntn}
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