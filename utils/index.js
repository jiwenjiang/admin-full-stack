const queryObj = (arr, body) => {
  let query = {};
  arr.forEach((v) => {
    if (![null, undefined, ""].includes(body[v])) {
      query[v] = body[v];
    }
  });
  return query;
};

module.exports = { queryObj };
