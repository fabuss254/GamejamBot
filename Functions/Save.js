const fs = require('fs');

module.exports = (Main) => {
    return () => {
        fs.writeFileSync('Data.json', JSON.stringify(Main.Data));
    }
};