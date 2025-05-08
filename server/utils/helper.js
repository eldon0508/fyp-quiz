const bcrypt = require("bcrypt");
const saltRounds = 12;

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

module.exports = { hashPassword };
