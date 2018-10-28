import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from './Nav/Nav'
import Xlate from './Xlate/Xlate'
import Jwt from './Jwt/Jwt'

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path='/cryptolabs' component={Xlate} />
        <Route exact path='/cryptolabs/xlate' component={Xlate} />
        <Route exact path='/cryptolabs/jwt' component={Jwt} />
      </Switch>
    </div>
  );
}

export default App;