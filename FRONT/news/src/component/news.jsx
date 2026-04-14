import { useEffect, useState } from 'react'
import Elem from './newselem';
import './news.css'

async function GetNews(setter, page){
    const promise = fetch(`http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/short?perPage=3&page=${page}`);
    const answer = await promise;
    const data = await answer.json();
    setter(data.news);
}

export default function NewsComponent(props){
    
    let [newsData, setNews] = useState([]);
    const pageNum = props.pageNum;

    useEffect(()=>{
        GetNews(setNews, pageNum);
    }, []);

    return (
        <div className="News">
            {newsData.map((content, index)=>{
                <Elem key={index}
                    pic={content.pic}
                    dat={content.publishedAt}
                    title={content.title}
                    rubrics={content.rubrics}
                    likeCount={content.likeCount}
                    viewCount={content.viewCount}
                />
            })}
        </div>
    );
}