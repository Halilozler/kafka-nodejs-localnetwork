exports.dbCommand = {
    tblCreate: "CREATE TABLE tbl_log (id serial PRIMARY KEY, user_id VARCHAR ( 50 ), mesaj VARCHAR ( 50 ))",
    writeData: "INSERT INTO tbl_log(user_id, mesaj) VALUES($1, $2)",
    readData: "SELECT * FROM public.tbl_log ORDER BY id DESC"
}

