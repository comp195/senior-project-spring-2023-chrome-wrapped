/*global chrome*/
//Given a substring, returns promise of number of total visits of all time to sites containing that substring
const searchAggregate = (searchQuery) => {
    return new Promise((resolve, reject) => {
        try{
            chrome.history.search({text: searchQuery, maxResults: 0, startTime:-1}, (data) =>{
                let totalVisitCount = 0
                data.forEach(entry=>{totalVisitCount += entry.visitCount})
                resolve(totalVisitCount)
            })
        }catch(ex){
            reject(ex)
        }
    })
}
const urlToDomain = (url) =>{
    return((new URL(url)).hostname)
}
//Given a substring, returns array of visitItems
const searchRecent = (searchQuery = '', topNum = 5) => {
    const compareLastVisit = (historyItem1, historyItem2) => {
        return(historyItem2.visitCount - historyItem1.visitCount);
    }
    return new Promise((resolve, reject) => {
        try {
            chrome.history.search({text:searchQuery, maxResults:0, startTime:-1}, (data) =>{ 
                //Find top 5 visits
                data.sort(compareLastVisit);
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

const searchTopVisits = (searchQuery, topNum) => {
    
}
//Returns a promise to an array the top {topNum} items within the given range. Defaults to top 5 visits of the full history
    const topVisits = (topNum = 5, days = -1) => {
        //Comparison functions for sorting
        const compareVisits = (historyItem1, historyItem2) => {
            return(historyItem2.visitCount - historyItem1.visitCount);
        }
        return new Promise((resolve, reject) => {
            try {
                getDomains(days).then(data => {
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
    const getDomains = (days = -1, search = '') => {
        return new Promise((resolve, reject) => {
            try {           
                //Specifying Date range  
                let start = new Date()
                if(days < 0){
                    start.setTime(0)
                }else{
                    start.setDate(start.getDate() - days)
                }
                chrome.history.search({text: search, maxResults: 0, startTime:start.getTime()}, (data) =>{
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
                            //Update visitCount
                            let index = domainList.findIndex(o => o.url === (new URL(data[i].url)).hostname)
                            domainList[index].visitCount += data[i].visitCount
                            //Update domain's last visit time if necessary
                            domainList[index].lastVisitTime = Math.max(domainList[index].lastVisitTime, data[i].lastVisitTime) 

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

export default {topVisits, getDomains, searchAggregate, searchRecent, urlToDomain}