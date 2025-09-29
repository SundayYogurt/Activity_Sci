import api from "./api"
const API_URL = import.meta.env.VITE_ACTIVITIES_API

const createActivity = async(data) => {
return await api.post(API_URL + "/", data);
}

const updateActivity = async(id, data) => {
    return await api.put(`${API_URL}/${id}`, data)
}

const getAllActivities = async() => {
    return await api.get(API_URL + "/")
}

const deleteActivities = async(id) => {
    return await api.delete(`${API_URL}/${id}`)
}

const getActivityById = async(id) => {
    return await api.get(`${API_URL}/${id}`)
}

const ActivityService = {
    createActivity,
    updateActivity,
    getAllActivities,
    deleteActivities,
    getActivityById
}

export default ActivityService