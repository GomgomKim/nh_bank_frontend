import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class ModifyFranDialog extends Component {
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
                <div className="modifyfran-Dialog">

                    <div className="modifyfran-content">

                        <div className="modifyfran-title">
                            수정
                        </div>
                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="img" />
                        <div className="modifyfran-inner">

                            <div className="modifyfran-innerbox">
                                <div className="contentBlock">
                                    <div className="mainTitle">가맹점명</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="price"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "",
                                                },
                                            ]}
                                            initialValue={data ? data.price : ""}
                                        >
                                            <Input
                                                placeholder="가맹점명을 입력하세요"
                                                className="override-input"
                                            />
                                        </FormItem>
                                    </div>

                                </div>
                                <div className="contentBlock">
                                    <div className="mainTitle">가맹점번호</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="price"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "",
                                                },
                                            ]}
                                            initialValue={data ? data.price : ""}
                                        >
                                            <Input
                                                placeholder="가맹점번호를 입력하세요"
                                                className="override-input"
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="contentBlock">
                                    <div className="mainTitle">가맹점주소</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="price"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "",
                                                },
                                            ]}
                                            initialValue={data ? data.price : ""}
                                        >
                                            <Input
                                                placeholder="가맹점주소를 입력하세요"
                                                className="override-input"
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="contentBlock">
                                    <div className="mainTitle">VAN</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="price"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "",
                                                },
                                            ]}
                                            initialValue={data ? data.price : ""}
                                        >
                                            <Input
                                                placeholder=""
                                                className="override-input"
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="contentBlock">
                                    <div className="mainTitle">PG정보</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="price"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "",
                                                },
                                            ]}
                                            initialValue={data ? data.price : ""}
                                        >
                                            <Input
                                                placeholder=""
                                                className="override-input"
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="contentBlock">
                                    <div className="mainTitle">PG 사용여부</div>
                                    <Radio.Group
                                        className="modify-radio"
                                        onChange={this.onChange} style={{ marginTop: 5 }}>
                                        <Radio value={1}>사용</Radio>
                                        <Radio value={2}>미사용</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <Button style={{ float: 'right', marginTop: 10 }} onClick={{}}>
                                저장하기
                            </Button>
                        </div>
                    </div>

                </div>
            </React.Fragment >

        )
    }
}

export default ModifyFranDialog;