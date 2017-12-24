import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';

/* eslint no-unused-expressions: 0 */
sinonStubPromise(sinon);

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have call getTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbum();
      expect(stubedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.album.getAlbum('0lw68yx3MhKflWFqCsGkIs');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIs');

      spotify.album.getAlbum('0lw68yx3MhKflWFqCsGkIk');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIk');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbum('0lw68yx3MhKflWFqCsGkIs');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    let albumsIds = [];

    beforeEach(() => {
      albumsIds = ['0lw68yx3MhKflWFqCsGkIs', '12Chz98pHFMPJEknJQMWvI', '0eFHYz8NmK75zSplL5qlfM'];
    });
    it('should call fetch method', () => {
      spotify.album.getAlbums(albumsIds);
      expect(stubedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.album.getAlbums(albumsIds);
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=0lw68yx3MhKflWFqCsGkIs,12Chz98pHFMPJEknJQMWvI,0eFHYz8NmK75zSplL5qlfM');

      spotify.album.getAlbums('0lw68yx3MhKflWFqCsGkIs');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=0lw68yx3MhKflWFqCsGkIs');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const albums = spotify.album.getAlbums(albumsIds);
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      spotify.album.getTracks();
      expect(stubedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.album.getTracks('0lw68yx3MhKflWFqCsGkIs');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIs/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const albums = spotify.album.getTracks('0lw68yx3MhKflWFqCsGkIs');
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
