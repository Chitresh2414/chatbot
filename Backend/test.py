from db import Database

db=Database()
con=db.connect()

if con:
    print("✅ Database connected successfully")
    con.close()
else:
    print("❌ Database connection failed")