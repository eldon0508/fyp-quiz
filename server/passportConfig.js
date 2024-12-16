const db = require("./database");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

// Passport local initialisation, using IStrategyOptionsWithRequest
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (username, password, done) => {
        const query = `SELECT * FROM users WHERE username = ? AND deleted_at IS NULL`;
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

  passport.serializeUser(function (user, done) {
    process.nextTick(function () {
      done(null, {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      });
    });
  });

  passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
      done(null, user);
    });
  });
};
