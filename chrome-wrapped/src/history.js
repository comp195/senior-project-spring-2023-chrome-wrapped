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
//Helped function to call chrome history
const searchHistory = (searchQuery = '', days = -1) =>{
    let start = new Date()
    if(days < 0){
        start.setTime(0)
    }else{
        start.setDate(start.getDate() - days)
    }
    return new Promise((resolve, reject) => {
        try {
            chrome.history.search({text: searchQuery, maxResults: 0, startTime:start.getTime()}, (data) =>{
                resolve(data)
            })
        }
        catch(ex){
            reject(ex);
        }
    })
}
//Given a substring, returns array of historyItems Sorted by recent
const searchRecent = (searchQuery = '', topNum = 25) => {
    //For sorting function
    const compareLastVisit = (historyItem1, historyItem2) => {
        return(historyItem2.lastVisitTime - historyItem1.lastVisitTime);
    }
    return new Promise((resolve, reject) => {
        try {
            searchHistory(searchQuery).then(data => {
                    //Find top 5 visits
                    data.sort(compareLastVisit);
                    //Get top X visits
                    if(data.length >= topNum){
                        resolve(data.slice(0, topNum));
                    } else{
                        resolve(data.slice(0, data.length));
                    } 
            })
        }
        catch(ex){
            reject(ex);
        }
    })
}
//Given a substring, returns array of visitItems
const searchTopVisits = (searchQuery = '', topNum = 25) => {
        //For sorting function
        const compareLastVisit = (historyItem1, historyItem2) => {
            return(historyItem2.visitCount - historyItem1.visitCount);
        }
        return new Promise((resolve, reject) => {
            try {
                searchHistory(searchQuery).then(data => {
                        //Find top 5 visits
                        data.sort(compareLastVisit);
                        //Get top X visits
                        if(data.length >= topNum){
                            resolve(data.slice(0, topNum));
                        } else{
                            resolve(data.slice(0, data.length));
                        } 
                })
            }
            catch(ex){
                reject(ex);
            }
        })
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
//Days = Days x 24 hours from current date
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
                //Aggregate by domain
                for(let i = 1; i < data.length; i++){
                    //If domain already in list
                    try{
                        //Update visitCount
                        let index = domainList.findIndex(o => o.url === (new URL(data[i].url)).hostname)
                        domainList[index].visitCount += data[i].visitCount
                        //Update domain's last visit time if necessary
                        domainList[index].lastVisitTime = Math.max(domainList[index].lastVisitTime, data[i].lastVisitTime) 

                    }
                    catch{
                        //Note: lastVisit and title will be horribly incorrect but it's okay, we just need visitCount
                        domainList.push(data[i])
                        domainList[domainList.length-1].url = ((new URL(data[i].url)).hostname)
                        

                    }
                }
                domainList.sort((historyItem1, historyItem2) => {
                    return(historyItem2.visitCount - historyItem1.visitCount);
                });
                resolve(domainList)
            })
        } catch(ex){
            reject(ex);
        }
    })
}
//Return number of site on a certain day
const getActiveTimes = (days = 0) => {
    //input: Days since current date
    //Get beginning of the day
    let start = new Date();
    start.setTime(start.getTime() - days * 86400000) // Milliseconds in a day
    start.setHours(0,0,0,0);
    //Get end of the day
    let end = new Date();
    end.setTime(end.getTime() - days * 86400000)
    end.setHours(23,59,59,999);
    console.log("Start: ", start.getHours(), " End: ", end.getHours())
    return new Promise((resolve, reject)=>{
        try{
            chrome.history.search({text: '', maxResults: 0, startTime:start.getTime(), endTime:end.getTime()}, (data) =>{
                let splicedArray = []
                let arrayStart = 0
                let arrayEnd = 0
                //Slice array into 3 hour ranges
                console.log("data: ", data)
                for(let i = 1; i <= 8; i++){
                    //Find last item within range
                    //3600000  miliseconds = 1 hours
                    while((arrayEnd < data.length) && (data[arrayEnd].lastVisitTime < start.getTime() + i * 3 * 3600000 )){arrayEnd++}
                    splicedArray.push(data.slice(arrayStart, arrayEnd))
                    arrayStart = arrayEnd
                }
                console.log("Spliced array", splicedArray)
                for(let j = 0; j < 8; j++){
                    console.log("Spliced array", splicedArray[j])
                }
                //Aggregate visit count
                resolve(splicedArray)
            })
        }
        catch(ex){
            reject(ex)
        }
    })

}

export default {topVisits, searchAggregate, searchRecent, searchTopVisits, getActiveTimes}