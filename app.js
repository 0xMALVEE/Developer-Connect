const date = require("date-and-time");

const pattern = date.compile('D MMMM YYYY HH:mm A');
date.format(new Date("2020-04-02T06:26:57.130+00:00"), pattern)

