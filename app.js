const PARAMS = new URLSearchParams(window.location.search);
const HELLOSOUND = document.getElementById("helloSound");
const USERNAME = PARAMS.get("username");
const VOLUME = parseInt(PARAMS.get("volume"));
const MODPERMISSION = (PARAMS.get("modpermission") ?? "true") === "true";
let appIsOn = true;

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    const isAllowedToChange = flags["broadcaster"] || (MODPERMISSION == true && flags["mod"]);
    
    const lowerMsg = message.toLowerCase();
    const triggerRegex = /\balo+?\b/i;
    
    if(lowerMsg == "stopsayinghello" && isAllowedToChange){
        appIsOn = false;
    }
    if(lowerMsg == "startsayinghello" && isAllowedToChange){
        appIsOn = true;
    }

    console.log(JSON.stringify(message));
    console.log(lowerMsg);
    

    if(triggerRegex.test(lowerMsg) && appIsOn){
        let normalizedVolume = !isNaN(VOLUME) ? Math.max(0.01, Math.min(1, VOLUME / 100)) : 1;
        HELLOSOUND.volume = normalizedVolume; 
        HELLOSOUND.currentTime = 0;
        HELLOSOUND.play();
    }

    // keeping this here so that i dont rewrite it 10 times :3
    //console.log("app is on: ", appIsOn);
    //console.log("allowed?: ", isAllowedToChange);
    //console.log("message: ", message);
    //console.log("flags: ", flags);
}

ComfyJS.Init(USERNAME);