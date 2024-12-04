// import React from "react";
// import { useAtom } from "jotai";
// import { inventoryAtom } from "./Cart";
// import OpponentCard from "./OpponentCard"; 

// function Inventory() {
//   const [inventory] = useAtom(inventoryAtom); 

//   return (
//     <>
//       <header className="bg-primary text-white text-center py-5">
//         <div className="container">
//           <h1 className="display-4">Welcome to Battleon</h1>
//           <p className="lead">Discover amazing Opponents at unbeatable Difficulties</p>
//         </div>
//       </header>

//       <section className="container my-5">
//         <h2 className="text-center mb-4">Your Inventory</h2>
//         {inventory.length === 0 ? (
//           <p className="text-center">Your inventory is empty. Start adding opponents!</p>
//         ) : (
//           <div className="row">
//            {inventory.map((item, index) => (
//   <div key={item.id || `inventory-item-${index}`} className="col-md-4 mb-4">
//     <OpponentCard {...item} hideAddToCart={true} />
//   </div>
// ))}

//           </div>
//         )}
//       </section>
//     </>
//   );
// }


// export default Inventory;
import React, { useEffect, useState } from "react";
import { useJwt } from "./UserStore";
import OpponentCard from "./OpponentCard";
import axios from "axios";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const { getJwt } = useJwt();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch inventory from server
  const fetchInventory = async () => {
    setIsLoading(true);
    const jwt = getJwt();
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/api/inventory', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setInventory(response.data);
    } catch (err) {
      setError("Failed to load inventory. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update inventory on server
  const updateInventory = async (updatedItems) => {
    const jwt = getJwt();
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + '/api/inventory',
        { inventoryItems: updatedItems },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      // Optionally refetch inventory to reflect updates
      fetchInventory();
    } catch (err) {
      console.error("Error updating inventory:", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

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
        {isLoading ? (
          <p className="text-center">Loading inventory...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : inventory.length === 0 ? (
          <p className="text-center">Your inventory is empty. Start adding opponents!</p>
        ) : (
          <div className="row">
            {inventory.map((item, index) => (
              <div key={item.id || `inventory-item-${index}`} className="col-md-4 mb-4">
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
