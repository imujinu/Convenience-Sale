
-- Active: 1733709200225@@127.0.0.1@3306@sesac-- Active: 1732688612707@@127.0.0.1@3306@sesac-- Active: 1734666914774@@127.0.0.1@3306@sesac-- Active: 1732688613389@@127.0.0.1@3306@sesac
use sesac;
show tables;

DESC user;
DESC email;
DESC board;
ALTER TABLE board ADD COLUMN boardCategory VARCHAR(255);
ALTER TABLE board
MODIFY COLUMN boardCategory VARCHAR(20) NULL;

SELECT * FROM board;

INSERT INTO board 
(boardTitle, boardDate, boardDetail, boardPicPath, userId, boardCategory)
VALUES
('자유게시판 예시 1번', NOW(), '안녕하세요. 첫 글을 작성합니다!', '/static/uploads/board/example1.jpg', 'boss3', '잡수다');
INSERT INTO board 
(boardTitle, boardDate, boardDetail, boardPicPath, userId, boardCategory)
VALUES
('자유게시판 예시 2번', NOW(), '제품 후기를 작성해요', '/static/uploads/board/example1.jpg', 'boss3', '제품후기');
INSERT INTO board 
(boardTitle, boardDate, boardDetail, boardPicPath, userId, boardCategory)
VALUES
('자유게시판 예시 3번', NOW(), '라면과 깁밥을 먹어요', '/static/uploads/board/example1.jpg', 'boss3', '레시피 공유');
INSERT INTO board 
(boardTitle, boardDate, boardDetail, boardPicPath, userId, boardCategory)
VALUES
('자유게시판 예시 4번', NOW(), '새싹 카드는 10% 할인과 1% 적립이 있어요', '/static/uploads/board/example1.jpg', 'boss3', '할인 정보');
INSERT INTO board 
(boardTitle, boardDate, boardDetail, boardPicPath, userId, boardCategory)
VALUES
('자유게시판 예시 5번', NOW(), '웹 페이지가 귀여워요', '/static/uploads/board/example1.jpg', 'boss3', '전체');
INSERT INTO board 
(boardTitle, boardDate, boardDetail, boardPicPath, userId, boardCategory)
VALUES
('자유게시판 예시 6번', NOW(), '요즘 뉴스 보기 무서워요', '/static/uploads/board/example1.jpg', 'boss3', '잡수다');

INSERT INTO user VALUES("qwe", "Qwe12@www", "qwek", "static/image/logo1.png");
ALTER TABLE bcomments DROP FOREIGN KEY bcomments_ibfk_1;
drop table bcomments, board, game, pcomments, player;
drop table products, profile, team, teamgame, user, userfavs, visitor, visitors;
drop table user;

SELECT * FROM user;
SELECT * FROM email;
DROP TABLE email;
SELECT * FROM products;
DELETE FROM user WHERE userId = "qwpl";
DESC products;
use sesac;
DELETE FROM email WHERE userEmail="wlsdnrhdwkd@naver.com";

ALTER TABLE Products
MODIFY createdAt DATETIME DEFAULT CURRENT_TIMESTAMP;

INSERT INTO Products (id, name, price, event, convenienceName, imageUrl, tags, createdAt, updatedAt)
VALUES
("cu-1", "2080)센서티브미세모", 3200, "1+1", "CU", "8801046860458.png", '[]', NOW(), NOW()),
("cu-2", "2080)슈퍼클린초극세모", 2000, "1+1", "CU", "8801046356807.png", '[]', NOW(), NOW()),
("cu-3", "2080)진지발리스치약", 3900, "1+1", "CU", "8801046996799.png", '[]', NOW(), NOW()),
("cu-4", "2080)치약", 4000, "1+1", "CU", "8801046846087.png", '[]', NOW(), NOW()),
("cu-5", "2080)칫솔", 2800, "1+1", "CU", "8801046057216.png", '[]', NOW(), NOW()),
("cu-6", "46cm)초극세모칫솔", 3500, "1+1", "CU", "8801051009033.png", '[]', NOW(), NOW()),
("cu-7", "46cm)쿨민트치약", 3900, "1+1", "CU", "8801051057577.png", '[]', NOW(), NOW()),
("cu-8", "BR)레인보우샤베트워터500", 2500, "1+1", "CU", "8809288634967.png", '[]', NOW(), NOW()),
("cu-9", "BR)망고탱고워터P500", 2500, "1+1", "CU", "8809288635315.png", '[]', NOW(), NOW()),
("cu-10", "BR)피치요거트워터P500", 2500, "1+1", "CU", "8809288634974.png", '[]', NOW(), NOW()),
("cu-11", "CJ)100%현미밥130g", 2600, "1+1", "CU", "8801392023200.png", '[]', NOW(), NOW()),
("cu-12", "CJ)100%현미밥130g*3입", 7500, "1+1", "CU", "8801007327372.png", '[]', NOW(), NOW()),
("cu-13", "CJ)구이한판그릴스모크60g", 3300, "1+1", "CU", "8801007918310.png", '[]', NOW(), NOW()),
("cu-14", "CJ)닭가슴살샐러드톡톡96g", 4500, "1+1", "CU", "8801007966878.png", '[]', NOW(), NOW()),
("cu-15", "CJ)동치미냉면육수294g", 2000, "1+1", "CU", "8801007033686.png", '[]', NOW(), NOW()),
("cu-16", "CJ)두부듬뿍김치찌개460g", 9900, "1+1", "CU", "8801007528557.png", '[]', NOW(), NOW()),
("cu-17", "CJ)두부듬뿍된장찌개460g", 9900, "1+1", "CU", "8801007528595.png", '[]', NOW(), NOW()),
("cu-18", "CJ)맥스봉매콤불고기핫바", 2300, "1+1", "CU", "8801392090530.png", '[]', NOW(), NOW()),
("cu-19", "CJ)맥스봉빅소시지150g", 3900, "1+1", "CU", "8801007403793.png", '[]', NOW(), NOW()),
("cu-20", "CJ)맥스봉오리지널25g", 1200, "1+1", "CU", "8801392059636.png", '[]', NOW(), NOW()),
("cu-21", "C&C)딥액션클렌져120G", 10500, "2+1", "CU", "8801008200469.png", '[]', NOW(), NOW()),
("cu-22", "CJ)가쓰오우동컵", 2200, "2+1", "CU", "8801007752404.png", '[]', NOW(), NOW()),
("cu-23", "CJ)고기수제만두4입", 4400, "2+1", "CU", "8801007836294.png", '[]', NOW(), NOW()),
("cu-24", "CJ)고메치즈함박152g", 3900, "2+1", "CU", "8801007772493.png", '[]', NOW(), NOW()),
("cu-25", "CJ)고메토마토미트볼147g", 3900, "2+1", "CU", "8801007626994.png", '[]', NOW(), NOW()),
("cu-26", "CJ)고메함박152g", 3900, "2+1", "CU", "8801007626970.png", '[]', NOW(), NOW()),
("cu-27", "CJ)김치수제만두4입", 4400, "2+1", "CU", "8801007836270.png", '[]', NOW(), NOW()),
("cu-28", "CJ)다담떡볶이양념150g", 3300, "2+1", "CU", "8801007434681.png", '[]', NOW(), NOW()),
("cu-29", "CJ)닭가슴살소시지2입", 4500, "2+1", "CU", "8801007882703.png", '[]', NOW(), NOW()),
("cu-30", "CJ)닭가슴살소시지바80g", 2900, "2+1", "CU", "8801007899985.png", '[]', NOW(), NOW()),
("cu-31", "CJ)닭가슴살소시지청양80g", 2900, "2+1", "CU", "8801007951805.png", '[]', NOW(), NOW()),
("cu-32", "CJ)닭가슴살순살케이준100", 4500, "2+1", "CU", "8801392033223.png", '[]', NOW(), NOW()),
("cu-33", "CJ)닭가슴살스테이크100g", 4500, "2+1", "CU", "8801007880402.png", '[]', NOW(), NOW()),
("cu-34", "CJ)도가니곰탕460g", 9900, "2+1", "CU", "8801007923000.png", '[]', NOW(), NOW()),
("cu-35", "CJ)렌틸콩퀴노아곤약밥", 3900, "2+1", "CU", "8801392076237.png", '[]', NOW(), NOW()),
("cu-36", "CJ)맛군밤60g", 3900, "2+1", "CU", "8801007427386.png", '[]', NOW(), NOW()),
("cu-37", "CJ)맛밤42g", 2400, "2+1", "CU", "8801007073453.png", '[]', NOW(), NOW()),
("cu-38", "CJ)맛밤80g", 3900, "2+1", "CU", "8801007022635.png", '[]', NOW(), NOW()),
("cu-39", "CJ)맥스봉꼬치바청양90g", 2500, "2+1", "CU", "8801007880303.png", '[]', NOW(), NOW()),
("cu-40", "CJ)맥스봉스팸콕콕80g", 3900, "2+1", "CU", "8801392105630.png", '[]', NOW(), NOW()),
("gs-1", "CJ)갈비만두300G", 6900, "1+1", "GS25", "GD_8801007508740_003.jpg", "[]", NOW(), NOW()),
("gs-2", "CJ)계산대용소시지25G", 1200, "1+1", "GS25", "GD_8801392059636_002.jpg", "[]", NOW(), NOW()),
("gs-3", "CJ)고소치즈후랑크65G", 2300, "1+1", "GS25", "GD_8801392090516_001.jpg", "[]", NOW(), NOW()),
("gs-4", "CJ)구이한판그릴스모크60G", 3300, "1+1", "GS25", "GD_8801007918310_002.jpg", "[]", NOW(), NOW()),
("gs-5", "CJ)국산콩부침두부380G", 5900, "1+1", "GS25", "GD_8801007034287_289.jpg", "[]", NOW(), NOW()),
("gs-6", "CJ)국산콩찌개두부380G", 5900, "1+1", "GS25", "GD_8801007009322_324.jpg", "[]", NOW(), NOW()),
("gs-7", "CJ)동그란스팸160G", 5500, "1+1", "GS25", "GD_8801392088230_002.jpg", "[]", NOW(), NOW()),
("gs-8", "CJ)매콤불고기핫바65G", 2300, "1+1", "GS25", "GD_8801392090530_001.jpg", "[]", NOW(), NOW()),
("gs-9", "CJ)맥스봉소시지150G", 3900, "1+1", "GS25", "GD_8801007403793_001.jpg", "[]", NOW(), NOW()),
("gs-10", "CJ)맥스봉오리지널50G", 2200, "1+1", "GS25", "GD_8801007849126_001.jpg", "[]", NOW(), NOW()),
("gs-11", "CJ)맥스봉오리지널70G", 2600, "1+1", "GS25", "GD_8801392060632_001.jpg", "[]", NOW(), NOW()),
("gs-12", "CJ)명가김자반(한식간장)20G", 3200, "1+1", "GS25", "GD_8801007373218_002.jpg", "[]", NOW(), NOW()),
("gs-13", "CJ)베트남쌀국수(2입)", 9900, "1+1", "GS25", "GD_8801007768441_003.jpg", "[]", NOW(), NOW()),
("gs-14", "CJ)부먹밥미역국밥45G", 3500, "1+1", "GS25", "GD_8801392089022_002.jpg", "[]", NOW(), NOW()),
("gs-15", "CJ)부먹밥사골곰탕밥50G", 3500, "1+1", "GS25", "GD_8801392089046_002.jpg", "[]", NOW(), NOW()),
("gs-16", "CJ)부먹밥짬뽕밥52G", 3500, "1+1", "GS25", "GD_8801392089060_002.jpg", "[]", NOW(), NOW()),
("gs-17", "CJ)비비고군만두315G", 6900, "1+1", "GS25", "GD_8801392011528_002.jpg", "[]", NOW(), NOW()),
("gs-18", "CJ)비비고두부듬뿍김치찌개460G", 9900, "1+1", "GS25", "GD_8801007528557_002.jpg", "[]", NOW(), NOW()),
("gs-19", "CJ)비비고두부듬뿍된장찌개460G", 9900, "1+1", "GS25", "GD_8801007528595_002.jpg", "[]", NOW(), NOW()),
("gs-20", "CJ)비비고버터오징어김스낵40G", 4900, "1+1", "GS25", "GD_8801392116339_002.jpg", "[]", NOW(), NOW()),
("gs-21", "CJ)BIG김치날치알밥(컵밥)", 5400, "2+1", "GS25", "GD_8801007894911_003.jpg", "[]", NOW(), NOW()),
("gs-22", "CJ)BIG스팸김치덮밥(컵밥)", 5400, "2+1", "GS25", "GD_8801007894898_001.jpg", "[]", NOW(), NOW()),
("gs-23", "CJ)BIG치즈닭갈비덮밥(컵밥)", 5400, "2+1", "GS25", "GD_8801007921235_002.jpg", "[]", NOW(), NOW()),
("gs-24", "CJ)가쓰오우동(용기)", 3900, "2+1", "GS25", "GD_8801007009377_381.jpg", "[]", NOW(), NOW()),
("gs-25", "CJ)맛군밤60G", 3900, "2+1", "GS25", "GD_8801007427386_002.jpg", "[]", NOW(), NOW()),
("gs-26", "CJ)맛밤80G", 3900, "2+1", "GS25", "GD_8801007022635_639.jpg", "[]", NOW(), NOW()),
("gs-27", "CJ)맥스봉스팸콕콕80G", 3900, "2+1", "GS25", "GD_8801392105630_002.jpg", "[]", NOW(), NOW()),
("gs-28", "CJ)맥스봉치즈50G", 2200, "2+1", "GS25", "GD_8801007021652_656.jpg", "[]", NOW(), NOW()),
("gs-29", "CJ)맥스봉치즈70G", 2600, "2+1", "GS25", "GD_8801007358499_002.jpg", "[]", NOW(), NOW()),
("gs-30", "CJ)비비고365교자287G", 4500, "2+1", "GS25", "GD_8801392054846_001.jpg", "[]", NOW(), NOW()),
("gs-31", "CJ)비비고김치200G", 3200, "2+1", "GS25", "GD_8801007529301_001.jpg", "[]", NOW(), NOW()),
("gs-32", "CJ)비비고김치400G", 5900, "2+1", "GS25", "GD_8801007529264_001.jpg", "[]", NOW(), NOW()),
("gs-33", "CJ)비비고김치볶음80G", 1900, "2+1", "GS25", "GD_8801007635989_003.jpg", "[]", NOW(), NOW()),
("gs-34", "CJ)비비고김치왕교자385G", 5900, "2+1", "GS25", "GD_8801007429052_002.jpg", "[]", NOW(), NOW()),
("gs-35", "CJ)비비고돼지고기김치찌개460G", 7900, "2+1", "GS25", "GD_8801007761749_002.jpg", "[]", NOW(), NOW()),
("gs-36", "CJ)비비고떡볶이컵110G", 3900, "2+1", "GS25", "GD_8801392090455_003.jpg", "[]", NOW(), NOW()),
("gs-37", "CJ)비비고매운떡볶이컵110G", 3900, "2+1", "GS25", "GD_8801392089626_004.jpg", "[]", NOW(), NOW()),
("gs-38", "CJ)비비고매운왕교자315G", 5900, "2+1", "GS25", "GD_8801007715353_002.jpg", "[]", NOW(), NOW()),
("gs-39", "CJ)비비고설렁탕500G", 5900, "2+1", "GS25", "GD_8801007560922_002.jpg", "[]", NOW(), NOW()),
("gs-40", "CJ)비비고소고기미역국500G", 5900, "2+1", "GS25", "GD_8801007561677_002.jpg", "[]", NOW(), NOW()),
("7ELEVEN-1", "다논)액티비아업플레인210ml", 2200, "1+1", "7ELEVEN", "510916.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-2", "다논)액티비아업딸기210ml", 2200, "1+1", "7ELEVEN", "510893.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-3", "덴마크)딸기딸기우유300ml", 1400, "1+1", "7ELEVEN", "731632.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-4", "빙그레)닥터캡슐플레인130ml", 2200, "1+1", "7ELEVEN", "302739.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-5", "덴마크)초코초코우유300ml", 1400, "1+1", "7ELEVEN", "731625.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-6", "덴마크)커피커피300ml", 1400, "1+1", "7ELEVEN", "731847.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-7", "덴마크)바나바나우유300ml", 1400, "1+1", "7ELEVEN", "731830.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-8", "다논)액티비아업복숭아210ml", 2200, "1+1", "7ELEVEN", "512651.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-9", "빙그레)닥터캡슐사과130ml", 2200, "1+1", "7ELEVEN", "665421.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-10", "빙그레)닥터캡슐베리믹스130ml", 2200, "1+1", "7ELEVEN", "669283.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-11", "풀무원)요거톡스타볼132g", 2200, "1+1", "7ELEVEN", "513948.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-12", "풀무원)초코그래놀라129g", 2200, "1+1", "7ELEVEN", "513887.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-13", "PB)오구딸기타임200ml", 1200, "1+1", "7ELEVEN", "671842.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-14", "PB)오구초코타임200ml", 1200, "1+1", "7ELEVEN", "671859.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-15", "빙그레)아이스티복숭아300ml", 1400, "1+1", "7ELEVEN", "671002.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-16", "빙그레)아이스티레몬300ml", 1400, "1+1", "7ELEVEN", "671019.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-17", "다논)액티비아스무디키위사과150", 2000, "1+1", "7ELEVEN", "514969.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-18", "다논)액티비아스무디딸기바나나1", 2000, "1+1", "7ELEVEN", "514945.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-19", "풀무원)요거톡초코필로우124g", 2200, "1+1", "7ELEVEN", "515317.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-20", "PB)앙리마티스카페라떼250ml", 3200, "1+1", "7ELEVEN", "743161.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-21", "PB)앙리마티스바닐라라떼250ml", 3200, "1+1", "7ELEVEN", "743178.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-22", "진주햄)천하장사50g", 2200, "1+1", "7ELEVEN", "285800.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-23", "CJ)숯불후랑크120g", 3700, "1+1", "7ELEVEN", "034980.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-24", "CJ)맥스봉빅소시지150g", 3900, "1+1", "7ELEVEN", "403793.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-25", "동원)친친오리지널소시지70g", 1900, "1+1", "7ELEVEN", "578857.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-26", "롯데)의성마늘직꾸닭100g", 3000, "1+1", "7ELEVEN", "410347.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-27", "롯데)의성마늘직꾸닭매콤100g", 3000, "1+1", "7ELEVEN", "410392.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-28", "대림)숯불구이맛후랑크70g", 1900, "1+1", "7ELEVEN", "019447.1.jpg", "[]", NOW(), NOW()),
("7ELEVEN-29", "롯데)키스틱55g", 2200, "1+1", "7ELEVEN", "203918.1.jpg", "[]", NOW(), NOW());







use sesac

DESCRIBE products