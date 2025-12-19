async function check() {
    const headers = { 'Accept-Encoding': 'identity' };

    console.log('--- TEST 1: AlQuran.cloud ---');
    try {
        const r1 = await fetch('https://api.alquran.cloud/v1/surah/1', { headers });
        console.log('Status:', r1.status);
        console.log('Encoding:', r1.headers.get('content-encoding') || 'none');
    } catch (e) { console.log('Error:', e.message); }

    console.log('\n--- TEST 2: api.quran.com ---');
    try {
        const r2 = await fetch('https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1', { headers });
        console.log('Status:', r2.status);
        console.log('Encoding:', r2.headers.get('content-encoding') || 'none');
    } catch (e) { console.log('Error:', e.message); }
}
check();
