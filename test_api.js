const fetch = require('node-fetch'); // Might need to install node-fetch or use native fetch in node 18+

async function testApi() {
    try {
        // Testing api.quran.com as alternative
        const url = 'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1';
        console.log('Fetching:', url);
        const response = await fetch(url);
        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Head of response:', text.substring(0, 100));
        try {
            JSON.parse(text);
            console.log('JSON parse valid');
        } catch (e) {
            console.error('JSON parse failed:', e.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
    console.log('Fetch global not found, trying https module');
    // Fallback
    const https = require('https');
    https.get('https://api.alquran.cloud/v1/surah/1', (res) => {
        console.log('Status:', res.statusCode);
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('Head:', data.substring(0, 100));
            try {
                JSON.parse(data);
                console.log('JSON parse valid');
            } catch (e) {
                console.error('JSON parse failed');
            }
        });
    }).on('error', (e) => {
        console.error(e);
    });
} else {
    testApi();
}
