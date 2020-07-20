import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Menu, NotFound} from './pages'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path='/' exact>
                <Menu/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
}