const { genderEnum, userTypeEnum, familyEnum } = require("../const");
const { Schema, model, Types } = require("mongoose");
const { timeOps } = require("../const/schemaOps");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = new Schema(
  {
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
    phone: { type: String, match: /^1[0-9]{10}$/ },
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
        phone: String,
        relation: { type: Number, enum: Object.values(familyEnum) },
      },
    ],
  },
  timeOps
);

schema.plugin(mongoosePaginate);

module.exports = model("user", schema);
