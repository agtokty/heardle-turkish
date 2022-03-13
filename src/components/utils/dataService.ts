
import { getDatabase, ref, onValue } from "firebase/database";
import { getDayStr } from ".";
import app from "./firebase"

interface Map {
    [key: string]: any
}

const DEFAULT_SONG = {
    songLength: 30,
    breaks: [3, 8, 15, 21, 25, 30],
    trackName: "Müslüm Gürses Hangimiz Sevmedik",
    others: [],
    album: "Senden Vazgecmem",
    soundCloudLink: "https://soundcloud.com/dnz_aksoy/muslum-gurses-hangimiz-sevmedik",
    showSoundCloud: false,
    soundSpotifyLink: "https://open.spotify.com/embed/track/1Mw4JiiSl5EuE7SYfc5Vks",
    image: "https://ia801302.us.archive.org/19/items/mbid-bb07d3ca-e079-412f-a0d1-34f7361a25c8/mbid-bb07d3ca-e079-412f-a0d1-34f7361a25c8-20523301125.jpg"
};

const SONG_DATABASE: Map = {
    "11-2-2022": {
        songLength: 30,
        breaks: [3, 8, 15, 21, 25, 30],
        trackName: "Müslüm Gürses Hangimiz Sevmedik",
        others: [],
        album: "Senden Vazgecmem",
        soundCloudLink: "https://soundcloud.com/dnz_aksoy/muslum-gurses-hangimiz-sevmedik",
        showSoundCloud: false,
        soundSpotifyLink: "https://open.spotify.com/embed/track/1Mw4JiiSl5EuE7SYfc5Vks",
        image: "https://ia801302.us.archive.org/19/items/mbid-bb07d3ca-e079-412f-a0d1-34f7361a25c8/mbid-bb07d3ca-e079-412f-a0d1-34f7361a25c8-20523301125.jpg"
    }
}


export const getDailySong = (): Promise<any> => {
    let day = getDayStr()

    let hardCodedSong = DEFAULT_SONG;
    if (SONG_DATABASE[day]) {
        hardCodedSong = SONG_DATABASE[day];
    }

    return new Promise((resolve, reject) => {

        const database = getDatabase(app);
        const songRef = ref(database, 'daily-songs/' + day);

        onValue(songRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                resolve(data);
            } else {
                resolve(hardCodedSong)
            }
        }, (err) => {
            console.log(err);
            resolve(hardCodedSong)
        }, {
            onlyOnce: true
        });
    });
}