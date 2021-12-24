import React, { useState } from 'react'
import ReactPlayer from 'react-player';
import "semantic-ui-css/semantic.min.css";
import { Slider } from "react-semantic-ui-range";
import { Grid, Progress, Icon, Input, Image } from 'semantic-ui-react';


import './Player.scss';

const Player = () => {
    const songData = {
        name: 'Efectos vocales',
        image: 'https://firebasestorage.googleapis.com/v0/b/musicfy-cfb06.appspot.com/o/albums%2F61e98ecb-ade4-4910-88e8-dee0ab8220e1?alt=media&token=fe8e1352-cf8a-4536-9bd8-ca3ab3a5d8d5',
        url: '',
        duration: 0,
        currentTime: 0,
        playing: false,
        volume: 0.5,
        muted: false,
    }

    const settings = {
        start: 2,
        min: 0,
        max: 10,
        step: 0.01,
        onChange: value => {
            setVolume(value);
        }
    };

    const [playedSeconds, setPlayedSeconds] = useState(100);
    const [totalSeconds, setTotalSeconds] = useState(120);
    const [volume, setVolume] = useState(5);
    const [playing, setPlaying] = useState(false);

    return (
        <div className="player">
            <Grid>
                <Grid.Column width={ 4 } className="left">
                    <Image src={ songData?.image } />
                    { songData?.name }
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
                    <Grid>
                        <Grid.Column width={ 2 }>
                            <VolumeIcon volume={ volume } />
                        </Grid.Column>
                        <Grid.Column width={ 14 }>
                            <Slider value={ volume } color="green" settings={ settings } />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Player

const VolumeIcon = ({ volume }) => {
    if (volume > 5) {
        return <Icon name='volume up' />
    } else if (volume > 0.01) {
        return <Icon name='volume down' />
    } else {
        return <Icon name='volume off' />
    }
}

