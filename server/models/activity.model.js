import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define("activity", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    // Sequelize ไม่มี trim → ใช้ validate แทน
    validate: {
      notEmpty: true,
      notNull: true,
      is: /^\s*\S.*$/, // กันค่าเป็น string ว่างหรือ space ล้วน
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1, // 
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING, // 
    allowNull: false,
  },
  reg_open: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reg_close: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true, 
    },
  },
  status: {
    type: DataTypes.ENUM(
      "draft",
      "open",
      "closed",
      "in_progress",
      "completed"
    ),
    defaultValue: "draft",
    allowNull: false,
  },
});

export default Activity;
