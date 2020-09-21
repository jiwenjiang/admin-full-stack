const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const PORT = config.get("port") || 5000;

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo", require("./routes/todo"));

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

start();
