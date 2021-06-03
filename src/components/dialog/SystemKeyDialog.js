import React, { Component } from "react";
import {
    Form, Input, Table, Button, Select, Radio, Checkbox
} from "antd";
import { comma } from "../../lib/util/numberUtil";
import '../../css/main.css';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;

class SystemKeyDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 1,
            },
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        // this.getList()
    }


    render() {




        const { close, data } = this.props;

        return (
            <React.Fragment>
                <div className="Dialog-overlay" onClick={close} />
                <div className="systemKey-Dialog">

                    <div className="systemKey-content">

                        <div className="systemKey-title">
                            메뉴권한설정
                        </div>
                        <img onClick={close} src={require('../../img/close.png').default} className="dialog-close" alt="img" />
                        <div className="systemKey-inner">
                            <div className="contentBlock">





                            </div>

                            <div className="contentBlock">
                                <div className="contentBlock-inner">


                                </div>
                            </div>
                            <Button style={{ float: 'right', marginTop: 10 }} onClick={{}}>
                                설정하기
                            </Button>
                        </div>
                    </div>

                </div>
            </React.Fragment >

        )
    }
}

export default SystemKeyDialog;