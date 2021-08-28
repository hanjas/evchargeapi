
exports.succReply = (data, msg, res) => {
    res.status(200).send( { data, msg } );
};
exports.failReply = (data, msg, res) => {
    res.status(400).send( { data, msg } );
};
exports.forbidReply = (data, msg, res) => {
    res.status(403).send( { data, msg } );
};
exports.authFailure = (data, msg, res) => {
    res.status(401).send( { data, msg } );
};

exports.genericCallback = (res) => {
    return (err, data, msg) => {
        if (err)
            return exports.failReply(err, msg, res);

        return exports.succReply(data, msg, res);
    }
};

exports.simplifiedCallback = (fn) => (req, res, nxt) => fn(req, this.genericCallback(res), nxt);

exports.checkallkeys = (reqobj, reqkeys) => {
    for (let i in reqkeys)
        if (!(reqkeys[i] in reqobj))
            return [false, reqkeys[i]];
    return [true, null];
};

exports.verifyAPIArgs = (reqkeys) => (req, res, next) => {
    let isallkeys = this.checkallkeys(req.body, reqkeys);
    if(!isallkeys[0]){
        this.failReply('MISSING_API_ARGUMENTS', "key not found : " + isallkeys[1], res);
    } else{
        next();
    }
};