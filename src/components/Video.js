import React, { Component } from 'react'
import MetaTags from 'react-meta-tags'
import firebase from '../config/Firebase'
import Settings from '../config/Settings'
import { VideoLG, Loading } from './Components'

class Video extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: null,
      url: this.props.match.url
    };
  }

  fetchData(match) {
      firebase.firestore().collection("videos")
          .doc(match.params.videoId)
          .get()
          .then(querySnapshot => {
              this.setState({
                  isLoaded: true,
                  item: {
                      id: match.params.videoId,
                      ...querySnapshot.data()
                  }
              });
          })
          .catch(error => {
              this.setState({
                  error: error
              });
          });
  }

  componentWillReceiveProps(nextProps) {
      if(this.props.match.url !== nextProps.match.url){
          this.setState({
              error: null,
              isLoaded: false,
              items: [],
              url: nextProps.match
          });
          this.fetchData(nextProps.match);
      }
  }

  componentDidMount() {
      this.fetchData(this.props.match);
  }

  render() {
    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <Loading />;
    }
    return (
          <React.Fragment>
              <MetaTags>
                  <title>{item.title} - {Settings.title}</title>
                  <meta name="description" content={`${item.description || item.title}. ${Settings.title} - ${Settings.description}`} />
              </MetaTags>
              <div className="row">
                  <VideoLG video={item} />
              </div>
          </React.Fragment>          
    )
  }
}

export default Video