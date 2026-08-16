"use strict";

const nodeBuffer = require("buffer");
const hasOwn = Object.prototype.hasOwnProperty;
const Buffer = nodeBuffer.Buffer;

const safer = {};

for (const key of Object.keys(nodeBuffer)) {
  if (hasOwn.call(nodeBuffer, key) && key !== "Buffer" && key !== "SlowBuffer") {
    safer[key] = nodeBuffer[key];
  }
}

safer.Buffer = Buffer;
safer.SlowBuffer = Buffer;
safer.INSPECT_MAX_BYTES = 50;

module.exports = safer;
