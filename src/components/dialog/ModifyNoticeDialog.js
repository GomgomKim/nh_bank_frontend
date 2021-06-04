import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class ModifyNoticeDialog extends Component {
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
                                    <div className="mainTitle">제목</div>
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
                                                style={{ width: 250 }}
                                            />
                                        </FormItem>
                                    </div>

                                </div>
                                <div className="contentBlock">
                                    <div className="mainTitle">내용</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="price"
                                            className="selectItem"
                                            style={{
                                                marginLeft: 20,
                                            }}
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
                                                style={{ height: 200, width: 250 }}
                                                className="override-input"
                                            />
                                        </FormItem>
                                    </div>
                                </div>

                                <div className="contentBlock">
                                    <div className="mainTitle">노출순위</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="price"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "1~100사이 숫자를 입력해주세요",
                                                },
                                            ]}
                                            initialValue={data ? data.price : ""}
                                        >
                                            <Input
                                                placeholder="1~100사이 숫자를 입력해주세요"
                                                className="override-input"
                                                style={{ width: 250 }}
                                            />
                                        </FormItem>
                                    </div>
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

export default ModifyNoticeDialog;