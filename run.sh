echo Set the container name.
container_name=bracu-bot

echo Build the Docker image.
sudo docker build -t $container_name .

echo Run the Docker image.
sudo docker run -p 8085:8085 $container_name
