# Use a lightweight server for serving static files
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy the pre-built dist folder
COPY ./dist .

# Expose port 8080
EXPOSE 8080

# Configure nginx to use port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
