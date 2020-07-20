import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useDispatch } from 'react-redux'
import { removeResult } from '../redux/actions'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 50
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

export default ({result}) => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    const goTo = () => {
        dispatch(removeResult())
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <h1>Ваша комманда успешно сработала</h1>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        {result}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Button variant="contained" color="primary" onClick={goTo}>
                            Go back Home
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}