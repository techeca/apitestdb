export { errorHandler };

function errorHandler(err, res) {

    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        //console.log(err)
        return res.status(401).json({ message: 'Invalid Token' });
    }
    console.log(err)
    // default to 500 server error
    return res.status(500).json({ message: err.message });
}
