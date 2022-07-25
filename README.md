# Heardle TR

Modest clone of Heardle game for Turkish songs. Deployed at : [heardle-tr.app](https://heardle-tr.app)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Do not have any tests (yet)

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Firebase

The daily song fetched from firebase realtime database, you may want to change it from dataService.ts file

**DB Scheme**

```
{
  "songs" : { //root
    "2022" : {// year
      "04" : { // month number
        "06" : {// day number
          "artist" : "<ArtistName>", // optional
          "breaks" : [ 2, 6, 15, 20, 30, 40 ], //game step intervals
          "day" : "20220407", // optional
          "others" : ["<SongName-ArtistName>", "<ArtistNameAlternative-SongName>", ... ], // alternative values to check user inputs
          "song" : "<SongName>",// optional
          "songLength" : 40, //should be same with last break value
          "soundCloudLink" : "<Soundcloud-Link>", // soundcloud song link
          "soundSpotifyLink" : "https://open.spotify.com/embed/track/<SongId>", //spotify song embebed link
          "trackName" : "<ArtistName-SongName>" // first value to check user inputs
        },
        "07": {
             //....
        }
      }
    }
  }
}
```
