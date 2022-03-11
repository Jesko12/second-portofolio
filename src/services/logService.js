function log(error) {
    console.log(error);
    //Raven.captureException(error);
}

// eslint-disable-next-line
export default {
    log
}