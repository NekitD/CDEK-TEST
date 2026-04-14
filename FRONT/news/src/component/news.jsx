import fetcher from "./datafetcher";

export default function NewsComponent(){
    let data = fetcher();
    console.log("TEST API EXISTS:\n");
    console.log(data);
    return (
        <div className="News">
        
        </div>
    );
}