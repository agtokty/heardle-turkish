import { resolveCaa } from "dns";
import { useState } from "react";

const CLIENT_BASE64 = "Y2ZhZmZmNTM0YjA5NDQ5NTkyNDI4OTk3ZTc4YWNmMzg6M2ZkOWI1ZjNlMmU1NGQyNWFlZGU3ODYyMjczMWNmYjc="

type artist = {
  name: string
}

type track = {
  artists: artist[]
  name: string
}

type SpotifyResult = {
  track: track
}

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


// MODIFICARE
export const getList = (token: string, inputValue: string, callback: (res: any[]) => void) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");


    fetch("https://api.spotify.com/v1/playlists/2JpsZD5kqsVleaNDEGSmND/tracks?type=track&market=IT&fields=items(track(name,artists(name)))", {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(response => {
        console.log("Searching...")
        // console.log(response);
        let items= [];
        //console.log(response.tracks.items[0].name)
        //console.log(response.tracks.items[1].artists[0].name)

        items = response.items
        .filter((track: any) => {
          return (track && track.track.artists[0].name.indexOf("unknown") === -1 && track.track.name.indexOf("unknown") === -1)
        }).map((track: SpotifyResult) => {
          let label = track.track.artists[0].name + " - " + track.track.name;
          let value = track.track.artists[0].name + " " + track.track.name;
          value = value.replaceAll("-", "");
          value = value.replaceAll("_", "");
          value = value.replaceAll(".", "");
          value = value.replaceAll("?", "");
          value = value.replaceAll("!", "");
          return { label: label, value: value }
        })
        
          let sortedTracks = [...items].sort((a,b) => a.label.localeCompare(b.label));
          
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

     
