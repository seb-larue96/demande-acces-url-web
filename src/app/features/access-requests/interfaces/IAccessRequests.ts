export interface AccessRequestRequest {
    url: string;
    reasonToRequest: string;
}

export interface AccessRequestResponse {
    id: number;
    requestNumber: string; 
    url: string;
    requester: string;
    reasonToRequest: string;
    reasonToReject?: string;
    requestStatus: string;
}