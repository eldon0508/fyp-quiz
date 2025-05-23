const db = require("./database");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

// Passport local initialisation, using IStrategyOptionsWithRequest
module.exports = async function (passport) {
  await passport.use(
    "quizzer-local",
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (username, password, done) => {
      const searchQuery = "SELECT * FROM users WHERE username = $1 AND active = $2 AND deleted_at IS NULL";
      const data = await db.query(searchQuery, [username, true]);

      if (data.length <= 0) {
        return done(null, false);
      }
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (err) throw err;
        if (!result) {
          // Found, but incorrect password
          console.log("Quizzer wrong password");
          return done(null, false);
        } else {
          console.log("Quizzer login");
          return done(null, data[0]);
        }
      });
    })
  );

  await passport.use(
    "admin-local",
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (username, password, done) => {
      const searchQuery =
        "SELECT * FROM users WHERE username = $1 AND role = $2 AND active = $3 AND deleted_at IS NULL";
      const data = await db.query(searchQuery, [username, 1, true]);

      if (data.length <= 0) {
        return done(null, false);
      }
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (err) throw err;
        if (!result) {
          // Found, but incorrect password
          console.log("Admin wrong password");
          return done(null, false);
        } else {
          console.log("Admin login");
          return done(null, data[0]);
        }
      });
    })
  );

  await passport.serializeUser(async function (user, done) {
    process.nextTick(function () {
      done(null, {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        strategy: user.role === 1 ? "admin-local" : "quizzer-local",
      });
    });
  });

  await passport.deserializeUser(async function (user, done) {
    process.nextTick(function () {
      done(null, user);
    });
  });
};
