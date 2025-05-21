const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');

const dbConnect = require('./api/config/dbConnect.js');
const authRoute = require('./api/dbroute/auth.route.js');
const missionRoute = require('./api/dbroute/mission.route.js');
const workRoute = require('./api/dbroute/work.route.js');
const goalRoute = require('./api/dbroute/goal.route.js');
const campaignRoute = require('./api/dbroute/campaign.route.js');
const vissionRoute = require('./api/dbroute/vission.route.js');

const sendSafeFile = require('./middlewares/sendSafeFile');

const app = express();

// Body parsing middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Security middleware using helmet : here we can configure the security headers
// and with the help of CSP we can block urls from headers
// I am setting for script-src, style-src, img-src, connect-src, font-src
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdnjs.cloudflare.com'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
            imgSrc: ["'self'", "data:", "blob:", "https://img.icons8.com"],
            connectSrc: ["'self'", "http://127.0.0.1:3001/api/"], // Add your API domains
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'"],
        },
    },
}));
// Load .env variables
dotenv.config();
const PORT = process.env.PORT || 3000;
// console.log(__dirname);
// console.log(path.dirname(__filename));




/*  
* serving static file and routing 
*/
app.use(express.static(path.join(__dirname, 'public'), {
    // Prevent directory listing
    dotfiles: 'ignore',
    // Don't send ETags (can leak information about your server)
    etag: false,
    // Don't send the "X-Powered-By: Express" header
    setHeaders: (res) => {
        res.set('X-Powered-By', '');
    }
}));


// API routes
app.use('/api/auth', authRoute);
app.use('/api/missions', missionRoute);
app.use('/api/works', workRoute);
app.use('/api/goals', goalRoute);
app.use('/api/campaigns', campaignRoute);
app.use('/api/vissions', vissionRoute);


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });
app.get('/', sendSafeFile(path.join(__dirname, 'public/index.html')));
app.get('/home', sendSafeFile(path.join(__dirname, 'public/index.html')));
app.get('/admin', sendSafeFile(path.join(__dirname, 'public/admin/admin.html')));
app.get('/contact', sendSafeFile(path.join(__dirname, 'public/contact.html')));
app.get('/donate', sendSafeFile(path.join(__dirname, 'public/donate.html')));
app.get('/works', sendSafeFile(path.join(__dirname, 'public/our_work.html')));
app.get('/story', sendSafeFile(path.join(__dirname, 'public/success_story.html')));




// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).send('Not Found');
    // res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.use('/uploads', express.static('uploads'));
// API
app.get('/api')



// start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} ...`);
    dbConnect();
})
    // error handling when port is already in use
    .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Error: Port ${PORT} is already in use. Please try a different port.`);
            process.exit(1); // Exit the process to prevent hanging
        } else {
            console.error(`Unexpected server error: ${err.message}`);
            process.exit(1);
        }
    });