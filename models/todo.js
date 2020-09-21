const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  user: { type: Types.ObjectId, ref: "user" },
});

module.exports = model("todo", schema);
