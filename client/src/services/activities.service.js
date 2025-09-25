import api from "./api"
const API_URL = import.meta.env.VITE_ACTIVITIES_API

const createActivity = async(data) => {
return await api.post(API_URL + "/", data);
}

const updateActivity = async(data) => {
    return await api.put(API_URL + "/", data)
}

const getAllActivities = async() => {
    return await api.get(API_URL + "/")
}

const deleteActivities = async(data) => {
    return await api.delete(API_URL + "/", data)
}

const ActivityService = {
    createActivity,
    updateActivity,
    getAllActivities,
    deleteActivities
}

export default ActivityService