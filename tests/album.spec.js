import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/albums';
import { API_URL } from '../src/config';

/* eslint no-unused-expressions: 0 */
sinonStubPromise(sinon);

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have call getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      getAlbum();
      expect(stubedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbum('0lw68yx3MhKflWFqCsGkIs');
      expect(stubedFetch).to.be.calledWith(`${API_URL}/albums/0lw68yx3MhKflWFqCsGkIs`);

      getAlbum('0lw68yx3MhKflWFqCsGkIk');
      expect(stubedFetch).to.be.calledWith(`${API_URL}/albums/0lw68yx3MhKflWFqCsGkIk`);
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('0lw68yx3MhKflWFqCsGkIs');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    let albumsIds = [];

    beforeEach(() => {
      albumsIds = ['0lw68yx3MhKflWFqCsGkIs', '12Chz98pHFMPJEknJQMWvI', '0eFHYz8NmK75zSplL5qlfM'];
    });
    it('should call fetch method', () => {
      getAlbums(albumsIds);
      expect(stubedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbums(albumsIds);
      expect(stubedFetch).to.be.calledWith(`${API_URL}/albums?ids=0lw68yx3MhKflWFqCsGkIs,12Chz98pHFMPJEknJQMWvI,0eFHYz8NmK75zSplL5qlfM`);

      getAlbums('0lw68yx3MhKflWFqCsGkIs');
      expect(stubedFetch).to.be.calledWith(`${API_URL}/albums?ids=0lw68yx3MhKflWFqCsGkIs`);
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbums(albumsIds);
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });


  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      getAlbumTracks();
      expect(stubedFetch).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbumTracks('0lw68yx3MhKflWFqCsGkIs');
      expect(stubedFetch).to.be.calledWith(`${API_URL}/albums/0lw68yx3MhKflWFqCsGkIs/tracks`);
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const albums = getAlbumTracks('0lw68yx3MhKflWFqCsGkIs');
      expect(albums.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
