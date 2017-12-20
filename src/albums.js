import { API_URL } from './config';
import { toJSON } from './utils';

/* global fetch */

export const getAlbum = id => fetch(`${API_URL}/albums/${id}`).then(toJSON);
export const getAlbums = albums => fetch(`${API_URL}/albums?ids=${albums}`).then(toJSON);
export const getAlbumTracks = id => fetch(`${API_URL}/albums/${id}/tracks`).then(toJSON);
