const bcrypt = require('bcryptjs');

for(let i = 0; i < 10; i++) {
    let hash = bcrypt.hashSync('bacon', 8);
    console.log(bcrypt.compareSync('bacon', hash));
};