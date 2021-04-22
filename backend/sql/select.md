####

基本查询
SELECT * FROM table

条件查询
SELECT * FROM table WHERE score > 80

投影查询
SELECT id, score points FROM TABLE WHERE score > 80

排序
SELECT id, name, gender, score FROM students ORDER BY score;

分页查询
SELECT * FROM students LIMIT 3 OFFSET 0 ;

聚合查询
SELECT COUNT(*) FROM students

多表查询
SELECT * FROM table1 table2
