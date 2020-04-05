start:
	make start-backend 
	make start-frontend
	
start-backend:
	cd backend && bundle install && rails s -p 5050 &

start-frontend:
	cd frontend && yarn install && yarn start