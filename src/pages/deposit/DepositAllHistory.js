import React, { Component } from 'react'
import { httpGet, httpUrl } from '../../api/httpClient';
import { Table,DatePicker, Select,Button,Input } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import { formatDate } from '../../lib/util/dateUtil';
import SelectBox from '../../components/input/SelectBox';
import { categoryStatus } from '../../lib/util/codeUtil';
import '../../css/main.css';
import xlsx from 'xlsx';

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const Search = Input.Search;

class DepositAllHistory extends Component {


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
                pageSize: 500,
            },
            list: [],
            searchId: '',
            searchName: '',
            searchType: 1,
            category: "",
        };
    }

    componentDidMount() {
        this.getList();
        this.getExcelList();
    }

    getList = () => {
        let category = this.state.category;
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        let userId = this.state.searchId;
        // let userName = this.state.searchName;
        httpGet(httpUrl.depositAllList, [ category, pageNum, pageSize, userId ],{})
        .then((res) => {
          const pagination = { ...this.state.pagination };
          pagination.current = res.data.currentPage;
          pagination.total = res.data.totalCount;
        this.setState({
            list: res.data.ncash,
            pagination,
        });
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

    onSearch = (value) => {
        this.setState({
            searchId: value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
            this.getExcelList();
        })
    }

    getExcelList = () => {
        let category = this.state.category;
        let pageNum = this.state.paginationExcel.current;
        let pageSize = this.state.paginationExcel.pageSize;
        let userId = this.state.searchId;
        // let userName = this.state.searchName;
        httpGet(httpUrl.depositAllList, [ category, pageNum, pageSize, userId ],{})
        .then((res) => {
          const pagination = { ...this.state.pagination };
          pagination.current = res.data.currentPage;
          pagination.total = res.data.totalCount;
        this.setState({
            listExcel: res.data.ncash,
            pagination,
        });
        });
    }
    
      
    onChangeStatus = (value) => {
        this.setState({
            category: value === "NONE" ?  "" : value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
            this.getExcelList();
        })
    }

    onDownload = (data) => {
        // let col2=["지급금액"];
        // for(let i=0; i<=data.length-1; i++) {
        //   col2.push(comma(data[i].sendAmount))
        // };
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        [
          'idx',
          '아이디',
          '일시',
          'category',
          '카테고리',
          '금액',
          '관리자아이디'
        ].forEach((x, idx) => {
          const cellAdd = xlsx.utils.encode_cell({c:idx, r:0});
          ws[cellAdd].v = x;
        })

        // col2.forEach((x, idx) => {
        //     const cellAdd = xlsx.utils.encode_cell({c:2, r:idx});
        //     ws[cellAdd].v = x;
        //     ws[cellAdd].t = "string";
        // })

        ws['!cols'] = [];
        ws['!cols'][0] = { hidden: true };
        ws['!cols'][3] = { hidden: true };
        ws['!cols'][2] = { width: 20 };
        ws['!cols'][4] = { width: 22 };
        ws['!cols'][6] = { width: 12 };
        xlsx.utils.book_append_sheet(wb, ws, "sheet1");
        xlsx.writeFile(wb, "예치금내역.xlsx");
      }

    render() {

        const columns = [
            {
                title: "구분",
                dataIndex: "userType",
                className: "table-column-center",
                render: (data) => 
                <>
                    { data === 1 ? 
                        <div style={{color:'blue'}}>라이더</div> 
                        : <div style={{color:'red'}}>가맹점</div>}
                </>
            },
            {
                title: "아이디",
                dataIndex: "userId",
                className: "table-column-center",
            },
            {
                title: "이름",
                dataIndex: "userName",
                className: "table-column-center",
            },
            {
                title: "카테고리",
                dataIndex: "categoryKr",
                className: "table-column-center",
            },
            {
                title: "일시",
                dataIndex: "createDate",
                className: "table-column-center",
                render: (data) => <div>{formatDate(data)}</div>
            },
            {
                title: "금액",
                dataIndex: "ncashDelta",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "잔액",
                dataIndex: "ncash",
                className: "table-column-center",
                render: (data) => <div>{comma(data)}원</div>
            },
            {
                title: "관리자 아이디",
                dataIndex: "adminId",
                className: "table-column-center",
            },


        ];
        return (
            <>
                 <SelectBox
                    placeholder={'전체'}
                    style={{width:200, marginBottom: 20}}
                    value={categoryStatus[this.state.category]}
                    code={Object.keys(categoryStatus)}
                    codeString={categoryStatus}
                    onChange={(value) => {
                        if (parseInt(value) !== this.state.category) {
                            this.onChangeStatus(value);
                        }
                    }}
                    />
                <Search
                    placeholder="아이디,이름 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearch}
                    style={{
                        width: 220,
                        marginLeft: 10,
                        marginBottom: 20
                    }}
                />

                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={() => this.onDownload(this.state.listExcel)}>
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
        )
    }
}
export default DepositAllHistory;