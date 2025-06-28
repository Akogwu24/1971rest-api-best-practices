"use strict";
// type TWeeday =
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.today = void 0;
const opt = {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
    hour: "numeric", // Numeric hour (12-hour clock)
    minute: "numeric",
    hour12: undefined,
    timeZoneName: "short",
    dayPeriod: undefined,
    era: undefined,
};
exports.today = new Date().toISOString().split("T")[0];
const formatDate = ({ date = exports.today, options = opt }) => {
    const covertedDate = new Date(date);
    return new Intl.DateTimeFormat("en-GB", options).format(covertedDate);
};
exports.formatDate = formatDate;
