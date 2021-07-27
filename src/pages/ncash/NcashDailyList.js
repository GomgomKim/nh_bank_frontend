import { Input, DatePicker, Table, Button } from "antd";
import React, { Component } from "react";
import SelectBox from '../../components/input/SelectBox';
import { httpGet, httpUrl } from "../../api/httpClient";
import { kindStatus } from '../../lib/util/codeUtil';
import { comma } from "../../lib/util/numberUtil";
import xlsx from "xlsx";

const Search =Input.Search;
const RangePicker =DatePicker.RangePicker;

class NcashDailyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            paginationExcel: {
                total: 0,
                current: 1,
                pageSize: 50000,
            },
            list: [],
            kind: 1,
        }
    }

    componentDidMount() {
        this.getList();
        this.getExcelList();
    }

    // getList = () => {
    //     var list = [
    //         {
    //             date: "2021-06-12",
    //             kind: 1,
    //             riderId: "rider03",
    //             riderName: "rider03",
    //             registrationNumber: "930507-1000000",
    //             riderPhone: "010-1111-2222",
    //             ncashDelta: 50000
    //         },
    //         {
    //             date: "2021-06-23",
    //             kind: 2,
    //             riderId: "rider04",
    //             riderName: "rider04",
    //             registrationNumber: "950721-2000000",
    //             riderPhone: "010-1212-3333",
    //             ncashDelta: 30000
    //         },
    //         {
    //             date: "2021-07-15",
    //             kind: 3,
    //             riderId: "rider06",
    //             riderName: "rider06",
    //             registrationNumber: "941108-1000000",
    //             riderPhone: "010-2121-1111",
    //             ncashDelta: 20000
    //         }
    //     ]
    //     this.setState({
    //         list:list,
    //     })
    // }

    getList = () => {
        const pagination = this.state.pagination;
        httpGet(
          httpUrl.ncashDailyList,
          [
            this.state.kind,
            pagination.current,
            pagination.pageSize,
          ],
          {}
        ).then((res) => {
          if (res.result === "SUCCESS") {
            this.setState({
              list: res.data.ncashDailies,
              pagination: {
                ...this.state.pagination,
                current: res.data.currentPage,
                total: res.data.totalCount,
              },
            });
          }
        });
      };

    getExcelList = () => {
        const pagination = this.state.paginationExcel;
        httpGet(
          httpUrl.ncashDailyList,
          [
            this.state.kind,
            pagination.current,
            pagination.pageSize,
          ],
          {}
        ).then((res) => {
          if (res.result === "SUCCESS") {
            this.setState({
              listExcel: res.data.ncashDailies,
              pagination: {
                ...this.state.pagination,
                current: res.data.currentPage,
                total: res.data.totalCount,
              },
            });
          }
        });
      };

      parseExcelJson = () => {
        let result = [
          {
            createDate: "일시",
            kind: "구분",
            userId: "라이더아이디",
            userName: "라이더명",
            registrationNumber: "주민번호",
            phone: "연락처",
            ncashDelta: "차감금액",
          },
        ];
        this.state.listExcel.forEach((item) => {
          result.push({
            createDate: item.createDate,
            kind: kindStatus[item.kind],
            userId: item.userId,
            userName: item.userName,
            registrationNumber: item.registrationNumber,
            phone: item.phone,
            ncashDelta: item.ncashDelta,
          });
        });
    
        return result;
      };

      onDownload = (data) => {
          
          const excelJson = this.parseExcelJson(data);
          const ws = xlsx.utils.json_to_sheet(excelJson, { skipHeader: true });
          const wb = xlsx.utils.book_new();

          ws["!cols"] = [];
          ws["!cols"][0] = { width: 20 };
          ws["!cols"][2] = { width: 15 };
          ws["!cols"][3] = { width: 15 };
          ws["!cols"][4] = { width: 20 };
          ws["!cols"][5] = { width: 20 };
        xlsx.utils.book_append_sheet(wb, ws, "sheet1");
        xlsx.writeFile(wb, "배달목록.xlsx");
      };

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
          () => 
          {
            this.getList();
          }
        );
      };

      onChangeStatus = (value) => {
        this.setState({
            kind: value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
            this.getExcelList();
        })
    }

    render() {
        const columns = [
            {
                title: "일시",
                dataIndex: "createDate",
                className: "table-column-center"
            },
            {
                title: "구분",
                dataIndex: "kind",
                className: "table-column-center",
                render: (data) => <div>{kindStatus[data]}</div>
                
            },
            {
                title: "라이더아이디",
                dataIndex: "userId",
                className: "table-column-center"
            },
            {
                title: "라이더이름",
                dataIndex: "userName",
                className: "table-column-center"
            },
            {
                title: "주민번호",
                dataIndex: "registrationNumber",
                className: "table-column-center"
            },
            {
                title: "연락처",
                dataIndex: "phone",
                className: "table-column-center"
            },
            {
                title: "차감금액",
                dataIndex: "ncashDelta",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
        ];

        return (
        <>
            <SelectBox
                // placeholder={'전체'}
                style={{width:200, marginBottom: 20}}
                value={kindStatus[this.state.kind]}
                code={Object.keys(kindStatus)}
                codeString={kindStatus}
                onChange={(value) => {
                    if (parseInt(value) !== this.state.kind) {
                        this.onChangeStatus(value);
                    }
                }}
            />
            <Button
                className="download-btn"
                style={{ float: "right", marginLeft: 10, marginBottom: 20 }}
                onClick={() => this.onDownload(this.state.listExcel)}
            >
            <img src={require("../../img/excel.png").default} alt="" />
                엑셀 다운로드
            </Button>
            <Table
                rowKey={(record) => record.idx}
                dataSource={this.state.list}
                columns={columns}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
            />
        </>
        );
    }
}
export default NcashDailyList;