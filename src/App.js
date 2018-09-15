import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Heading } from './components/Components'
import Videos from './components/Videos'
import Video from './components/Video'
import Settings from './config/Settings'

const App = () => (
    <Router>
        <div className="container">
            <Heading settings={Settings}/>
            <div className="row">
                <div className="col-12">
                    <Route exact path="/" component={Videos} />
                    <Route path="/tag/:tagId" component={Videos} />
                    <Route path="/video/:videoId/:videoSlug" component={Video} />
                </div>
            </div>    
        </div>
    </Router>
);  

export default App;