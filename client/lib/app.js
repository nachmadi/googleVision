const vm = new Vue({
    el: "#app",
    data: {
        loader: false,
        result: false,
        apiKey: "AIzaSyCe-r3ysqWYiMWcUv3VpyneHMjKRNaHiDU",
        similiarImage: null,
        articleImage: null,
        guessLocation: null,
        newList: {
          place: '',
          date: '',
          img: ''
        },
        data: {
            "requests": [{
                "features": [{
                    "type": "WEB_DETECTION"
                }],
                "image": {
                    "content": null
                }
            }]
        }
    },
    methods: {
        process() {
            const self = this;
            this.result = false;
            this.loader = true;
            context.drawImage(video, 0, 0, 640, 480);
            const base64 = canvas.toDataURL();
            // const final = base64.replace("data:image/png;base64,", "");
            console.log('base64 disini', base64);
            const final = base64.replace("data:image/png;base64,", "");
            console.log('finalnya', final);
            this.data.requests[0].image.content = final;
            axios.post(
                `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`,
                this.data).then(response => {
                  console.log('datanya', response.data.responses[0]);
                self.result = true;
                self.similiarImage = response.data.responses[0].webDetection.visuallySimilarImages
                self.articleImage = response.data.responses[0].webDetection.pagesWithMatchingImages
                self.guessLocation = response.data.responses[0].webDetection.webEntities
                self.newList.place = response.data.responses[0].webDetection.webEntities[0].description
                self.newlist.img = response.data.responses[0].webDetection.visuallySimilarImages[0].url
                self.loader = false;
                self.result = true;
            }).catch(error => {
                console.log(error);
            })
        },
        addList () {
          var self = this
          axios.post(`http://localhost:3000/history`, self.newList, {
            headers : {
              token: localStorage.getItem('token')
            }
          })
        }
    }
})

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.getElementById('video');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        video.src = window.URL.createObjectURL(stream);
        // video.play();
    });
}
