import React, { useState, useEffect } from "react";
import OpponentCard from "./OpponentCard";
import OpponentsData from "./OpponentsData";

function Shop() {
  const [opponents, setOpponents] = useState([]);
  const [sortedOpponents, setSortedOpponents] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const monstersPerLoad = 4;

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...OpponentsData].sort((a, b) =>
      newSortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setSortedOpponents(sorted);
    setSortOrder(newSortOrder);
    setOpponents(sorted.slice(0, monstersPerLoad)); // Reset opponents list after sort
  };

  useEffect(() => {
    // Initially sort the data and load the first 4 monsters
    const sorted = [...OpponentsData].sort((a, b) => a.price - b.price);
    setSortedOpponents(sorted);
    setOpponents(sorted.slice(0, monstersPerLoad));
  }, []);

  const loadMoreOpponents = () => {
    // Load the next 4 monsters
    const nextMonsters = sortedOpponents.slice(opponents.length, opponents.length + monstersPerLoad);
    setOpponents([...opponents, ...nextMonsters]);
  };

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
                imageUrl={opponent.imageUrl}
                productName={opponent.productName}
                price={opponent.price}
                id={opponent.id}
                description={opponent.description}
                category={opponent.category}
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
