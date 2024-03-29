// Connect to database
import connect from "../util/connect.js";
import config from "../config.js";

export default () => {
  connect(config.database.host, config.database.user, config.database.password, config.database.initDatabase, config.database.directConnection);
};
