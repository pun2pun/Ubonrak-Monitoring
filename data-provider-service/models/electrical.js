"use strict";
const e = require("express");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Electrical extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
    static async createElacticDataRow(electrical_data) {
      await Electrical.build({
        meterNumber: electrical_data.meterNumber,
        room: electrical_data.room,
        voltage: electrical_data.voltage,
        current: electrical_data.current,
        power: electrical_data.power,
      }).save();
    }
    static async getLastdataHistory(option) {
      const meterNumber = option.meterNumber;
      const lenght = option.lenght;

      if (meterNumber) {
        return Electrical.findAndCountAll({
          where: { meterNumber: meterNumber },
          limit: lenght,
          order: [["createdAt", "DESC"]],
        });
      } else {
        return Electrical.findAndCountAll({
          where: {},
          limit: lenght,
          order: [["createdAt", "DESC"]],
        });
      }
    }
  }
  Electrical.init(
    {
      meterNumber: DataTypes.INTEGER,
      room: DataTypes.STRING,
      voltage: DataTypes.FLOAT,
      current: DataTypes.FLOAT,
      power: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Electrical",
    }
  );
  return Electrical;
};
