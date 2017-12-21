"use strict"
const {
    remote
} = require("electron");

function minimizeWindow() {
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximizeWindow() {
    remote.BrowserWindow.getFocusedWindow().maximize();
}

function closeWindow() {
    remote.BrowserWindow.getFocusedWindow().close();
}

document.getElementById("minimize").addEventListener("click", minimizeWindow);
document.getElementById("maximize").addEventListener("click", maximizeWindow);
document.getElementById("close").addEventListener("click", closeWindow);