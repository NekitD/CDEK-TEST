import { useEffect, useState } from 'react'
import Elem from './newselem';
import './news.css'

async function GetNews(msetter, nsetter, page){
    const promise = fetch(`http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/short?perPage=3&page=${page}`);
    const answer = await promise;
    const data = await answer.json();
    msetter(data);
    nsetter(data.news);
}

function convertDate() {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    let mstr = "";
    switch (month)
    {
        case 1: mstr = "Январь"; break;
        case 2: mstr = "Февраль"; break;
        case 3: mstr = "Март"; break;
        case 4: mstr = "Апрель"; break;
        case 5: mstr = "Май"; break;
        case 6: mstr = "Июнь"; break;
        case 7: mstr = "Июль"; break;
        case 8: mstr = "Август"; break;
        case 9: mstr = "Сентябрь"; break;
        case 10: mstr = "Октябрь"; break;
        case 11: mstr = "Ноябрь"; break;
        case 12: mstr = "Декабрь"; break;
    }
    const year = dateObj.getFullYear();
    return mstr + " " + year;
}

export default function NewsComponent(props){
    
    let [metaData, setMeta] = useState(0)
    let [newsData, setNews] = useState([]);
    let pageNum = props.pageNum;

    useEffect(()=>{
        GetNews(setMeta, setNews, pageNum);
    }, []);

    console.log(pageNum);
    console.log(newsData.totalPages);
    return (
        <div className="News">
            <div className='head'>
                <h1>Новости</h1>
                <h3>{convertDate(newsData.minDatePublication)}</h3>
            </div>
            <hr className='headBorder'></hr>
            <div className='content'>
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
            <div className='bottom'>
                <div className='buttons'>
                    {(pageNum > 1) ? <button className="pageback" onClick={()=>{pageNum -= 1}}>←</button> : null}
                    {(pageNum < metaData.totalPages) ? <button className="pagefront" onClick={()=>{pageNum += 1}}>→</button> : null}
                </div>
            </div>
        </div>
    );
}