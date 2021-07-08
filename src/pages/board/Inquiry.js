import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Modal, Tooltip } from 'antd'
import { reactLocalStorage } from "reactjs-localstorage";
import {
  formatDate,
  numberFormat,
  startDateFormat,
  endDateFormat
} from "../../lib/util/dateUtil";
import SelectBox from "../../components/input/SelectBox";
import { customAlert, customError, updateError } from "../../api/Modals";


const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class Inquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      list: [],
      completeVisible: false,
      memoVisible: false,
      selectedRow: 0
    };
  }

  componentDidMount() {
    this.getList();
  }

  handleTableChange = (pagination) => {
    console.log(pagination)
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize
    this.setState({
      pagination: pager,
    }, () => this.getList());
  };

  getList = () => {
    let pageNum = this.state.pagination.current;
    let pageSize = this.state.pagination.pageSize;
    httpGet(httpUrl.inquiryList, [pageNum, pageSize], {}).then((res) => {
      const pagination = { ...this.state.pagination };
      pagination.current = res.data.currentPage;
      pagination.total = res.data.totalCount;
      this.setState({
        list: res.data.inquirys,
        pagination,
      });
    });
  }

  expandedRowRender = (record) => {
    return (
      <div style={{ paddingLeft: '100px' }}>
        <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top' }}>
          <div style={{ color: 'blue' }}>[문의내용]</div>
          {record.content && record.content.split(',').map(row => {
            return (
              <div>{row}</div>
            )
          }
          )}
        </div>
        <div style={{ display: 'inline-block', width: '40%', verticalAlign: 'top' }}>
          <div style={{ color: 'blue' }}>[메모]</div>
          {record.memo && record.memo.split('\n').map(row => {
            return (
              <div>{row}</div>
            )
          }
          )}
        </div>
      </div>
    )
  }

  onComplete = (row) => {
    let self = this;
    Modal.confirm({
        title:"문의 완료",
        content:"해당 문의를 완료하시겠습니까?",
        okText:"확인",
        cancelText:"취소",
        onOk() {
          httpPost(httpUrl.updateInquiry,[],{
            idx : row.idx,
            status : 1
          })
          .then((result)=>{
            if(result.result === "SUCCESS" && result.data === "SUCCESS"){
                customAlert("완료", "해당 문의를 완료합니다.")      
              }
                else updateError()
                self.getList();
        })
        .catch((error) => {
            customError("완료오류", "에러가 발생하였습니다. 다시 시도해주세요.") 
          });
        }
    });
  }
  render() {
    const categoryString = {
      FRAN: '가맹점문의',
      RIDE: '라이더문의',
      TAX: '전문가 세무문의',
      LAW: '전문가 법률문의',
      EXP: '전문가 기타문의',
    }
    const statusString = {
      0 : '신규',
      1 : '처리완료',
    }
    const columns = [
      {
        title: "번호",
        dataIndex: "idx",
        className: "table-column-center",
      },
      {
        title: "종류",
        dataIndex: "category",
        className: "table-column-center",
        render: (data, row) => <div>{categoryString[data]}</div>
      },
      {
        title: "이름",
        dataIndex: "name",
        className: "table-column-center",
      },
      {
        title: "내용",
        dataIndex: "content",
        className: "table-column-text",
        render: (data, row) => <div>{data && data.length > 10 ? data.substr(0, 10) + '...' : data}</div>
      },
      {
        title: "연락처",
        dataIndex: "phone",
        className: "table-column-center",
      },
      {
        title: "등록일",
        dataIndex: "createDate",
        className: "table-column-center",
        render: (data) => <div>{formatDate(data)}</div>
      },
      {
        title: "상태",
        dataIndex: "status",
        className: "table-column-center",
        render: (data, row) => <div>{statusString[data]}</div>
      },
      {
        title: "메모",
        dataIndex: "memo",
        className: "table-column-center",
        render: (data, row) =>
          <div onClick={(e) => {
            e.stopPropagation();
            this.setState({ memoVisible: true, selectedRow: row })
          }}>
            {data ? (data.length > 10 ? data.substr(0, 10) + '...' : data) : '-'}
          </div>
      },
      {
        title: "완료처리",
        dataIndex: "idx",
        className: "table-column-center",
        render: (data, row) => {
          if (row.status != 0) return (<></>);
          return (
            <Button onClick={(e) => {
              e.stopPropagation();
              this.onComplete(row);
            }}>
              완료하기
            </Button>
          )
        }
      },
    ];
    return (
      <>
        <Table
          rowKey={(record) => record.idx}
          rowClassName={(record) => (record.status === 1 ? "table-disabled" : "")}
          dataSource={this.state.list}
          columns={columns}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          expandedRowRender={this.expandedRowRender}
          expandRowByClick={true}
        />
        {/* <InquiryMemoModal
          visible={this.state.memoVisible}
          data={this.state.selectedRow}
          close={() => { this.setState({ memoVisible: false }) }}
          reload={this.getList} />
        <InquiryCompleteModal
          visible={this.state.completeVisible}
          data={this.state.selectedRow}
          close={() => { this.setState({ completeVisible: false }) }}
          reload={this.getList} /> */}
      </>
    )
  }
}
export default Inquiry;