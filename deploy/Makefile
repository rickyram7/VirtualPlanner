.DEFAULT_GOAL := default

default:
	$(MAKE) frontend
	$(MAKE) backend
	$(MAKE) db

runFE:
	$(MAKE) frontendbuild
	$(MAKE) frontend

frontendbuild:
	cd ../frontend; npm run build

backendbuild:
	cd ../backend; javac 

frontend:
	cd ../frontend; docker build -t frontend .

backend:
	cd ../backend; docker build -t backend .

db:
	cd ../database; docker build -t db .

