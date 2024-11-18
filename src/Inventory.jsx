import React from "react";
import { useAtom } from "jotai";
import { inventoryAtom } from "./Cart";
import OpponentCard from "./OpponentCard"; 

function Inventory() {
  const [inventory] = useAtom(inventoryAtom); 

  return (
    <>
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Battleon</h1>
          <p className="lead">Discover amazing Opponents at unbeatable Difficulties</p>
        </div>
      </header>

      <section className="container my-5">
        <h2 className="text-center mb-4">Your Inventory</h2>
        {inventory.length === 0 ? (
          <p className="text-center">Your inventory is empty. Start adding opponents!</p>
        ) : (
          <div className="row">
            {inventory.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <OpponentCard {...item} hideAddToCart={true} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}


export default Inventory;
