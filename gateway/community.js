const express = require("express");
const router = express.Router();

const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/protos/community.proto";
const { requiresAuth } = require("./auth");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  defaults: true,
  oneofs: true,
});

const CommunityService =
  grpc.loadPackageDefinition(packageDefinition).CommunityService;
const client = new CommunityService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

router.post("/", requiresAuth, (req, res) => {
  const { name, description } = req.body;

  const createCommunityRequest = {
    community: {
      name,
      description,
    },
  };
  client.createCommunity(createCommunityRequest, (err, msg) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, msg: "create community error" });
    } else {
      return res
        .status(200)
        .json({ success: true, msg: "community created", id: msg.id });
    }
  });
});

module.exports = router;