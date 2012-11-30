
//////////////////////////
//
// Authentication
// See "Logging the user in" on https://developers.facebook.com/mobile
//
//////////////////////////

var user = [];

var permissions = ['read_stream'];

var accessToken;

//Detect when Facebook tells us that the user's session has been returned
function authUser() {
  FB.Event.subscribe('auth.statusChange', handleStatusChange);
}

// Handle status changes
function handleStatusChange(session) {
    
    if (session.authResponse) {
        document.body.className = 'connected';
        
        //Fetch user's id, name, and picture
        FB.api('/me', {
          fields: 'name, picture'
        },
        function(response) {
          if (!response.error) {
            user = response;
            
            //Update display of user name and picture
            if (document.getElementById('user-name')) {
              document.getElementById('user-name').innerHTML = user.name;
            }
            if (document.getElementById('user-avatar')) {
              document.getElementById('user-avatar').src = user.picture.data.url;
            }
            if (document.getElementById('user-link')) {
              document.getElementById('user-link').href = "https://www.facebook.com/"+user.id;
            }
          }
          
          //clearAction();
        });
    }
    else  {
      document.body.className = 'not_connected';
    
      //clearAction();

    }
}

//Check the current permissions to set the page elements.
//Pass back a flag to check for a specific permission, to
//handle the cancel detection flow.
function checkUserPermissions(permissionToCheck) {
  var permissionsFQLQuery = 'SELECT ' + permissions.join() + ' FROM permissions WHERE uid = me()';
  FB.api('/fql', { q: permissionsFQLQuery },
    function(response) {
        if (document.body.className != 'not_connected') {

            FB.login(function(response) {
              if (response.authResponse) {
                accessToken = response.authResponse.accessToken;
                getNewsFeed();
              }
            }, {scope: 'read_stream'});

            if (permissionToCheck) {
              if (response.data[0][permissionToCheck] == 1) {
                setAction("The '" + permissionToCheck + "' permission has been granted.", false);
                //setTimeout('clearAction();', 2000);
                return true;
              } else {
                setAction('You need to grant the ' + permissionToCheck + ' permission before using this functionality.', false);
                //setTimeout('clearAction();', 2000);
              } return false;
            }
            return true;
        }
        
  });
}

//Prompt the user to login and ask for the 'email' permission
function promptLogin() {
  FB.login(null, {scope: 'email'});
  $(".header-un-login").css("display","none");
  $(".header-login").css("display","block");
  promptPermission(permissions);
  
}

//This will prompt the user to grant you acess to a given permission
function promptPermission(permission) {
  FB.login(function(response) {
    if (response.authResponse) {
      checkUserPermissions(permission)
    }
  }, {scope: 'read_stream'});
}

//See https://developers.facebook.com/docs/reference/api/user/#permissions
function uninstallApp() {
  FB.api('/me/permissions', 'DELETE',
    function(response) {
      window.location.reload();
      // For may instead call logout to clear
      // cache data, ex: using in a PhoneGap app
      //logout();
  });
}

//See https://developers.facebook.com/docs/reference/javascript/FB.logout/
function logout() {
  FB.logout(function(response) {
    $(".header-login").css("display","none");
    $(".header-un-login").css("display","block");
  });
}