import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';

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
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        // this.getList()
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
                            <div className="contentBlock">

                                <Radio.Group onChange={this.onChange} style={{ marginTop: 5 }}>
                                    <Radio value={1}>라이더</Radio>
                                    <Radio value={2}>가맹점</Radio>
                                </Radio.Group>

                                <Search
                                    placeholder="아이디를 입력하세요"
                                    enterButton="조회"
                                    allowClear
                                    onSearch={this.onSearch}
                                    style={{
                                        width: 250,
                                        marginBottom: 20
                                    }}
                                />
                            </div>

                            <div className="contentBlock">
                                <div className="contentBlock-inner">
                                    <div className="mainTitle">지급금액</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="price"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
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
                                </div>
                            </div>
                            <Button style={{ float: 'right', marginTop: 10 }} onClick={{}}>
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