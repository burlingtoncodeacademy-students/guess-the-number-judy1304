function computerResponse(string) {
    let white = "\033[0;39m";
    let yellow = "\033[0;33m";

    console.log(yellow + string + white)
}

module.exports = computerResponse;

