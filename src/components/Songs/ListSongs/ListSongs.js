import React from 'react'
import { Table, Icon } from 'semantic-ui-react'


import './ListSongs.scss'

const ListSongs = ({ songs, albumImage }) => {
    return (
        <Table inverted className="list-songs">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>
                        Nombre de la canción
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    songs.map(song => (
                        <Song key={ song.id } song={ song } albumImage={ albumImage } />
                    ))
                }
            </Table.Body>
        </Table>
    )
}

const Song = ({ song, albumImage }) => {
    return (
        <Table.Row >
            <Table.Cell collapsing>
                <Icon name="play circle outline" />
            </Table.Cell>
            <Table.Cell>
                { song.name }
            </Table.Cell>
        </Table.Row>
    )
}

export default ListSongs
