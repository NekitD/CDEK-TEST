import { useEffect, useState } from 'react'
import Elem from './newselem';
import './News.css'
import Loader from './skeleton'

async function GetNews(msetter, nsetter, lsetter, lmsetter, page){
    const promise = fetch(`http://1e14c3489fcb.vps.myjino.ru:5000/api/v1/news/feed/company/short?perPage=3&page=${page}`);
    const answer = await promise;
    const data = await answer.json();
    msetter(data);
    nsetter(data.news);
    lsetter(false);
    lmsetter(false);
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

function convertDate(d) {
    const dat = new Date(d);
    let custom_months = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
    let date = dat.getDate() + " " + custom_months[ dat.getMonth() ];
    let time = dat.getHours() + ":" + dat.getMinutes();
    if(dat.getMinutes()%10 === 0){
        time += "0";
    }
    return  date + " " + time;
}

export default function NewsComponent(props){

    const API_BASE_URL = 'http://1e14c3489fcb.vps.myjino.ru:5000';
    
    let [metaData, setMeta] = useState(null)
    let [newsData, setNews] = useState([]);
    let [pageNum, setPage] = useState(1);
    let [loading, setLoad] = useState(true);
    let [mloading, setmLoad] = useState(true);

    useEffect(()=>{
        setNews([]);
        setLoad(true);
        setmLoad(true);
        GetNews(setMeta, setNews, setLoad, setmLoad, pageNum);
    }, [pageNum]);
    
    if (mloading) {
        return (
        <div className="News">
            <Loader/>
        </div>);
    }
    return (
        <div className="news">
            <div className='news__header'>
                <h1 className='news__title'>Новости</h1>
                <h3 className='news__month'>{convertMonthYear(newsData.minDatePublication)}</h3>
            </div>
            <hr className='news__divider'></hr>
            <div className='news__content'> 
                {
                    (!loading) ?
                        newsData.map((content, index)=>(
                        <Elem key={content.id || index}
                            pic={API_BASE_URL + content.cover.images[0].l}
                            publishedAt={convertDate(content.publishedAt)}
                            title={content.title}
                            rubrics={content.rubrics}
                            likeCount={content.likeCount}
                            viewCount={content.viewCount}
                        />
                    )) : (<Loader/>)}
            </div>
            <div className='news__footer'>
                <div className='news__buttons'>
                    <div className='news__button-prev'>
                        {(pageNum > 1) ? 
                        <div className="news__prev-btn" onClick={
                            ()=>{setPage(pageNum - 1);}}>←</div> : null}
                    </div>
                    <div className='news__button-next'>
                        {(pageNum < metaData.totalPages) ? <div className="news__next-btn" onClick={
                            ()=>{setPage(pageNum + 1);}}>→</div> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}