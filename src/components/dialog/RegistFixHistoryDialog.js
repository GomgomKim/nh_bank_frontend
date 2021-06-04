import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox, DatePicker , 
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import moment from "moment";
import '../../css/main.css';

const Search = Input.Search;
const FormItem = Form.Item;
const dateFormat = "YYYY/MM/DD";
const today = new Date();
const Option = Select.Option;

class RegistFixHistoryDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 1,
            },
            bikeType: false,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.data) {
            console.log(this.props.data);
        }
    }

    render() {

        const { close, data } = this.props;

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />
                <div className="registBike-Dialog">

                    <div className="dialog-content">

                        <div className="dialog-title">
                            {data ? "정비이력 수정" : "정비이력 등록"}
                        </div>

                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="exit" />                       
                       
                        <div className="dialog-inner">

                            <div className="dialog-block">

                                <div> 날짜 </div>

                                <div>
                                <FormItem name="payDate" className="selectItem">
                                    <DatePicker
                                    style={{ width: 250,}}
                                    defaultValue={moment(today, dateFormat)}
                                    format={dateFormat}                                  
                                    />
                                </FormItem>
                   
                                </div>                              
                               

                            </div>

                            <div className="dialog-block">

                                <div> 바이크 종류 </div>

                                <div>
                                    <Radio.Group
                                        onChange={(e) => {
                                        this.setState({ bikeType: e.target.checked}); }} 
                                        checked={this.state.bikeType}
                                        style={{verticalAlign: '2px'}}
                                        >
                                        <Radio value={1}>PCX</Radio>
                                        <Radio value={2}>NMAX</Radio>
                                    </Radio.Group>
                                </div>                               
                            </div>
                            

                            <div className="dialog-block">

                                <div> 바이크 넘버 </div>

                                <div>
                                    <FormItem 
                                        name="bikeNum"
                                        initialValue={data && data.bikeNum}>
                                        <Input 
                                            placeholder="바이크 넘버를 입력해 주세요."
                                            style={{width: 250}}/>
                                    </FormItem>                               
                                </div>

                            </div>

                            <div className="dialog-block">

                                <div> 정비사항 </div>

                                <div>
                                    <FormItem 
                                        name="fixDetail"
                                        initialValue={data && data.fixDetail}>
                                        <Input 
                                            placeholder="정비사항을 입력해 주세요."
                                            style={{width: 250}}/>
                                    </FormItem>                               
                                </div>

                            </div>

                            <div className="dialog-block">

                                <div> 정비사유 </div>

                                <div>
                                    <FormItem 
                                        name="fixReason"
                                        initialValue={data && data.fixReason}>
                                        <Input 
                                            placeholder="정비사유를 입력해 주세요."
                                            style={{width: 250}}/>
                                    </FormItem>                               
                                </div>

                            </div>
                            <div className="dialog-block">

                            <div> 소요기간 </div>

                            <div>
                                <FormItem 
                                    name="fixPeriod"
                                    initialValue={data && data.fixPeriod}>
                                    <Input 
                                        placeholder="소요기간을 입력해 주세요."
                                        style={{width: 250}}/>
                                </FormItem>                               
                            </div>

                            </div>
                            <div className="dialog-block">

                            <div> 정비자 </div>

                            <div>
                                <FormItem 
                                    name="fixManager"
                                    initialValue={data && data.fixManager}>
                                    <Input 
                                        placeholder="정비자를 입력해 주세요."
                                        style={{width: 250}}/>
                                </FormItem>                               
                            </div>

                            </div>

                            <div className="registBike-btn">  
                                <Button 
                                    style={{ 
                                        backgroundColor:"black", 
                                        borderColor: "black", 
                                        color: "white", 
                                        width: 100, 
                                        height: 40, 
                                        fontSize: 16,
                                        marginTop: 20,
                                    }} 
                                    onClick={{}}
                                >                                    
                                    등록하기
                                </Button>
                            </div>

                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

export default RegistFixHistoryDialog;