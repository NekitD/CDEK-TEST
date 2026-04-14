import { useEffect, useState } from 'react'


async function GetData(state){
    const promise = fetch('http://1e14c3489fcb.vps.myjino.ru:5000/api/v1');
    const answer = await promise;
    const data = await answer.json();
    state(data);
}


export default function fetcher(){
    let [newsData, newsState] = useState([]);
    useEffect(()=>{ GetData(newsState);}, []);
    return newsData;
}