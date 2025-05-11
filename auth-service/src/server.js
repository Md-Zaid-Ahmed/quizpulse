const express = require('express');
const app = require('./app'); 

console.log("Starting server..."); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // This should now appear
});