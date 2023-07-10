import env from './env.js';

const mod = 'prod';
let global;

if(mod == 'prod'){
  global = process.env;

}else if(mod == 'dev'){
  global = env;
}

export default global;