// import { makeAutoObservable } from "mobx";

// const API_KEY = '69f2e54b20394c66d3bcc46c93196957';
// const FORMAT = 'json';

// export default class MusicStore {
//   _music = [];

//   constructor() {
//     makeAutoObservable(this);
//     this.loadMusic("Trinity");
//   }

//   loadMusic = async (project) => {
//     try {
//       const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${API_KEY}&album=${project}&format=${FORMAT}`);
//       const { album } = await response.json();
//       this.music = {
//         artist: album.artist,
//       }; 
//     } catch (error) {
//       console.error('Error loading music:', error);
//     }
//   };

//   get music() {
//     return this._music;
//   }

//   set music(value) {
//     this._music = value;
//   }
// }
