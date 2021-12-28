import React from 'react'
import { Table, Icon } from 'semantic-ui-react'


import './ListSongs.scss'

const ListSongs = ({ songs, artist, albumImage, playerSong }) => {
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
                        <Song key={ song.id } song={ song } artist={ artist } albumImage={ albumImage } playerSong={ playerSong } />
                    ))
                }
            </Table.Body>
        </Table>
    )
}

const Song = ({ song, artist, albumImage, playerSong }) => {

    const onClick = () => {
        playerSong(song.id, albumImage, song.name, song.url, artist.name);
    }

    return (
        <Table.Row onClick={ onClick }>
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
