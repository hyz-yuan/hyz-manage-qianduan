import * as React from "react";
import {Table, Button, Popconfirm, Form,  Input,Select} from "antd/lib/index";
import {fetchPost} from "../../../utils/fetch";
import RightBodyHeaderBar from "../../../components/rightBodyHeaderBar";

import {useState} from "react";
import {useRef} from "react";
import {useContext} from "react";
import {useEffect} from "react";
const EditableContext = React.createContext();
export default class Technology extends React.Component{
    state={
        columns: [
            {
                title: '上级名称',
                dataIndex: 'pId',
                width: '30%',
                inputType:'select',
                editable: true,
            },
            {
                title: '技术名称',
                dataIndex: 'technologyName',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ],
        title:"技术管理",
        dataSource: [],
    };

    EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    EditableCell = ({
                        title,
                        editable,
                        children,
                        inputType,
                        dataIndex,
                        record,
                        handleSave,
                        ...restProps
                    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef();
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            const value =record[dataIndex];
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: value,
            });
        };

        const save = async e => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            const inputNode =inputType === 'select' ?
                <Select  style={{ width: 120 }} ref={inputRef} onChange={save}>    {this.options}    </Select>
                : <Input ref={inputRef} onBlur={save} />;
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };



    options=[];//下列列表选项
    componentDidMount() {
        this.loadData();
        this.options.push(<Select key='0'>第一级</Select>);
    }
    loadData(){
        let params={};
        this.requestProgress(global.constants.technologySelect,params);
    }


    requestProgress = (url,params) =>{
        fetchPost(url,params)
            .then(
                res => this.setData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    };


    setData = (list) => {
        let pname ={};
        this.options=[];
        this.options.push(<Select key='0'>第一级</Select>);

        list.map((item, index) => {
            pname[item.id]=item.technologyName;
            this.options.push(<Select key={item.id}>{item.technologyName}</Select>);
        });
        this.setState({
            dataSource: list.map((item, index) => {
                return {
                    ...item,
                    pId:item.pId===0?"第一级":pname[item.pId],
                    key: index

                }
            }),
        })
        //message.info("保存成功！")
    };
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        let params={
            id:dataSource[key].id,
        };
        this.requestProgress(global.constants.deleteTechnology,params);
    };

    handleAdd = () => {
        let params={
            pId:0,
        };
        this.requestProgress(global.constants.insertTechnology,params);
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
        let reg=/\d/; //正则表达式，测试是否只包含数字
        let params={
            id : row.id,
            technologyName:row.technologyName,
            pId:reg.test(row.pId)?row.pId:null, /// will cause error
        };
        this.requestProgress(global.constants.updateTechnology,params);
    };

    render() {
        const {dataSource} = this.state;
        const components = {
            body: {
                row: this.EditableRow,
                cell: this.EditableCell,
            },
        };
        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.inputType,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
                <div style={{width:'100%'}}>
                    <Button
                        onClick={this.handleAdd}
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        新增
                    </Button>
                    <Table
                        style={{ width: 500 }}
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        scroll={{ y: 425 }}
                    />
                </div>
        )
    }
}