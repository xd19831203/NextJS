# Makefile

NODE = node
TEST = expresso
TESTS = test/Array.test.js \
		test/Base.test.js \
		test/ClassManager.test.js \
		test/Error.test.js \
		test/Function.test.js \
		test/NX.test.js \
		test/Object.test.js

PREFIX = /usr/local
LIB_PREFIX = $(HOME)/.node_libraries

test:
	@NODE_ENV=test $(TEST) \
		-I lib -q \
		$(TEST_FLAGS) $(TESTS)

test-cov:
	@rm -Rf lib-cov
	@$(MAKE) test TEST_FLAGS="--cov"
	@rm -Rf lib-cov

.PHONY: test test-cov

# eof

