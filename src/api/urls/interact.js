/* system-cms-prefix start */
const prefix = '/cmsmanager'
/* system-cms-prefix change const prefix = '/cmsadmin' system-cms-prefix change */
/* system-cms-prefix end */

export default {
  // 评论管理列表
  interactUsercommentList: `${prefix}/usercomment/page`,
  // 修改审核状态
  interactUsercommentStatus: `${prefix}/usercomment/status`,
  // 回复信息
  interactUsercommentReply: `${prefix}/usercomment/reply`,
  // 删除评论
  interactUsercomment: `${prefix}/usercomment`,
  // 新增禁止
  interactUsercommentPlusStop: `${prefix}/usercomment/plus/stop`,
  // 取消禁止
  interactUsercommentCancelStop: `${prefix}/usercomment/cancel/stop`,
  // 推荐编辑
  interactUsercommentTop: `${prefix}/usercomment/top`,
  // 查看列表数量
  interactUsercommentCount: `${prefix}/usercomment/count`,
  // 特定条件分页列表
  interactUsercommentSpecific: `${prefix}/usercomment/specific/page`,
  // 黑名单列表
  sysblacklistPage: `${prefix}/sysblacklist/page`,
  // 删除单个黑名单
  sysblacklist: `${prefix}/sysblacklist`,

  // 举报列表
  usercommentReportPage: `${prefix}/usercomment/report/page`,
  // 清除举报状态
  usercommentReport: `${prefix}/usercomment/report`,

  // 采集 ////////////////////////////////////////////////////
  // 获取栏目和APPID
  collectGetId: `${prefix}/collect/getId`,
  collectConsume: `${prefix}/collect/consume`,
  collectConsumeByIds: `${prefix}/collect/consumeByIds`,

  // 友情链接////////////////////////////////////////////////////////
  // 链接类别表格
  linkTypesPage: `${prefix}/linkTypes/page`,
  // 链接类别增删改查
  linkTypes: `${prefix}/linkTypes`,
  // 链接类别检查类别名是否唯一
  linkTypesTypeName: `${prefix}/linkTypes/typeName/unique`,
  // 友情链接列表
  linkTsPage: `${prefix}/links/page`,
  // 友情链接增删改查
  links: `${prefix}/links`,
  // 友情链接启用
  linksEnable: `${prefix}/links/enable`,
  // 友情链接取消启用
  linksunEnable: `${prefix}/links/unEnable`,
  // 友情链接列表选择列表
  linkTypesList: `${prefix}/linkTypes/list`,
  // 友情链接列表选择列表
  linksMove: `${prefix}/links/move`,
  // 友情链接拖动
  linksSort: `${prefix}/links/sort`,
  // 友情链接分类拖动
  linksTypesSort: `${prefix}/linkTypes/sort`,
  // 投票调查-分页列表
  questionnairePage: `${prefix}/questionnaire/page`,
  // 投票调查-增删
  questionnaire: `${prefix}/questionnaire`,
  // 投票调查-提交审核
  questionnaireSubmit: `${prefix}/questionnaire/submit`,
  // 投票调查-审核通过
  questionnaireReviewOk: `${prefix}/questionnaire/review/ok`,
  // 投票调查-审核不通过
  questionnaireReviewFail: `${prefix}/questionnaire/review/fail`,
  // 投票调查-发布
  questionnaireRelease: `${prefix}/questionnaire/release`,
  // 投票调查-暂停
  questionnairePause: `${prefix}/questionnaire/pause`,
  // 投票调查-预览
  questionnairePreview: `${prefix}/questionnaire/preview`,
  // 投票调查-撤回
  questionnaireWithdraw: `${prefix}/questionnaire/withdraw`,
  // 投票调查-复制
  questionnaireCopy: `${prefix}/questionnaire/copy`,
  // 投票调查-问卷链接
  questionnaireLink: `${prefix}/questionnaire/link`,
  // 投票调查-下载二维码
  questionnaireQrcode: `${prefix}/questionnaire/qrcode`,
  // 投票调查-待办列表
  taskQuestionnaireToDeal: `${prefix}/task/questionnaire/toDeal`,
  // 投票调查-审核
  taskQuestionnaireAudit: `${prefix}/task/questionnaire/audit`,
  // 投票调查-已办列表
  taskQuestionnaireHandle: `${prefix}/task/questionnaire/handle`,
  // 投票调查-逾期未办
  taskQuestionnaireOverDue: `${prefix}/task/questionnaire/overDue`,
  // 投票调查-撤回(有工作流)
  taskQuestionnaireRevoke: `${prefix}/task/questionnaire/revoke`,
  // 投票调查-判断是否配置工作流
  questionnaireWorkflow: `${prefix}/questionnaire/workflow`,
  // 投票调查-统计-按用户
  questionnaireAnswerPage: `${prefix}/questionnaireAnswer/page`,
  // 投票调查-统计-按用户-删除
  questionnaireAnswer: `${prefix}/questionnaireAnswer`,
  // 投票调查-统计-按用户-有效
  questionnaireAnswerValid: `${prefix}/questionnaireAnswer/valid`,
  // 投票调查-统计-按用户-无效
  questionnaireAnswerInvalid: `${prefix}/questionnaireAnswer/invalid`,
  // 投票调查-统计-按用户-导出
  questionnaireAnswerExport: `${prefix}/questionnaireAnswer/export`,
  // 投票调查-统计-按题目-导出
  questionnaireAnswerSubjectExport: `${prefix}/questionnaireAnswer/subject/export`,
  // 投票调查-统计-问卷统计
  questionnaireFind: `${prefix}/questionnaire/find`,
  // 投票调查-统计-按题目分页列表
  questionnaireAnswerSubjectPage: `${prefix}/questionnaireAnswer/subject/page`,
  // 投票调查-统计-题目分类-饼图
  questionnaireFindSubjectPieChart: `${prefix}/questionnaireAnswer/subject/pieChart`,
  // 投票调查-统计-按题目列表（左侧）
  questionnaireAnswerSubjectList: `${prefix}/questionnaireAnswer/subject/list`,
  // 投票调查-统计-设备分析-饼图
  questionnaireAnswerChartDevice: `${prefix}/questionnaireAnswer/chart/device`,
  // 投票调查-统计-来源分析-地图
  questionnaireAnswerChartMap: `${prefix}/questionnaireAnswer/chart/map`,
  // 投票调查-统计-趋势分析-折线图
  questionnaireAnswerChartTrend: `${prefix}/questionnaireAnswer/chart/trend`,
  // 投票调查-图片列表
  questionnairePic: `${prefix}/questionnaire/pic`,
  // 智能表单-类型列表
  smartFormTypeList: `${prefix}/formType/list`,
  // 智能表单-新建类型列表
  smartFormType: `${prefix}/formType`,
  // 智能表单-检测分组名称是否可用
  smartFormTypeUnique: `${prefix}/formType/unique`,
  // 智能表单-表单列表
  smartSmartFormGetPage: `${prefix}/smartForm/getPage`,
  // 智能表单-图片列表
  smartionnairePic: `${prefix}/resourceSpaceDatas/pic`,
  // 智能表单-表单列表
  smartFormDataList: `${prefix}/smartFormData/getPage`,
  // 智能表单-统计-图表
  smartFormGraph: `${prefix}/smartForm/statistic/groupByField/`,
  // 智能表单-统计-导出
  smartFormDataExport: `${prefix}/smartFormData/export`,
  // 智能表单-统计-item详情
  smartFormDataDetail: `${prefix}/smartFormData`,
  // 智能表单-表单详情
  smartFormDetail: `${prefix}/smartForm`,
  // 智能表单-表单新增，删除，详情
  smartForm: `${prefix}/smartForm`,
  // 智能表单-表单分组保存
  simpleUpdate: `${prefix}/smartForm/simpleUpdate`,
  // 智能表单-表单重名验证
  smartFormUnique: `${prefix}/smartForm/unique`,
  // 智能表单-表单发布
  smartFormPublish: `${prefix}/smartForm/publish`,
  // 智能表单-自定义表单编辑字段
  smartFormUpdateFields: `${prefix}/smartForm/updateFields`,
  // 智能表单-数据列表-复制表单
  smartFormCopy: `${prefix}/smartForm/copy`,
  // 智能表单-数据列表-清空表单数据
  smartFormClearData: `${prefix}/smartForm/clearData`,
  // 智能表单-统计-设备统计
  smartFormStatisticDevice: `${prefix}/smartForm/statistic/device`,
  // 智能表单-统计-地区统计
  smartFormStatisticProvince: `${prefix}/smartForm/statistic/province`,
  // 智能表单-统计-趋势统计
  smartFormStatisticTrend: `${prefix}/smartForm/statistic/trend`,
  /** Mailbox 领导信箱 */
  // 待办信件数量
  letterTaskToDealCount: `${prefix}/letter/task/toDealCount`,
  // 获取表单分页列表
  mailboxFormGetPage: `${prefix}/form/getPage`,
  // 表单详情/新增、修改、删除
  mailboxForm: `${prefix}/form`,
  // 表单复制
  mailboxFormCopy: `${prefix}/form/copy`,
  // 表单名称检验
  mailboxFormUnique: `${prefix}/form/unique`,
  // 表单字段设置
  mailboxFormUpdateFields: `${prefix}/form/updateFields`,
  // 表单字段修改（标题描述、分组）
  mailboxFormSimpleUpdate: `${prefix}/form/simpleUpdate`,
  // 信件类型列表
  mailboxLetterTypeGetPage: `${prefix}/letterType/getPage`,
  // 信件类型详情、保存、修改、删除
  mailboxLetterType: `${prefix}/letterType`,
  // 信件类型名称验证
  mailboxLetterTypeUnique: `${prefix}/letterType/unique`,
  // 信件类型排序
  mailboxLetterTypeSort: `${prefix}/letterType/sort`,
  // 信箱类型列表
  mailboxLetterBoxTypeList: `${prefix}/letterBoxType/list`,
  // 信箱类型名称检查是否可用
  mailboxLetterBoxTypeUnique: `${prefix}/letterBoxType/unique`,
  // 信箱类型详情/新增、修改、删除
  mailboxLetterBoxType: `${prefix}/letterBoxType`,
  // 信箱类型排序
  mailboxLetterBoxTypeSort: `${prefix}/letterBoxType/sort`,
  // 信箱分页
  mailboxLetterBoxGetPage: `${prefix}/letterBox/getPage`,
  // 用户可管理信箱列表
  mailboxLetterBoxGetMyboxs: `${prefix}/letterBox/getMyboxs`,
  // 信箱详情、保存、修改、删除
  mailboxLetterBox: `${prefix}/letterBox`,
  // 检查信箱名称是否可用
  mailboxLetterBoxUnique: `${prefix}/letterBox/unique`,
  // 信箱排序
  mailboxLetterBoxSort: `${prefix}/letterBox/sort`,
  // 信件分页
  mailboxLetterPage: `${prefix}/letter/page`,
  // 信件删除至回收站
  mailboxLetterRecycle: `${prefix}/letter/recycle`,
  // 信件回复
  mailboxLetterReply: `${prefix}/letter/reply`,
  // 信件转发
  mailboxLetterForward: `${prefix}/letter/forward`,
  // 信件详情-日志分页
  mailboxLetterLogGetPage: `${prefix}/letterLog/getPage`,
  // 回收站还原信件
  mailboxLetterReduce: `${prefix}/letter/reduce`,
  // 彻底删除信件
  mailboxLetterDelete: `${prefix}/letter/delete`,
  // 清空回收站
  mailboxLetterClearAll: `${prefix}/letter/clearAll`,
  // 选登
  mailboxLetterOpen: `${prefix}/letter/open`,
  // 取消选登
  mailboxLetterClose: `${prefix}/letter/close`,
  // 待处理信件分页
  mailboxLetterTaskToDeal: `${prefix}/letter/task/toDeal`,
  // 审核信件
  mailboxLetterTaskToAudit: `${prefix}/letter/task/audit`,
  // 撤回审核
  mailboxLetterTaskToRevoke: `${prefix}/letter/task/revoke`,
  // 已处理信件分页
  mailboxLetterTaskToHandle: `${prefix}/letter/task/handle`,
  // 逾期未办内容
  mailboxLetterTaskToOverDue: `${prefix}/letter/task/overDue`,
  // 撤销办理状态
  mailboxLetterTaskToRevokeReply: `${prefix}/letter/revokeReply`,
  // 信件数据-查询详情
  mailboxLetter: `${prefix}/letter`,
  // 信件概览统计
  mailboxLetterStatisticSurvey: `${prefix}/letter/statistic/survey`,
  // 获取第一封信件年份
  mailboxLetterGetFirstLetterYear: `${prefix}/letter/getFirstLetterYear`,
  // 获取信件第一封信件到现在年份列表
  mailboxLetterGetFirstYear: `${prefix}/letter/getYears`,
  // 信件汇总（按信箱统计）
  mailboxLetterStatisticByBox: `${prefix}/letter/statistic/byBox`,
  // 统计数量-省份
  mailboxLetterStatisticCountByProvince: `${prefix}/letter/statistic/countByProvince`,
  // 工作量统计
  mailboxLetterStatisticGetReplyStatic: `${prefix}/letter/statistic/getReplyStatic`
}
