import { Button, Form, Input, Radio, Select } from "antd";
import React, { Component } from "react";
import "../../css/main.css";
import { searchType } from "../../lib/util/codeUtil";
import SearchFranDialog from "../dialog/SearchFranDialog";
import SearchRiderDialog from "../dialog/SearchRiderDialog";

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class DepositWithdrawDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 1,
      },

      searchType: 0,
      openSearchRiderModal: false,
      selectedRider: null,

      openSearchFranModal: false,
      selectedFran: null,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    // this.getList()
  }

  onCheckType = (e) => {
    this.setState({ searchType: e.target.value });
  };

  openSearchRiderModal = () => {
    this.setState({ openSearchRiderModal: true });
  };
  closeSerchRiderModal = () => {
    this.setState({ openSearchRiderModal: false });
  };

  openSearchFranModal = () => {
    this.setState({ openSearchFranModal: true });
  };
  closeSearchFranModal = () => {
    this.setState({ openSearchFranModal: false });
  };

  handleSubmit = () => {};

  render() {
    const { close, data } = this.props;

    return (
      <React.Fragment>
        <div className="Dialog-overlay" onClick={close} />

        <div className="deposit-Dialog">
          <div className="deposit-content">
            <div className="deposit-title">예치금 출금</div>
            <img
              onClick={close}
              src={require("../../img/close.png").default}
              className="dialog-close"
              alt="img"
            />
            <div className="deposit-inner">
              <Form ref={this.formRef} onFinish={this.handleSubmit}>
                <div className="contentBlock">
                  <Radio.Group
                    onChange={this.onCheckType}
                    value={this.state.searchType}
                    defaultValue={searchType[0]}
                    style={{ marginRight: 19 }}
                  >
                    {Object.entries(searchType).map(([key, value]) => {
                      return <Radio value={parseInt(key)}>{value}</Radio>;
                    })}
                  </Radio.Group>

                  {this.state.openSearchRiderModal && (
                    <SearchRiderDialog
                      onSelect={(selectedRider) =>
                        this.setState(
                          { selectedRider, selectedFran: null },
                          () => console.log(this.state.selectedRider)
                        )
                      }
                      close={this.closeSerchRiderModal}
                    />
                  )}

                  {this.state.openSearchFranModal && (
                    <SearchFranDialog
                      onSelect={(selectedFran) =>
                        this.setState(
                          { selectedFran, selectedRider: null },
                          () => console.log(this.state.selectedFran)
                        )
                      }
                      close={this.closeSearchFranModal}
                    />
                  )}

                  {this.state.searchType === 0 ? (
                    <Button
                      style={{ marginBottom: 20, marginLeft: 77 }}
                      onClick={this.openSearchRiderModal}
                    >
                      라이더 검색
                    </Button>
                  ) : (
                    <Button
                      style={{ marginBottom: 20, marginLeft: 77 }}
                      onClick={this.openSearchFranModal}
                    >
                      가맹점 검색
                    </Button>
                  )}
                </div>

                <div className="contentBlock">
                  {/* <div className="contentBlock-inner"> */}
                  {this.state.searchType === 0 ? (
                    <div>
                      <div className="mainTitle">라이더명</div>
                      <div className="serach-input">
                        <Input
                          value={
                            this.state.selectedRider
                              ? this.state.selectedRider.riderName
                              : ""
                          }
                          className="override-input"
                          placeholder="검색해주세요."
                          disabled
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mainTitle">가맹점명</div>
                      <div className="serach-input">
                        <Input
                          value={
                            this.state.selectedFran
                              ? this.state.selectedFran.frName
                              : ""
                          }
                          className="override-input"
                          placeholder="검색해주세요."
                          disabled
                        />
                      </div>
                    </div>
                  )}
                  {/* </div> */}
                </div>

                <div className="contentBlock">
                  {/* <div className="contentBlock-inner"> */}
                  <div className="mainTitle">예치금 잔액</div>
                  <div className="formItem">
                    <FormItem
                      name="ncash"
                      className="selectItem"
                      style={{ marginLeft: 25, width: 230 }}
                      rules={[
                        {
                          required: true,
                          message: "금액을 입력해주세요",
                        },
                      ]}
                    >
                      <Input
                        placeholder="금액을 입력해주세요."
                        className="override-input"
                        value={
                          this.state.selectedFran || this.state.selectedRider
                            ? this.state.selectedFran
                              ? this.state.selectedFran.ncash
                              : this.state.selectedRider.ncash
                            : ""
                        }
                      />
                    </FormItem>
                  </div>
                  {/* </div> */}
                </div>
                <div className="contentBlock">
                  {/* <div className="contentBlock-inner"> */}
                  <div className="mainTitle">출금요청액</div>
                  <div className="formItem">
                    <FormItem
                      name="withdrawAmount"
                      className="selectItem"
                      style={{ marginLeft: 25, width: 230 }}
                      rules={[
                        {
                          required: true,
                          message: "금액을 입력해주세요",
                        },
                      ]}
                    >
                      <Input
                        placeholder="금액을 입력해주세요."
                        className="override-input"
                      />
                    </FormItem>
                  </div>
                  {/* </div> */}
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  출금요청
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DepositWithdrawDialog;
