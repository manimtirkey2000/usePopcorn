import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));

function Test() {
  const [movieRating, setMovieRating] = React.useState(0);
  return (
    <div>
      <StarRating
        defaultRating={movieRating}
        onSetRating={(rating) => setMovieRating(rating)}
      />
      <span>This movies has been rated {movieRating} stars!</span>
    </div>
  );
}

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating />
    <Test />
  </React.StrictMode>
);
