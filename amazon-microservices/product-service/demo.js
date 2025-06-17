input {
    jdbc {
        jdbc_driver_library => "/usr/share/logstash/driver/mysql-connector-java-8.0.25.jar"
        jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
        jdbc_connection_string => "jdbc:mysql://nodeadv_mysql:3306/db_amazon"
        jdbc_user => "root"
        jdbc_password => "1234"
        statement => "SELECT shipping_id, first_name, last_name, city, street, shipped_date FROM shipping"
        schedule => "* * * * *"
    }
}
output {
    elasticsearch {
        hosts => ["https://elasticsearch:9200"]
        ssl => true
        ssl_certificate_verification => false 
        user => "elastic" 
        password => "123456" 
        index => "mysql-shipping" 
        document_id => "%{shipping_id}" 
    }
    stdout { codec => rubydebug } 
}