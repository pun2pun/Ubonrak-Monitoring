const Modbus = require("jsmodbus");
const net = require("net");
const netServer = new net.Server();
const socket = new net.Socket();

const options = {
  host: "127.0.0.1",
  port: "502",
};
const client = new Modbus.client.TCP(socket);

socket.on("connect", function () {
  client
    .readHoldingRegisters(0, 2)
    .then(function (resp) {
      console.log(resp.response._body.valuesAsArray);
      socket.end();
    })
    .catch(function () {
      console.error(
        require("util").inspect(arguments, {
          depth: null,
        })
      );
      socket.end();
    });
});

socket.on("error", console.error);
socket.connect(options);
