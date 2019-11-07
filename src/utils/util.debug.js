/* eslint-disable */
import pkg from '../../package'

const debug = {}

debug.log = function (...msg) {
    if (this.isDebug) {
        console.log(...msg)
    }
}

debug.error = function (...msg) {
    if (this.isDebug) {
        console.error(...msg)
    }
}

debug.isDebug = function () {
    if (process.env.NODE_ENV === "development") {
        return true
    }
}

export default debug
