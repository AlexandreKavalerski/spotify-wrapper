/* global fetch */
import { API_URL, HEADERS } from '../src/config';
import toJSON from '../src/utils';

export const getArtist = id => fetch(`${API_URL}/artists/${id}`, HEADERS).then(toJSON);
export const getTopTracksFromArtist = (id, country) => fetch(`${API_URL}/artists/${id}/top-tracks?country=${country}`, HEADERS).then(toJSON);
