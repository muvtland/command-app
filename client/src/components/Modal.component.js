import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress'

function getModalStyle() {
    const top = 35
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

export default function SimpleModal({ modalVisible, setModalVisible }) {
    const queue = useSelector(state => state.queue)

    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)


    const handleClose = () => {
        setModalVisible(false)
    }


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Текущая очередь</h2>
            <p id="simple-modal-description">
                {queue !== null  ? `В очереди ${queue}`: <CircularProgress />}
            </p>
        </div>
    );

    return (
        <div>
            <Modal
                open={modalVisible}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
