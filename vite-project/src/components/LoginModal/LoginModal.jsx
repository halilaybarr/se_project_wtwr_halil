import React, { useState } from "react";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password }).catch(setError);
  };

  return isOpen ? (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  ) : null;
}

export default LoginModal;

<LoginModal
  isOpen={activeModal === "login"}
  onClose={() => setActiveModal("")}
  onLogin={handleLogin}
/>