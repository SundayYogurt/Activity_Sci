import Activity from "../models/activity.model";
const activityController = {}; // สร้าง object สำหรับ controller

activityController.addTeam = async (req, res) => {
    const {name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status} = req.body
    if (!name ||!description || !type ||!level || !team_size || !date || !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email || !status) {         // ตรวจสอบข้อมูลครบหรือไม่
        res.status(400).send({ message: "Name, Type or ImageUrl can't be empty!" });
        return;
    }

    await Activity.findOne({ where: { name } }).then((activity) => { // ตรวจสอบชื่อซ้ำ
        if (activity) {
            res.status(400).send({ message: "Activity already exists!" });
        }
        const newActivity = {
            name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status
        }

        Activity.create(newActivity).then((data) => { // สร้างร้านอาหารใหม่
            res.send(data);
        }).catch((error) => {
            res.status(500).send({ message: error.message || "Something error while creating a activity" })
        })
    })
};

activityController.addJudge = async (req, res) => {
    const {name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status} = req.body
}