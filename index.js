const theModule = require('module');

const modules = {};
theModule.builtinModules.some((val) => {
  if (val === 'sys') return; // deprecated module
  modules[val] = require(val); // eslint-disable-line
  return val === 'zlib'; // last known valid library
});

/*
// async hooks example
let indent = 0;
modules.async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    try {
      modules.fs.unlinkSync(modules.path.join(__dirname, 'log.out'));
    } catch (err) {
      modules.fs.writeFileSync(
        'log.out',
        'Creating new file',
        { flag: 'a' },
      );
    }
    const eid = modules.async_hooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    modules.fs.writeFileSync(
      'log.out',
      `${indentStr}${type}(${asyncId}):` +
      ` trigger: ${triggerAsyncId} execution: ${eid}\n`,
      { flag: 'a' },
    );
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    modules.fs.writeFileSync(
      'log.out',
      `${indentStr}before:  ${asyncId}\n`,
      { flag: 'a' },
    );
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    modules.fs.writeFileSync(
      'log.out',
      `${indentStr}after:  ${asyncId}\n`,
      { flag: 'a' },
    );
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    modules.fs.writeFileSync(
      'log.out',
      `${indentStr}destroy:  ${asyncId}\n`,
      { flag: 'a' },
    );
  },
}).enable();


const networks = modules.os.networkInterfaces();
const inets = Object.keys(networks).reduce((acc, key) => {
  const network = networks[key];
  const result = [
    ...acc,
    ...network
      .filter(subnet => modules.net.isIPv4(subnet.address) && !subnet.internal)
      .map(subnet => ({
        address: subnet.address,
        key,
      })),
  ];
  return result;
}, []);
// console.log(inets);

async function dns() {
  const results = await modules.dns.promises.resolve('yahoo.com');
  console.log(results);
}

// dns().then(() => console.log('done'));

setInterval(() => {
  dns().then(() => console.log('done'));
}, 10000);
*/


/*
// Node cluster example. Workers rotate round-robin handling requests.
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs - 1; i++) {
    const worker = cluster.fork();
    worker.on('message', (data) => {
      console.log(data);
    });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died\n${code}\n${signal}`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`hello world\n${process.pid}\n${cluster.worker.process.pid}\n`);

    // notify parent process
    process.send(process.pid);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
*/
