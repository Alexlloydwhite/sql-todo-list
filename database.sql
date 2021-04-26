CREATE TABLE "todo-list" (
"id" SERIAL PRIMARY KEY,
"listItem" varchar(120) not null,
"isComplete" BOOLEAN DEFAULT FALSE);

INSERT INTO "todo-list" ("listItem")
VALUES ('climb at bouldering gym'), ('graduate from prime'), ('feed the cat'), ('get a job');

SELECT * FROM "todo-list";