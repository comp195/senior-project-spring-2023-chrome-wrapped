/*global chrome*/
//Remove history entries with "generated" tag
// const figuringOutVisits = () =>{
//     chrome.history.getVisits({url:"www.google.com"}, (visit) => {
//         console.log("The google visit: ", visit)
//     })
// }
const removeGeneratedEntries = (data) => {
    //figuringOutVisits()
    return new Promise((resolve, reject)=>{
        try{
            let promiseList = []
            //iterate through each historyItem
            data.forEach(entry =>{
                let entryPromise = new Promise((resolve, reject) => {
                    try{
                        //Remove one visitCount from entry for every item that was generated
                        if(entry.visitCount > 1){
                            chrome.history.getVisits({url:entry.url}, (visit) => {
                                //console.log("Visit: ", visit)
                                visit.forEach(visitItem=>{
                                    if(visitItem.transition == 'generated'){
                                        entry.visitCount -= 1
                                    }
                                })
                                resolve()
                            })
                        }
                    }
                    catch(ex){
                        console.log("Unable to remove generated entries ;-;")
                        reject(ex)
                    }
                })
                promiseList.push(entryPromise);
            })
            
            Promise.all(promiseList).then(resolve(data))
        }
        catch(ex){
            console.log("Unable to remove generated entries ;-;")
            reject(ex)
        }
    })
}
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
const searchRecent = (searchQuery = '', topNum = 15) => {

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
const searchTopVisits = (searchQuery = '', topNum = 15) => {
        //For sorting function
        const compareLastVisit = (historyItem1, historyItem2) => {
            return(historyItem2.visitCount - historyItem1.visitCount);
        }
        return new Promise((resolve, reject) => {
            try {
                searchHistory(searchQuery).then(data => {
                    removeGeneratedEntries(data).then(newData => {
                            //Find top 5 visits
                        newData.sort(compareLastVisit);
                        //Get top X visits
                        if(newData.length >= topNum){
                            resolve(newData.slice(0, topNum));
                        } else{
                            resolve(newData.slice(0, newData.length));
                        } 
                    })
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
const getDomains = (days = -1, search = '') => {
    //Days = Days x 24 hours from current date
    return new Promise((resolve, reject) => {
        try {           
            //Specifying Date range  
            let start = new Date()
            if(days < 0){
                start.setTime(0)
            }else{
                start.setDate(start.getDate() - days)
            }
            chrome.history.search({text: search, maxResults: 0, startTime:start.getTime()}, (oldData) =>{
                removeGeneratedEntries(oldData).then((data)=>{
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
            })
        } catch(ex){
            reject(ex);
        }
    })
}
//Return number of site visits per day of the week
const getActiveTimes = () => {
    //Javascript is dumb and I hate it so I couldn't figure out how to make this 2d array better
    //WHICH ISN'T A 2D ARRAY BUT ACTUALLY AN ARRAY OF ARRAYS ACCORDING TO STACK OVERFLOW APPARENTLY
    // let timeRange = [[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0]]
    let timeRange = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]


    return new Promise((resolve, reject)=>{
        try{
            chrome.history.search({text: '', maxResults: 0, startTime:0}, (data) =>{
                //Create 2d array of days of week/time of day
                let promises = [] //Array of promise for each data entry
                data.sort(function(a, b){return(b.lastVisitTime - a.lastVisitTime)})
                data.forEach(item => {//Get each unique visit
                    // console.log("Search Data: ", item)
                    let entryDate = new Promise((resolve, reject)=>{
                        try{
                            chrome.history.getVisits({url:item.url}, (visitArray) => {
                                visitArray.forEach(visit=>{
                                    if(visit.transition != "generated"){
                                        let date = new Date(visit.visitTime)
                                        let week = date.getDay();
                                        //Slice array into 3 hour ranges
                                        let time = Math.round(date.getHours())
                                        timeRange[week][time] += 1;//Update timeRange
                                    } else{
                                        //console.log("WE GOT EM THAT SILLY GOOFYBALL OF A CHROME DOUBLE COUNT CHEATER")
                                    }
                                })
                                resolve(timeRange) //Golly I sure hope this doesn't have a race condition and I have to make a mutex lock
                            }) 
                        }
                        catch(ex){
                            console.log("Failed to get getVisits value");
                            reject(ex)
                        }
                    })
                    promises.push(entryDate)
                })
                Promise.all(promises).then(()=>{
                    resolve(timeRange)
                })
                //Only does unique visits for now... should be good?
                 
                // for(let j = 0; j < 8; j++){
                //     console.log("Spliced array", splicedArray[j])
                // }
                //Aggregate visit count
                
            })
        }
        catch(ex){
            reject(ex)
        }
    })

}

export default {topVisits, searchAggregate, searchRecent, searchTopVisits, getActiveTimes}