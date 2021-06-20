import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox, Modal
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';
import { httpUrl, httpPost } from "../../api/httpClient";
import { customAlert, customError, updateError } from "../../api/Modals";


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
            category: 0,
            deleted: 0,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        // this.getList()
    }

    handleSubmit = () => {
        let self = this;
        let { data } = this.props;
        console.log(data)
        Modal.confirm({
            title: <div> {data ? "공지 수정" : "공지 등록" } </div>,
            content:  
            <div> {data ? '공지사항을 수정하시겠습니까?' : '새 공지사항을 등록하시겠습니까?'} </div>,
            okText: "확인",
            cancelText: "취소",
          onOk() {
              data ?
            httpPost(httpUrl.updateNotice, [], {
              ...self.formRef.current.getFieldsValue(),
              idx: data.idx,
            }).then((result) => {
              console.log(result)
              if(result.result === "SUCCESS" && result.data === "SUCCESS"){
                customAlert("완료", "공지사항이 수정되었습니다.")
              }
              else updateError()
              self.props.close()
            }).catch((error) => {
              updateError()
            })

              :

              httpPost(httpUrl.registNotice, [], {
                ...self.formRef.current.getFieldsValue(),
                category: self.state.category,
                deleted: self.state.deleted,
              }).then((result) => {
                  if(result.result === "SUCCESS" && result.data === "SUCCESS"){
                    customAlert("완료", "공지사항이 등록되었습니다.")
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
                <div className="modifyfran-Dialog">

                    <div className="modifyfran-content">

                        <div className="modifyfran-title">
                        {data ? " 공지 수정" : " 공지 등록"}
                        </div>
                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="img" />
                        <div className="modifyfran-inner">
                        <Form ref={this.formRef} onFinish={this.handleSubmit}>
                            <div className="modifyfran-innerbox">
                                <div className="contentBlock">
                                    <div className="mainTitle">제목</div>
                                    <div className="formItem">
                                        <FormItem
                                            name="title"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "제목을 입력해주세요.",
                                                },
                                            ]}
                                            initialValue={data && data.title}
                                        >
                                            <Input
                                                placeholder="제목을 입력하세요"
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
                                            name="content"
                                            className="selectItem"
                                            style={{
                                                marginLeft: 20,
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "내용을 입력해주세요.",
                                                },
                                            ]}
                                            initialValue={data && data.content}
                                        >
                                            <Input.TextArea
                                                placeholder="내용을 입력하세요"
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
                                            name="sortOrder"
                                            className="selectItem"
                                            style={{ marginLeft: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "노출순위를 입력해주세요.",
                                                },
                                            ]}
                                            initialValue={data && data.sortOrder}
                                        >
                                            <Input
                                                placeholder="숫자가 클수록 위쪽에 공지됩니다."
                                                className="override-input"
                                                style={{ width: 250 }}
                                            />
                                        </FormItem>
                                    </div>
                                </div>

                            </div>
                            <Button
                                style={{ float: 'right', marginTop: 10 }}
                                htmlType="submit"
                            >
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

export default ModifyNoticeDialog;