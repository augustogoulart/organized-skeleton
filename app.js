/**
 * Main File Application
 * @author André Ferreira <andrehrf@gmail.com>
 */

"use strict";

const app = require("organized");

app.config({//Defining directory self loading scripts
    modules: {
        settings: `${__dirname}/settings.json`,
        optimist: "optimist",
        cluster: "cluster",
        express: "express",
        lodash: "lodash"
    },
    virtual: {
        dirname: "__dirname",
        app: "express()",
        argv: "optimist.argv"
    },
    map: [`${__dirname}/controllers`],
    map_args: ["settings", "dirname", "argv", "app"]
});

app.init(["settings", "argv", "cluster", "app"], function(settings, argv, cluster, app){  
    if(cluster.isMaster){//Create cluster
        const cpus = require('os').cpus();
        
        for(var i = 0; i < cpus.length; i++)
            cluster.fork();
        
        cluster.on('exit', function(worker){
            console.log(`Worker ${worker.id} died :(`);
            cluster.fork();
        });
    }
    else{
        const port = (typeof argv.port === "number") ? argv.port : settings.port;
        app.listen(port, function(){ console.log(`http://localhost:${port} (cluster ${cluster.worker.id})`); });
    }
});