/* to run: babel-node album.js */
import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQDsad0YtusZVbU6SW3h2Og2jhaPoWul52J5DU6T6wAkf839-Fnu6_qoy7hS0twLB1dxgq28z1K1s3nd3MClQ5laAFEPEXMnl6VaL0lS6_7hwA5DKOoi0fQyW6BdkrEw7_cW7O5CzDdzQnI4FuA',
});

const albums = spotify.search.albums('Charlie Brown Jr');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
