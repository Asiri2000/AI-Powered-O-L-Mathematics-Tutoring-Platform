const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "admin",
  database: "postgres",
});

async function testDB() {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL");

    const res = await client.query("SELECT * FROM product");
    console.log(res.rows);

  } catch (err) {
    console.error("❌ Database Error:");
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error("Detail:", err.detail);
    console.error("Stack:", err.stack);
  } finally {
    await client.end().catch(() => {});
  }
}

testDB();