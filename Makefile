.PHONY: build-all
build-all:
	bash ./scripts/build-all.sh

.PHONY: start-all
start-all:
	bash ./scripts/start-all.sh

.PHONY: all
all: build-all start-all
