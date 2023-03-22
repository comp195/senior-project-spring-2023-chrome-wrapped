/*global chrome*/
const runScript = () => {

    chrome.history.search({
        text: '',
        maxResults: 0,
        startTime: 0
    },
        (data) => {
            data.forEach(element => {
                // chrome.history.getVisits(
                //     // {url: element.url}, 
                //     // (output) => {
                //     //     console.log(output);
                //     // }
                // )
                console.log(element.title)
            });
            console.log(data.length)
        }
    )
}
//Returns a promise to an array the top {topNum} items within the given range. Defaults to top 5 visits of the full history
    const topVisits = (topNum = 5, days = -1) => {
        //Comparison functions for sorting
        const compareVisits = (historyItem1, historyItem2) => {
            return(historyItem2.visitCount - historyItem1.visitCount);
        }
        return new Promise((resolve, reject) => {
            try {
                //https://developer.chrome.com/docs/extensions/reference/history/
                let start = new Date()
                
                if(days < 0){
                    start.setTime(0)
                }else{
                    start.setDate(start.getDate() - days)
                }
                chrome.history.search({text: '', maxResults: 0, startTime:start.getTime()}, (data) =>{
                    //Find top 5 visits
                    data.sort(compareVisits);
                    if(data.length >= topNum){
                        resolve(data.slice(0, topNum));
                    } else{
                        resolve(data.slice(0, data.length));
                    }
                })
            } catch(ex){
                reject(ex);
            }

        })
    }
    //Get list of all domains, combine visit counts for multiple visits to domains
    const getDomains = () => {
        return new Promise((resolve, reject) => {
            try {             
                chrome.history.search({text: '', maxResults: 0, startTime: 0}, (data) =>{
                    let domainList = [data[0]]
                    domainList[0].url = ((new URL(data[0].url)).hostname)
                    //Sort by URL
                    data.sort((historyItem1, historyItem2) => {
                        return(historyItem2.url - historyItem1.url);
                    });
                    // console.log("Data List", data)
                    //Aggregate by domain
                    for(let i = 1; i < data.length; i++){
                        //If domain already in list
                        //console.log(data[i].url)
                        //if((new URL(data[i].url)).hostname === (domainList[domainList.length-1].url)){
                        try{
                            domainList.find(o => o.url === (new URL(data[i].url)).hostname).visitCount += data[i].visitCount
                        }
                        catch{
                            //Note: lastVisit and title will be horribly incorrect but it's okay, we just need visitCount
                            //console.log((new URL(data[i].url)).hostname, " does not equal ", domainList[domainList.length-1].url)
                            domainList.push(data[i])
                             domainList[domainList.length-1].url = ((new URL(data[i].url)).hostname)
                        }
                    }
                    // data.sort((historyItem1, historyItem2) => {
                    //     return(historyItem2.visitCount - historyItem1.visitCount);
                    // });
                    domainList.sort((historyItem1, historyItem2) => {
                        return(historyItem2.visitCount - historyItem1.visitCount);
                    });
                   console.log("Domain List", domainList)
                    //console.log("Data List", data)
                    resolve(domainList)
                })
            } catch(ex){
                reject(ex);
            }
        })
    }
    //Returns a promise to a list of visits to a specific url 
    const getVisitsToDomain = (url = "https://developer.mozilla.org") =>{
        return new Promise((resolve, reject) => {
            try {
                //https://developer.chrome.com/docs/extensions/reference/history/ 
                chrome.history.search({text: '', maxResults: 0, startTime: 0}, (data) =>{
                    let checkDomain = (new URL(url)).hostname
                    let domainList = []
                    for(let i = 0; i < data.length; i++){
                        if((new URL(data[i].url)).hostname == checkDomain){
                            domainList.append(data[i])
                        }
                    }
                    console.log(domainList)
                    resolve(domainList)
                })
            } catch(ex){
                reject(ex);
            }
        })
    }

export default {topVisits, getVisitsToDomain, getDomains}