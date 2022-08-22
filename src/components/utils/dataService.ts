
import { Console } from "console";
import { getDatabase, ref, onValue } from "firebase/database";
import { getDayStr, getDayStrAsPath } from ".";
import { SongConfig } from "../game/Models";
import "./firebase";

interface Map {
    [key: string]: any
}

const DEFAULT_SONG = {
    songLength: 16,
    breaks: [1, 2, 4, 7, 11, 16],
    trackName: "Pinguini Tattici Nucleari Scooby Doo",
    album: "Scooby Doo",
    song: "Scooby Doo",
    artist: "Pinguini Tattici Nucleari",
    soundCloudLink: "https://soundcloud.com/pinguini-tattici-nucleari/scooby-doo",
    showSoundCloud: true,
    soundSpotifyLink: "https://open.spotify.com/track/05ZaaO3XTZQ5rwBNGetYMV?si=f0b6f9361b384d96",
    image: "https://i1.sndcdn.com/artworks-ogYuMKgshuNb-0-t500x500.jpg"
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
            if (data) {
                resolve(data);
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