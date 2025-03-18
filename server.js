require('dotenv').config();
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
import dbConnect from '@/lib/dbConnect'; // Import the dbConnect function

// Initialize Next.js
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

// Prepare and start the server
app.prepare().then(async () => {
    await dbConnect(); // Ensure the database connection is established

    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // console.log(`Handling request for: ${pathname}`);
        // console.log('Full URL:', req.url);

        try {
            if (pathname.startsWith('/api/')) {
                // console.log('Routing to Next.js API handler');
                handle(req, res, parsedUrl);
            } else {
                // console.log('Routing to Next.js page handler');
                handle(req, res, parsedUrl);
            }
        } catch (error) {
            // console.error('Error handling request:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
