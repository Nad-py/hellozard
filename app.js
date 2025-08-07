const PARAMS = new URLSearchParams(window.location.search);
const HELLOSOUND = document.getElementById("helloSound");
const USERNAME = PARAMS.get("username");
const VOLUME = parseInt(PARAMS.get("volume"));
const MODPERMISSION = (PARAMS.get("modpermission") ?? "true") === "true";
let appIsOn = true;

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    const isAllowedToChange = flags["broadcaster"] || (MODPERMISSION == true && flags["mod"]);
    
    // had to to do this regex because for some reason messages returned with a weird unicode symbol that wasnt being parsed by .trim()
    /* specifically a weird space at the end
        U+0020 : SPACE [SP]
        U+E0000 : <reserved>

        example: "alo 󠀀"
        regex here is likely flawed, so if you want to fix it then go ahead <3
    */
    const cleanedMsg = message.toLowerCase().replace(/[\p{C}\s.!?,'"-]+/gu, '');
    
    if(cleanedMsg == "stopsayinghello" && isAllowedToChange){
        appIsOn = false;
    }
    if(cleanedMsg == "startsayinghello" && isAllowedToChange){
        appIsOn = true;
    }

    console.log(JSON.stringify(message));
    console.log(cleanedMsg);
    

    if(cleanedMsg === "alo" && appIsOn){
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