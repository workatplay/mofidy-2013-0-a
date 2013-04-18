ALTER TABLE  `comments` ADD  `video` VARCHAR( 128 ) NULL DEFAULT  '',
ADD INDEX (  `video` );

ALTER TABLE  `zapp`.`comments` ADD INDEX (  `user` );