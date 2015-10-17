date: 2015-10-16
title: Node.js for the real world
linkpost: http://www.technology-ebay.de/the-teams/mobile-de/blog/nodejs-real-world
---

<h2>The real world, for real!</h2>

<p>A good starting point to prepare your product for the release might be to figure out how your specific real world actually looks like. More precisely this means to evaluate the requirements of your production environment. In contrast to development systems where speed and ease of development is important, values to consider in production are&nbsp;<strong>ease of deployment</strong>,&nbsp;<strong>reliability</strong>,&nbsp;<strong>observability</strong>&nbsp;and&nbsp;<strong>performance</strong>. Where does your application sit within your infrastructure? How does this affect your app? How does it get there? What traffic is expected? How does your app perform during traffic bursts? Do you want to use Node internal tools like clustering for scaling? How to achieve zero-downtime deployments? Do you have internal guidelines to follow? This is just an excerpt of questions we had to answer in close collaboration with our great siteops engineers.</p>

<h2>The way to heaven</h2>

<p>At mobile.de, we use our own tool called &ldquo;Autodeploy&ldquo; to&nbsp;<strong>deploy</strong>&nbsp;and activate software artifacts. Autodeploy has a database which serves as an inventory of applications and their mapping to individual hosts. It is able to deploy to any environment and can be used with different platforms.</p>

<p><a href="data/mediapool/autodeploy.png" target="_blank"><img alt="Autodeploy" src="data/mediapool/autodeploy.png" style="height:1570px; width:2314px" /></a></p>

<p>As a Continuous Integration Server we&rsquo;re happy to use the Open Source project&nbsp;<a href="https://jenkins-ci.org/">Jenkins</a>&nbsp;which Autodeploy is seamlessly integrated into. Jenkins takes care about our build as soon as we push code to Github. Among others the steps include:</p>

<ul>
    <li>Installing dependencies via npm and bower</li>
    <li>Linting (<a href="http://eslint.org">eslint</a>)</li>
    <li>Running Tests (<a href="https://mochajs.org">Mocha</a>)</li>
    <li>Code coverage analysis (<a href="https://github.com/gotwarlost/istanbul">Istanbul</a>)</li>
    <li>Code quality analysis(<a href="http://www.sonarqube.org/">Sonar</a>)</li>
    <li>Packaging source files</li>
</ul>

<p>When Jenkins successfully did its job the package is queued for deployment. Deployments that stem from feature - or development branches are automatically deployed to their postproduction/staging host. For production deployments we decided to not automatically deploy but to explicitly trigger the deployment. Currently this can happen via commandline or a button showing up in the Autodeploy UI.</p>

<p>We bootstrap environments by heavily using configuration stored in environment variables. We&rsquo;re using&nbsp;<a href="https://github.com/motdotla/dotenv">dotenv</a>&nbsp;to populate ENV via a .env file. This way we make sure each deployment environment gets its app version delivered properly configured.</p>

<p><a href="data/mediapool/sonar-v.png" target="_blank"><img alt="V" src="data/mediapool/sonar-v.png" style="height:1606px; width:2836px" /></a></p>

<p><em>Illustrating the V(olkswagen) curve &ndash; At some point during development we noticed the JavaScript unit tests running on Jenkins were&nbsp;failing sporadically. To keep CI flow we had to deactivate them temporarily. Unfortunately this&nbsp;<a href="https://github.com/auchenberg/volkswagen">awesome module</a>&nbsp;that would have solved our problems did not exist back then. Making sure to&nbsp;<strong>synchronize Node versions</strong>&nbsp;running locally, on Jenkins and in (post)production environments helped to fix this issue.</em></p>

<p>&nbsp;</p>

<h2>Drop it when it&rsquo;s hot</h2>

<p>As part of&nbsp;<strong>reliability</strong>&nbsp;we had to think about what happens in case of our app would crash &ndash; intended or not intended. In particualar the usual way in Node.js to recover from programmer errors (bugs) is to let the app crash as you can&rsquo;t do anything about them anyways. Have you tried turning it off and on again? It&rsquo;s the fastest and most reliable way to restore app state in those cases. Important thing is to log and monitor such restarts to fix the reasons behind them as soon as possible. To kill these birds with one stone, we found the process manager&nbsp;<a href="https://github.com/Unitech/pm2">PM2</a>&nbsp;to came in handy.</p>

<p><a href="data/mediapool/pm2.png" target="_blank"><img alt="kibana" src="data/mediapool/pm2.png" style="height:966px; width:1877px" /></a></p>

<p>It allows to keep our app alive, as it automatically restarts app instances in the event of a crash. We also use it to start and stop the app when it&rsquo;s been deployed. The tool even provides some basic monitoring and logging features which helps to gather app stdout &ndash; useful especially for dependencies that write logs to process.stdout which our own logger does not capture.</p>

<h2>Take notes</h2>

<p>Recently we had some problems with multiple PM2 god daemons running on one host after deploying a new version of our app. This led to shadow apps serving/referencing old content that was not available anymore at this point in time, resulting in 404s. Luckily we had our logger module running that let us discover this issue quickly. Being&nbsp;<strong>observable</strong>&nbsp;for production running apps should be one of the top priorities and is of the utmost importance. We internally use&nbsp;<a href="https://www.elastic.co/products/logstash">Logstash</a>&nbsp;to centralize, aggregate, parse and filter log files.</p>

<p><a href="data/mediapool/log.png" target="_blank"><img alt="kibana" src="data/mediapool/log.png" style="height:966px; width:1877px" /></a><em>Production logstash log entry</em></p>

<p>As our Logstash configuration embraces JSON as log-file format we&rsquo;re using&nbsp;<a href="https://github.com/trentm/node-bunyan">Bunyan</a>&nbsp;as a base for our logger module. Its output is per default line delimited JSON, which makes it easy to consume. It&rsquo;s build around streams and you can define multiple output streams at different log levels. When debugging your app on your local machine, you don&rsquo;t want to log to a file but want to see output as fast as possible. On the other side, when running in production you don&rsquo;t want to necessarily log debug level information to logstash. This is totally possible by using Bunyan. Here at mobile.de each app we build needs to conform to certain guidelines. For logging this includes for instance adding informations like build_timestamp, app_revision or log_level. For production usage, we wrote a bunyan-logstash transform stream that would add these fields at runtime and pipe the output to a file. For local development we use a bunyan-debug transform stream that pipes all log levels to stdout. We are currently experimenting with this setup and constantly trying to improve this. For visualizing logs we use&nbsp;<a href="https://www.elastic.co/products/kibana">Kibana</a>&nbsp;as a dashboard. This instantly lets us discover errors and unexpected issues. PIC</p>

<h2>Watch your health</h2>

<p>One of our app requirements is to have proper monitoring set up. What does monitoring mean? Actually it&rsquo;s about collecting numeric time-series data. For mobile.de this includes asynchronous forwarding of metrics to an aggregator (push style) and also providing various endpoints to verify application health (pull style). This helps for monitoring but also implementing reactive behaviour in a microservice landscape. Not suffering&nbsp;<a href="https://de.wikipedia.org/wiki/Not-invented-here-Syndrom">NIH</a>&nbsp;we had a look into multiple open source and commercial products that would tackle this problem, properly providing a solution for our all new mobile.de homepage running on Node.js. As most of our apps use&nbsp;<a href="http://graphite.wikidot.com/">Graphite</a>&nbsp;as a real-time graphing system, we also wanted to make use of it. We wanted to collect some default system metrics of the host, like usage of cpu, memory or garbage collection. In addition the module also should provide a possibility to get http information about incoming and outgoing connections. Unfortunately we couldn&rsquo;t find anything out there that would encapsulate and fit our needs. On top of&nbsp;<a href="https://github.com/felixge/node-measured">node-measured</a>&nbsp;and&nbsp;<a href="https://github.com/felixge/node-graphite">node-graphite</a>&nbsp;we built our own node-metrics module. It currently offers the following features:</p>

<ul>
    <li>gathering vm related metrics
    <ul>
        <li>cpu usage</li>
        <li>memory consumption</li>
        <li>gc stats</li>
    </ul>
    </li>
    <li>custom metrics creation
    <ul>
        <li>counters</li>
        <li>histograms</li>
        <li>gauges</li>
        <li>meters</li>
        <li>timers</li>
    </ul>
    </li>
    <li>middlewares for (semi) automated metrics collection
    <ul>
        <li>timers for all routes inbound.routes.[route]</li>
        <li>meters for all status codes inbound.statuses.[statusCode]</li>
        <li>http server middleware</li>
        <li>express middleware</li>
    </ul>
    </li>
    <li>
    <p>option of periodically reporting to graphite</p>
    </li>
</ul>

<p>The module so far does a solid job and there are plans to open source it.&nbsp;</p>

<p><a href="data/mediapool/grafana.png" target="_blank"><img alt="grafana" src="data/mediapool/grafana.png" style="height:993px; width:1914px" /></a></p>

<p><em>For visualizing collected metrics we use&nbsp;<a href="http://grafana.org/">Grafana</a>&nbsp;as a dashboard.</em></p>

<h2>It depends&hellip;</h2>

<p>To verify our application could handle the expected traffic easily, we ran various load tests before launching. Everything worked well until we reached a certain amount of concurrent users. The application would then respond with a 500 on every second request. With monitoring and logging in place we figured that the error was caused by&nbsp;<a href="https://github.com/krakenjs/engine-munger">engine-munger</a>, a component of our rendering strategy. We decided to simplify our view/template implementation by throwing away the confusing construct of&nbsp;<a href="http://www.dustjs.com/">Dust</a>,&nbsp;<a href="https://github.com/krakenjs/adaro">adaro</a>&nbsp;and engine-munger. This instantly boosted performance and made our tests go green. Without our app being observable this crucial incident would have been deployed to production. Before deciding on a dependency we have to make sure to fully understand it and evaluate if it&rsquo;s really necessary.</p>

<h2>Real world facts</h2>

<p>The real world usually requires the application to do real work! Nowadays, we as JavaScript developers are flooded with new frameworks, libraries and tools that mostly arise to solve problems in development environments. Releasing an application to the wild and architect&nbsp;it to scale properly&nbsp;requires a lot more than most of the tutorials out there are showing us. Often the latest and greatest JavaScript&nbsp;trends&nbsp;cannot help us with this task. It&rsquo;s kinda obvious but&nbsp;I think this is something we should keep in mind when starting to build a new product. The real world is harsh and unforgiving, it doesn&rsquo;t care about your build tool. It doesn&rsquo;t care about your development workflow and it doesn&rsquo;t care about your&nbsp;one-line promise-yielding generator class construct. All it cares about is being able to properly fulfil user needs and it&rsquo;s our job to let it do so!&nbsp;So be prepared, measure everything, no assumptions, monitor your app&rsquo;s health, keep the logs coming, know your dependencies and move your app as early as possible into its real world scenario!</p>

