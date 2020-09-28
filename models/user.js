const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: Types.ObjectId, ref: "todo" }],
  posts: [{ type: Types.ObjectId, ref: "post" }],
});

module.exports = model("user", schema);
