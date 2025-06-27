const options = {
  method: 'GET',
  headers: {
    // 'X-RapidAPI-Key': '745c7f3b81msh976f1cefab607c0p1181e9jsn48879ae49005',
    // 'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};

async function getTrendingSongs() {
  try {
    // const res = await fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=10&startFrom=0', options);
    const data = await res.json();
    console.log(data.tracks);  // shows trending tracks
    return data.tracks;
  } catch (err) {
    console.error('Error fetching songs:', err);
  }
}

getTrendingSongs().then(songs => {
  const container = document.getElementById('song-list');
  songs.forEach(song => {
    const card = document.createElement('div');
    card.innerHTML = `
      <img src="${song.images.coverart}" width="100">
      <h3>${song.title}</h3>
      <p>${song.subtitle}</p>
    `;
    container.appendChild(card);
  });
});
