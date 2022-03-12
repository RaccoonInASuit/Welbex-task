const { FILE_SERVER_PATH, FILE_ROUTE } = require("../constants");

const getFilePath = (filename) => {
  return `${FILE_SERVER_PATH}${FILE_ROUTE}/${filename}`;
};

module.exports = {getFilePath};
