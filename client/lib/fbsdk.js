

// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      localStorage.setItem('fbaccesstoken',response.authResponse.accessToken)
      axios.get(`http://localhost:3000/login`, {
        headers : {
          fbaccesstoken : localStorage.getItem('fbaccesstoken')
        }
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        console.log('ini kan datanya? ', response);
        if(window.location.href !== 'http://localhost:8080/main.html' ) {
          window.location = 'main.html'
        }
      })
      .catch(err => {
        console.log(err);
      })

      // window.location.href="main.html"
    } else {
      localStorage.clear()
      // window.location.href="index.html"

    }
  }
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '113647105978939',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.10' // use graph api version 2.8
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
