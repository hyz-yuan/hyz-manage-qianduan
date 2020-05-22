import React, {Component} from 'react';
import RightBodyHeaderBar from "../../../components/rightBodyHeaderBar";
import {fetchPost} from "../../../utils/fetch";
import TimeLine from "react-gantt-timeline";
import './index.css'
/*import ReportDetails from "../../wjb/taskList/ReportDetails";*/
import {Modal} from "antd";
import {createHashHistory} from "history";

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "项目详情",
            projectInfo: {},
            projectTitle: "",
            gantData: [],
            manager: "",
            groupList: [],
            requestLoading: true,
            group: [],
            queryTerms:[],
            isVisible:false
        };
    }

    componentDidMount() {
        this.getProjectDetail();
    }

    getProjectDetail = () => {
        let url = this.props.location.search; //获取url中"?"符后的字串
        console.log("url:" + url);
        let id = 1;
        if (url.indexOf("?") !== -1) {
            //得到从下标1开始的字符串（0起始）
            let str = url.substr(1);
            console.log("str:" + str);
            id = parseInt(str.split("=")[1]);
        }else {
            createHashHistory().push('/sys/project/list');
        }
        let param = {id: id};
        fetchPost(global.constants.projectDetailSingle, param)
            .then(
                res => {
                    this.setData(res);
                }
            )
            .catch(
                e => console.log(e)
            )
            .finally(() =>
                this.setState({
                    requestLoading: false
                })
            );
    };

    setData = (res) => {
        let group = [];
        //获取所有组id
        res.groupList.map((item) => {
            if (group.indexOf(item.groupId) === -1) {
                group.push(item.groupId);
            }
        });

        this.setState({
            gantData: res.progressList.map((item, index) => {
                return {
                    id: index,
                    start: item.beginTime,
                    end: item.endTime,
                    name: item.progressName,
                    color: "blue",
                }
            }),
            projectInfo: res.projectInfo,
            projectTitle: "——" + res.projectInfo.projectName,
            manager: res.projectInfo.managerName,
            groupList: res.groupList,
            group: group
        })
    };

    /**
     *
     * @param flag 查看类型，0/1/2对应按项目/按小组/按成员
     * @param projectId
     * @param groupId
     * @param employeeId
     */
    jumpToReport = (flag, projectId, groupId, employeeId) => {
        console.log("flag:" + flag);
        console.log("projectId:" + projectId);
        console.log("groupId:" + groupId);
        console.log("employeeId:" + employeeId);
        let t={projectId:projectId,groupId:groupId,userId:employeeId}
        this.setState({isVisible:true,queryTerms:t})
    };

    render() {
        const {title, gantData,  projectTitle, manager, groupList, group} = this.state;

        //划分组
        let groupNew = [];
        group.map((item) => {
            console.log(item);
            let groupById = [];
            groupList.map((item1) => {
                if (item1.groupId === item) {
                    groupById.push(item1);
                }
            });
            groupNew.push(groupById);
        });
        console.log(groupNew);

        return (
            <div style={{ height: '100%' }}>
                <RightBodyHeaderBar title={title + projectTitle}/>
                <div className="projectBody" style={{margin: 15, marginBottom: 80}}>
                    <TimeLine mode="year" data={gantData}/>
                    <table className="table" style={{tableLayout: "auto", marginTop: 40}}>
                        <tbody>
                        <td rowSpan={groupList.length + 1}>
                            {manager}
                        </td>
                        {groupNew.map((item, value) => (
                            <div key={value}>
                                <th colSpan="5">{item[0].groupName}
                                </th>
                                <tr>
                                    <th>姓名</th>
                                    <th>类型</th>
                                    <th>工作内容</th>
                                    <th>最近更新</th>
                                    <th>详细</th>
                                </tr>
                                {item.map((item1, value1) => {
                                    return (
                                        <tr key={value1}>
                                            <td>
                                                <a onClick={() => this.jumpToReport(2, item1.projectId,
                                                    item1.groupId, item1.userId)}>{item1.realName}</a>
                                            </td>
                                            <td>{item1.userType === 0 ? "组长" : "组员"}</td>
                                            <td>{item1.content}</td>
                                            <td>{item1.reportDate === null ? "" : item1.reportDate.substring(0, 10)}</td>
                                            <td>{item1.reportContent}</td>
                                        </tr>
                                    )
                                })}
                            </div>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    title={"工作详情"}
                    visible={this.state.isVisible}
                    width={1000}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            isVisible:false,
                            queryTerms:''
                        })
                    }}
                >
                    {/*<ReportDetails btnv={"none"}
                                   queryTerms={this.state.queryTerms||{}}
                    />*/}
                </Modal>
            </div>
        );
    };
}
