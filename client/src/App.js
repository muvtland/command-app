import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar.component'
import { Container } from '@material-ui/core'
import { useRoutes } from './routes'

export default () => {
    const routes = useRoutes()

    return (
        <Router>
            <Navbar/>
            <Container fixed>
                {routes}
            </Container>
        </Router>
    )
}
