export interface ViewTestRes{
    id:number,
    name:string,
    description:string,
    assignedAt:Date,
    startTime:Date,
    endTime:Date,
    duration:number,
    totalMark:number,
    totalQuestions:number,
    passMark:number,
    isStarted:boolean
}