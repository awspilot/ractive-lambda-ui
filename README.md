# ractive-lambda-ui

client side UI to manage AWS Lambda functions  

Embeds a basic IDE that extracts lambda function contents into memory and uploads it on save.

## @todo
- [ ] view function
-  - [x] function list
-  - [x] environment variables
-  - [x] function configuration
-  - [ ] tags
-  - [ ] statistics
-  - [x] code editor
-  -  - [x] directory tree
-  -  - [x] file contents

- [ ] update function
-  - [ ] environment variables
-  - [x] description/memory/timeout
-  - [ ] VPC
-  - [ ] tags
-  - [ ] code editor
-  -  - [ ] create folder
-  -  - [ ] create files
-  -  - [x] update files
-  -  - [x] save, repack, upload function code

- [ ] logs
-  - [x] list log streams
-  - [ ] auto-refresh log streams
-  - [ ] show number of executions inside each log stream
-  - [ ] date filter for log streams
-  - [ ] older/newer log streams navigation
-  - [x] view log stream events
-  - [ ] toggle between raw/parsed log stream events
-  - [x] parse log stream events, group into executions by request id
-  - [ ] older/newer log stream events navigation
-  - [x] delete log streams
-  - [ ] import logs to local database ( local storage / in-memory )
-  - [ ] delete logs older than ...
-  - [ ] auto-refresh stream events based on last event time



- [ ] execute function
-  - [ ] manage test events
-  - [ ] execute function
