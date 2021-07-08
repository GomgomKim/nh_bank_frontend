import React, { Component } from "react";
import { Form, Input, Table, Button, Radio } from "antd";
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import '../../css/main.css';

const Search = Input.Search;
const today = new Date();

class SearchRiderDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: today,
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 5,
      },

      dataIdxs: [],
      riderName: "",

    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.getList(true);
  }

  // 라이더 검색
  onSearchRiders = (value) => {
    this.setState(
      {
        riderName: value,
      },
      () => {
        this.getList();
      }
    );
  };

  handleTableChange = (pagination) => {
    console.log(pagination);
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

  getList = () => {
    let pageNum = this.state.pagination.current;
    let pageSize = this.state.pagination.pageSize;
    let riderName = this.state.riderName;
    httpGet(httpUrl.riderList, [riderName, pageNum, pageSize], {}).then((res) => {
      const pagination = { ...this.state.pagination };
      pagination.current = res.data.currentPage;
      pagination.total = res.data.totalCount;
      this.setState({
        list: res.data.riders,
        pagination: pagination,
      });
    });
  };

  onSubmit = () => {
    // console.log("click")
    if (this.props.callback) {
      this.props.callback(this.state.selectedRowKeys);
    }
    this.props.close();
  };

  onSelect = (data) => {
    // console.log(data)
    if (this.props.callback) {
        this.props.callback(data);
    }
    this.props.close()
}

  render() {
    const columns = [
      {
        title: "순번",
        dataIndex: "userIdx",
        className: "table-column-center",
      },
      {
        title: "라이더명",
        dataIndex: "riderName",
        className: "table-column-center",
        render: (data, row) =>
            <div              
              onClick={() => {
                if (this.props.onSelect) {
                  this.props.onSelect(row);
                }
                this.onSelect(row);
              }}
            >
              {data}
            </div>

      },
    ];

    const { close } = this.props;

    return (

          <React.Fragment>
            <div className="Dialog-overlay" onClick={close} />
            <div className="deposit-Dialog">
              <div className="deposit-content">
                  <div>
                    <div className="deposit-title">라이더 조회</div>
                    <img
                    onClick={close}
                    src={require("../../img/close.png").default}
                    className="deposit-close" 
                    alt="닫기"
                    />
                </div>

                <div className="deposit-inner">              
                    <Search
                      placeholder="라이더명 검색"
                      className="searchRider-Input"
                      enterButton
                      allowClear
                      onSearch={this.onSearchRiders}
                    />                        
                    <Table
                      className="searchRider-table"
                      rowKey={(record) => record.idx}
                      dataSource={this.state.list}
                      columns={columns}
                      pagination={this.state.pagination}
                      onChange={this.handleTableChange}
                    />
                </div>
              </div>
            </div>
          </React.Fragment>

    );
  }
}

export default SearchRiderDialog;
