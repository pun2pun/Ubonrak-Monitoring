const modbus = require("modbus-tcp");

const client = new modbus.Client();
const server = new modbus.Server();

// server.master_url = "172.0.0.1";

client.writer().pipe(server.reader());

// console.log(server.reader());

// client.writer().pipe(master_url);

server.writer().pipe(client.reader());

server.on("read-coils", (from, to, replay) => {
  console.log(from, to);
  return replay(null, [1, 0, 1, 0]);
});

client.readCoils(0, 10, 11, (err, coils) => {
  console.log(coils);
});
