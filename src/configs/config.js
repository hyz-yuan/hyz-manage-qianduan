// const serverUrl = "http://123.162.181.106:48080/test"
const serverUrl = "http://localhost:9080/test"
//const serverUrl = "http://localhost:8080/manage_war/"
global.constants = {
    // create by ljh ---begin
    projectListByMid: serverUrl + '/project/getProjectByManagerId',
    progressList: serverUrl + '/progress/getProgressList',
    addProgress: serverUrl + '/progress/addProgressList',
    updateProgress: serverUrl + '/progress/updateProgressList',
    deleteProgress: serverUrl + '/progress/deleteProgressList',
    projectDetail: serverUrl + '/porject/projectDetail',
    technologySelect: serverUrl + '/technology/selectTechnology',
    updateTechnology: serverUrl + '/technology/updateTechnology',
    insertTechnology: serverUrl + '/technology/insertNewTechnology',
    deleteTechnology: serverUrl + '/technology/deleteNewTechnology',

    WorkPlaceSelect: serverUrl + '/workPlace/selectWorkPlace',
    updateWorkPlace: serverUrl + '/workPlace/updateWorkPlace',
    insertWorkPlace: serverUrl + '/workPlace/insertWorkPlace',
    deleteWorkPlace: serverUrl + '/workPlace/deleteWorkPlace',

    rightsList: serverUrl + '/manage1/setRight',
    // create by ljh ---end

    //gsl用到的后端接口
    projectList: serverUrl + '/project2/projectList',
    addProject: serverUrl + '/project1/addProject',
    deleteProject: serverUrl + '/project1/deleteProject',
    changeProject: serverUrl + '/project1/changeProject',
    getProject: serverUrl + '/project1/getProject',
    workPlaceList: serverUrl + '/workPlace/list',
    managerList: serverUrl+'/user/manager',
    //wjb
    getProjectEmployeeRoleList: serverUrl + '/project/getProjectEmployeeRoleList',
    getProjectReportList: serverUrl + '/projectReport/getProjectReportList',
    insertReport: serverUrl + '/projectReport/insertProjectReportList',
    downloadFile: serverUrl + '/upload/downloadFileEx',
    uploadFile: serverUrl + '/upload/uploadReport',
    //dzh
    login: serverUrl + '/web/login',
    sendCode: serverUrl + '/web/sendCode',
    codeMaching: serverUrl + '/web/codeMaching',
    logout: serverUrl + '/web/logout',
    getRole:serverUrl+'/manage1/selectRightByRole',
    setPerson:serverUrl+'/project1/setPerson',
    //hyz
    organizationChart: serverUrl + '/teamStructure/getTeamStructure',
    //yxy
    register: serverUrl + '/web/register',
    //dzw
    projectDetailSingle: serverUrl + '/project1/getProjectDetail',
    //ln
    setRightList: serverUrl + '/manage1/setRight',
    insertRight: serverUrl + '/manage1/insertNewRight',
    deleteRight: serverUrl + '/manage1/deleteRight',
    updateRight: serverUrl + '/manage1/updateRight',

    setRoleList: serverUrl + '/manage1/Role',
    insertRole: serverUrl + '/manage1/insertNewRole',
    deleteRole: serverUrl + '/manage1/deleteRole',
    updateRole: serverUrl + '/manage1/updateRole',

    getEmployee: serverUrl + '/manage1/getEmployee',
    searchEmployee: serverUrl + '/manage1/search',
    deleteUser: serverUrl + '/manage1/deleteUser',
    updateUser: serverUrl + '/manage1/updateUser',
    changePassword: serverUrl + '/manage1/changePassword',
    selectItem: serverUrl + '/manage1/selectItem',
    //刘宁用到的工作地点和技术领域接口
    selectWorkPlace: serverUrl + '/workPlace/selectWorkPlace',
    selectTechnology: serverUrl + '/technology/selectTechnology',
    //xjs
    deleteGroup:serverUrl + '/project/deleteGroup',
    addGroup:serverUrl + '/project/addGroup',
    getGroupList:serverUrl + '/project/getGroupUser',
    getPersonList:serverUrl + '/project1/getPersonList',
    getGroupUser:serverUrl + '/project/getGroupUsers',
    getGroupPerson:serverUrl + '/project/getGroupPerson',
    //yxy
    insertUser:serverUrl + '/web/register',
    selectUsername:serverUrl + '/web/selectusername',
    mapData:[{
        point:"118.585946,37.455028",
        operationMode:"个体",
        businessState:1,
    },{
        point:"118.58876,37.450492",
        operationMode:"个体",
        businessState:1,
    },{
        point:"118.588014,37.454726",
        operationMode:"个体",
        businessState:2,
    },{
        point:"118.582586,37.451807",
        operationMode:"个体",
        businessState:2,
    },{
        point:"118.578983,37.457228",
        operationMode:"个体",
        businessState:3,
    },{
        point:"118.580073,37.454062",
        operationMode:"个体",
        businessState:3,
    },{
        point:"118.587993,37.45437",
        operationMode:"公司",
        businessState:1,
    },{
        point:"118.587501,37.455171",
        operationMode:"公司",
        businessState:1,
    },{
        point:"118.587901,37.454177",
        operationMode:"公司",
        businessState:2,
    },{
        point:"118.588424,37.453998",
        operationMode:"公司",
        businessState:2,
    },{
        point:"118.588424,37.453998",
        operationMode:"公司",
        businessState:3,
    },{
        point:"118.588781,37.454026",
        operationMode:"公司",
        businessState:3,
    },{
        point:"118.587185,37.455172",
        operationMode:"合作社",
        businessState:1,
    },{
        point:"118.587783,37.454717",
        operationMode:"合作社",
        businessState:1,
    },{
        point:"118.587194,37.455157",
        operationMode:"合作社",
        businessState:2,
    },{
        point:"118.587392,37.455154",
        operationMode:"合作社",
        businessState:2,
    },{
        point:"118.587963,37.454438",
        operationMode:"合作社",
        businessState:3,
    },{
        point:"118.587553,37.455207",
        operationMode:"合作社",
        businessState:3,
    },{
        point:"118.587779,37.454762",
        operationMode:"其他",
        businessState:1,
    },{
        point:"118.586743,37.455806",
        operationMode:"其他",
        businessState:1,
    },{
        point:"118.587774,37.454889",
        operationMode:"其他",
        businessState:2,
    },{
        point:"118.586742,37.455792",
        operationMode:"其他",
        businessState:2,
    },{
        point:"118.586405,37.455167",
        operationMode:"其他",
        businessState:3,
    },{
        point:"118.585937,37.455025",
        operationMode:"其他",
        businessState:3,
    },]
};




