import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player';
import "semantic-ui-css/semantic.min.css";
import { Slider } from "react-semantic-ui-range";
import { Grid, Progress, Icon, Input, Image } from 'semantic-ui-react';


import './Player.scss';

const Player = ({ songData }) => {
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
    const [volume, setVolume] = useState(1);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (songData) {
            setPlaying(true);
        }
    }, [songData]);

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
                            playing
                                ? <Icon name="pause circle outline" size="big" onClick={ () => setPlaying(false) } />
                                : <Icon name="play circle outline" size="big" onClick={ () => setPlaying(true) } />
                        }
                    </div>
                    <Progress
                        progress='value'
                        value={ playedSeconds }
                        total={ totalSeconds }
                        size='tiny'
                    />
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

