install-npm:
	npm ci || npm install

install-yarn:
	yarn install --frozen-lockfile || yarn install

pretty:
	npx prettier --write src

lint:
	npx eslint --fix "src/**"

pre-commit: pretty lint

build-prod: pretty lint
	npx tsc && vite build

build-dev: pretty lint
	npx vite build --mode development

preview:
	npx vite preview

run-server:
	npx json-server -w server/db.json -p 4001

run-project:
	npx vite --host 0.0.0.0 --port 4000

start:
	$(MAKE) -j2 run-server run-project
