fetch('media.json')
  .then(response => response.json())
  .then(data => {
    const songList = document.getElementById('songList');

    data.forEach((song, index) => {
      const songDiv = document.createElement('div');
      songDiv.className = 'song';
      songDiv.innerHTML = `
      <div class="card">
        <img class="img-card" src="${song.image}" alt="${song.Title}">
        <div>
          <h3>${song.Title}</h3>
          <p>${song.artist}</p>
        </div>
      </div>
      `;

      //  Store index instead of full object
      songDiv.addEventListener('click', () => {
        localStorage.setItem('selectedSongIndex', index);
        window.location.href = 'player.html';
      });

      songList.appendChild(songDiv);
    });
  })
  .catch(error => console.error('Error loading songs:', error));


document.querySelector(".lib-svg").addEventListener("click", ()=>{
  document.querySelector(".left").style.left= "0";
})

document.querySelector(".close-sym").addEventListener("click", ()=>{
  document.querySelector(".left").style.left= "-190%";
})


document.querySelector(".hamburger").addEventListener("click", ()=>{
  document.querySelector(".side-bar").style.display="flex";
})

document.querySelector(".close-sidebar").addEventListener("click", ()=>{
  document.querySelector(".side-bar").style.display= "none";
})