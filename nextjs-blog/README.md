# Project Name - nextjs-blog

<p>a practice for nextjs</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run build-start-prod
```

## Set environment

```bash
# in run script
NODE_ENV=development npm start dev

# modifying existing script in package.json
 "dev": "NODE_ENV=development next -p 5000",

# during runtime with code
process.env.NODE_ENV = 'development';
```

## Debug
Add the following debug configuration in **launch.json**

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## License
