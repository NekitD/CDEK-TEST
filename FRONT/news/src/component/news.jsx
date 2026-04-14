import { useEffect, useState } from 'react'
import Elem from './newselem';


export default function NewsComponent(){
    let [newsData, newsState] = useState([]);
    let [pageNum, numState] = useState(1);
    let [pageCount, countState] = useState(0);
    
    useEffect(()=>{
        async function GetNews(page){
            const promise = fetch(`http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/short?perPage=3&page=${page}`);
            const answer = await promise;
            const data = await answer.json();
            console.log(data);
            newsState(data.news);
            countState(data.totalPages);
            numState(page);
        }
        GetNews(pageNum);
    }, []);

    return (
        <div className="News">
            {newsData.map((content, index)=>{
                <Elem key={index}
                    pic={content.pic}
                    dat={content.publishedAt}
                    txt={content.tittle}
                    tags={content.rubrics}
                    pop={content.pop}
                    likeCount={content.likeCount}
                    viewCount={content.viewCount}
                />
            })}
        </div>
    );
}