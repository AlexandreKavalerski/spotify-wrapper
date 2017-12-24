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

/* global fetch */

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
  }

  request(url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return fetch(url, headers);
  }
}
