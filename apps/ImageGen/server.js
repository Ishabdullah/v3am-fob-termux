#!/usr/bin/env node
/**
 * V3AM FOB Service Server (Termux Port)
 * Uses server-template.js — no PHP, pure Node.js
 */
const { createServer } = require("../../lib/server-template");
createServer(__dirname);

