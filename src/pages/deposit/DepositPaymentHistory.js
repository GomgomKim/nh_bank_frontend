import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { DownloadOutlined, RightCircleFilled } from '@ant-design/icons';
import { Table, Input, Button, DatePicker, Modal, Radio } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import DepositDialog from "../../components/dialog/DepositDialog";
import '../../css/main.css';
import xlsx from 'xlsx';


const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class DepositPaymentHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            depositDialogOpen: false, //예치금 지급
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            paginationExcel: {
                total: 0,
                current: 1,
                pageSize: 20000,
            },
            list: [],
            searchType: 1,
            searchText: "",
            hoBalance: 0,
            hoAccountNum: "",
            inputOpen: false,
        };
    }

    componentDidMount() {
        this.getInfo();
        // this.getAccountNum();
        this.getList();
        this.getExcelList();
    }

    openDepositDialogModal = () => {
        this.setState({ depositDialogOpen: true });
    };
    closeDepositDialogModal = () => {
        this.setState({ depositDialogOpen: false });
    };

    getList = () => {
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        let userId = this.state.searchText;
        let userType = this.state.searchType;
        httpGet(httpUrl.depositList, [pageNum, pageSize, userId, userType], {}).then((res) => {
        const pagination = { ...this.state.pagination };
        pagination.current = res.data.currentPage;
        pagination.total = res.data.totalCount;
        this.setState({
            list: res.data.payments,
            });
        });
    };

    // 본사 계좌, 잔액 정보
    getInfo = () => {
        httpGet(httpUrl.hoInfo, [], {}).then((res) => {
        this.setState({
            hoAccountNum: res.data.vaccountNumber,
            hoBalance: res.data.ncash
            });
        });
    };

    // 본사 잔액 정보
    // getBalance = () => {
    //     httpGet(httpUrl.hoBalance, [], {}).then((res) => {
    //     this.setState({
    //         hoBalance: res.data,
    //         });
    //     });
    // };

    getExcelList = () => {
        let pageNum = this.state.paginationExcel.current;
        let pageSize = this.state.paginationExcel.pageSize;
        let userId = this.state.searchText;
        let userType = this.state.searchType;
        httpGet(httpUrl.depositList, [pageNum, pageSize, userId, userType], {}).then((res) => {
        const pagination = { ...this.state.pagination };
        pagination.current = res.data.currentPage;
        pagination.total = res.data.totalCount;
        this.setState({
            listExcel: res.data.payments,
            pagination,
            });
        });
    };

    onChange = (e) => {
        this.setState({
            searchType: e.target.value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
            this.getExcelList();
        })
    }

    onSearch = (value) => {
        this.setState({
            searchText: value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
            this.getExcelList();
        })
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

      parseExcelJson = () => {
        let result = [
          {
            userId:"아이디",
            ncashDelta: "지급금액",
            createDate: "지급일시",
          },
        ];
        this.state.listExcel.forEach((item) => {
          result.push({
            userId:item.userId,
            ncashDelta: item.ncashDelta,
            createDate: item.createDate,
          });
        });
    
        return result;
      };

      onDownload = (data) => {
        const excelJson = this.parseExcelJson(data);
        const ws = xlsx.utils.json_to_sheet(excelJson, { skipHeader: true });
        const wb = xlsx.utils.book_new();


        ws['!cols'] = [];
        ws['!cols'][0] = { width: 15 };
        ws['!cols'][2] = { width: 20 };
        xlsx.utils.book_append_sheet(wb, ws, "sheet1");
        xlsx.writeFile(wb, "예치금지급.xlsx");
      }


      createDeposit = async (formData, i, failedIdx, failedId) => {
        console.log(`${i} start`);
        try {
          const res = await httpPost(httpUrl.depositSend, [], formData);
          if (res.result === "SUCCESS", res.data==="SUCCESS") {
          } else {
            failedIdx.push(i + 1);
            failedId.push(formData.id);
            console.log(failedIdx);
          }
        } catch (e) {
          failedIdx.push(i + 1);
          failedId.push(formData.userId);
          console.log(failedIdx);
          // throw e;
        }
        console.log(`${i} done`);
      };

      handleExcelRegist = async () => {
        if (this.state.data) {
          let failedIdx = [];
          let failedId = [];
          for (let i = 0; i < this.state.data.length; i++) {
            const data = this.state.data[i];
    
            const formData = {
              // // EXCEL 로 받는 데이터
              userId: data["아이디"],
              ncashAmount: data["지급금액(원)"],
            };
    
    
            console.log(formData);
    
            await this.createDeposit(formData, i, failedIdx, failedId);
          }
          if (failedIdx.length > 0) {
            Modal.info({
              title: `${failedIdx.length}개의 요청 실패`,
              content: `${failedIdx} 번째 지급이 실패했습니다. \n
            ${failedId}의 지급이 실패했습니다. `,
            });
          } else {
            Modal.info({
              title: "지급 성공",
              content: "모든 예치금이 지급되었습니다.",
            });
          }
        } else {
          Modal.info({
            title: "지급 오류",
            content: "엑셀파일을 등록해주세요.",
          });
        }
      };

      readExcel = (e) => {
        let self = this;
        let input = e.target;
        let reader = new FileReader();
        reader.onload = () => {
          let data = reader.result;
          let workBook = xlsx.read(data, { type: "binary" });
          var rows = xlsx.utils.sheet_to_json(
            workBook.Sheets[workBook.SheetNames[0]]
          );
          console.log(rows);
          self.setState({ data: rows });
        };
        reader.readAsBinaryString(input.files[0]);
      };

    render() {

        const columns = [
            {
                title: "아이디",
                dataIndex: "userId",
                className: "table-column-center",

            },
            {
                title: "지급금액",
                dataIndex: "ncashDelta",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "지급일시",
                dataIndex: "createDate",
                className: "table-column-center",

            },

        ];
        return (
            <>
                <Radio.Group defaultValue={1} onChange={this.onChange} style={{ marginTop: 5 }}>
                    <Radio value={1}>라이더</Radio>
                    <Radio value={2}>가맹점</Radio>
                </Radio.Group>


                <Search
                    placeholder="아이디 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearch}
                    style={{
                        width: 220,
                        marginBottom: 20
                    }}
                />


                {this.state.depositDialogOpen && (
                    <DepositDialog 
                        close={this.closeDepositDialogModal} 
                        getList={this.getList} 
                        balance={this.getInfo}/>
                )}
                <Button style={{ marginBottom: 20, marginLeft: 20 }} onClick={this.openDepositDialogModal}>
                    예치금 지급
                </Button>
                
                <div className="deposit-box">
                    <div className="box-title">
                        본사 잔액 : 
                    </div>
                    <div className="box-content">
                        {comma(this.state.hoBalance)} 
                        <div className="box-sub"> 원</div>
                    </div>
                </div>
                <div className="deposit-box">
                    <div className="box-title">
                        입금 가상계좌 : 
                    </div>
                    <div className="box-content">
                        {this.state.hoAccountNum}
                    </div>
                </div>

                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={() => {this.onDownload(this.state.listExcel)}}>
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>

                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} 
                    onClick={() => this.setState({ inputOpen: !this.state.inputOpen })}>
                    <img src={require("../../img/excel.png").default} alt="" />
                        엑셀 업로드
                </Button>

                <a href="/admin_deposit.xlsx" download>
                    <Button className="download-btn"
                        style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
                        <img src={require("../../img/excel.png").default} alt="" />
                            양식 다운로드
                    </Button>
                </a>

          {this.state.inputOpen && (
            <>
              <div
                className="depositPayment-wrapper"
                style={{ marginTop: "-15px", width:"413px" }}
              >
                <Input type="file" onChange={this.readExcel} />
                <Button
                  style={{ height: "40px" }}
                  onClick={() => this.handleExcelRegist()}
                >
                  등록
                </Button>
              </div>
            </>
          )}

                <Table
                    rowKey={(record) => record.idx}
                    rowClassName={(record) => (record.status === 'COMPLETE' ? "table-disabled" : "")}
                    dataSource={this.state.list}
                    columns={columns}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />

            </>
        )
    }
}
export default DepositPaymentHistory;