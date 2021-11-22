import React from 'react'
import { Grid } from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom';

import "./Loggedlayout.scss"

import RouterComponent from '../../routes/Routes';
import Menuleft from '../../components/Menu/Left/';
import TopBar from '../../components/TopBar';

const Loggedlayout = ({ user }) => {
    return (
        <BrowserRouter>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={ 4 }>
                        <Menuleft user={ user } />
                    </Grid.Column>
                    <Grid.Column className="content" width={ 12 }>
                        <TopBar user={ user } />
                        <RouterComponent />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={ 16 }>
                        <h2>Player</h2>
                    </Grid.Column>
                </  Grid.Row>
            </Grid>
        </BrowserRouter>
    )
}

export default Loggedlayout
