echo Set the container name.
container_name=bracu-bot
sudo docker stop $container_name
sudo docker rm $container_name
echo Build the Docker image.
sudo docker build -t $container_name .

echo Run the Docker image.
sudo docker run -d -p 8085:8085 --name $container_name $container_name
