import {useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState();
  const [isLoading, setLoading] = useState(false);

  const [ascending, setAscending] = useState(false); 

  function fetchData() {
    fetch("https://www.anapioficeandfire.com/api/books?pageSize=30")
      .then(setLoading(true))
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
        
      })
 
  }
  const toggleTime = () => {
    const newToggle = !ascending;
    setAscending(newToggle);

    setBooks((preData) => {
      return preData.sort((a, b) =>
        newToggle
          ? new Date(a.released) - new Date(b.released)
          : new Date(b.released) - new Date(a.released)
      );
    });
  };

  return (
    <div className="App">
      <h1>Game of Thrones Books</h1>
      <h2>Fetch data from API</h2>
      <div>
        <button className="button" onClick={fetchData}>Fetch Data</button>
        <div id="loader" className={isLoading ? "on" : ""}></div>
        <button className="toggle-button" onClick={toggleTime}>Sort</button>
      </div>

      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toLocaleDateString();

            return (
              <div className="book" key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div className="details">
                  <h3>
                    <span role="img" aria-label="person">
                      🧔🏻
                    </span>
                    {book.authors}
                  </h3>
                  <p>
                    <span role="img" aria-label="pages">
                      📄
                    </span>
                    {book.numberOfPages} pages
                  </p>
                  <p>
                    <span role="img" aria-label="world">
                      🗺
                    </span>
                    {book.country}
                  </p>
                  <p>
                    <span role="img" aria-label="date">
                      📅
                    </span>
                    {cleanedDate}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
