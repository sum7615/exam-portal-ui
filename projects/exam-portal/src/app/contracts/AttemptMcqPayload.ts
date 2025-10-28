export interface AttemptMcqPayload{
    userName:string,
    questionId:number,
    testId:number,
    ans:string,
    timeTakenInSeconds:number
}