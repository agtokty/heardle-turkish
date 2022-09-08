import { getDayStr } from ".";
import { SongConfig } from "../game/Models";
import { artists } from "../utils/constants";
import "./firebase";


interface Map {
    [key: string]: any
}

const DEFAULT_SONG = {
    day: "",
    songLength: 30,
    breaks: [4, 8, 11, 16, 24, 30],
    trackName: "Elisa Litoranea",
    others: ["Elisa Litoranea (con Matilda De Angelis)"],
    song: "Litoranea",
    artist: "Elisa",
    soundCloudLink: "https://soundcloud.com/elisa-official/litoranea-1",
    showSoundCloud: true,
    image: "https://i1.sndcdn.com/artworks-dr78ZwUE9K3r-0-t500x500.jpg"
};

const SONG_DATABASE: Map = {}

const setSong = (day: string, selectedSong: any) => {

    let song = selectedSong.name.includes("-") ? selectedSong.name.substring(0, selectedSong.name.indexOf("-")) :
        selectedSong.name.includes("(") ? selectedSong.name.substring(0, selectedSong.name.indexOf("(")) : selectedSong.name;

    let hardCodedSong = {
        day: day,
        songLength: 30,
        breaks: [4, 8, 11, 16, 24, 30],
        trackName: selectedSong.artists[0].name + " " + selectedSong.name,
        others: [selectedSong.artists[0].name + " " + song],
        song: selectedSong.name.indexOf("-") !== -1 ? selectedSong.name.substring(0, selectedSong.name.indexOf("-")) : selectedSong.name,
        artist: selectedSong.artists[0].name,
        soundCloudLink: selectedSong.preview_url,
        showSoundCloud: true,
        image: selectedSong.album.images[0].url
    };

    localStorage.setItem("Song", JSON.stringify(hardCodedSong));
}


export const getDailySong = (accessToken: string): Promise<any> => {

    let day = getDayStr()

    let artist = artists[Math.floor(Math.random() * artists.length)];

    let hardCodedSong = DEFAULT_SONG

    return new Promise<SongConfig>(async (resolve, reject) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + accessToken);
        myHeaders.append("Content-Type", "application/json");

        let selectedSong = await fetch("https://api.spotify.com/v1/search?type=track&market=IT&q=" + artist, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(response => response.tracks.items[Math.floor(Math.random() * response.tracks.items.length)])

        console.log(artist, selectedSong)
        if (localStorage.getItem("Song")) {

            if (JSON.parse(localStorage.getItem("Song") || '{}').day.localeCompare(day) === 0) {
                hardCodedSong = JSON.parse(localStorage.getItem("Song") || '{}')
                resolve(hardCodedSong)
            }
            else {
                setSong(day, selectedSong)
                hardCodedSong = JSON.parse(localStorage.getItem("Song") || '{}')
                resolve(hardCodedSong)
            }
        }
        else {

            setSong(day, selectedSong)
            hardCodedSong = JSON.parse(localStorage.getItem("Song") || '{}')
            resolve(hardCodedSong)
        }

    });

}