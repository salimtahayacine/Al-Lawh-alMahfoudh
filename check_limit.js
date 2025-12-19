async function check() {
    // Check max limit. Try to fetch Surah 2 (286 verses) with per_page=300
    const url = 'https://api.quran.com/api/v4/verses/by_chapter/2?fields=text_uthmani,page_number,juz_number&per_page=300';

    console.log('Fetching:', url);
    try {
        const r = await fetch(url);
        const data = await r.json();
        console.log('Verses returned:', data.verses ? data.verses.length : 0);
        if (data.meta) console.log('Meta:', JSON.stringify(data.meta, null, 2));
    } catch (e) { console.log('Error:', e.message); }
}
check();
