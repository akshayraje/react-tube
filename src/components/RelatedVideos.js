import React, { Component } from 'react'
import firebase from '../config/Firebase'
import Settings from '../config/Settings'
import { VideoSM, Loading } from './Components'

class RelatedVideos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  getRelated(tags, excludeId) {
        let items = [];
        let filteredItems = [];

        tags.forEach(tag => {
            firebase.firestore().collection("videos").orderBy("date", "desc")
            .where('tags', "array-contains", tag)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(doc.id !== excludeId){
                        if(!Object.keys(items).includes(doc.id)){
                            items[doc.id] = doc.data();
                            items[doc.id].id = doc.id;
                            items[doc.id].frequency = 1;
                        } else {
                            items[doc.id].frequency++;
                        }

                    }
                    if(Object.keys(filteredItems).length < Settings.maxRelated && items[doc.id] && items[doc.id].frequency > Math.max((Object.keys(filteredItems).length / 3), 1)){
                        filteredItems[doc.id] = items[doc.id];
                        this.setState({
                            isLoaded: true,
                            items: filteredItems
                        });
                    }
                });
            })
            .catch(error => {
                console.error(error.message);
            });
        });
  }

  componentDidMount() {
      this.getRelated(this.props.tags, this.props.exclude) 
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <Loading />;
    }
    return (
        <React.Fragment>
            {Object.keys(items).map(item => (
                <VideoSM video={items[item]} key={item} cols="col-12 col-md-4 col-xl-12" />
            ))}
        </React.Fragment>  
    )
  }
}

export default RelatedVideos