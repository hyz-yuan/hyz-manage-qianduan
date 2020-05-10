import React, { Component } from 'react'
import {fetchPost} from "../../../utils/fetch";
import ReactEcharts from 'echarts-for-react'

export default class OrganizationChart extends Component{
    state = {
        treeData : []
    };
    componentDidMount() {
        this.fetchData();
    }
    fetchData =()=>{
        let params={}
        fetchPost(global.constants.organizationChart, params)
            .then(
                res => this.setTeamStructureData(res),
            )
            .catch(e => console.log(e))
            .finally(() => {

                this.setState({
                    requestLoading: false
                })
            });
    }
    setTeamStructureData =(list)=>{
        this.setState({
            treeData: list
        })
    }

    onChange = value => {
        console.log(value);
        this.setState({ value });
    };
    changeData = (list) =>{
        list.forEach((item)=>{

        })
    }
    render(){
        let treeData =   this.state.treeData
        let option =  {
            tooltip: {
                // show：'true',//默认：true；是否显示提示框组件，包括提示框浮层和 axisPointer。
                trigger: 'item',//默认：item；触发类型。item：数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
                triggerOn: 'mousemove'
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,
            series:[
                {
                    name:'树形图',
                    type:'tree',
                    orient: 'vertical',  // vertical horizontal
                    rootLocation: {x: '50%', y: '15%'}, // 根节点位置  {x: 'center',y: 10}
                    nodePadding: 20,
                    layerPadding:40,
                    symbol: 'roundRect',
                    symbolSize: [80, 45],//窗口大小
                    initialTreeDepth : -1 ,//展开层数0根节点，-1，null都展开
                    roam : "true" , //如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                    //节点类型
                    itemStyle: {
                        borderColor:'black',
                        normal: {
                            color: '#fff',//节点背景色
                            label: {
                                show: true,
                                position: 'inside',
                                textStyle: {
                                    color: 'black',
                                    fontWeight: "bolder",//设置文字粗细
                                    fontSize: 12,
                                    //fontWeight:  'bolder'
                                }
                            },
                        },
                    },
                    lineStyle: {
                        color: '#000',
                        width: 1,
                        curveness : 0,//曲度
                        type: 'solid' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                    },
                    emphasis: {
                        label: {
                            show: "true"
                        }
                    },
                    data: [treeData]
                }]
        }

        return(
            <div>{console.log(treeData)}
                <ReactEcharts  option={option} style={{height:'800px',width:'90%'}}/>
            </div>
        )
    }

}

