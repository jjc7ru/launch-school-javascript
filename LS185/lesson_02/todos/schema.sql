CREATE TABLE todolists (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL UNIQUE
);

CREATE TABLE todos (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  done boolean NOT NULL DEFAULT false,
  todolist_id int REFERENCES todolists (id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE users (
  username text PRIMARY KEY,
  password text NOT NULL
);
