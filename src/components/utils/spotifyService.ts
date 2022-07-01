import { resolveCaa } from "dns";

const CLIENT_BASE64 = 'Y2ZhZmZmNTM0YjA5NDQ5NTkyNDI4OTk3ZTc4YWNmMzg6M2ZkOWI1ZjNlMmU1NGQyNWFlZGU3ODYyMjczMWNmYjc=';


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
        .then(result => {
            console.log(result)
            //INTERFACE TO CONVERT JSON IN VARIABLE
        })
        .catch(error => console.log('error', error));
      
  }





