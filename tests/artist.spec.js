import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import SpotifyWrapper from '../src/index';

/* eslint no-unused-expressions: 0 */
sinonStubPromise(sinon);

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Artist', () => {
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
    it('should have getArtist method', () => {
      expect(spotify.artist.getArtist).to.exist;
    });

    it('should have getTopTracksFromArtist', () => {
      expect(spotify.artist.getTopTracks).to.exist;
    });
  });

  describe('getArtist', () => {
    it('should call fetch method', () => {
      spotify.artist.getArtist('73HkjgziMO6I83vFOS8mo1');
      expect(stubedFetch).to.be.calledOnce;
    });
    it('should be called with the correct URL', () => {
      spotify.artist.getArtist('73HkjgziMO6I83vFOS8mo1');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/73HkjgziMO6I83vFOS8mo1');

      spotify.artist.getArtist('20whHfvYkfnBA4fvdseUcJ');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/20whHfvYkfnBA4fvdseUcJ');
    });

    it('should return the correct JSON data from Promise', () => {
      promise.resolves({ name: 'artist' });
      const artist = spotify.artist.getArtist('73HkjgziMO6I83vFOS8mo1');
      expect(artist.resolveValue).to.be.eql({ name: 'artist' });
    });
  });

  describe('getTopTracksFromArtist', () => {
    it('should call fetch method', () => {
      spotify.artist.getTopTracks('73HkjgziMO6I83vFOS8mo1');
      expect(stubedFetch).to.be.calledOnce;
    });
    it('should be called with the correct URL', () => {
      spotify.artist.getTopTracks('73HkjgziMO6I83vFOS8mo1', 'BR');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/73HkjgziMO6I83vFOS8mo1/top-tracks?country=BR');

      spotify.artist.getTopTracks('20whHfvYkfnBA4fvdseUcJ', 'BR');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/20whHfvYkfnBA4fvdseUcJ/top-tracks?country=BR');
    });

    it('should return the correct JSON data from Promise', () => {
      promise.resolves({ name: 'artist' });
      const artist = spotify.artist.getTopTracks('73HkjgziMO6I83vFOS8mo1', 'BR');
      expect(artist.resolveValue).to.be.eql({ name: 'artist' });
    });
  });
});
