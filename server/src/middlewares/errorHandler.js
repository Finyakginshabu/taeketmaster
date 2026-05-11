const errorHandling = (err, req, res, next) => {
    console.error('===== ERROR =====');
    console.error('URL:', req.url);
    console.error('Method:', req.method);
    console.error('Error Message:', err.message);
    console.error('Error Stack:', err.stack);
    console.error('================');
    res.status(500).json({
        status: 500,
        message: "Oh no",
        error: err.message,
    })
}

export default errorHandling;