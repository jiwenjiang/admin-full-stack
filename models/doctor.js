import { doctorEnum } from "../const";
const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  userId: { type: Schema.Types, ref: "user" },
  hospital: { type: String },
  disease: { type: String },
  type: {
    type: Number,
    enum: Object.values(doctorEnum),
  },
  profile: { type: String },
});

module.exports = model("doctor", schema);
