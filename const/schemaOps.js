const timeOps = {
  versionKey: false,
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  toJSON: {
    transform: function (doc, ret, options) {
      ret.createdAt = ret.createdAt.valueOf();
      ret.updatedAt = ret.updatedAt.valueOf();
      return ret;
    },
  },
};
module.exports = { timeOps };
