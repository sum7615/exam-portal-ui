export interface UpdateQuestionPayload{
    id:number,
    title:string,
    problemStatement:string,
    problemStatementImg:string|null,
    o1:string,
    o2:string,
    o3:string,
    o4:string,
    o5:string|null,
    mark:number,
    type:string,
    userName:string,
    questionBankId:number,
    ans:string,
    level:string
}