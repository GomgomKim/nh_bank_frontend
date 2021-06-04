import React, { Component, useState, useCallback } from 'react'
import { httpGet, httpUrl, httpDownload, httpPost, httpPut } from '../../api/httpClient';
import { Table, Input, Button, DatePicker, Space } from 'antd'
import { comma } from "../../lib/util/numberUtil";
import ModifyFranDialog from "../../components/dialog/ModifyFranDialog";
import FranFeeDialog from "../../components/dialog/FranFeeDialog";
import ChargeDialog from "../../components/dialog/ChargeDialog";
import '../../css/main.css';



const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class FranchiseList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            franFeeDialog: false, //가맹비내역
            modifyFranDialog: false, //수정
            chargeDialog: false, //충전내역
            pagination: {
                total: 0,
                current: 1,
                pageSize: 10,
            },
            list: [],
        };
    }

    componentDidMount() {
        this.getList();
    }

    setDate = (date) => {
        console.log(date)
    }


    // 수정 dialog
    openModifyFranDialogModal = () => {
        this.setState({ modifyFranDialogOpen: true });
    };
    closeModifyFranDialogModal = () => {
        this.setState({ modifyFranDialogOpen: false });
    };
    //가맹비내역 dialog
    openFranFeeDialogModal = () => {
        this.setState({ franFeeDialogOpen: true });
    };
    closeFranFeeDialogModal = () => {
        this.setState({ franFeeDialogOpen: false });
    };
    //충전내역 dialog
    openChargeDialogModal = () => {
        this.setState({ chargeDialogOpen: true });
    };
    closeChargeDialogModal = () => {
        this.setState({ chargeDialogOpen: false });
    };


    getList = () => {
        var list = [
            {
                franIdx: '냠냠박스 1지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                van: '12343453463',
                pgInfo: '사용',
                pgPercent: '100%',
            },
            {
                franIdx: '냠냠박스 2지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                van: '12343453463',
                pgInfo: '사용',
                pgPercent: '0%',
            },
            {
                franIdx: '냠냠박스 3지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                van: '12343453463',
                pgInfo: '사용',
                pgPercent: '100%',
            },
            {
                franIdx: '냠냠박스 4지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                van: '12343453463',
                pgInfo: '사용',
                pgPercent: '0%',
            },
            {
                franIdx: '냠냠박스 5지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                van: '12343453463',
                pgInfo: '사용',
                pgPercent: '0%',
            },
            {
                franIdx: '냠냠박스 6지점',
                franNum: '02-222-3333',
                franAddr: '서울시 논현동 111-22, 3층',
                van: '12343453463',
                pgInfo: '사용',
                pgPercent: '0%',
            },
        ];

        this.setState({
            list: list,
        });
    }


    render() {

        const columns = [


            {
                title: "가맹점명",
                dataIndex: "franIdx",
                className: "table-column-center",

            },
            {
                title: "가맹점번호",
                dataIndex: "franNum",
                className: "table-column-center",

            },
            {
                title: "가맹점주소",
                dataIndex: "franAddr",
                className: "table-column-center",

            },
            {
                title: "VAN",
                dataIndex: "van",
                className: "table-column-center",

            },
            {
                title: "PG정보",
                dataIndex: "pgInfo",
                className: "table-column-center",

            },
            {
                title: "PG사용비율",
                dataIndex: "pgPercent",
                className: "table-column-center",

            },
            {
                title: "수정",
                dataIndex: "update",
                className: "table-column-center",
                render: (data, row) => (

                    <Button onClick={this.openModifyFranDialogModal}>
                        수정
                    </Button>

                )

            },
            {
                title: "가맹비내역",
                dataIndex: "franFeeList",
                className: "table-column-center",
                render: (data, row) => (

                    <Button onClick={this.openFranFeeDialogModal}>
                        가맹비내역
                    </Button>

                )

            },
            {
                title: "충전내역",
                dataIndex: "chargeList",
                className: "table-column-center",
                render: (data, row) => (

                    <Button onClick={this.openChargeDialogModal}>
                        충전내역
                    </Button>

                )

            },



        ];
        return (
            <>

                <Search
                    placeholder="가맹점 검색"
                    enterButton
                    allowClear
                    onSearch={this.onSearch}
                    style={{
                        width: 220,
                    }}
                />
                <Button className="download-btn"
                    style={{ float: 'right', marginLeft: 10, marginBottom: 20 }} onClick={{}}>
                    <img src={require("../../img/excel.png").default} alt="" />
                    엑셀 다운로드
                </Button>

                {this.state.modifyFranDialogOpen &&
                    <ModifyFranDialog
                        close={this.closeModifyFranDialogModal}
                    />
                }

                {this.state.franFeeDialogOpen &&
                    <FranFeeDialog
                        close={this.closeFranFeeDialogModal}
                    />
                }
                {this.state.chargeDialogOpen &&
                    <ChargeDialog
                        close={this.closeChargeDialogModal}
                    />
                }

                <Table
                    rowKey={(record) => record.idx}
                    rowClassName={(record) => (record.status === 'COMPLETE' ? "table-disabled" : "")}
                    dataSource={this.state.list}
                    columns={columns}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    expandedRowRender={this.expandedRowRender}
                    expandRowByClick={true}
                />

            </>
        )
    }
}
export default FranchiseList;