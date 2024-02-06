import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isNotif, setIsNotif] = useState(false);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const notif = () => {
    setIsNotif(!isNotif);
    setTimeout(() => {
      setIsNotif((state) => !state);
    }, 2000);
  };

  console.log({ isNotif });

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
          <div className="Movie-data">release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    // console.log(q);
    if (q.length > 3) {
      const query = await searchMovie(q);
      // console.log({ query: query });
      setPopularMovies(query.results);
    }
  };

  // console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      {isNotif && <h3>TERIMAKASIH! 🤍🤍</h3>}
      <button onClick={notif} className="btn">
        {isNotif ? "notifikasi OFF" : "Notifikasi ON"}
      </button>
      <header className="App-header">
        <h1>FAJAR MOVIE MANIA</h1>
        <input placeholder="cari flm kesayangan..." className="Movie-search" onChange={({ target }) => search(target.value)} />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
