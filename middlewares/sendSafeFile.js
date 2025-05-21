// middleware/sendSafeFile.js
const path = require('path');

/**
 * Creates a middleware that SAFELY and SECURELY serves files from the public directory
 */
const sendSafeFile = (filePath) => {
    return (req, res, next) => {
        // Normalize the path to prevent directory traversal attacks
        const normalizedPath = path.normalize(filePath);

        // Ensure the path is within the public directory
        if (!normalizedPath.startsWith(path.join(__dirname, '../public'))) {
            return res.status(403).send('Forbidden');
        }

        // Send the file
        res.sendFile(normalizedPath, (err) => {
            if (err) {
                console.error(`Error serving ${normalizedPath}:`, err.message);
                // Don't expose detailed error information
                if (err.code === 'ENOENT') {
                    return res.status(404).send('Not Found');
                }
                return res.status(500).send('Internal Server Error');
            }
        });
    };
};

module.exports = sendSafeFile;