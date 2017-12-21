import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getArtist, getTopTracksFromArtist } from '../src/artists';

/* eslint no-unused-expressions: 0 */
sinonStubPromise(sinon);

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Artist', () => {
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
    it('should have getArtist method', () => {
      expect(getArtist).to.exist;
    });

    it('should have getTopTracksFromArtist', () => {
      expect(getTopTracksFromArtist).to.exist;
    });
  });

  describe('getArtist', () => {
    it('should call fetch method', () => {
      getArtist('73HkjgziMO6I83vFOS8mo1');
      expect(stubedFetch).to.be.calledOnce;
    });
    it('should be called with the correct URL', () => {
      getArtist('73HkjgziMO6I83vFOS8mo1');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/73HkjgziMO6I83vFOS8mo1');

      getArtist('20whHfvYkfnBA4fvdseUcJ');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/20whHfvYkfnBA4fvdseUcJ');
    });

    it('should return the correct JSON data from Promise', () => {
      promise.resolves({ name: 'artist' });
      const artist = getArtist('73HkjgziMO6I83vFOS8mo1');
      expect(artist.resolveValue).to.be.eql({ name: 'artist' });
    });
  });

  describe('getTopTracksFromArtist', () => {
    it('should call fetch method', () => {
      getTopTracksFromArtist('73HkjgziMO6I83vFOS8mo1');
      expect(stubedFetch).to.be.calledOnce;
    });
    it('should be called with the correct URL', () => {
      getTopTracksFromArtist('73HkjgziMO6I83vFOS8mo1', 'BR');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/73HkjgziMO6I83vFOS8mo1/top-tracks?country=BR');

      getTopTracksFromArtist('20whHfvYkfnBA4fvdseUcJ', 'BR');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/artists/20whHfvYkfnBA4fvdseUcJ/top-tracks?country=BR');
    });

    it('should return the correct JSON data from Promise', () => {
      promise.resolves({ name: 'artist' });
      const artist = getTopTracksFromArtist('73HkjgziMO6I83vFOS8mo1', 'BR');
      expect(artist.resolveValue).to.be.eql({ name: 'artist' });
    });
  });
});
