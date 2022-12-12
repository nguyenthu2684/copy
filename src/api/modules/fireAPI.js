import axiosClient from '../index'

const fireAPI = {
    getDashboard: () => {
        const url = '/api/DashboardFires/Get'
        return axiosClient.post(url)
    },
    getHistory: () => {
        const url = '/api/DashboardFires/GetHistoryFire'
        return axiosClient.post(url)
    },
    getStatusColors: (body) => {
        const url = '/api/DashboardFires/GetFireWarningStatus'
        return axiosClient.post(url, body)
    },
    getRoomByID: (body) => {
        const url = '/api/DashboardFires/GetDetails'
        return axiosClient.post(url, body)
    },
    getReportTotal: (body) => {
        const url = '/api/ReportFires/Get'
        return axiosClient.post(url, body)
    },
    //category
    fireLocationGet: (body = null) => {
        const url = '/api/FireLocations/Get'
        return axiosClient.post(url, body)
    },
    fireLocationActive: (body = null) => {
        const url = '/api/FireLocations/GetActive'
        return axiosClient.post(url, body)
    },
    fireLocationByID: (body = null) => {
        const url = '/api/FireLocations/GetById'
        return axiosClient.post(url, body)
    },
    fireLocationChangeStatus: (body = null) => {
        const url = '/api/FireLocations/ChangeStatus'
        return axiosClient.post(url, body)
    },
    fireLocationRemove: (body = null) => {
        const url = '/api/FireLocations/Delete'
        return axiosClient.post(url, body)
    },

    //station
    fireStationGet: (body = null) => {
        const url = '/api/FireStations/Get'
        return axiosClient.post(url, body)
    },
    fireStationByID: (body = null) => {
        const url = '/api/FireStations/GetById'
        return axiosClient.post(url, body)
    },
    fireStationGetActive: (body = null) => {
        const url = '/api/FireStations/GetActive'
        return axiosClient.post(url, body)
    },
    fireStationChangeStatus: (body = null) => {
        const url = '/api/FireStations/ChangeStatus'
        return axiosClient.post(url, body)
    },
    otherStatusChangeStatus: (body = null) => {
        const url = '/api/FireStations/ChangeTest'
        return axiosClient.post(url, body)
    },
    nodeStatusChangeStatus: (body = null) => {
        const url = '/api/FireNodes/ChangeStatus'
        return axiosClient.post(url, body)
    },
    fireStationRemove: (body = null) => {
        const url = '/api/FireStations/Delete'
        return axiosClient.post(url, body)
    },

    //node
    nodeByID: (body = null) => {
        const url = '/api/FireNodes/GetById'
        return axiosClient.post(url, body)
    },
    nodeStatusChangeStatus: (body = null) => {
        const url = '/api/FireNodes/ChangeStatus'
        return axiosClient.post(url, body)
    },
    nodeRemove: (body = null) => {
        const url = '/api/FireNodes/Delete'
        return axiosClient.post(url, body)
    },
    getNodesByID: (body = null) => {
        const url = '/api/FireNodes/Get'
        return axiosClient.post(url, body)
    },
    getExportList: (body = null) => {
        const url = '/api/FireStations/GetListExport'
        return axiosClient.post(url, body)
    },

    //location detail
    fireLocationDetailGet: (body = null) => {
        const url = '/api/FireLocationDetails/Get'
        return axiosClient.post(url, body)
    },
    fireLocationDetailGetActive: (body = null) => {
        const url = '/api/FireLocationDetails/GetActive'
        return axiosClient.post(url, body)
    },
    fireLocationDetailByID: (body = null) => {
        const url = '/api/FireLocationDetails/GetById'
        return axiosClient.post(url, body)
    },
    fireLocationDetailChangeStatus: (body = null) => {
        const url = '/api/FireLocationDetails/ChangeStatus'
        return axiosClient.post(url, body)
    },
    fireLocationDetailDelete: (body = null) => {
        const url = '/api/FireLocationDetails/Delete'
        return axiosClient.post(url, body)
    },
}

export default fireAPI