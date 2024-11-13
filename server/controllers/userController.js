const db = require("../database");

// const store = async (req, res) => {
//   db.beginTransaction();

//   try {
//     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//       var d = new Date(),
//         dt = d.toISOString().replace("T", " ").substring(0, 19),
//         q2 = {
//           password: hash,
//           first_name: req.body.first_name,
//           last_name: req.body.last_name,
//           dob: req.body.dob,
//           created_at: dt,
//           updated_at: dt,
//         };

//       var query = `INSERT users SET ?`;
//       db.query(query, q2);
//       db.commit();
//       return res.json({ success: true });
//     });
//   } catch (error) {
//     console.log(error);
//     db.rollback();
//     return res.status(500);
//   }
// };

const update = async (req, res) => {
  db.beginTransaction();

  try {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      var d = new Date(),
        dt = d.toISOString().replace("T", " ").substring(0, 19),
        q2 = {
          password: hash,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          dob: req.body.dob,
          updated_at: dt,
        };

      var query = `UPDATE users SET ? WHERE id = ${req.params.id}`;
      db.query(query, q2);
      db.commit();
      return res.json({ success: true });
    });
  } catch (error) {
    console.log(error);
    db.rollback();
    return res.status(500);
  }
};

module.exports = { update };
