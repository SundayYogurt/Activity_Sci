import sequelize from "./db.js"
import Sequelize from 'sequelize'

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize   

export default db