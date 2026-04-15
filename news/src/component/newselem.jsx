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
                    <div className='news-elem__rubrics'>
                        {
                            (props.rubrics.map((rub, index)=>{
                                let slug = rub.slug;
                                let bstr = (slug === "top") ? "gold" : "lightblue";
                                bstr = (slug === "cdek-active") ? "lightgreen" : bstr;
                                bstr = (slug === "school") ? "pink" : bstr;
                                bstr = (slug === "skidki") ? "hsl(251, 76%, 76%)" : bstr;
                                let stl = {
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    color: '#666',
                                    backgroundColor: bstr
                                }
                                return (<div className='news-elem__rub' style={stl} 
                                    key={index}>
                                    {rub.name}
                                </div>)
                            })
                        )}
                    </div>
                    <div className='news-elem__stats'>
                        <div className='news-elem__like-btn'></div>
                        <text className='news-elem__like-count'>{props.likeCount}</text>
                        <div className='news-elem__view-icon'></div>
                        <text className='news-elem__view-count'>{props.viewCount}</text>
                    </div>
                </div>
            </div>
        </div>
    );
}