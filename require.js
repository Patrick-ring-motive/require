
function getUrlByName(name){
  if(globalThis.XMLHttpRequest){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://commonjs.jsx-bet.workers.dev/${name}`, false);
    xhr.send();
    if (xhr.status !== 200) {
      throw new Error(`Failed to load module: ${name} (${xhr.status})`);
    }
    return xhr.responseText;
  }
  return globalThis.UrlFetchApp.fetch(`https://commonjs.jsx-bet.workers.dev/${name}`).getContentText();
};

// Simple synchronous require implementation
globalThis.require = function(moduleName) {
  // Cache modules so we only fetch once
  if (!globalThis.require._cache) {
    globalThis.require._cache = {};
  }
  
  if (globalThis.require._cache[moduleName]) {
    return globalThis.require._cache[moduleName];
  }
  
  // Normalize the module name - remove leading slash if present
  const normalizedName = moduleName.startsWith('/') ? moduleName.slice(1) : moduleName;
  
  // Fetch synchronously from your worker
  const script = getUrlByName(normalizedName);
  
  // Create a module context
  const module = { exports: {} };
  const exports = module.exports;
  
  // Eval the code in a function to provide module/exports/require
  const moduleFunction = new Function('module', 'exports', 'require', script);
  moduleFunction(module, exports, globalThis.require);
  
  // Cache and return
  globalThis.require._cache[moduleName] = module.exports;
  return module.exports;
};
