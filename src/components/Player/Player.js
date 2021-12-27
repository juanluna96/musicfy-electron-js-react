import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player';
import "semantic-ui-css/semantic.min.css";
import { Slider } from "react-semantic-ui-range";
import { Grid, Progress, Icon, Input, Image } from 'semantic-ui-react';
import firebase from '../../db/Firebase';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import './Player.scss';

const db = firebase.firestore();

const Player = ({ songData, playerSong }) => {
    const playerRef = useRef(null);

    const settings = {
        start: 1,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: value => {
            setVolume(value);
        }
    };

    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [lastSong, setLastSong] = useState(null);
    const [volume, setVolume] = useState(1);
    const [playing, setPlaying] = useState(false);

    const settings_progress = {
        start: 0,
        min: 0,
        max: playerRef.current ? playerRef.current.getDuration() : 0,
        step: 1,
        onChange: value => onChangeSlider(value)
    };

    const onChangeSlider = (value) => {
        // Get the time left between slider and the states given by react player
        const timeDifference = parseInt(playerRef.current.getDuration() - value);
        const timeLeft = parseInt(totalSeconds - playedSeconds);
        // Calculate the bit rate between 2 times
        const timeMoved = parseFloat((timeLeft / timeDifference).toFixed(2));
        if (timeMoved >= 1.1 || timeMoved < 0.9) {
            playerRef.current.seekTo(value);
        }
    }

    useEffect(() => {
        if (songData) {
            setPlaying(true);
        }
    }, [songData]);

    const moveTime = (time) => {
        if (time === 'back') {
            // changes
            playerRef.current.seekTo(playedSeconds - 5);
        } else if (time === 'fwd') {
            // changes
            playerRef.current.seekTo(playedSeconds + 5);
        }
    };

    // Get song info
    const getSongInfo = async (songId) => {
        const songRef = db.collection('songs').doc(songId);
        const current_song = await songRef.get().then(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return current_song;
    }

    // Get the next song of the album
    const getNextSongOfAlbum = async (albumId) => {
        console.log(albumId);
        return await db.collection('songs').where('album', '==', albumId).get().then(snapshot => {
            const songs = [];
            snapshot.docs.map(doc => {
                if (doc.id !== songData.id) {
                    songs.push({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            });
            return songs;
        });
    }

    const playRandomSong = async () => {
        // Get next song of the same album
        const song = await getSongInfo(songData.id);
        // Get songs that are in the same album
        let [next_song] = await getNextSongOfAlbum(song.album);
        console.log(next_song);
        // Set the next song
        playerSong(next_song.id, songData.image, next_song.name, next_song.url);
    }

    const moveSong = (movement) => {
        // Save the last song played

        switch (movement) {
            case 'forward':
                setLastSong({
                    id: songData.id,
                    image: songData.image,
                    name: songData.name,
                    url: songData.url
                });
                // Play other song of the same album
                playRandomSong();
                break;
            case 'backward':
                // Go back to the previus song
                if (lastSong) {
                    playerSong(lastSong.id, lastSong.image, lastSong.name, lastSong.url);
                } else {
                    // Choose a random song of the same album
                    playRandomSong();
                }
                break;

            default:
                break;
        }
    }

    const onProgress = (state) => {
        setPlayedSeconds(state.playedSeconds);
        setTotalSeconds(state.loadedSeconds);
    }

    return (
        <div className="player">
            <Grid>
                <Grid.Column width={ 4 } className="left">
                    {
                        songData &&
                        <>
                            <Image src={ songData?.image } />
                            { songData?.name }
                        </>
                    }
                </Grid.Column>
                <Grid.Column width={ 8 } className="center">
                    <div className="controls">
                        {
                            songData &&
                            <>
                                <Icon className="size" name="fast backward" size="big" onClick={ () => moveSong('backward') } />
                                <Icon className="size" name="undo alternate" size="big" onClick={ () => moveTime('back') } />
                            </>
                        }
                        {
                            playing
                                ? <Icon name="pause circle outline" size="big" onClick={ () => setPlaying(false) } />
                                : <Icon name="play circle outline" size="big" onClick={ () => setPlaying(true) } />
                        }
                        { songData &&
                            <>
                                <Icon className="size" name="redo alternate" size="big" onClick={ () => moveTime('fwd') } />
                                <Icon className="size" name="fast forward" size="big" onClick={ () => moveSong('forward') } />
                            </>
                        }
                    </div>
                    <div>
                        <Slider
                            ref={ playerRef }
                            style={ {
                                thumb: {
                                    width: "0px",
                                    height: "0px"
                                }
                            } }
                            disabled={ !songData }
                            value={ playerRef.current ? playerRef.current.getCurrentTime() : 0 }
                            color="green"
                            settings={ settings_progress } />
                    </div>
                </Grid.Column>
                <Grid.Column width={ 4 } className="right">
                    {
                        songData &&
                        <Grid>
                            <Grid.Column width={ 2 }>
                                <VolumeIcon volume={ volume } />
                            </Grid.Column>
                            <Grid.Column width={ 14 }>
                                <Slider value={ volume } color="green" settings={ settings } />
                            </Grid.Column>
                        </Grid>
                    }
                </Grid.Column>
                <ReactPlayer
                    ref={ playerRef }
                    className="react-player"
                    url={ songData?.url }
                    height="0"
                    width="0"
                    playing={ playing }
                    volume={ volume }
                    onProgress={ onProgress }
                />
            </Grid>
        </div>
    )
}

export default Player

const VolumeIcon = ({ volume }) => {
    if (volume > 0.5) {
        return <Icon name='volume up' />
    } else if (volume > 0.01) {
        return <Icon name='volume down' />
    } else {
        return <Icon name='volume off' />
    }
}

