export interface AddQuestionPayload{
    questionBankId:number,
    mark:number,
    title:string,
    problemStatement:string,
    problemStatementimg:string|null,
    o1:string,
    o2:string,
    o3:string,
    o4:string,
    o5:string|null,
    ans:string,
    type:string,
    createdBy:string,
    level:string
}