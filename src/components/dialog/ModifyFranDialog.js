import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';
import { pgUseRate } from "../../lib/util/codeUtil";
import { httpUrl, httpPost } from "../../api/httpClient";


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

    }

    handleSubmit = () => {
        // console.log(this.formRef.current.getFieldsValue())
        httpPost(httpUrl.updateFranchise, [], {
            ...this.formRef.current.getFieldsValue(),
            userIdx: this.props.data.userIdx
        }).then((res) => {
            // console.log(res);
            this.props.close();
            this.props.getList();
          })
          .catch((e) => {});
      };

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
                        <Form ref={this.formRef} onFinish={this.handleSubmit}>
                            <div className="modifyfran-innerbox">
                                <div className="contentBlock">
                                    <div className="mainTitle">가맹점명</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="frName"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[{ required: true, message: "" }]}
                                            initialValue={data ? data.frName : ""}
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
                                            name="frPhone"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[{ required: true, message: "" }]}
                                            initialValue={data ? data.frPhone : ""}
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
                                            name="addr1"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[{ required: true, message: "" }]}
                                            initialValue={data ? data.addr1 : ""}
                                        >
                                            <Input
                                                placeholder="가맹점주소를 입력하세요"
                                                className="override-input"
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="contentBlock">
                                    <div className="mainTitle">상세주소</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="addr2"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[{ required: true, message: "" }]}
                                            initialValue={data ? data.addr2 : ""}
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
                                            name="vanNumber"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            initialValue={data ? data.vanNumber : ""}
                                        >
                                            <Input
                                                className="override-input"
                                            />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="contentBlock">
                                    <div className="mainTitle">PG 사용여부</div>
                                        <FormItem 
                                            name="tidNormalRate"
                                            style={{ display:'inline-block', marginLeft: 20 }}
                                            >
                                            <Radio.Group
                                                style={{marginLeft:0}}
                                                defaultValue={data ? parseInt(data.tidNormalRate): 100}
                                            >
                                            {Object.keys(pgUseRate).reverse().map((key) => {
                                                return (
                                                <Radio value={parseInt(key)}>
                                                    {pgUseRate[key]}
                                                </Radio>
                                                );
                                            })}
                                            </Radio.Group>
                                        </FormItem>
                                </div>
                            </div>
                            <Button style={{ float: 'right', marginTop: 10 }} type="primary" htmlType="submit">
                                저장하기
                            </Button>
                            </Form>
                        </div>
                    </div>

                </div>
            </React.Fragment >

        )
    }
}

export default ModifyFranDialog;