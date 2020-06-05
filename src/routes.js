import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Join from './Components/Join/Join';
import Chat from './Components/Chat/Chat';

export default (
    <Switch>
        <Route exact path='/' component={Join}/>
        <Route path='/chat' component={Chat}/>
    </Switch>
)