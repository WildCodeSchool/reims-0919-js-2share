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
