import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import BlurCircularIcon from '@material-ui/icons/BlurCircular'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

export default () => {
    const classes = useStyles()
    const history = useHistory()

    const goTo = path => {
        history.push(path)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => goTo('/')}>
                    <BlurCircularIcon fontSize="large"/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Веб-Сервисы
                </Typography>
            </Toolbar>
        </AppBar>
    )
}





