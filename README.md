# Write Spotify Added-to-playlist timestamps to file created/modified metadata

1. Rip songs from Spotify playlist (using [Spytify](https://github.com/jwallet/spy-spotify/))
2. Export your playlist (using [Exportify](https://github.com/watsonbox/exportify))
3. Run this tool to write the `added-to-playlist` timestamp into the file itself.

## Installation

1. Run `npm install`

2. Adjust settings in `index.js`:

```javascript
const tracksFolder = '~/Music/Ripped\ from\ Spotify';
const columnSeperator = '","';
const playlistFile = './tracks.csv';
```

3. Run `node index.js`