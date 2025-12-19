async function check() {
    // Test the 'verses/by_chapter' endpoint which is more standard for QDC API
    const url = 'https://api.quran.com/api/v4/verses/by_chapter/1?fields=text_uthmani,page_number,juz_number,hizb_number';

    console.log('Fetching:', url);
    try {
        const r = await fetch(url);
        const data = await r.json();
        if (data.verses && data.verses.length > 0) {
            console.log('First verse:', JSON.stringify(data.verses[0], null, 2));
        } else {
            console.log('No verses found or error structure:', JSON.stringify(data, null, 2));
        }
    } catch (e) { console.log('Error:', e.message); }
}
check();
