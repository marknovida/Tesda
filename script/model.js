// process sa pagfefetch ng api
class YoutubeRedesign { 
    // pag may async pwede makapag .then
    // ginagawa netong constructor na ito ay nagfefetch lang ng api kasama yung data ng user
    async getLatestVideo(userInput){
         
        // api natin
        const myapi = 'AIzaSyDQsq-3kJ1ZF43YZhAbdSPdY3RXzX6QiuU';
        
        // yung link kasama yung data ng user 
        const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${userInput}&key=${myapi}&maxResults=15`);
        
        // ginawa nating json yung api ni youtube
        const videoName = await videoResponse.json();
        // yung link na may data ng user binalik lang natin sa constructor na name is getLatestVideo
        return videoName;
    }
}


// nagcecreate lang ng elements sa html natin
class UI {
    // nagtatawag lang ng element
    constructor(){ 
        // first user input
        this.result = document.querySelector("#banner"); 
        this.input = document.querySelector("#search"); 
        this.channelTitle = document.querySelector("#channelTitle");
        this.videoDescription = document.querySelector("#description-content");
        this.youtubeProfilePicture = document.querySelector("#youtube-profile");
    }


    // nagshoshow lang ng result kasama yung data ni user
    showResult(userInput){
        

        // kinuha natin si banner
        // si banner yung lalagyanan ni video or first video natin
        // naglagay lang tayo ng laman yung codes na galing sa youtube
        this.result.innerHTML = `<iframe width="565" height="319" src="https://www.youtube.com/embed/${userInput.items[0].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           `;

        // get the data from the api and append it to the channel title box element
        this.channelTitle.innerHTML = `${userInput.items[0].snippet.channelTitle}`;
        // get the data from the api and append it to the description box element
        this.videoDescription.innerHTML = `${userInput.items[0].snippet.description}`.substr(0, 150) + " ...";
        // this is the thumbnail.high.url
        this.youtubeProfilePicture.setAttribute("src", `${userInput.items[0].snippet.thumbnails.high.url}`);

        // why I used forEach function
        userInput.items.forEach(function(item, i){
            
            // tinawag lang natin yung other-videos na id
            // para san? para lagyan natin ng laman kagaya ng ginawa natin sa #banner
            const otherVideos = document.querySelector("#other-videos");
            // nagcreate tayo ng element na div
            var videoContainer = document.createElement("div");
            
            // nagpass lang tayo ng id na video-container0 kasi yung i yung 0
            // bat id ginawa ko at naglagay pa ko ng i
            // kasi sa id dapat hindi sila pare-parehas
            videoContainer.setAttribute("id", "video-container"+ `${i}`);
            
            // nagcreate tayo ng class na name nya is video-container
            videoContainer.setAttribute("class", "video-container");

            // nagcreate ako ng data-key = videoId
            videoContainer.setAttribute("data-key", `${userInput.items[i].id.videoId}`);

            // nagcreate ako ng data-channelTitle = channelTitle
            videoContainer.setAttribute("data-channelTitle", `${userInput.items[i].snippet.channelTitle}`);

            // nagcreate ako ng description = 150 texts of description na may ""..."" sa dulo para malaman na continuous sya 
            videoContainer.setAttribute("data-description", `${userInput.items[i].snippet.description}`.substr(0, 150) + " ...");
            
            // ito yung snippet.thumbnails = image natin na malaki yung size
            videoContainer.setAttribute("data-image", `${userInput.items[i].snippet.thumbnails.high.url}`);
            
            //
            videoContainer.setAttribute("onclick", "callme(this.getAttribute('data-key'), this.getAttribute('data-channelTitle'), this.getAttribute('data-description'), this.getAttribute('data-image'));");
            videoContainer.innerHTML = `<img class="img" id="other-video-img${i}" src="${userInput.items[i].snippet.thumbnails.default.url}"/><p class="video-title" id="other-video-title${i}">${userInput.items[i].snippet.title.substr(0,36)}</p>`;

            otherVideos.appendChild(videoContainer);
            

        });



    }

    clearBanner(){
        this.result.innerHTML = ''; 
    }

    
    
    clearFields(){
        this.input.value = '';
    }
}

export {YoutubeRedesign, UI}
