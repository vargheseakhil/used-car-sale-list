import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CarDetail from './components/CarDetail'
import Home from './components/Home'
import NotFound from './components/404'
import Header from './components/Header'
import Footer from './components/Footer'
import { Provider } from './components/context'


const App = () => (
  <Provider >
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/car/:stockNumber" component={CarDetail} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
        <Footer />
    </Router>
  </Provider>
)

export default App
