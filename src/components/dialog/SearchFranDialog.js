import { Input, Table } from "antd";
import React, { Component } from "react";
import { httpGet, httpUrl } from '../../api/httpClient';
import '../../css/main.css';

const Search = Input.Search;
const today = new Date();

class SearchFranDialog extends Component {
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
      frName: "",
      branchName: "",
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.getList(true);
  }

  // 가맹점 검색
  onSearchFranchisee = (value) => {
    this.setState(
      {
        frName: value,
        pagination:{
          current: 1,
          pageSize: 5,
        }
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
    let frName = this.state.frName;
    let branchName = this.state.branchName;
    httpGet(httpUrl.franchiseList, [branchName, frName, pageNum, pageSize], {}).then((res) => {
      console.log(JSON.stringify(res, null, 4))
      const pagination = { ...this.state.pagination };
      pagination.current = res.data.currentPage;
      pagination.total = res.data.totalCount;
      this.setState({
        list: res.data.franchises,
        pagination: pagination,
      });
    });
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
        width: '30%',
      },
      {
        title: "가맹점명",
        dataIndex: "frName",
        className: "table-column-center",
        width: '70%',
        render: (data, row) =>
            <div
              style={{ cursor:'pointer' }}              
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
                  <div className="deposit-title">가맹점 조회</div>
                  <img
                  onClick={close}
                  src={require("../../img/close.png").default}
                  className="deposit-close" 
                  alt="닫기"
                  />
                </div>
                  <div className="deposit-inner">              
                    <Search
                      placeholder="가맹점명 검색"
                      className="searchRider-Input"
                      enterButton
                      allowClear
                      onSearch={this.onSearchFranchisee}
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

export default SearchFranDialog;
