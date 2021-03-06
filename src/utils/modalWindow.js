import React from 'react'
import Modal from 'react-awesome-modal'
import {Close} from "../components/Styles";
import close from '../img/close.png'

const ModalWrapper = (props) => {
    return(
        <Modal visible={props.visible} height={props.height} width={props.width} onClickAway={props.onModal}>
            <Close onClick={props.onModal}>
                <img src={close} alt="x"/>
            </Close>
            {props.children}
        </Modal>
    )
}

export default ModalWrapper