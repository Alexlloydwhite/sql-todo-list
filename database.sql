CREATE TABLE "todo-list" (
"id" SERIAL PRIMARY KEY,
"list-item" varchar(120) not null,
"is-complete" BOOLEAN DEFAULT FALSE);

INSERT INTO "todo-list" ("listItem")
VALUES ('climb at bouldering gym'), ('graduate from prime'), ('feed the cat'), ('get a job');

SELECT * FROM "todo-list";