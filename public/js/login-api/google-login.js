var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '412000884387-d5dmn4o4s5unfjma2jc3fb3b7u80tru1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            /*let url = '/login-with-google';
            let data = googleUser.getAuthResponse().id_token;
            fetch(url,{
                method:"post",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(result => result.json())
            .then(response =>
                {
                    console.log(response);
                    location.replace("/users")
                })
            .catch(error => console.log(error));*/


            var id_token = googleUser.getAuthResponse().id_token;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/login-with-google');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                let pepe = JSON.parse(xhr.responseText)
            console.log(typeof pepe.response)
            if(pepe.response == "OK")
            {
                 window.location.href = 'http://localhost:3000/users';
            }
            };
            xhr.send('idtoken=' + id_token);
        }, function(error) {
          console.log(error);
        });
        
  }
