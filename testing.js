// write a function to retrieve a blob of json - make an ajax request - make use of the fetch function
// Older syntax
function fetchAlbums() {
	fetch('https://rallycoding.herokuapp.com/api/music_albums')
	.then(res => res.json())
	.then(json => console.log(json));
}
fetchAlbums();

// ES2017 syntax
const fetchAlbumsES2017 = async () => {
	const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
	const json = await res.json();
 	console.log(json);
}
fetchAlbumsES2017();