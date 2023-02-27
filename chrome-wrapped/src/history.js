/*global chrome*/
const runScript = () => {
    chrome.history.getVisits(
    {url: "https://google.com"}, 
    (output) => {
        console.log(output);
    }
    )
}
export default {runScript}