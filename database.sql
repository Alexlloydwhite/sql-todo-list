CREATE TABLE "todo-list" (
"id" SERIAL PRIMARY KEY,
"list-item" varchar(120) not null,
"is-complete" BOOLEAN DEFAULT FALSE);

INSERT INTO "todo-list" ("list-item")
VALUES ('do the dishes'), ('mow the lawn'), ('feed the cat'), ('laundry');

SELECT * FROM "todo-list";