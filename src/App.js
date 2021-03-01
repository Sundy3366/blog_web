import React from 'react'
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom'
import {PrivateRoute} from '@utils'
import history from '@history'
import '@css/common.scss'
import Login from '@components/user/Login'
import Register from '@components/user/Register'
import Dashboard from '@components/layout'
import Edit from '@components/editor'
import Article from '@components/article/Article'

function App() {
    return (
        <>
            <Router history={history}>
                <Switch>
                    <Route exact path="/"><Login/></Route>
                    <PrivateRoute path='/login' component={Login} exact/>
                    <PrivateRoute path='/register' component={Register} exact/>
                    <PrivateRoute path='/home' component={Dashboard}/>
                    <PrivateRoute path='/edit/:articleId' component={Edit}/>
                    <PrivateRoute path='/preview/:articleId' component={Article}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
