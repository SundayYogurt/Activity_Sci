import sequelize from "./db.js"
import Sequelize from 'sequelize'

import User from "./user.model.js"
import Role from "./role.model.js"


const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize   

db.User = User;                         // เก็บ model user
db.Role = Role;                         // เก็บ model role

db.Role.belongsToMany(db.User, {
    through:"user_roles"                // ใช้ table กลางชื่อ user_roles
})


db.User.belongsToMany(db.Role, {
    through:"user_roles"
})

export default db