
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
    trackName: "Fedez - MILLE – feat. Orietta Berti",
    song: "MILLE",
    artist: "Fedez",
    soundCloudLink: "https://soundcloud.com/fedez-official/mille",
    showSoundCloud: true,
    image: "https://i1.sndcdn.com/artworks-DshfXEuGTnGV-0-t500x500.jpg"
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