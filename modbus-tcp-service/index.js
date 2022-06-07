const Modbus = require("jsmodbus");
const net = require("net");
const netServer = new net.Server();
const socket = new net.Socket();
const express = require("express");
const { clearInterval } = require("timers");
const app = express();

const options = {
  host: "127.0.0.1",
  port: "502",
};

const client = new Modbus.client.TCP(socket);
let reconnect;

app.listen(3002, () => {
  console.log("TCP Modbus Server is ready :) ");
});

app.get("/sensor-data", (req, res) => {
  const slaveID = req.query.slaveID;
  const startAddress = req.query.startAddress;
  const endAddress = req.query.endAddress;

  client
    .readHoldingRegisters(startAddress, endAddress)
    .then(function (resp) {
      const arrayData = resp.response._body.valuesAsArray;

      res.status(200).json({
        status: "Online",
        data: arrayData,
      });
    })
    .catch((err) => {
      if (err.err === "Offline") {
        modbusReconect();
      }

      res.status(404).json({
        status: "Offline",
        data: [],
      });
    });
});

//------------------------------------------- Modbus TCP Function -----------------------------------------

socket.on("connect", (status) => {
  console.log("Reconnected");
  clearTimeout(reconnect);
});

socket.connect(options);

socket.on("error", (err) => {
  modbusReconect();
});

socket.on("disconnect", (err) => {});

//------------------------------------------- Manual Function -----------------------------------------

function modbusReconect() {
  reconnect = setTimeout(() => {
    socket.connect(options);
    console.log("Reconnecting...");
  }, 1000);
}
