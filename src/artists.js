/* global fetch */
import API_URL from '../src/config';
import toJSON from '../src/utils';

export const getArtist = id => fetch(`${API_URL}/artists/${id}`).then(toJSON);
export const getTopTracksFromArtist = (id, country) => fetch(`${API_URL}/artists/${id}/top-tracks?country=${country}`).then(toJSON);
