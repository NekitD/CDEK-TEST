import { useEffect, useState } from 'react'
import Elem from './newselem';
import './News.css'
import Loader from './skeleton'

async function GetNews(msetter, nsetter, page){
    const promise = fetch(`http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/short?perPage=3&page=${page}`);
    const answer = await promise;
    const data = await answer.json();
    msetter(data);
    nsetter(data.news);
}

function convertMonthYear() {
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

function custom_date(d) {
    const dat = new Date(d);
    var custom_months = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
    var date = dat.getDate() + " " + custom_months[ dat.getMonth() ];
    var time = dat.getHours() + ":" + dat.getMinutes();
    if(dat.getMinutes()%10 === 0){
        time += "0";
    }
    return  date + " " +time;
}


export default function NewsComponent(props){
    
    let [metaData, setMeta] = useState(0)
    let [newsData, setNews] = useState([]);
    let [pageNum, setPage] = useState(1);

    useEffect(()=>{
        GetNews(setMeta, setNews, pageNum);
    }, [metaData, newsData]);
    if (newsData.length === 0) {
        return (
        <div className="News">
            <Loader/>
        </div>);
    }
    console.log(newsData);
    return (
        <div className="News">
            <div className='Head'>
                <h1>Новости</h1>
                <h3>{convertMonthYear(newsData.minDatePublication)}</h3>
            </div>
            <hr className='headBorder'></hr>
            <div className='Content'> 
                {newsData.map((content, index)=>(
                    <Elem key={index}
                        pic={content.cover.images.hd}
                        publishedAt={custom_date(content.publishedAt)}
                        title={content.title}
                        rubrics={content.rubrics}
                        likeCount={content.likeCount}
                        viewCount={content.viewCount}
                    />
                ))}
            </div>
            <div className='Bottom'>
                <div className='bfields'>
                    <div className='pbfield'>
                        {(pageNum > 1) ? <button className="pageback" onClick={()=>{setPage(pageNum - 1)}}>←</button> : null}
                    </div>
                    <div className='pffield'>
                        {(pageNum < metaData.totalPages) ? <button className="pagefront" onClick={()=>{setPage(pageNum + 1)}}>→</button> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}