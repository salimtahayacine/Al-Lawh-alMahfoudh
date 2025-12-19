async function check() {
    const url = 'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1&fields=text_uthmani,chapter_id,hizb_number,rub_el_hizb_number,page_number,juz_number,sajdah_number';
    try {
        const r = await fetch(url);
        const data = await r.json();
        console.log('Verses count:', data.verses.length);
        console.log('First verse:', JSON.stringify(data.verses[0], null, 2));
    } catch (e) { console.log('Error:', e.message); }
}
check();
