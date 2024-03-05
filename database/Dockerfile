# Use the official MySQL image as the base image
FROM mysql:latest

# Set environment variables for MySQL root password and database name
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=virtual_planner

# Expose the port MySQL is running on (default is 3306)
EXPOSE 3306

# Start MySQL server when the container starts
CMD ["mysqld"]
