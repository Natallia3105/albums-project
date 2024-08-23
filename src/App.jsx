import {useEffect, useState} from 'react'
import styles from './assets/App.module.scss'
import axios from "axios";

function App() {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

    useEffect(() => {
        axios.all([
            axios.get('https://jsonplaceholder.typicode.com/albums'),
            axios.get('https://jsonplaceholder.typicode.com/photos')
        ])
            .then(axios.spread((albumsResponse, photosResponse) => {
                setAlbums(albumsResponse.data);
                setPhotos(photosResponse.data);
            }))
    }, []);

    const getPhotosByAlbumId = (albumId) => {
        return photos.filter(photo => photo.albumId === albumId);
    };

  return (
    <>
        <div className={styles.album_container}>
            {albums.slice(0, 3).map((album, index) => (
                <div key={index} className={styles.album_column}>
                    {/*<h3 className={styles.album_title}>{album.title}</h3>*/}
                    <div className={styles.photos}>
                        {getPhotosByAlbumId(album.id).slice(0, 5).map((photo, index) => (
                            <div key={index} className={styles.photo_item}>
                                <img src={photo.thumbnailUrl} alt={photo.title} />
                                <p className={styles.title_item}>{photo.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}
export default App
