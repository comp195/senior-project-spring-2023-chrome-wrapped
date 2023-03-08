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
    const topVisits = (topNum) => {
        const compareVisits = (historyItem1, historyItem2) => {
            return(historyItem2.visitCount - historyItem1.visitCount);
        }
        return new Promise((resolve, reject) => {
            try {
                chrome.history.search({text: '', maxResults: 0, startTime: 0}, (data) =>{
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
    const compiledTimes = (topNum, range) =>{
        let data = topVisits(topNum);
        return new Promise((resolve, reject) => {
            
        })
    }
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