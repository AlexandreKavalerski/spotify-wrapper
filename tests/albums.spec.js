import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbumTracks } from '../src/albums';
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
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIs');

      getAlbum('0lw68yx3MhKflWFqCsGkIk');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIk');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('0lw68yx3MhKflWFqCsGkIs');
      expect(album.resolveValue).to.be.eql({ album: 'name' });

    });
  });
});
