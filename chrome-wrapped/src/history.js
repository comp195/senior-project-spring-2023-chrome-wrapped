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
    const topVisits = (topNum = 5, dateStart = new Date(0), dateEnd = new Date()) => {
        //Comparison functions for sorting
        const compareVisits = (historyItem1, historyItem2) => {
            return(historyItem2.visitCount - historyItem1.visitCount);
        }
        const compareDate = (historyItem1, historyItem2) => {
            return(historyItem2.lastVisitTime - historyItem1.lastVisitTime);
        }

        return new Promise((resolve, reject) => {
            try {
                //https://developer.chrome.com/docs/extensions/reference/history/ 
                chrome.history.search({text: '', maxResults: 0, startTime: dateStart.getTime(), endTime: dateEnd.getTime()}, (data) =>{
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
    // const compiledTimes = (topNum, range) =>{
    //     let data = topVisits(topNum);
    //     return new Promise((resolve, reject) => {
    //         try{
                
    //             chrome.history.getVisits({url: element.url}, 
    //                     (output) => {
    //                         console.log(output);
    //                     })
    //         }
    //         catch(ex){
    //             reject(ex);
    //         }
    //     })
    // }
        // let numberToReturn = 1;
        // chrome.history.search({
        //     text: '',
        //     maxResults: 0,
        //     startTime: 0
        // },
        //     (data) => {
        //         data.sort(compareVisits);
        //         // data.forEach(element => {
        //         //     console.log(element.title, element.visitCount)
        //         // });
                
        //             // console.log(data.slice(0, topNum))
        //         numberToReturn = 5;
            
        // }).then((granted)=>{
            
        // }) 
export default {runScript, topVisits}