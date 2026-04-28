require('dotenv').config();
const fs = require('fs');
const content = `// Auto-generated from .env – do not edit manually
const urlBase = '${process.env.API_BASE_URL}';
`;
fs.writeFileSync('js/config.js', content);
console.log('Generated js/config.js');
