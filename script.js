const search = window.location.search;
console.log(search);
let getName = function(url) {
    let urlArray = url.split('=');
    let name = urlArray[1];
    if(name == null || name.length > 20) {
        name = 'skripaleva';
    }
    return name;
};

const name = getName(search);

const url = `https://api.github.com/users/${name}`;

let getParams = fetch(url)
    .then(res => res.json())
    .then(json => {
        const avatar = json.avatar_url;
        const name = json.name;
        const bio = json.bio;
        const htmlUrl = json.html_url;
        if (name) {
            let createAvatar = () => {
                let newAvatar = document.createElement('img');
                newAvatar.src = avatar;
                let addString = document.createElement('br');
                document.body.appendChild(newAvatar);
                document.body.appendChild(addString);
            };

            let createBio = () => {
                let newBio = document.createElement('p');
                newBio.innerHTML = bio;
                document.body.appendChild(newBio);
            };

            let createProfile = () => {
                let elementForLink = document.createElement('a');
                let elementForHeader = document.createElement('h2');
                elementForHeader.innerText = name;
                elementForLink.href = htmlUrl;
                document.body.appendChild(elementForLink);
                elementForLink.appendChild(elementForHeader);
            };

            createProfile();
            createBio();
            createAvatar();
        }
        else {
            throw new Error(' Пользователь с таким никнеймом не найден')
        }
    }).catch(err => alert(err));

