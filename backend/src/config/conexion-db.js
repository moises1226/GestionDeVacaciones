import {Sequelize} from 'sequelize';

import config  from './config.js';
  
const sq = new Sequelize (

    config.local.database,
    config.local.username,
    config.local.password,

    {

      host : config.local.host,
      dialect : "mysql"

    }

)

  
  export default sq;
