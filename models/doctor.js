const { doctorEnum } = require("../const");
const { Schema, model } = require("mongoose");
const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  hospital: { type: String },
  disease: { type: String },
  type: {
    type: Number,
    enum: Object.values(doctorEnum),
  },
  profile: { type: String },
});

module.exports = model("doctor", schema);
