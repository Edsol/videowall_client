module.exports = {
    apps: [{
        name: "videowallClient",
        script: "concurrently \"nodemon ./bin/www\" \"http-server ./dist\"",
        "watch": false,
        "ignore_watch": ["node_modules"],
        "log_date_format": "YYYY-MM-DD HH:mm Z",
    }]
}
