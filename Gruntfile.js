module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-bump");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ngmin");

    grunt.initConfig({
        config: {
            name: "jquery.scrollIntoView",
            e2ePort: 9000
        },

        jshint: {
            lib: {
                options: {
                    jshintrc: ".jshintrc"
                },
                files: {
                    src: ["src/**.js"]
                }
            },
            test: {
                options: {
                    jshintrc: ".jshintrc-test"
                },
                files: {
                    src: ["test/*{,/*}.js"]
                }
            }
        },

        concat: {
            dist: {
                files: {
                    "dist/<%= config.name %>.js": ["src/*.js"]
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    "dist/<%= config.name %>.min.js": "dist/<%= config.name %>.js"
                }
            }
        },

        clean: {
            all: ["dist"]
        },

        watch: {
            all: {
                files: ["src/**.js", "test/*{,/*}"],
                tasks: ["build"]
            }
        },

        ngmin: {
            dist: {
                files: {
                    "dist/<%= config.name %>.js": "dist/<%= config.name %>.js"
                }
            }
        },

        bump: {
            options: {
                files: ["package.json"],
                commitFiles: ["-a"],
                pushTo: "origin"
            }
        }

    });

    grunt.registerTask("default", ["test"]);
    grunt.registerTask("build", ["clean", "jshint", "concat", "ngmin", "uglify"]);
    grunt.registerTask("test", ["build", "karma:unit", "watch:all"]);
    grunt.registerTask("ci", ["build", "karma:unitci_firefox"]);
};
