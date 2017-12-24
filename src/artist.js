export default function artist() {
  return {
    getArtist: id => this.request(`${this.apiURL}/artists/${id}`),
    getTopTracks: (id, country) => this.request(`${this.apiURL}/artists/${id}/top-tracks?country=${country}`),
  };
}
