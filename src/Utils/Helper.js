const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Helper = {
    sleep: sleep
}

export default Helper
