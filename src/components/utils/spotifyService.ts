import { resolveCaa } from "dns";
import { useState } from "react";
import { artists } from "../utils/constants";

const CLIENT_BASE64 = "Y2ZhZmZmNTM0YjA5NDQ5NTkyNDI4OTk3ZTc4YWNmMzg6M2ZkOWI1ZjNlMmU1NGQyNWFlZGU3ODYyMjczMWNmYjc="

type artist = {
  name: string
}

type SpotifyResult = {
  duration_ms: number
  artists: artist[]
  name: string
}

const banWords = ["rmx","unplugged", "reprise","remaster", "live", "remix", "mix", "version", "edit", "remastered", "concert", "concerto", "live", "studio", "registrazione", "dal vivo", "strumentale"];	// words to filter out

export const getAccessToken = (): Promise<any> => { 

    return new Promise<string>((resolve, reject) => {

    console.log("Load access...")

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + CLIENT_BASE64);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "__Host-device_id=AQDPZSmHH_wn9eUQvhLOXgZ6dX2N_ADW-WOhrV5i0uBaLxJqODRvMyT9FeFAp7IZsoqpHUkWt94rWJMzQz6pblraDVkFMLAgEHA; sp_tr=false");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
   
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
   
    fetch("https://accounts.spotify.com/api/token", 
    {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        resolve(result.access_token);        
      })
      .catch(error => {
        resolve("")
        console.log('error', error)});
          
    });

}


export const getList = (token: string, inputValue: string, callback: (res: any[]) => void) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    fetch("https://api.spotify.com/v1/search?type=track&market=IT&q=" + inputValue, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  })
      .then(response => response.json())
      .then(response => {
          console.warn("Searching...")
          let mapTracks = new Map<string,string>()
          let tracks: any[] = []

          if (response && response.tracks.items ) {
            response.tracks.items
                .filter((track: any) => {
                    return (track && track.artists[0].name.indexOf("unknown") === -1 && track.name.indexOf("unknown") === -1)
                })
                .map((track: SpotifyResult) => {
                  // console.info(track.artists[0].name.toLowerCase())
                  var value = new RegExp(banWords.join('|')).test(track.name.toLowerCase());
                  if(artists.includes(track.artists[0].name.toLowerCase()) && !value) {
                    
                    let id = track.artists[0].name + track.name;
                    id = id.replaceAll(" ","");
                    // let id = track.duration_ms.toString() + track.artists[0].name.substring(0,3);
                    // let value = track.artists[0].name + " " + track.name;
                  
                    let label = track.artists[0].name + " - " + track.name;
                    label = label.replaceAll("å", "a");
                    label = label.replaceAll("è", "e");
                    // value = value.replaceAll("_", "");
                    // value = value.replaceAll(".", "");
                    // value = value.replaceAll("?", "");
                    // value = value.replaceAll("!", "");
                    mapTracks.set(id,label);
                  }
                });
        }

        /** PARTE IN CUI SI RIORDINA LA LISTA TRACKS
         * E AGGIORNATA ATTRAVERSO L' inputValue
         */
        // console.log(mapTracks);
        if(tracks.length == 0)
        { 
            mapTracks.forEach((value) =>{
            let i=0;
            tracks.push({label:value, value:value.replaceAll(" -","")})
          })
        }
        
        let sortedTracks = [...tracks].sort((a,b) => a.label.localeCompare(b.label));

        [...sortedTracks].forEach(value => {
          // restituisce un solo valore nella lista
          if(value.value.toLowerCase()===inputValue.toLowerCase()) {
              var index = sortedTracks.indexOf(value); 
              sortedTracks.forEach(value => {
                  if(sortedTracks[index]!=value)
                    delete sortedTracks[sortedTracks.indexOf(value)]
              })
              callback(sortedTracks)   
          }
          // restituisce nella lista i valori che includono inputValue
          else if(value.value.toLowerCase().includes(inputValue.toLowerCase())) {
            sortedTracks.forEach(value =>{
                  if(!value.value.toLowerCase().includes(inputValue.toLowerCase())) {
                      delete sortedTracks[sortedTracks.indexOf(value)]
                  }
              })
              callback(sortedTracks)
          }
          return
      })

        return sortedTracks;
    })
    .catch((err) => {
        console.error(err)
    });
}

     
