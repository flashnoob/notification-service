module.exports = {
  apps: [
    {
      name: 'notification_server',
          script : "./app.js",

      env: {
        'NODE_ENV': 'development',
        'PORT': 3000,
        'IS_MAIN': true,
        'SERVER_NAME': 'notification_server'
      },
    
      max_restarts: 200,
      autorestart: true,
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 3000
    },
    {
      name: 'notification_server2',
          script : "./app.js",

      env: {
        'NODE_ENV': 'development',
        'PORT': 3001,
        'SERVER_NAME': 'notification_server2'
      },
      
      max_restarts: 200,
      autorestart: true,
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 3000
    },
    {
      name: 'notification_server3',
          script : "./app.js",

      env: {
        'NODE_ENV': 'development',
        'PORT': 3002,
        'SERVER_NAME': 'notification_server3'
      },
    
      max_restarts: 200,
      autorestart: true,
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 3000
    },
    {
      name: 'notification_server4',
      script : "./app.js",

      env: {
        'NODE_ENV': 'development',
        'PORT': 3003,
        'SERVER_NAME': 'notification_server4'
      },
      max_restarts: 200,
      autorestart: true,
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 3000
    }
  
  ]
};
