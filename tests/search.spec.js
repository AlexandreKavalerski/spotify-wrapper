import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';
import { API_URL } from '../src/config';


chai.use(sinonChai);
sinonStubPromise(sinon);

/* eslint no-unused-expressions: 0 */
global.fetch = require('node-fetch');

describe('Search', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });
  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });
    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        search('Muse', 'artist');
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=artist`);
        search('Muse', 'album');
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=album`);
      });

      context('passing more than one type', () => {
        search('Muse', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=artist,album`);
      });
    });

    it('should returns the JSON data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Muse', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=artist`);

      searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=artist`);
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=album`);

      searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=album`);
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=track`);

      searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=track`);
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      searchPlaylists('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      searchPlaylists('Muse');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=playlist`);

      searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=playlist`);
    });
  });
});
