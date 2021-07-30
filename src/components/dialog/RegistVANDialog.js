import React, { Component } from "react";
import {
  Form,
  Input,
  Table,
  Button,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  Modal,
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import moment from "moment";
import "../../css/main.css";
import { httpUrl, httpPost } from "../../api/httpClient";
import { customAlert, customError, updateError } from "../../api/Modals";
import { bikeType } from "../../lib/util/codeUtil";

const Search = Input.Search;
const FormItem = Form.Item;
const dateFormat = "YYYY/MM/DD";
const today = new Date();
const Option = Select.Option;

class RegistVANDialog extends Component {
  constructor(props) {
    super(props);
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
    this.getList();
    if (this.props.data) {
      console.log(this.props.data);
    }
  }

  handleSubmit = () => {
    let self = this;
    let { data } = this.props;
    console.log(data);
    Modal.confirm({
      title: <div> VAN 등록요청 확인 </div>,
      content: <div>VAN 등록을 하시겠습니까?</div>,
      okText: "확인",
      cancelText: "취소",
      onOk() {
        // data
        //   ? httpPost(httpUrl.updateFixList, [], {
        //       ...self.formRef.current.getFieldsValue(),
        //       idx: data.idx,
        //     })
        //       .then((result) => {
        //         console.log(result);
        //         if (result.result === "SUCCESS" && result.data === "SUCCESS") {
        //           customAlert("완료", "정비이력이 수정되었습니다.");
        //         } else updateError();
        //         self.props.close();
        //       })
        //       .catch((error) => {
        //         updateError();
        //       })
        //   : httpPost(httpUrl.registFixList, [], {
        //       ...self.formRef.current.getFieldsValue(),
        //       bikeIdx: this.state.bikeIdx,
        //     })
        //       .then((result) => {
        //         if (result.result === "SUCCESS" && result.data === "SUCCESS") {
        //           customAlert("완료", "정비이력이 등록되었습니다.");
        //         } else updateError();
        //         self.props.close();
        //       })
        //       .catch((error) => {
        //         updateError();
        //       });
      },
    });
  };

  getList = () => {
    var list = [
      {
        frName: "냠냠푸드",
        filePath: "",
        confrimBtn: 5153000,
      },
      {
        frName: "냠냠푸드",
        filePath: "",
        confrimBtn: 5153000,
      },
      {
        frName: "냠냠푸드",
        filePath: "",
        confrimBtn: 5153000,
      },
    ];
    this.setState({
      list: list,
    });
  };

  onConfirm = (row) => {
    let self = this;
    Modal.confirm({
      title: "VAN 등록요청",
      content: "등록요청을 확인하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk() {
        // httpPost(httpUrl.deleteFixList,[],{idx:row.idx})
        // .then((result)=>{
        //     if(result.result === "SUCCESS" && result.data === "SUCCESS"){
        //         customAlert("완료", "VAN 등록을 완료했습니다")
        //       }
        //         else updateError()
        //         self.getList();
        // })
        // .catch((error) => {
        //     customError("등록오류", "에러가 발생하였습니다. 다시 시도해주세요.")
        //   });
      },
    });
  };

  render() {
    const { close, data } = this.props;
    const columns = [
      {
        title: "가맹점",
        dataIndex: "frName",
        className: "table-column-center",
        // render: (data) => <div>{this.props.frName}</div>,
      },
      {
        title: "첨부이미지",
        dataIndex: "filePath",
        className: "table-column-center",
      },
      {
        title: "등록요청 확인",
        dataIndex: "confrimBtn",
        className: "table-column-center",
        render: (data, row) => (
          <Button onClick={this.onConfirm}>등록확인</Button>
        ),
      },
    ];

    return (
      <React.Fragment>
        <div className="Dialog-overlay" onClick={close} />
        <div className="registBike-Dialog">
          <div className="dialog-content">
            <div className="dialog-title">VAN 등록요청 확인</div>

            <img
              onClick={close}
              src={require("../../img/close.png").default}
              className="dialog-close"
              alt="exit"
            />

            <div className="dialog-inner">
              <Form ref={this.formRef} onFinish={this.handleSubmit}>
                <div className="content-box">
                  <FormItem name="table" className="selectItem">
                    <Table
                      rowKey={(record) => record.idx}
                      dataSource={this.state.list}
                      columns={columns}
                      pagination={this.state.pagination}
                      onChange={this.handleTableChange}
                      style={{ width: 600 }}
                    />
                  </FormItem>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegistVANDialog;
