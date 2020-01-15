USE toshare;

INSERT INTO family (name, id)
VALUES ('Dupont', 1);

INSERT INTO event 
(
    date_start,
    date_end,
    family_id
) 
VALUES (
    '2019-12-06 15:00:00',
    '2019-12-06 16:00:00',
    1
);

INSERT INTO user (
    firstname,
    lastname,
    birthdate,
    email,
    password
)
VALUES(
    'Léo',
    'NIDAS',
    '1987-08-08',
    'leonidas@gmail.com',
    'passwordexample'
);

INSERT INTO todo (
    description, 
    id,
    family_id,
    user_id
)
VALUES (
    'prendre RDV chez le dentiste pour Lucas', 
    1,
    1,
    1
);
