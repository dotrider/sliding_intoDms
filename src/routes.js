import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Join from './Components/Join/Join';
import Messages from './Components/Messages/Messages';

export default (
    <Switch>
        <Route exact path='/' component={Join}/>
        <Route path='/messages' component={Messages}/>
    </Switch>
)