export PATH := ./node_modules/.bin:$(PATH)
export SHELL := /bin/bash

source_dir           = src
source_js_path       = $(source_dir)/javascripts
source_css_path      = $(source_dir)/stylesheets

source_index           = $(source_dir)/index.html
source_js_files        = $(shell find $(source_js_path) -name "*.js")
source_app_js          = $(source_js_path)/client.js
source_sw_js           = $(source_js_path)/service_worker.js
source_css_files       = $(shell find $(source_css_path) -name "*.styl")
source_main_css        = $(source_css_path)/main.styl

app_index      = build/index.html
app_js         = build/js/main.js
sw_js          = build/sw.js
app_css        = build/css/main.css
build_dir      = build

js_debug  := --debug
css_debug := --sourcemap-inline

.PHONY: all all_production watch clean production

all: $(app_index) $(sw_js) $(app_js) $(app_css)

watch: clean all
	watchy -w $(source_js_path),$(source_css_path) -- make all

clean:
	rm -rf build
	rm -rf production

# deactivate debugging flags for production
production: js_debug  = 
production: css_debug = 
production: clean $(app_index) $(sw_js) $(app_js) $(app_css)

$(app_index):
	mkdir -p $(build_dir)
	cp $(source_index) $(app_index)

#$(sw_js): app_version = $(shell git log -n 1 --format=oneline|head -n 1|cut -d " " -f 1)
$(sw_js):
	cp $(source_sw_js) $@
	#sed -e 's/<CACHE_NAME_VERSION>/$(app_version)/g' $(source_sw_js) > $@

$(app_js): $(source_js_files)
	mkdir -p $(dir $@)
	browserify $(js_debug) -t babelify $(source_app_js) > $@
	cp $(source_js_path)/serviceworker-cache-polyfill.js build/js/

$(app_css): $(source_css_files)
	mkdir -p $(dir $@)
	stylus $(css_debug) --include $(source_css_path) < $(source_main_css) > $(app_css)

