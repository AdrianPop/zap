.PHONY: deploy dep scale sc rm

deploy dep scale sc rm:
	@echo "Executing command"
	@echo "node zap.js $@ $(filter-out $@,$(MAKECMDGOALS))"
	@node zap.js $@ $(filter-out $@,$(MAKECMDGOALS))

%::
	@: