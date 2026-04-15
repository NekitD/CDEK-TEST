import Date from 'react'
import Loader from './skeleton'
import './newselem.css'

export default function NewsElem(props){

    if(props === null){
        return(
            <div className="news-elem">
                <Loader />
            </div>
        );
    }

    return (
        <div className="news-elem">
            <img className='news-elem__image' src={props.pic}/>
            <div className='news-elem__content'>
                <div className='news-elem__main'>
                    <div className='news-elem__date'>{props.publishedAt}</div>
                    <h2 className='news-elem__title'>{props.title}</h2>
                </div>
                <div className='news-elem__footer'>
                    <div className='news-elem__rubrics'>props.rubrics</div>
                    <div className='news-elem__stats'>
                        <button className='news-elem__like-btn'/>
                        <text className='news-elem__like-count'>{props.likeCount}</text>
                        <div className='news-elem__view-icon'/>
                        <text className='news-elem__view-count'>{props.viewCount}</text>
                    </div>
                </div>
            </div>
        </div>
    );
}