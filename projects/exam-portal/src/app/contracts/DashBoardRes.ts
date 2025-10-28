export interface DashBoadRes{
    upcoming:UpcomingTest[],
    past:PastTest[]

}

export interface UpcomingTest{
    id:number
    title:string,
    description:string,
    startTime:string,
    endTime:string,
    totalMark:number,
    passMark:number,
    duration:number,
    status:string
}

export interface PastTest{
    id:number,
    title:string,
    description:string,
    startTime:string,
    endTime:string,
    totalMark:number,
    passMark:number,
    duration:number,
    attemptStartTime:string,
    attemptEndTime:string,
    obtainedMark:number,
    attemptedDuration:number,
    totalQsnAttempted:number,
    status:string

}