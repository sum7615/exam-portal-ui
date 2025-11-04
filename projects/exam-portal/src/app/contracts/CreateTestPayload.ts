export interface CreateTestPayload {
    name :string,
    description :string,
    startTime:Date,
    endTime:Date,
    duration:number, 
    createdBy :string,
    questionBankId:number,
    totalMarks:number,
    totalQuestions:number,
    passMark:number, 
    testLevel :string
}