const db = require("./database");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

// Passport local initialisation, using IStrategyOptionsWithRequest
module.exports = function (passport) {
  passport.use(
    "quizzer-local",
    new LocalStrategy(
      { usernameField: "email" },
      (username, password, done) => {
        const query = `SELECT * FROM users WHERE username = ? AND active = 1 AND deleted_at IS NULL`;
        db.query(query, [username], function (err, data) {
          if (data.length <= 0) {
            // No account found
            console.log("notfound aaaa");
            return done(null, false);
          }
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) throw err;
            if (!result) {
              // Found, but incorrect password
              console.log("failedaaaaa");
              return done(null, false);
            } else {
              console.log("successaaaa", data[0]);
              return done(null, data[0]);
            }
          });
        });
      }
    )
  );

  passport.use(
    "admin-local",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (username, password, done) => {
        const query = `SELECT * FROM users WHERE username = ? AND active = 1 AND role = 1 AND deleted_at IS NULL`;
        db.query(query, [username], function (err, data) {
          if (data.length <= 0) {
            // No account found
            console.log("notfound aaaa admin");
            return done(null, false);
          }
          bcrypt.compare(password, data[0].password, (err, result) => {
            if (err) throw err;
            if (!result) {
              // Found, but incorrect password
              console.log("failedaaaaa admin");
              return done(null, false);
            } else {
              console.log("succes admin", data[0]);
              return done(null, data[0]);
            }
          });
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    process.nextTick(function () {
      if (user.role === 1) {
        done(null, {
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          strategy: "admin-local",
        });
      } else {
        done(null, {
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          strategy: "quizzer-local",
        });
      }
    });
  });

  passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
      done(null, user);
    });
  });
};
