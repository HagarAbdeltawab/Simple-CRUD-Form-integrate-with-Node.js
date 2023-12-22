import { createConnection } from 'mysql2';

import { promisify } from "util";

const connection = createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'nodeSessions'
});

export default promisify(connection.execute).bind(connection);

