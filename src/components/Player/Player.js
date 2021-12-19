import React from 'react'
import ReactPlayer from 'react-player';
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

    return (
        <div className="player">
            <Grid>
                <Grid.Column width={ 4 } className="left">
                    <Image src={ songData?.image } />
                    { songData?.name }
                </Grid.Column>
                <Grid.Column width={ 8 } className="center">
                    <h2>Center</h2>
                </Grid.Column>
                <Grid.Column width={ 4 } className="right">
                    <h2>Right</h2>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Player
