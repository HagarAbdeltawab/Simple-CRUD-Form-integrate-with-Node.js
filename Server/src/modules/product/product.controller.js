import connection from "../../../DB/connection.js";

export const addProduct = (req, res) => {
    const { title, price, description } = req.body;
    connection(`insert into products (title,price,description) values (?,?,?)`,
    [title,price,description], (error, results) => {
        if (error) {
            res.json({ message: 'error',error });
        } else {
            res.json({message:'success'});
        }
    });
}

export const getProduct = (req, res) => {
    let str = '';
    let sel = '*';
    if (req.query.title) str = req.query.title;
    if (req.query.select) sel = req.query.select;
    connection(`select ${sel} from products where title like '%${str}%' ` ,
    (error, results) => {
        if (error) {
            res.json({ message: 'error',error });
        } else {
            res.json({message:'success',results});
        }
    });
};

export const updateProduct = (req, res) => {
    const { title, price, description} = req.body;
    const {id} = req.params
    let query ='update products set';
    if(title) query += ` title = '${title}'`;
    if(price) query += ` ,price = ${price}`;
    if(description) query += ` ,description = '${description}'`;
    query += ` where id = ${id}`;
    
    connection(query, (error, results) => {
        if (error) {
            res.json({ message: 'error',error });
        } else {
            res.json({message:'success'});
        }
    });
};

export const deleteProduct = (req, res) => {
    connection(`delete from products where id= ?`,[req.params.id], (error, results) => {
        if (error) {
            res.json({ message: 'error',error });
        } else {
            res.json({message:'success'});
        }
    });
}