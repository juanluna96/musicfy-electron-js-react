import React from 'react'
import { Grid } from 'semantic-ui-react';

import "./Loggedlayout.scss"

const Loggedlayout = ({ user }) => {
    return (
        <Grid className="logged-layout">
            <Grid.Row>
                <Grid.Column width={ 3 }>
                    <h2>Logged Layout</h2>
                </Grid.Column>
                <Grid.Column className="content" width={ 13 }>
                    <h2>TopBar</h2>
                    <h2>SideBar</h2>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={ 16 }>
                    <h2>Player</h2>
                </Grid.Column>
            </  Grid.Row>
        </Grid>
    )
}

export default Loggedlayout
