import React, { useEffect, useState } from 'react'
import { TextField, Button, MenuItem, Typography, Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecification, commandFetch, getQueue } from '../redux/actions'
import Success from '../components/Success.component'
import Modal from '../components/Modal.component'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 50
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textInput: {
        width: '100%'
    },
    title: {
        fontSize: 14,
    },
    button: {
        marginRight: 15
    },
    grid: {
        marginBottom: 20
    }
}))


export default () => {
    const specification = useSelector(state => state.specification)
    const loading = useSelector(state => state.loading)
    const result = useSelector(state => state.result)
    const dispatch = useDispatch()

    const [number, setNumber] = useState('')
    const [text, setText] = useState('')
    const [disable, setDisable] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)

    const classes = useStyles()


    useEffect(() => {
        dispatch(getSpecification())
    }, [dispatch])

    const onChangeNumber = e => {
        if (e.target.value > 0) {
            setNumber(e.target.value)
            if (text) {
                setDisable(false)
            }
        }
    }

    const onChangeText = e => {
        const value = e.target.value
        setText(value)
        if (number && value) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    const sendCommand = () => {
        dispatch(commandFetch({input_num: number, input_text: text}))
    }

    const queue = () => {
        setModalVisible(true)
        dispatch(getQueue())
    }

    if (result) {
        return <Success result={result}/>
    }

    if (loading && !modalVisible) {
        return (
            <div className={classes.root}>
                <Grid container spacing={3} justify="center">
                    <CircularProgress/>
                </Grid>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            {
                specification ?
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={7}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Имя Сервиса
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {specification.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Заголовок Сервиса
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {specification.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Описание Сервиса
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {specification.description}
                            </Typography>
                        </Grid>

                        <Grid item xs={7}>
                            <TextField onChange={onChangeNumber}
                                       type={specification.parameters.input[0].type}
                                       value={number}
                                       id="standard-basic"
                                       label={specification.parameters.input[0].title}
                                       className={classes.textInput}/>
                        </Grid>
                        <Grid item xs={7} className={classes.grid}>
                            <TextField id={specification.parameters.input[1].type}
                                       onChange={onChangeText}
                                       value={text}
                                       label={specification.parameters.input[1].title}
                                       className={classes.textInput}
                                       select>
                                {specification.parameters.input[1].items.map((item, i) => {
                                    return <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={7}>
                            <Button variant="contained"
                                    disabled={disable}
                                    color={!disable ? "primary" : "default"}
                                    onClick={sendCommand} className={classes.button}>
                                Запустить
                            </Button>
                            <Button variant="contained" color={"primary"} onClick={queue}>
                                Узнать Очередь
                            </Button>
                            {modalVisible && <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
                        </Grid>
                    </Grid>
                    : null
            }
        </div>

    )
}