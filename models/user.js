const { genderEnum, userTypeEnum, familyEnum } = require("../const");
const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  realName: { type: String, maxlength: 12, trim: true },
  gender: {
    type: Number,
    maxlength: 12,
    enum: [genderEnum.MALE, genderEnum.FEMALE, genderEnum.OTHER],
  },
  age: { type: Number, max: 140, min: 0 },
  birth: { type: Date },
  phone: { type: Number, match: /^1[0-9]{10}$/ },
  type: {
    type: Number,
    enum: [
      userTypeEnum.PATIENT,
      userTypeEnum.DOCTOR,
      userTypeEnum.FAMILY,
      userTypeEnum.OTHER,
    ],
  },
  doctors: [{ type: Types.ObjectId, ref: "doctor" }],
  family: [
    {
      name: String,
      phone: Number,
      relation: { type: Number, enum: Object.values(familyEnum) },
    },
  ],
});

module.exports = model("user", schema);
