CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(20) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
