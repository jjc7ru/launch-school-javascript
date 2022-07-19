CREATE TABLE expenses (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  amount decimal(7, 2) NOT NULL CHECK (amount > 0.01),
  memo text NOT NULL,
  created_on timestamp DEFAULT NOW() NOT NULL
);


