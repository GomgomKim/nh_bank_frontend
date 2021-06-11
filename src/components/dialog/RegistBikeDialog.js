import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox, DatePicker 
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import moment from "moment";
import '../../css/main.css';

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
                            {data ? "바이크 수정" : "바이크 등록"}
                        </div>

                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="exit" />

                        <div className="dialog-inner">

                            <div className="dialog-block">

                                <div> 종류 </div>

                                <div>
                                    <Radio.Group
                                        onChange={(e) => {
                                            this.setState({ bikeType: e.target.checked });
                                        }}
                                        checked={this.state.bikeType}
                                        style={{ verticalAlign: '2px' }}
                                    >
                                        <Radio value={1}>PCX</Radio>
                                        <Radio value={2}>NMAX</Radio>
                                    </Radio.Group>
                                </div>

                            </div>

                            <div className="dialog-block">

                                <div> 연식 </div>

                                <div>
                                    <FormItem
                                        name="bikeModel"
                                        initialValue={data && data.bikeModel}>
                                        <Input
                                            placeholder="바이크 연식을 입력해 주세요."
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>

                            </div>


                            <div className="dialog-block">

                                <div> 주행거리 </div>

                                <div>
                                    <FormItem
                                        name="rideDistance"
                                        initialValue={data && data.rideDistance}>
                                        <Input
                                            placeholder="주행거리를 입력해 주세요."
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>

                            </div>

                            <div className="dialog-block">

                                <div> 운행 라이더명 </div>

                                <div>
                                    <FormItem
                                        name="rideRider"
                                        initialValue={data && data.rideRider}>
                                        <Input
                                            placeholder="운행하는 라이더이름을 입력해 주세요."
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>

                            </div>

                            <div className="dialog-block">

                                <div> 라이더 전화번호 </div>

                                <div>
                                    <FormItem
                                        name="riderPhone"
                                        initialValue={data && data.riderPhone}>
                                        <Input
                                            placeholder="라이더 전화번호를 입력해 주세요."
                                            style={{ width: 250 }} />
                                    </FormItem>
                                </div>

                            </div>

                            <div className="dialog-block">

                                <div> 대여 날짜 </div>

                                <div>
                                    <FormItem name="rentDate">
                                    <DatePicker
                                    style={{ width: 250,}}
                                    defaultValue={moment(today, dateFormat)}
                                    format={dateFormat}                                  
                                    />
                                </FormItem>                               
                                </div>

                            </div>

                            <div className="dialog-block">

                                <div> 반납 날짜 </div>

                                <div>
                                    <FormItem name="returnDate">
                                    <DatePicker
                                    style={{ width: 250,}}
                                    defaultValue={moment(today, dateFormat)}
                                    format={dateFormat}                                  
                                    />
                                </FormItem>                               
                                </div>

                                </div>


                            <div className="dialog-block">

                                <div> 메모 </div>

                                <div>
                                    <FormItem
                                        name="bikeMemo"
                                        initialValue={data && data.bikeMemo}>
                                        <textarea
                                            placeholder="메모할 사항을 입력해 주세요."
                                            style={{ width: 250, height: 80 }} />
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

export default RegistBikeDialog;