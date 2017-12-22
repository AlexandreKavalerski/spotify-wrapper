import {
  search,
  searchAlbums,
  searchArtists,
  searchPlaylists,
  searchTracks,
} from './search';

import {
  getAlbum,
  getAlbums,
  getAlbumTracks,
} from './albums';

import {
  getArtist,
  getTopTracksFromArtist,
} from './artists';

import { API_URL } from './config';

// module.exports = {
//   search,
//   searchAlbums,
//   searchArtists,
//   searchPlaylists,
//   searchTracks,
//   getAlbum,
//   getAlbums,
//   getAlbumTracks,
//   getArtist,
//   getTopTracksFromArtist,
// };
export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
  }
}
