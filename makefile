# https://makefiletutorial.com
serve:
	docker run --name site --rm -it -p 3000:3000 -v ${PWD}:/usr/src/app -w /usr/src/app node:18 bash -c "yarn install; yarn build; npm run serve"