
export type MolluskScannedDetails = {
    mollusk_name: string,
    scientific_name: string
    description: string,
    status: string

    percentage?: string 
}


export type REPORT_DETAILS = {
    longitude: number
    latitude: number
    city: string
    province: string
    district: string
    mollusk_type: string
    user_id: number,
    reported_at: string
}


export type ReportedCasesTypes = {
    report_id: number
    longitude: number,
    latitude: number,
    city: string,
    province: string,
    district: string,
    reportedAt: string
    mollusk_type: string
    
    user_id: number
    status: string

    reporter_address: string
    reporter_name: string

}


export type RegionType = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}


export type Location = {
    latitude: number,
    longitude: number,
}