
export default function NewsElem(props){
    return (
        <div className="NewsElem">
            <img>{props.pic}</img>
            <div className='elemContent'>
                {/* <Date>{props.publishedAt}</Date> */}
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