import { API_URL, HEADERS } from './config';
import { toJSON } from './utils';

/* global fetch */

export const getAlbum = id => fetch(`${API_URL}/albums/${id}`, HEADERS).then(toJSON);
export const getAlbums = albums => fetch(`${API_URL}/albums?ids=${albums}`, HEADERS).then(toJSON);
export const getAlbumTracks = id => fetch(`${API_URL}/albums/${id}/tracks`, HEADERS).then(toJSON);
