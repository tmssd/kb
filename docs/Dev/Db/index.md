# Data Bases

## Db Learning Sources

[Khan Academy](https://www.khanacademy.org/computing/computer-programming/sql)

[Codecademy](https://www.codecademy.com/learn/learn-sql)

### Data Base migration, Event Sourcing concept

[Database Migration: Knex vs TypeORM vs Sequelize(part 1)](https://blog.hao.dev/database-migration-knex-vs-typeorm-vs-sequelize)

[Database Migration: Knex vs TypeORM vs Sequelize(part 2)](https://blog.hao.dev/why-i-would-avoid-sequelize-in-the-future)

## Db Essentials

DBMS - a collection of tools to delete,insert and lookup data(and mamy other actions). Thera are two types:

1. **Relational Database:** postgreSQL, oracle, sql etc.
   + *schema*: the relation between tables
   + *structure*: data stored in many tables with specific information, e.g. a table that stores users' emails, a table that stores users' addresses etc.
   + *communication via*: SQL

2. **Non-relational Database(NoSQL):** mongoDB etc.
   + *schema*: not needed, so it's more flexible
   + *structure*: all data stored in one json file, e.g. each user has a file with username, address etc.
   + *communication via*:
     + db query languages, e.g. mongoDB query language
     + Object Data Modeling (ODM) library, e.g. Mongoose

## SQL

```sql
-- BASICS:

-- create table
CREATE TABLE nameofTable (
	id serial NOT NULL PRIMARY KEY -- auto increase for us when insert, don't need to specify on insert
	columnName dataType NOT NULL,
	columnName dataType UNIQUE
    );

-- insert table
INSERT INTO nameofTable(columnName1,columnName2) VALUES (value1, value2);

-- add column
ALTER TABLE nameofTable ADD columnName

-- add value in column
UPDATE nameofTable SET columnName = 10 WHERE columnName = 'aa'

-- get info
SELECT columnName FROM nameofTable
-- same here using `*` (represents 'all')
SELECT * FROM nameofTable


-- CONDITIONAL SELECTION:

-- select name begin with A
SELECT * FROM users WHERE name LIKE 'A%';

-- ending with y
SELECT * FROM users WHERE name LIKE '%y';

-- order the column
SELECT * FROM users ORDER BY score ASC;
SELECT * FROM users ORDER BY score DESC;


-- FUNCTIONS:

-- most common
SELECT AVG(score) FROM users;
SELECT SUM(score) FROM users;
SELECT COUNT(name) FROM users;

-- JOIN
SELECT * FROM users JOIN login ON users.name = login.name;

-- DELETION:

-- delete row
DELETE FROM users WHERE name='Sally';

-- delete table
DROP TABLE users;
```

## GUI dbms clients

### Free

+ [**DBeaver**](https://dbeaver.io/) - Free multi-platform database tool for developers, database administrators, analysts and all people who need to work with databases.

  Supports: MySQL, PostgreSQL, SQLite, Oracle, DB2, SQL Server, Sybase, MS Access, Teradata, Firebird, Apache Hive, Phoenix, Presto, etc.

+ [**Beekeeper Studio**](https://www.beekeeperstudio.io/) - Open source sql editor and database manager.

  Supports:  MySQL, Postgres, SQLite, SQL Server, MariaDB, etc.

### Paid
