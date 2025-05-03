import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Expired() {
  const [expiringItems, setExpiringItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState({});
  const [loadingRecom, setLoadingRecom] = useState({});
  const [activeFilter, setActiveFilter] = useState('Expired');

  useEffect(() => {
      const fetchExpiringItems = async () => {
          try {
              const response = await axios.get('http://localhost:8081/api/items/expired');
              setExpiringItems(response.data.data);
              setError(null);
          } catch (err) {
              console.error("Error fetching expiring items:", err);
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchExpiringItems();
  }, []);

  const handleAskAI = async (item) => {
      setLoadingRecom(prev => ({ ...prev, [item._id]: true }));

      try {
          const prompt = `
        I'm managing inventory for a restaurant/bar. I have the following item about to expire:
        
        Item Name: ${item.name}
        Category: ${item.category}
        Quantity: ${item.quantity}
        Expiration Date: ${new Date(item.expireDate).toLocaleDateString()}
        
        Please provide:
        1. A brief analysis of why this might be expiring
        2. Practical recommendations to prevent waste (recipes, specials, etc.)
        3. Suggested adjustment for next month's order quantity
        4. Any storage tips if relevant
        
        Keep the response concise but informative, about 3-4 sentences max.
      `;

          const response = await axios.post('http://localhost:8081/ai/recommend', { prompt });
          setRecommendations(prev => ({ ...prev, [item._id]: response.data.message }));
      } catch (err) {
          console.error('Error generating recommendation:', err);
          setRecommendations(prev => ({
              ...prev,
              [item._id]: "Error generating recommendation. Please try again later."
          }));
      } finally {
          setLoadingRecom(prev => ({ ...prev, [item._id]: false }));
      }
  };

  if (loading) {
      return <div className="exp-loading">Loading...</div>;
  }

  if (error) {
      return <div className="exp-error">Error: {error}</div>;
  }

  return (
      <div>
          <div className="exp-container">
              <h1 className="exp-title">Expired</h1>
              <div className="exp-filter-tabs">
                  <button
                      className={`exp-filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                      onClick={() => (window.location.href = '/')}
                  >
                      All
                  </button>
                  <button
                      className={`exp-filter-btn ${activeFilter === '7 Days' ? 'active' : ''}`}
                      onClick={() => (window.location.href = '/expItem')}
                  >
                      7 Days
                  </button>
                  <button
                      className={`exp-filter-btn ${activeFilter === '14 Days' ? 'active' : ''}`}
                      onClick={() => (window.location.href = '/expItem14')}
                  >
                      14 Days
                  </button>
                  <button
                      className={`exp-filter-btn ${activeFilter === 'Expired' ? 'active' : ''}`}
                      onClick={() => (window.location.href = '/exp')}
                  >
                      Expired
                  </button>
              </div>
              <div className="exp-items-table-container">
                  {expiringItems.length > 0 ? (
                    
                      <table className="exp-items-table">
                          <thead>
                              <tr>
                                  <th>Item Name</th>
                                  <th>Category</th>
                                  <th>Qty</th>
                                  <th>Expiry Date</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {expiringItems.map((item) => {
                                  return (
                                      <tr key={item._id}>
                                          <td>{item.name}</td>
                                          <td>{item.category}</td>
                                          <td>{item.quantity}</td>
                                          <td>{new Date(item.expireDate).toLocaleDateString()}
                                          </td>
                                          <td className="exp-action-cell">
                                              <button
                                                  className="exp-ai-btn"
                                                  onClick={() => handleAskAI(item)}
                                                  disabled={loadingRecom[item._id]}
                                              >
                                                  {loadingRecom[item._id] ? '...' : 'Ask AI'}
                                              </button>
                                              {recommendations[item._id] && (
                                                  <div className="exp-ai-recommendation">
                                                      <p style={{ whiteSpace: "pre-line" }}>{recommendations[item._id]}</p>
                                                  </div>
                                              )}
                                          </td>
                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>
                  ) : (
                      <p className="exp-no-items">No items found.</p>
                  )}
              </div>
          </div>
      </div>
  )
}

export default Expired
