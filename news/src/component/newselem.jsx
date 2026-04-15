import Date from 'react'
import Loader from './skeleton'

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
            <img>{props.pic}</img>
            <div className='elemContent'>
                <h4>{props.publishedAt}</h4>
                <h2>{props.title}</h2>
                <div className='elemConBottom'>
                    {/* <div>{props.rubrics}</div> */}
                    <text>{props.likeCount}</text>
                    <text>{props.viewCount}</text>
                </div>
            </div>
        </div>
    );
}