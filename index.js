var readline = require('linebyline'),
    fs = require('fs'),
    utimes = require('utimes');

const logFile = 'log.txt';
const tracksFolder = './tracks';
const columnSeperator = '","';
const playlistFile = './playlist.csv';

const rl = readline(playlistFile);

fs.truncate(logFile, 0, function () {
    console.log(`Cleared ${logFile}`)
});

let logError = function (track) {
    fs.appendFile(logFile, track.join(columnSeperator) + '\n', function (err) {
        if (err) {
            console.warn(err);
        } else {
            // console.log(`Wrote file to ${logFile}`);
        }
    })
}

let parseFile = function (track) {
    let artists = track[3];
    let mainArtist = artists.split(', ')[0];
    let trackTitle = track[1];
    let uri = track[0];
    let filename = `${mainArtist} - ${trackTitle}`;
    // filename = `${artists} - ${trackTitle}`;
    filename = filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    filename = filename.replace("/", "");
    let fileExt = 'mp3';
    let filePath = `${tracksFolder}/${filename}.${fileExt}`;
    let trackDate = track[15].slice(0, -1);
    fs.stat(filePath, (error, stats) => {
        if (error) {
            logError(track);
            console.warn(filename);
        }
        else {
            let date = + new Date(trackDate);
            if (date != stats.birthtimeMs) {
                console.log(filename + ' has been changed (if this persists, it has a possible duplicate)');
            }

            utimes.utimes(filePath, {
                btime: date,
                atime: date,
                mtime: date
            });
        }
    });
}

rl.on('line', function (line, lineCount, byteCount) {
    // do something with the line of text
    let track = line.split(columnSeperator);
    parseFile(track);
})

    .on('error', function (e) {
        // something went wrong
        console.warn(e);
    });