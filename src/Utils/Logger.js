import moment from 'moment'


let LOGLEVEL = {
    ERROR : 40,
    WARN  : 30,
    INFO  : 20,
    DEBUG : 10
}

let SETLOGLEVEL = LOGLEVEL.WARN
if (process.env.NODE_ENV === "production") {
    SETLOGLEVEL = LOGLEVEL.WARN;
} else {
    SETLOGLEVEL = LOGLEVEL.WARN;
}

const Logger = {
    debug: function(file, msg) {
        if (SETLOGLEVEL <= 10) {
            logMessage("DEBUG", file, msg);
        }
    },
    info: function(file, msg) {
        if (SETLOGLEVEL <=20) {
            logMessage("INFO ", file, msg);
        }
    },
    warn: function(file, msg) {
        if (SETLOGLEVEL <= 30) {
            logMessage("WARN  ", file, msg);
        }
    },
    error: function(file, msg) {
        if (SETLOGLEVEL <=40) {
            logMessage("ERROR", file, msg);
        }
    }
}

const logMessage = (level, file, msg) => {
    console.log(moment().format("HH:mm:ss.SSS") + " : " + level + " : " + file + " : " + msg)
}

export default Logger