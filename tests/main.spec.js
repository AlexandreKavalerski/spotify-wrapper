import chai, { expect } from 'chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
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
        let fetchedStub;
        let promise;

        beforeEach(() => {
            fetchedStub = sinon.stub(global, 'fetch');
            promise = fetchedStub.returnsPromise();
        });
        afterEach(() => {
            fetchedStub.restore();
        });

        it('should call fetch function', () => {
            const artists = search();
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should receive the correct url to fetch', () => {
            context('passing one type', () => {
                const artists = search('Muse', 'artist');
                expect(fetchedStub).to.have.been.calledWith('api.spotify.com/v1/search?q=Muse&type=artist');
                const albums = search('Muse', 'album')
                expect(fetchedStub).to.have.been.calledWith('api.spotify.com/v1/search?q=Muse&type=album');
            });
            
            context('passing more than one type', () => {
                const artistsAndAlbums = search('Muse', ['artist', 'album']);

                expect(fetchedStub).to.have.been.calledWith('api.spotify.com/v1/search?q=Muse&type=artist,album')
            });
        });

        it('should returns the JSON data from the Promise', () => {
            promise.resolves({ body: 'json' });
            const artists = search('Muse', 'artist');

            expect(artists.resolveValue).to.be.eql({ body: 'json' });
        });
    });
});
