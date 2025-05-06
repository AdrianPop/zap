.PHONY: deploy scale rm

deploy scale rm:
	@echo "Executing command"
	@echo "node zap.js $@ $(filter-out $@,$(MAKECMDGOALS))"
	@node zap.js $@ $(filter-out $@,$(MAKECMDGOALS))

%::
	@: