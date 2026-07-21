console.log("hello i am a popup help me if you want ulelelele");
document
    .querySelector("#do_thing")
    .addEventListener("click", async function () {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        console.log(tabs);
        let tabUrlsWeAlreadyHave = [];
        let tabFaviconsWeAlreadyHave = [];
        let tabNamesWeAlreadyHave = [];
        let selectedTypes = document.querySelectorAll("input[type=checkbox]");
        let urlSelected = false;
        let faviconSelected = false;
        let titleSelected = false;
        for (let type of selectedTypes) {
            if (type.checked && type.id == "url") urlSelected = true;
            if (type.checked && type.id == "favicon") faviconSelected = true;
            if (type.checked && type.id == "title") titleSelected = true;
        }
        // if they all false
        if (!(urlSelected || faviconSelected || titleSelected)) {
            alert("You gotta pick one!");
            return;
        }
        // I guess that works...
        for (let tab of tabs) {
            // We're gonna push to them all just in case tbh.
            if (!tabUrlsWeAlreadyHave.includes(tab.url) && urlSelected) {
                tabUrlsWeAlreadyHave.push(tab.url);
                tabFaviconsWeAlreadyHave.push(tab.favIconUrl);
                tabNamesWeAlreadyHave.push(tab.title);
            } else if (
                !tabFaviconsWeAlreadyHave.includes(tab.favIconUrl) &&
                faviconSelected
            ) {
                tabUrlsWeAlreadyHave.push(tab.url);
                tabFaviconsWeAlreadyHave.push(tab.favIconUrl);
                tabNamesWeAlreadyHave.push(tab.title);
            } else if (
                !tabNamesWeAlreadyHave.includes(tab.title) &&
                titleSelected
            ) {
                tabUrlsWeAlreadyHave.push(tab.url);
                tabFaviconsWeAlreadyHave.push(tab.favIconUrl);
                tabNamesWeAlreadyHave.push(tab.title);
            } else {
                chrome.tabs.remove(tab.id);
            }
            // if(!tabUrlsWeAlreadyHave.includes(tab.url) ||
            // !tabFaviconsWeAlreadyHave.includes(tab.favIconUrl) ||
            // !tabNamesWeAlreadyHave.includes(tab.title)
            // ){
            //     tabUrlsWeAlreadyHave.push(tab.url);
            //     tabFaviconsWeAlreadyHave.push(tab.favIconUrl);
            //     tabNamesWeAlreadyHave.push(tab.title);
            //     continue;
            // }else{
            // // console.log()
            // // since we hit a return each time if it gets caught, its fine if its out
            // chrome.tabs.remove(tab.id);
            // }
        }
    });
