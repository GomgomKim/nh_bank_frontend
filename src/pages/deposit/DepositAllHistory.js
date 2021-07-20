import React, { Component } from 'react'
import { httpGet, httpUrl } from '../../api/httpClient';
import { Table,DatePicker, Select } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import { formatDate } from '../../lib/util/dateUtil';
import SelectBox from '../../components/input/SelectBox';
import { categoryStatus } from '../../lib/util/codeUtil';
import '../../css/main.css';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

class DepositAllHistory extends Component {


    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            // userId: "",
            list: [],
            searchType: 1,
            category: ""
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        let category = this.state.category;
        let pageNum = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        httpGet(httpUrl.depositAllList, [ category, pageNum, pageSize ],{})
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
      
    onChangeStatus = (value) => {
        this.setState({
            category: value === "NONE" ?  "" : value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, ()=>{
            this.getList();
        })
    }

    render() {

        const columns = [
            {
                title: "아이디",
                dataIndex: "userId",
                className: "table-column-center",
            },
            {
                title: "카테고리",
                dataIndex: "categoryKr",
                className: "table-column-center",
            },
            // {
            //     title: "카테고리",
            //     dataIndex: "category",
            //     className: "table-column-center",
            //     render: (data) => <div>{categoryStatus[data]}</div>
            // },
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
                title: "관리자 아이디",
                dataIndex: "adminId",
                className: "table-column-center",
            },


        ];
        return (
            <>
                <div style={{marginBottom: 10}}>
                 <SelectBox
                    placeholder={'전체'}
                    style={{width:200}}
                    value={categoryStatus[this.state.category]}
                    code={Object.keys(categoryStatus)}
                    codeString={categoryStatus}
                    onChange={(value) => {
                        if (parseInt(value) !== this.state.category) {
                            this.onChangeStatus(value);
                        }
                    }}
                    />
                </div>

                {/* <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={() => this.onDownload(this.state.list)}>
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button> */}
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