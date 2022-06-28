
import { getDatabase, ref, onValue } from "firebase/database";
import { getDayStr, getDayStrAsPath } from ".";
import { SongConfig } from "../game/Models";
//import app from "./firebase";
import "./firebase";

interface Map {
    [key: string]: any
}

const DEFAULT_SONG = {
    songLength: 30,
    breaks: [3, 8, 15, 21, 25, 30],
    trackName: "Chicchi di riso",
    others: [],
    album: "Banzai (Lato arancio)",
    soundCloudLink: "https://soundcloud.com/frahquintale/chicchi-di-riso",
    showSoundCloud: true,
    soundSpotifyLink: "https://open.spotify.com/track/05ZaaO3XTZQ5rwBNGetYMV?si=f0b6f9361b384d96",
    image: "https://i1.sndcdn.com/artworks-2jjAeyOoVrfS-0-t500x500.png"
};

const SONG_DATABASE: Map = {}


export const getDailySong = (): Promise<any> => {
    let day = getDayStr()

    let hardCodedSong = DEFAULT_SONG;
    if (SONG_DATABASE[day]) {
        hardCodedSong = SONG_DATABASE[day];
    }

    return new Promise<SongConfig>((resolve, reject) => {

        let day = getDayStrAsPath()

        const database = getDatabase();
        const songRef = ref(database, 'songs/' + day);


        onValue(songRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            if (data) {
                resolve(data);
                console.log("Dentro if")
            } else {
                resolve(hardCodedSong)
            }
        }, (err) => {
            console.error(err);
            resolve(hardCodedSong)
        }, {
            onlyOnce: true
        });
    });
}