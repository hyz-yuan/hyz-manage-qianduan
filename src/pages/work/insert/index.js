import React,{Component} from 'react';
import {Col,Row,Select,Input,Upload,Button,message} from 'antd';




const { Option } = Select;
const { TextArea } = Input;

export default class Insert extends Component{

    constructor(props){
        super(props);
        this.state = {
            userId:this.props.conditions.userId,
            projectName:this.props.conditions.projectName
        }
    }

    changeInput=(value,option)=>{
        let data=this.props.insertData;
        data[option]=value;
        this.props.dispatchData(data);
    };
    handleFile = (info) => {


        let fileList = [...info.fileList];

        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
        }
        this.changeInput(fileList,'document');
    };


    render() {

        const {projectName} = this.state;

        return(
            <div>

                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'32px'}}>项目名称</Col>
                    <Col> <Input style={{width:200}} value={projectName} disabled/></Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'32px'}}>汇报类型<span style={{color:'#FF3300'}}>*</span></Col>
                    <Col> <Select style={{width:200}}   onChange={(value)=>this.changeInput(value,'type')}>
                        <Option value={'日报'}>日报</Option>
                        <Option value={'周报'}>周报</Option>
                    </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'73px'}}>工作进展<span style={{color:'#FF3300'}}>*</span></Col>
                    <Col span={20}><TextArea style={{height:73}}  onChange={(e)=>this.changeInput(e.target.value,'content')}/></Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={3} style={{lineHeight:'41px'}}>附件上传</Col>
                    <Col span={20}>
                        <Upload

                            name='file'
                            action={global.constants.uploadFile}
                            onChange={this.handleFile}

                            //   fileList={formData.propagandaEnclosure}>

                        >
                            <Button>
                                选择上传文件
                            </Button>
                        </Upload>
                    </Col>
                </Row>

            </div>
        )

    }
}
