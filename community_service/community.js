const { Client } = require("pg");

const clientConfig = {
  user: "ramakrishna",
  database: "backend_sm",
};

const client = new Client(clientConfig);
client.connect();

exports.createCommunity = function createCommunity(call, cb) {
  const { name, description } = call.request.community;
  console.log(name, description);

  client.query(
    "insert into communitys(name, description) values($1, $2) returning id",
    [name, description],
    (err, res) => {
      if (err) {
        return cb(err, null);
      } else {
        const response = {
          id: res.rows[0].id,
        };
        return cb(null, response);
      }
    }
  );
};

exports.getCommunity = function getCommunity(call, cb) {
  const { id } = call.request;

  client.query(
    "select name, description from communitys where id = $1",
    [id],
    (err, res) => {
      if (err) {
        return cb(err, null);
      } else {
        const response = {
          community: {
            name: res.rows[0].title,
            description: res.rows[0].description,
            id: id,
          },
        };
        return cb(null, response);
      }
    }
  );
};