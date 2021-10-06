run:
	docker run -d -p 4200:3000 --rm --name preprod wheatleycode/preprod
stop:
	docker stop preprod