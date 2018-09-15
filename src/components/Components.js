import React from 'react'
import { Link } from 'react-router-dom'
import Settings from '../config/Settings'
import RelatedVideos from './RelatedVideos'

const getSlug = (title) => {
    return title.replace(/[^A-Za-z0-9-]+/g, "-").toLowerCase();
}

const Tags = (props) => (
    <div className="tags">
        {Object.values(props.tags).map(tag =>(
            <Link to={`/tag/${tag}`} className="badge badge-secondary mr-1" key={tag}>{tag}</Link>
        ))}
    </div>
)

const Heading = (props) => (
  <React.Fragment>
      <h1 className="h3"><Link to="/">{props.settings.title}</Link></h1>
      <p className="text-muted">{props.settings.description}</p>
  </React.Fragment>
)

const Breadcrumb = (props) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        {Object.values(props.items).map(item => (
            item.link ? <li className="breadcrumb-item small" key={item.title}><Link to={item.link}>{item.title}</Link></li> : <li className="breadcrumb-item small active" aria-current="page" key={item.title}>{item.title}</li>
        ))}
    </ol>
  </nav>
)

const VideoSM = (props) => (
  <div className={props.cols} key={props.video.id}>
      <div className="card mb-3">
          <Link to={`/video/${props.video.id}/${getSlug(props.video.title)}`}>
              <div className="embed-responsive embed-responsive-16by9">
                  <img className="embed-responsive-item card-img-top" src={props.video.thumbnail} alt={props.video.title} title={props.video.title} />
              </div>
          </Link>
          <div className="card-body small p-2">
                <div className="d-inline-block text-truncate" style={{maxWidth: '100%'}}>
                    <Link to={`/video/${props.video.id}/${getSlug(props.video.title)}`}>{props.video.title}</Link>
                </div>
                {props.video.date && <p className="small my-0">{props.video.date.toDate().toLocaleDateString(...Settings.toLocaleDateString)}</p>} 
                {props.video.tags && <Tags tags={props.video.tags} />}
          </div>
      </div>
  </div>
)

const VideoLG = (props) => (
  <React.Fragment>
      <div className="col-12 col-xl-9">
        <Breadcrumb items={[
            {
                title: 'All Videos',
                link: '/'
            },
            {
                title: props.video.title
            }
        ]} />
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" title={props.video.title} src={props.video.embed} allowFullScreen="allowfullscreen"></iframe>
        </div>
        {props.video.date && <p className="small my-2">{props.video.date.toDate().toLocaleDateString(...Settings.toLocaleDateString)}</p>}
        {props.video.description && <p className="small my-2">{props.video.description}</p>}
        {props.video.tags && <Tags tags={props.video.tags} />}
      </div>
      <div className="col-12 col-xl-3">
        <Breadcrumb items={[{
            title: 'Similar Videos'
        }]} />
        <div className="row">
        {props.video.tags && <RelatedVideos tags={Object.values(props.video.tags)} exclude={props.video.id} />}  
        </div>
      </div>
  </React.Fragment>
)

const Loading = (props) => (
    <div className="text-center w-100">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
)

export {Heading, Breadcrumb, VideoSM, VideoLG, Loading}