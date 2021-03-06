import React from 'react'
import { Modal, Icon } from 'semantic-ui-react';

import './BasicModal.scss'

const Basicmodal = ({ title, children, size = "tiny", show, setShow }) => {
    const onClose = () => {
        setShow(false);
    }

    return (
        <Modal open={ show } onClose={ onClose } className="basic-modal" size={ size }>
            <Modal.Header>
                <h3>{ title }</h3>
                <Icon name="close" onClick={ onClose } />
            </Modal.Header>
            <Modal.Content>
                { children }
            </Modal.Content>
        </Modal>
    )
}

export default Basicmodal
