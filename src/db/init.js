const Database = require("./config");

const initdb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`);

    await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

    await db.run(`INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
            )
            VALUES (
                "Nohan",
                "https://avatars.githubusercontent.com/u/57120185?v=4",
                5000,
                5,
                5,
                4,
                70
            );
        `);

    await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
            )
            VALUES (
                "Pizzaria Guloso",
                2,
                1,
                1618237877101
            );
        `);

    await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
            )
            VALUES (
                "OneTwo Projects",
                2,
                10,
                1618237877101
            );
        `);

    await db.close();
  },
};


initdb.init()
