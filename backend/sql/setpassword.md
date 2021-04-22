Update: On 8.0.15 (maybe already before that version) the PASSWORD() function does not work You have to do:

Make sure you have Stopped MySQL first (above).
Run the server in safe mode with privilege bypass: sudo mysqld_safe --skip-grant-tables
mysql -u root
UPDATE mysql.user SET authentication_string=null WHERE User='root';
FLUSH PRIVILEGES;
exit;
Then
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'yourpasswd';
