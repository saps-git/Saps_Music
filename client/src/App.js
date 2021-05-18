import React from 'react';
import Login from './Login';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Dashboard';

function App() {
    const code = new URLSearchParams(window.location.search).get("code");

  return code ? <Dashboard code={code} /> : <Login />
}

export default App;
