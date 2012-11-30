//////////////////////////
//
// News Feed
// See the "News Feed" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Publish a story to the user's own wall
function getNewsFeed() {
  /*

  FB.ui({
    method: 'feed',
    name: 'I\'m using the Hackbook web app',
    caption: 'Hackbook for Mobile Web.',
    description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
    link: 'http://apps.facebook.com/mobile-start/',
    picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
    actions: [{ name: 'Get Started', link: 'http://apps.facebook.com/mobile-start/' }],
  }, 
  function(response) {
    console.log('publishStory UI response: ', response);
  });

*/


      FB.getLoginStatus(function(response) {

        var uid = response.authResponse.userID;
        //var accessToken = response.authResponse.accessToken;
        //alert(accessToken);
        /*
        FB.api('me/', function(response) {
          FB.api(response.location.id, function(response) {
            //alert(response.location.latitude + "/" + response.location.longitude);
          });
        });
*/
        FB.api('me/permissions/'+accessToken, function(response) {
          console.log(response.data);
        });
        var num = 0;
        var newsFeed = []; // news feed array
        var feedURL = 'https://graph.facebook.com/'+uid+'/home?with=location&access_token='+accessToken;

        fbFeed(feedURL, function(model){
          
        }); 

        function fbFeed(url, callback){  
          FB.api(url, function(response){
            console.log("INSIDE", newsFeed.length, response);
            console.log("length",response.data.length);
            for(var i=0; i<response.data.length; i++){
              newsFeed.push(response.data[i]);
            }
            
            if(newsFeed.length>50 || response.data.length == 0)
              callback(response);
            else
              fbFeed(response.paging.next, callback);
            
          });
        }



    
      });
}

//Publish a story to the user's friend's wall
function publishStoryFriend() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];
  
  console.log('Opening a dialog for friendID: ', friendID);
  
  FB.ui({
    method: 'feed',
    to: friendID,
    name: 'I\'m using the Hackbook web app',
    caption: 'Hackbook for Mobile Web.',
    description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
    link: 'http://apps.facebook.com/mobile-start/',
    picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
    actions: [{ name: 'Get Started', link: 'http://apps.facebook.com/mobile-start/' }],
    user_message_prompt: 'Tell your friends about building social web apps.'
  }, 
  function(response) {
    console.log('publishStoryFriend UI response: ', response);
  });
}