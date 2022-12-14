interface IOrderDataCenterQuery {
    dataType: string;
    selectedDate: Date;
    numOfLastDays: number;
}

interface IOrderDataCenterResponse {
    data: Array<IOrderDataResponse>;
    charts: IChartResponse;
    fromDate: Date;
    toDate: Date;
}

interface IChartResponse {
    name: string;
    data: Array<IDataChartResponse>;
}

interface IDataChartResponse {
    name: string;
    value: number;
}

interface IOrderDataResponse {
    name: string;
    info: string;
    value: string;
    icon:string;
}

export type {
    IOrderDataCenterResponse,
    IOrderDataCenterQuery,
    IOrderDataResponse,
    IDataChartResponse,
    IChartResponse,
};
