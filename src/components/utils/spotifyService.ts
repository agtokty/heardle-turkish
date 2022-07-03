import { resolveCaa } from "dns";
import { useState } from "react";

const CLIENT_BASE64 = 'Y2ZhZmZmNTM0YjA5NDQ5NTkyNDI4OTk3ZTc4YWNmMzg6M2ZkOWI1ZjNlMmU1NGQyNWFlZGU3ODYyMjczMWNmYjc=';

type artist = {
  name: string
}

type SpotifyResult = {
  artists: artist[]
  name: string
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

export const getListTracks = (inputValue: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + inputValue);
    myHeaders.append("Content-Type", "application/json");


    fetch("https://api.spotify.com/v1/playlists/2JpsZD5kqsVleaNDEGSmND/tracks?type=track&market=IT&fields=items(track(name,artists(name)))", {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            //INTERFACE TO CONVERT JSON IN VARIABLE
            console.log("2")
            let items = []
            
                // if (response && response.item ) {
                //     item = response.item.trackmatches.track
                //         .filter((item: any) => {
                //             return (item && item.artist.indexOf("unknown") === -1 && item.name.indexOf("unknown") === -1)
                //         })
                //         .map((item: SpotifyResult) => {
                //             let value = item.artist + " " + item.name;
                //             value = value.replaceAll("-", "");
                //             value = value.replaceAll("_", "");
                //             value = value.replaceAll(".", "");
                //             value = value.replaceAll("?", "");
                //             value = value.replaceAll("!", "");
                //             return { label: value, value: value }
                //         });
                }
        //}
        )
        //.catch(error => console.log('error', error));
      
  }

// function that retrive songs on all Spotify 

export const getSearch = (token: string, inputValue: string, callback: (res: any[]) => void) => {
   
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token ); 
  myHeaders.append("Content-Type", "application/json");


  // come ricerca ci puo' stare il problema se cerchi
  // 'bon jovi' ti escono le loto canzoni...
  // e poi ci sono un sacco di duplicati che non so come toglierli
  // forse con qualche filtro si possono togliere
  fetch("https://api.spotify.com/v1/search?type=track&market=IT&q=" + inputValue, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  })
      .then(response => response.json())
      .then(response => {
          console.log("Searching...")
          let tracks = []
          //console.log(response.tracks.items[0].name)
          //console.log(response.tracks.items[0].artists[0].name)

          if (response && response.tracks.items ) {
            tracks = response.tracks.items
                .filter((track: any) => {
                    return (track && track.artists[0].name.indexOf("unknown") === -1 && track.name.indexOf("unknown") === -1)
                })
                .map((track: SpotifyResult) => {
                    let value = track.artists[0].name + " " + track.name;
                    value = value.replaceAll("-", "");
                    value = value.replaceAll("_", "");
                    value = value.replaceAll(".", "");
                    value = value.replaceAll("?", "");
                    value = value.replaceAll("!", "");
                    return { label: value, value: value }
                });
        }

        /** PARTE IN CUI SI RIORDINA LA LISTA TRACKS
         * E AGGIORNATA ATTRAVERSO L' inputValue
         */
        let sortedTracks = [...tracks].sort((a,b) => a.label.localeCompare(b.label))
        //callback(sortedTracks)
        console.log(sortedTracks);

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


