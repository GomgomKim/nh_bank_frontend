import { Form, DatePicker, Input, Table, Button, Descriptions } from "antd";
import React, { Component } from "react";
// import {
//   httpGet,
//   httpUrl,
//   httpDownload,
//   httpPost,
//   httpPut,
// } from "../../api/httpClient";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import "../../css/main.css";

const FormItem = Form.Item;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class DeliveryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
        franchisee: "",
        rider: "",
        Phone: "",
      };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getList()
  }
   
  
  // 가맹점 검색
  onSearchFranchisee = (value) => {
    this.setState(
      {
        frName: value,
      },
      () => {
        this.getList();
      }
    );
  };
  
  // 라이더 검색
  onSearchRider = (value) => {
    this.setState(
      {
        riderName: value,
      },
      () => {
        this.getList();
      }
    );
  };

  // 전화번호 검색
  onSearchPhone = (value) => {
    this.setState(
      {
        frPhone: value,
        riderPhone: value,
      },
      () => {
        this.getList();
      }
    );
  };

  getList = () => {
    var list = [
        {           
            orderNum: '1234',
            orderdata: '2021-05-31',
            destAddr1: '서울특별시 행복구 행운동 희망아파트',
            frName: '스타벅스',
            frPhone: '02-123-4567',
            riderName: '김아무개',
            riderPhone: '010-8888-9999',
            orderPrice: '17500',
            basicDeliveryPrice: '2000',
            extraDeliveryPrice: '500',
            deliveryPrice: '20000',
        },
        {
            orderNum: '1235',
            orderdata: '2021-05-31',
            destAddr1: '서울특별시 행복구 행운동 희망아파트',
            frName: '엔젤리너스',
            frPhone: '02-123-4567',
            riderName: '나아무개',
            riderPhone: '010-8888-9999',
            deliveryPriceFeeAmount: '1000',
            deliveryPriceFeeType:'정량',
            orderPrice: '17500',
            basicDeliveryPrice: '2000',
            extraDeliveryPrice: '500',
            deliveryPrice: '20000',
        },
        {
            orderNum: '1236',
            orderdata: '2021-05-31',
            destAddr1: '서울특별시 행복구 행운동 희망아파트',
            frName: '탐앤탐스',
            frPhone: '02-123-4567',
            riderName: '박아무개',
            riderPhone: '010-8888-9999',
            deliveryPriceFeeAmount: '1000',
            deliveryPriceFeeType:'정률',
            orderPrice: '17500',
            basicDeliveryPrice: '2000',
            extraDeliveryPrice: '500',
            deliveryPrice: '20000',
        },
        {
            orderNum: '1237',
            orderdata: '2021-05-31',
            destAddr1: '서울특별시 행복구 행운동 희망아파트',
            frName: '메가커피',
            frPhone: '02-123-4567',
            riderName: '이아무개',
            riderPhone: '010-8888-9999',
            deliveryPriceFeeAmount: '1000',
            deliveryPriceFeeType:'정량',
            orderPrice: '17500',
            basicDeliveryPrice: '2000',
            extraDeliveryPrice: '500',
            deliveryPrice: '20000',
        },
        {
            orderNum: '1238',
            orderdata: '2021-05-31',
            destAddr1: '서울특별시 행복구 행운동 희망아파트',
            frName: '더 벤티',
            frPhone: '02-123-4567',
            riderName: '정아무개',
            riderPhone: '010-8888-9999',
            deliveryPriceFeeAmount: '1000',
            deliveryPriceFeeType:'정률',
            orderPrice: '17500',
            basicDeliveryPrice: '2000',
            extraDeliveryPrice: '500',
            deliveryPrice: '20000',
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

  render() {

    const columns = [
        {
            title: "주문번호",
            dataIndex: "orderNum",
            className: "table-column-center",
            width:'5%',
        },
        {
            title: "주문날짜",
            dataIndex: "orderdata",
            className: "table-column-center",
            width:'10%',
        },
        {
            title: "도착지",
            dataIndex: "destAddr1",
            className: "table-column-center",
            width:'15%',
        },
        {
            title: "가맹점",
            dataIndex: "frName",
            className: "table-column-center",
            width:'10%',
        },
        {
            title: "가맹점 번호",
            dataIndex: "frPhone",
            className: "table-column-center",
            width:'10%',
        },       
        {
            title: "기사명",
            dataIndex: "riderName",
            className: "table-column-center",
            width:'8%',
        },
        {
            title: "기사 연락처",
            dataIndex: "riderPhone",
            className: "table-column-center",
            width:'10%',
        },    
        {
            title: "가격",
            dataIndex: "orderPrice",
            className: "table-column-center",
            width:'8%',
        },       
        {
            title: "기본배달요금",
            dataIndex: "basicDeliveryPrice",
            className: "table-column-center",
            width:'8%',
        },
        {
            title: "할증배달요금",
            dataIndex: "extraDeliveryPrice",
            className: "table-column-center",
            width:'8%',
        },
        {
            title: "총배달요금",
            dataIndex: "deliveryPrice",
            className: "table-column-center",
            width:'8%',
        },
    ];

    
    return (
        <div className="main-layout"> 

            <div className="top-menu">

                    <FormItem
                    name="surchargeDate"
                    >
                    <RangePicker
                        style={{width: 300,}}
                        placeholder={['시작일', '종료일']}
                        onChange={this.onChangeDate}
                    />
                    </FormItem>

                <div>
                    <Search
                    placeholder="가맹점 검색"
                    enterButton
                    allowClear
                    onChange={(e) => this.setState({ franchisee: e.target.value })}
                    onSearch={this.onSearchFranchisee}
                    style={{
                    width: 220,
                    marginLeft: 20,
                    }}
                />
                </div>   

                <div>                       
                    <Search
                        placeholder="기사명 검색"
                        enterButton
                        allowClear
                        onChange={(e) => this.setState({ rider: e.target.value })}
                        onSearch={this.onSearchRider}
                        style={{
                        width: 220,
                        marginLeft: 20,
                        }}
                    />
                </div>

                <div>                       
                    <Search
                        placeholder="전화번호 검색"
                        enterButton
                        allowClear
                        onChange={(e) => this.setState({ Phone: e.target.value })}
                        onSearch={this.onSearchPhone}
                        style={{
                        width: 220,
                        marginLeft: 20,
                        }}
                    />
                </div>

                <div>
                  <a href="/admin_bike_templete.xlsx" download>
                    <Button className="download-btn">
                        <img src={require("../../img/excel.png").default} alt="" />
                        엑셀 다운로드
                    </Button>
                  </a>
                </div>
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
                />
                </FormItem>
             </div>


        </div>
    )
  }
}


export default DeliveryList;
