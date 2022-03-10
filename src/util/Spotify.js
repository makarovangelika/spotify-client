let token;
const clientId = 'YOUR CLIENT ID';
const redirectUri = window.location.href;
let Spotify = {
    getAccessToken() {
        if (token) {
            return token;
        }
        const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiredinMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (tokenMatch && expiredinMatch) {
            token = tokenMatch[1];
            const expiredin = Number(expiredinMatch[1]);
            window.setTimeout(
                () => token = '',
                expiredin * 1000
            );
            window.history.pushState('Access Token', null, '/');
            return token;
        } else {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = url;
        }
    },
    search(term) {
        const token = Spotify.getAccessToken();
        let endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }
        const token = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${token}`
        };
        let userId;
        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response =>
            response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                method: 'POST',
                body: JSON.stringify({ name: name }),
                headers: headers
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: trackUris })
                })
            });
        });
    }
}
export default Spotify;
