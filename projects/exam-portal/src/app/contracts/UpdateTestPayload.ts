export interface UpdateTestPayload{
    id:number,
    name:string,
    description:string,
    startTime:Date,
    endTime:Date,
    duration:number,
    userName:string,
    questionBankId:number,
    totalMarks:number,
    totalQuestions:number,
    passMark:number,
    testLevel:string,
    isActive:boolean
}