import React from 'react'
import { Grid } from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom';

import "./Loggedlayout.scss"

import RouterComponent from '../../routes/Routes';

const Loggedlayout = ({ user }) => {
    return (
        <BrowserRouter>
            <Grid className="logged-layout">
                <Grid.Row>
                    <Grid.Column width={ 3 }>
                        <h2>Logged Layout</h2>
                    </Grid.Column>
                    <Grid.Column className="content" width={ 13 }>
                        <h2>TopBar</h2>
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
