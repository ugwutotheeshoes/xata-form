import React, { useState } from "react";
import "./App.css";

function App({ products }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    favorite: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const trigger = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    updateData();
    setFormData({ name: "", email: "", favorite: "", message: "" });
  };

  const updateData = () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer API",
        "Content-Type": "application/json",
      },
      body: `{"name":"${formData.name}","email":"${formData.email}", "car":"${formData.favorite}","message":"${formData.message}"}`,
    };

    fetch(
      "DATABASE_URL",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  return (
    <div className="App">
      <div className="icon">
        <h2>Autopedic</h2>
        {isOpen ? <button onClick={trigger}>go back</button> : ""}
      </div>
      {!isOpen ? (
        <div style={isOpen ? { marginTop: 0 } : { marginTop: 280 }}>
          <h1>Wanna win free car?</h1>
          <button onClick={toggle}>Click me!</button>
        </div>
      ) : (
        ""
      )}
      {isOpen ? (
        <div className="section">
          <p>
            Stand a chance to win a free car from AutoPedic. Fill the form below
            to participate in the draw.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="label">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="label">
                <label>email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="label">
                <label>What is your dream car?</label>
                <input
                  type="text"
                  name="favorite"
                  value={formData.favorite}
                  onChange={handleChange}
                />
              </div>
              <div className="label">
                <label>What can a car do for your right now?</label>
                <textarea
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <button>submit</button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      <footer>Autopedic | 2022</footer>
    </div>
  );
}

export default App;
