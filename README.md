#node-userdown

### Run node apps with stepping down user permissions

It is not recommended to run application with root user permission specially in production. But most of the time, we need to bind apps into port 80, which requires root privileges.

* Fortunately, NodeJS has a [`process.setuid`](http://nodejs.org/api/process.html#process_process_setuid_id) api to step down user priviledges.
* Unfortunately, not most of the apps(frameworks) do not follow this api. So in that case we might need to use some other approach like port forwarding.

## Enter Userdown

`userdown` gives you another solution for that, which allows you to stepdown any NodeJS app. This does not use `child_process` API and does not add any additional process overhead. Instead `userdown` wrap `http` module for get things done.

### Installation

~~~bash
npm install userdown
~~~

### Usage

~~~bash
userdown USERDOWN_UID=nobody USERDOWN_GID=nobody examples/port80server.js
~~~
