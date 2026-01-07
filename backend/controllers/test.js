const bcrypt = require("bcrypt");
async function getHash(){   
    const password_hash = await bcrypt.hash('Kitchen543.', Number(process.env.SALT_ROUNDS))
    console.log(password_hash)
}

getHash()