export interface FetchQuestion{
    id:number,
    title:string,
    problemStatement:string,
    problemStatementImg:string|null,
    o1:string,
    o2:string,
    o3:string,
    o4:string,
    o5:string|null,
    ans:string,
    mark:number,
    level:string,
    type:string
}