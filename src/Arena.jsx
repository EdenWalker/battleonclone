import React, { useState, useEffect } from "react";
import OpponentCard from "./OpponentCard";
import OpponentsData from "./OpponentsData";

function Arena() {
  const [opponents, setOpponents] = useState(OpponentsData);
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const monstersPerPage = 4;

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedOpponents = [...opponents].sort((a, b) => {
      return newSortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setOpponents(sortedOpponents);
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    const sortedOpponents = [...opponents].sort((a, b) => a.price - b.price);
    setOpponents(sortedOpponents);
  }, []);


  const totalPages = Math.ceil(opponents.length / monstersPerPage);


  const indexOfLastMonster = currentPage * monstersPerPage;
  const indexOfFirstMonster = indexOfLastMonster - monstersPerPage;
  const currentMonsters = opponents.slice(indexOfFirstMonster, indexOfLastMonster);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
        <h2 className="text-center mb-4">Arena</h2>
        <button className="btn btn-primary mb-4" onClick={toggleSortOrder}>
          Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>

        <div className="row">
          {currentMonsters.map((opponent, index) => (
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

        <div className="d-flex justify-content-center">
          {currentPage > 1 && (
            <button className="btn btn-secondary" onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button className="btn btn-secondary" onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export default Arena;
