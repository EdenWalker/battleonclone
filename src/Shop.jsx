import React, { useState, useEffect } from "react";
import OpponentCard from "./OpponentCard";
import EcommerceFetch from "./EcommerceFetch"; // Ensure this fetch function is properly set up

function Shop() {
  const [opponents, setOpponents] = useState([]);
  const [sortedOpponents, setSortedOpponents] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const monstersPerLoad = 4;
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...opponents].sort((a, b) =>
      newSortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setSortedOpponents(sorted);
    setSortOrder(newSortOrder);
    setOpponents(sorted.slice(0, monstersPerLoad)); // Reset opponents list after sort
  };

  useEffect(() => {
    const fetchOpponents = async () => {
      try {
        const data = await EcommerceFetch(); // Fetch data from backend
        const sorted = data.sort((a, b) => a.price - b.price); // Sort data by price (ascending)
        setSortedOpponents(sorted);
        setOpponents(sorted.slice(0, monstersPerLoad)); // Set the first 4 opponents
      } catch (err) {
        setError("Failed to fetch opponents data.");
        console.log(err);
      } finally {
        setLoading(false); // Stop loading after fetch is done
      }
    };

    fetchOpponents();
  }, []);

  const loadMoreOpponents = () => {
    // Load the next 4 monsters
    const nextMonsters = sortedOpponents.slice(opponents.length, opponents.length + monstersPerLoad);
    setOpponents([...opponents, ...nextMonsters]);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <>
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Battleon</h1>
          <p className="lead">Discover amazing Opponents at unbeatable Difficulties</p>
        </div>
      </header>

      <main className="container my-5">
        <h2 className="text-center mb-4">Shop</h2>
        <button className="btn btn-primary mb-4" onClick={toggleSortOrder}>
          Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>

        <div className="row">
          {opponents.map((opponent, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <OpponentCard
                image={opponent.image}
                Name={opponent.name}
                price={opponent.price}
                id={opponent.id}
              
                
              />
            </div>
          ))}
        </div>

        {opponents.length < sortedOpponents.length && (
          <div className="text-center">
            <button className="btn btn-primary" onClick={loadMoreOpponents}>
              Load More
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Shop;
