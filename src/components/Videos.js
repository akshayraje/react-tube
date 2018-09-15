import React, { Component } from 'react'
import MetaTags from 'react-meta-tags'
import firebase from '../config/Firebase'
import Settings from '../config/Settings'
import { Breadcrumb, VideoSM, Loading } from './Components'

class Videos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      url: this.props.match.url
    };
  }

  querySnapshot(querySnapshot, countTags = false) {
      let items = {}
      let tagCount = {}
      querySnapshot.forEach(doc => {
          items[doc.id] = doc.data();
          items[doc.id].id = doc.id;
          if(countTags){
            doc.data().tags.forEach((tag) => {
                if(tagCount[tag]){
                    tagCount[tag]++;
                } else {
                    tagCount[tag] = 1;
                }                
            })
          }
      });
      this.setState({
          isLoaded: true,
          items: items
      });        
  }

  fetchData(match) {
      if(match.path === '/'){
          firebase.firestore().collection("videos").orderBy("date", "desc")
          .get()
          .then(querySnapshot => {
              this.querySnapshot(querySnapshot, true)
          })
          .catch(error => {
              this.setState({
                  error: error
              });
          });
      } else if (match.path === '/tag/:tagId'){
          firebase.firestore().collection("videos").orderBy("date", "desc")
          .where('tags', "array-contains", match.params.tagId)
          .get()
          .then(querySnapshot => {
              this.querySnapshot(querySnapshot)
          })
          .catch(error => {
              this.setState({
                  error: error
              });
          });
      }
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <Loading />;
    }
    var breadCrumbItems = [
        {
            title: 'All Videos'
        }  
    ]
    if(this.props.match.path === '/tag/:tagId'){
        breadCrumbItems[0].link = '/';
        breadCrumbItems[1] = {
            title: this.props.match.params.tagId
        }
    }
    return (
      <React.Fragment>
          <MetaTags>
            <title>{this.props.match.path === '/tag/:tagId' ? `${this.props.match.params.tagId} videos - ${Settings.title}` : `${Settings.title} - ${Settings.description}`}</title>
            <meta name="description" content={this.props.match.path === '/tag/:tagId' ? `${this.props.match.params.tagId} videos - ${Settings.title}` : `${Settings.title} - ${Settings.description}`} />
          </MetaTags>
          <Breadcrumb items={breadCrumbItems} />
          <div className="row">
              {Object.keys(items).map(item => (
                  <VideoSM video={items[item]} key={item} cols="col-12 col-md-4 col-xl-3" />
              ))}
          </div>
      </React.Fragment>          
    )
  }
}

export default Videos