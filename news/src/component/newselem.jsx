import Date from 'react'
import Loader from './skeleton'
import './newselem.css'

export default function NewsElem(props){

    if(props === null){
        return(
            <div className="NewsElem">
                <Loader />
            </div>
        );
    }

    return (
        <div className="NewsElem">
            <img className='elemPic' src={props.pic}/>
            <div className='elemContent'>
                <div className='elemConMain'>
                    <div className='pubDate'>{props.publishedAt}</div>
                    <h2 className='title'>{props.title}</h2>
                </div>
                <div className='elemConBottom'>
                    <div className='elemRubrics'>props.rubrics</div>
                    <div className='elemPopInfo'>
                        <button className='likeButton'/>
                        <text className='likeNum'>{props.likeCount}</text>
                        <div className='viewIcon'/>
                        <text className='viewNum'>{props.viewCount}</text>
                    </div>
                </div>
            </div>
        </div>
    );
}