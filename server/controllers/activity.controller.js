import Activity from "../models/activity.model.js";
const activityController = {}; // สร้าง object สำหรับ controller

activityController.create = async (req, res) => {
    try {
        const { name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status } = req.body
        if (!name || !description || !type || !level || !team_size || !date || !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email || !status) {         // ตรวจสอบข้อมูลครบหรือไม่
            res.status(400).send({ message: "Please provide all required fields!" });
            return;
        }

        await Activity.findOne({ where: { name } }).then((activity) => { // ตรวจสอบชื่อซ้ำ
            if (activity) {
                res.status(400).send({ message: "Activity is already exists!" });
            }

            const newActivity = {
                name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status
            }

            Activity.create(newActivity).then((data) => { // สร้าง activity
                res.send(data);
            }).catch((error) => {
                res.status(500).send({ message: error.message || "Something error while creating a activity" })
            })
        })
    } catch (error) {
        console.log("error while creating controller")
        res.status(500), error
    }
}

activityController.getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id);
        if (!activity) {
            res.status(404).send({ message: error.message || "No found Restaurant" + id })
        } else {
            res.send(data)
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "something error while getting activity by id" + id
        })
    }
}

activityController.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status } = req.body
        if (!name || !description || !type || !level || !team_size || !date || !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email || !status) {         // ตรวจสอบข้อมูลครบหรือไม่
            res.status(400).send({ message: "Please provide all required fields!" });
            return;
        }
        await Activity.update(req.body, { where: { id } }).then((result) => {
            if (result[0] === 1) {
                res.send({ message: "Activity was updated successfully." })
            } else {
                res.send({ message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!` })
            }
        }).catch((error) => {
            res.status(500).send({ message: "Error updating Activity with id=" + id } || error)
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "something error while updating activity by id" + id
        })
    }
}

activityController.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        await Activity.destroy({ where: { id } }).then((result) => {
            if (result === 1) {
                res.send({ message: "Activity was deleted successfully!" })
            } else {
                res.send({ message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!` })
            }
        }).catch((error) => {
            res.status(500).send({ message: "Could not delete Activity with id=" + id })
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "something error while deleting activity by id" + id
        })
    }
}

activityController.getAll = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.send(activities);
    } catch (error) {
        res.status(500).send({
            message: error.message || "something error while getting all activities"
        })
    }
}

activityController.searchActivities = async (req, res) => {
    try {
        const { name, type, level, status, dateFrom, dateTo } = req.query;
        const whereClause = {};
        if (name) whereClause.name = { [Op.like]: `%${name}%` };
        if (type) whereClause.type = type;
        if (level) whereClause.level = level;
        if (status) whereClause.status = status;
        if (dateFrom && dateTo) {
            whereClause.date = { [Op.between]: [new Date(dateFrom), new Date(dateTo)] };
        } else if (dateFrom) {
            whereClause.date = { [Op.gte]: new Date(dateFrom) };
        } else if (dateTo) {
            whereClause.date = { [Op.lte]: new Date(dateTo) };
        }
        const activities = await Activity.findAll({ where: whereClause });
        res.send(activities);
    } catch (error) {
        res.status(500).send({
            message: error.message || "something error while searching activities"
        })
    }
}

export default activityController;