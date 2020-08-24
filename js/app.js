const fetchUSers = async (user) => {
  let response = await fetch(`https://api.github.com/users/${user}`);
  let data = await response.json();
  return data;
};

const $ = (element) => document.querySelector(element);

const searchUserBtn = $(".search-btn");
const userInput = $(".search-input");
const userAvatar = $(".user-avatar img");
const twitterUrl = $(".social-media a");
// const followers = $("");
const repos = $(".git-repos");
const gitUsername = $(".git-username")
const following = $(".follows")
const followers = $(".followers .user")

searchUserBtn.addEventListener("click", () => {
    
    followers.innerHTML = ""
  console.log(userInput.value);
  fetchUSers(userInput.value)
    .then((data) => {
      if (data.twitter_username) {
        twitterUrl.href = `www.twitter.com/${data.twitter_username}`;
        twitterUrl.textContent = `@${data.twitter_username}`;
      }else{
        twitterUrl.href = ``;
        twitterUrl.textContent = ``;
      }
      userAvatar.src = data.avatar_url;
      repos.textContent = data.public_repos;
      gitUsername.textContent = data.login;
      gitUsername.href = data.url;
      following.textContent = data.following


      if(data.followers){
         fetchFollowers(data.login).then(data =>{
           data.forEach(user =>{
            let newData = `<div class="followers-details">
            <div class="followers-name">
            <p>${user.login}</p>
        </div>
               <div class="followers-avatar">
                   <img src=${user.avatar_url} alt="">
               </div>
             
            </div>`
            var text =  create(newData);
            followers.appendChild(text)
           })
         })
      }else{
          followers.innerHTML = "<h1 class='center'> No followers found";
      }
    })
    .catch((err) => {
      console.log("error " + err);
    });
});

async function fetchFollowers(user) {
    let response = await fetch(`https://api.github.com/users/${user}/followers`);
    let data = await response.json();
    return data;
  };


// followers following public_repos url
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}