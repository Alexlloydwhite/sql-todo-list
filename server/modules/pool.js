// bringing in postgresql as pg
const pg = require('pg');

// config for database
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5433,
    max: 10,
    idleTimeoutMillis: 30000
};

// establishing the pool per config
const pool = new pg.Pool(config);

// message to log connection to postgresql
pool.on("connect", () => {
    console.log('connected to postgres');
});

// message to log error, if unable to connect to postgresql
pool.on("error", (err) => {
    console.log('error connecting to postgres', err);
});

// export module as "pool".
module.exports = pool;