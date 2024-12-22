use sesac;
show tables;

DESC user;
DESC email;
drop table bcomments, board, game, pcomments, player;
drop table products, profile, team, teamgame, user, userfavs, visitor, visitors;
drop table user;
drop table products;
SELECT * FROM user;

DELETE FROM user WHERE `userId` LIKE 'a%';
DESC products;

