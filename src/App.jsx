import { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const PLATFORMS = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"];

// Form for adding a game
function GameForm({ onAddGame }) {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [rating, setRating] = useState(5);
  const [artwork, setArtwork] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() === "") return; // Don't add empty names

    onAddGame({
      id: Date.now(),
      name: name.trim(),
      platform: platform,
      rating: Number(rating),
      artwork: artwork.trim(),
    });

    setName("");
    setArtwork("");
    setRating(5);
  }

  return (
    <div className="card mb-4 bg-white bg-opacity-50 text-white">
      <div className="card-body">
        <h5 className="card-title">Add a Game</h5>
        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Insert Game Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} ★
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Artwork URL (optional)"
              value={artwork}
              onChange={(event) => setArtwork(event.target.value)}
            />
          </div>
          <div className="col-md-2 d-grid">
            <Button type="submit" variant="success">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Search bar + platform filter
function GameFilters({ search, setSearch, filterPlatform, setFilterPlatform }) {
  return (
    <div className="row g-2 mb-4">
      <div className="col-md-8">
        <input
          className="form-control"
          placeholder="Search games..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="col-md-4">
        <select
          className="form-select"
          value={filterPlatform}
          onChange={(event) => setFilterPlatform(event.target.value)}
        >
          <option value="All">All Platforms</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// One game card
function GameCard({ game, onDelete }) {
  return (
    <div className="card h-100">
      {game.artwork ? (
        <img
          src={game.artwork}
          alt={game.name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
      ) : (
        <div
          className="bg-secondary text-white d-flex align-items-center justify-content-center"
          style={{ height: "200px" }}
        >
          No artwork available
        </div>
      )}
      <div className="card-body">
        <h4 className="card-title">{game.name}</h4>
        <span className="badge bg-info text-dark">{game.platform}</span>
        <p className="mt-2 mb-0 text-warning fs-5">
          {"★".repeat(game.rating)}
          {"☆".repeat(5 - game.rating)}
        </p>
      </div>
      <div className="card-footer">
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => onDelete(game.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

// The grid of game cards
function GameList({ games, onDelete }) {
  if (games.length === 0) {
    return <p className="text-white">No games found.</p>;
  }

  return (
    <div className="row g-3">
      {games.map((game) => {
        return (
          <div className="col-6 col-md-4 col-lg-3" key={game.id}>
            <GameCard game={game} onDelete={onDelete} />
          </div>
        );
      })}
    </div>
  );
}

function GameCounter({shown, total}) {
  return (
    <p className="text-white mt-3">
      Showing {shown} in the backlog of {total} total games.
    </p>
  );
}

function App() {
  const [games, setGames] = useState([
    { id: 1, name: "Elden Ring", platform: "PC", rating: 5, artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjpgNlwCdjjyBwj-NppzTMnAc2cmmEdpANgo6R37CxYipXrT2-RqoBGHZ3QD1Emp0KIS3VPEN5pvqVKTWhdV0oyyyeZhc8DF0mlCPODtDixw&s=10" },
    { id: 2, name: "Zelda: Tears of the Kingdom", platform: "Nintendo Switch", rating: 5, artwork: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNMpKo0fV1VV3O-9d3oC9ZnDkwJdEwgXextkt3HI-Ydw&s=10" },
    { id: 3, name: "Among Us", platform: "PC", rating: 4, artwork: "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" },
  ]);
  const [search, setSearch] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("All");

  function addGame(newGame) {
    setGames([...games, newGame]);
  }

  function deleteGame(id) {
    setGames(games.filter((game) => game.id !== id));
  }

  const visibleGames = games.filter((game) => {
    const matchPlatform =
      filterPlatform === "All" || game.platform === filterPlatform;
    const matchSearch = game.name.toLowerCase().includes(search.toLowerCase());
    return matchPlatform && matchSearch;
  });

  return (
    <div className="container py-4">
      <h1 
      className="rounded p-3 mb-4 text-white"
      >BacklogTrap</h1>
      <GameForm onAddGame={addGame} />
      <GameFilters
        search={search}
        setSearch={setSearch}
        filterPlatform={filterPlatform}
        setFilterPlatform={setFilterPlatform}
      />
      <GameCounter shown={visibleGames.length} total={games.length} />
      <GameList games={visibleGames} onDelete={deleteGame} />
      <footer className="mt-4 text-center text-white">
        <p>How about you finish up your backlog?</p>
      </footer>
    </div>
  );
}

export default App;