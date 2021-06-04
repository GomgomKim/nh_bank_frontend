import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox, Textarea 
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';
import RegistFixHistoryDialog from "../../components/dialog/RegistFixHistoryDialog";

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class fixHistoryDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 5,
            },
            isRegistFixOpen: false,
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getList()
    }
    getList = () => {
        var list = [
            {           
                fixData: '2021-06-05',
                bikeType: 'PCX',
                bikeNum: '10호',
                fixDetail: '타이어 교체',
                fixReason: '타이어 노후로 인한 펑크',
                fixPeriod: '1일',
                fixManager: '구아무개',              
            },
            {           
                fixData: '2021-05-31',
                bikeType: 'NMAX',
                bikeNum: '10호',
                fixDetail: '사이드 미러 교체',
                fixReason: '주행 중 넘어짐',
                fixPeriod: '1일',
                fixManager: '최아무개',               
            },
            {           
                fixData: '2021-04-31',
                bikeType: 'PCX',
                bikeNum: '10호',
                fixDetail: '사이드 미러 교체',
                fixReason: '주행 중 넘어짐',
                fixPeriod: '1일',
                fixManager: '최아무개',               
            },
        ];
        this.setState({
            list: list,
        });
    }
    handleTableChange = (pagination) => {
        const pager = {
          ...this.state.pagination,
        };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState(
          {
            pagination: pager,
          },
          () => this.getList()
        );
      };

    //   정비이력 등록 모달

      openRegistFixDialog = () => {
        this.setState({ isRegistFixOpen: true });
      };
      closeRegistFixDialog = () => {
        this.setState({ isRegistFixOpen: false });
      };

    render() {

        const { close, data } = this.props;

        const columns = [
            {
                title: "날짜",
                dataIndex: "fixData",
                className: "table-column-center",
                width:'15%',
            },           
            {
                title: "바이크 종류",
                dataIndex: "bikeType",
                className: "table-column-center",
                width:'10%',
            },
            {
                title: "바이크 넘버",
                dataIndex: "bikeNum",
                className: "table-column-center",
                width:'10%',
            },
            {
                title: "정비사항",
                dataIndex: "fixDetail",
                className: "table-column-center",
                width:'20%',
            },
            {
                title: "정비사유",
                dataIndex: "fixReason",
                className: "table-column-center",
                width:'25%',
            },
            {
                title: "소요기간",
                dataIndex: "fixPeriod",
                className: "table-column-center",
                width:'10%',
            },
            {
                title: "정비자",
                dataIndex: "fixManager",
                className: "table-column-center",
                width:'10%',
            },   
            {
                title: "수정",
                dataIndex: "updateFix",
                className: "table-column-center",
                width:'10%',
                render: (data, row) => (
                    <div>
                    <Button onClick={this.openRegistFixDialog}>
                        수정
                    </Button>
                    </div>
                )
            }, 
            {
                title: "삭제",
                dataIndex: "deleteFix",
                className: "table-column-center",
                width: '10%',
                render: (data, row) => (
                  <div>            
                    <Button onClick={() => {}}>
                      삭제
                    </Button>
                  </div>
                )
              },  
        ];
    

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />
                <div className="registBike-Dialog">

                    <div className="dialog-content">

                        <div className="dialog-title">
                            정비이력
                        </div>

                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="exit" />                       
                       
                        <div className="dialog-inner">

                            <div className="fixHistory-btn">  

                            {this.state.isRegistFixOpen && (
                                    <RegistFixHistoryDialog close={this.closeRegistFixDialog} />
                                )}

                                <Button 
                                    style={{ 
                                        backgroundColor:"black", 
                                        borderColor: "black", 
                                        color: "white", 
                                        width: 150, 
                                        height: 40, 
                                        fontSize: 16,
                                    }} 
                                    onClick={this.openRegistFixDialog}
                                >                                    
                                    이력 작성하기
                                </Button>
                            </div>

                            <div className="content-box">
                                <FormItem
                                    name="table"
                                    className="selectItem"
                                    >
                                    <Table
                                    rowKey={(record) => record}
                                    dataSource={this.state.list}
                                    columns={columns}
                                    pagination={this.state.pagination}
                                    onChange={this.handleTableChange}
                                    style={{width:1200}}
                                    />
                                </FormItem>
                            </div>

                        </div>
                    </div>

                </div>
            </React.Fragment>

        )
    }
}

export default fixHistoryDialog;