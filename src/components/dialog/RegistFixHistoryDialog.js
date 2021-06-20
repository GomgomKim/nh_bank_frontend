import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox, DatePicker , Modal
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import moment from "moment";
import '../../css/main.css';
import { httpUrl, httpPost } from "../../api/httpClient";
import { customAlert, customError, updateError } from "../../api/Modals";

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

    handleSubmit = () => {
        let self = this;
        let { data } = this.props;
        console.log(data)
        Modal.confirm({
            title: <div> {data ? "이력 수정" : "이력 등록" } </div>,
            content:  
            <div> {data ? '정비이력을 수정하시겠습니까?' : '새 정비이력을 등록하시겠습니까?'} </div>,
            okText: "확인",
            cancelText: "취소",
          onOk() {
              data ?
            httpPost(httpUrl.updateFixList, [], {
              ...self.formRef.current.getFieldsValue(),
              idx: data.idx,
            }).then((result) => {
              console.log(result)
              if(result.result === "SUCCESS" && result.data === "SUCCESS"){
                customAlert("완료", "정비이력이 수정되었습니다.")
              }
              else updateError()
              self.props.close()
            }).catch((error) => {
              updateError()
            })

              :

              httpPost(httpUrl.registFixList, [], {
                ...self.formRef.current.getFieldsValue(),
                bikeIdx: this.state.bikeIdx,
              }).then((result) => {
                  if(result.result === "SUCCESS" && result.data === "SUCCESS"){
                    customAlert("완료", "정비이력이 등록되었습니다.")
                  }
                  else updateError()
                self.props.close()
              }).catch((error) => {
                updateError()
              })
          }
        })
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
                        <Form ref={this.formRef} onFinish={this.handleSubmit}>
                            <div className="dialog-block">

                                <div> 날짜 </div>

                                <div>
                                <FormItem name="startDate" className="selectItem">
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
                                        checked={this.state.modelName}
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
                                        name="bikeNumber"
                                        initialValue={data && data.bikeNumber}>
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
                                        name="content"
                                        initialValue={data && data.content}>
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
                                        name="reason"
                                        initialValue={data && data.reason}>
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
                                    name="totalHours"
                                    initialValue={data && data.totalHours}>
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
                                    name="worker"
                                    initialValue={data && data.worker}>
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
                                >                                    
                                    {data ? "수정하기" : "등록하기"}
                                </Button>
                            </div>
                        </Form>

                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

export default RegistFixHistoryDialog;