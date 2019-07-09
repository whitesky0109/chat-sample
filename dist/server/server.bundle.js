!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=19)}([function(e,t){e.exports=require("socket-controllers")},function(e,t){e.exports=require("typedi")},function(e,t){e.exports=require("reflect-metadata")},function(e,t){e.exports=require("winston")},function(e,t){e.exports=require("routing-controllers")},function(e,t){e.exports=require("events")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("db-migrate-shared")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("socket.io")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("figlet")},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("open")},function(e){e.exports={port:4e3,sqlite:"database.db",default:{destinations:[{receiver:"websocket",info:{}}]}}},function(e,t){e.exports=require("db-migrate-sqlite3")},function(e,t){e.exports=require("uid")},function(e,t){e.exports=require("ejs")},function(e,t,o){"use strict";o.r(t);o(2);var r,n=o(4),i=o(0),s=o(1),c=o(8),a=o.n(c),u=o(6),f=o.n(u),p=o(9),l=o.n(p),g=o(5),d=o(3),y=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},v=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},h=function(){function e(){this.logger=Object(d.createLogger)({format:d.format.combine(d.format.timestamp({format:"YYYY-MM-DD HH:mm:ss"}),Object(d.format)(function(e){return"error"===e.level?Object.assign({},e,{message:e.timestamp+" "+e.stack}):e})(),d.format.printf(function(e){var t=e.timestamp,o=e.level,r=e.message,n=e.meta;return n?t+" "+o+" ["+n.filename+":"+n.line+"]: "+r:t+" "+o+" "+r})),transports:[new d.transports.Console({level:"debug",handleExceptions:!0}),new d.transports.File({filename:"error.log",level:"error"}),new d.transports.File({filename:"system.log"})],exitOnError:!1})}return e.prototype.init=function(){this.logger.info("created LoggerSrv")},e.prototype.write=function(e,t){this.logger.info(e)},e.prototype.alert=function(e,t){void 0===t&&(t=3),this.logger.alert(e)},e.prototype.crit=function(e,t){void 0===t&&(t=3),this.logger.crit(e)},e.prototype.data=function(e,t){void 0===t&&(t=3),this.logger.data(e)},e.prototype.debug=function(e,t){void 0===t&&(t=3),this.logger.debug(e)},e.prototype.error=function(e,t){void 0===t&&(t=3),this.logger.error(e)},e.prototype.help=function(e,t){void 0===t&&(t=3),this.logger.help(e)},e.prototype.input=function(e,t){void 0===t&&(t=3),this.logger.input(e)},e.prototype.info=function(e,t){void 0===t&&(t=3),this.logger.info(e)},e.prototype.log=function(e,t,o){void 0===o&&(o=3),this.logger.log(e,t)},e.prototype.notice=function(e,t){void 0===t&&(t=3),this.logger.notice(e)},e.prototype.sql=function(e,t){void 0===t&&(t=3),this.debug(e,t)},e.prototype.prompt=function(e,t){void 0===t&&(t=3),this.logger.prompt(e)},e.prototype.silly=function(e,t){void 0===t&&(t=3),this.logger.silly(e)},e.prototype.verbose=function(e,t){void 0===t&&(t=3),this.logger.verbose(e)},e.prototype.warn=function(e,t){void 0===t&&(t=3),this.logger.warn(e)},e.prototype.warning=function(e,t){void 0===t&&(t=3),this.logger.warning(e)},e=y([Object(s.Service)(),v("design:paramtypes",[])],e)}(),m=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},b=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},S=function(){function e(e){this.logger=e,this.logger.info("created SettingSrv"),this.settings=this.loadSettingFile()}return e.prototype.init=function(){return Promise.resolve()},e.prototype.loadSettingFile=function(){return o(15)},e.prototype.getPort=function(){return this.settings.port},e.prototype.getSystemDbName=function(){return this.settings.sqlite},e.prototype.getSettings=function(){return this.settings},e=m([Object(s.Service)(),b("design:paramtypes",[h])],e)}(),O=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},j=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},R=function(){function e(e){this.logger=e,this.sockets={},this.logger.info("created SocketMangerSrv")}return e.prototype.init=function(){return Promise.resolve()},e.prototype.addSocket=function(e){var t=e.id;this.sockets[t]=e,this.logger.info("registerd "+t)},e.prototype.delSocket=function(e){this.logger.info("unregisterd "+e),delete this.sockets[e]},e.prototype.getSocket=function(e){return this.sockets[e]},e.prototype.isExistSocket=function(e){return!!this.sockets[e]},e.prototype.getAll=function(){return this.sockets},e.prototype.emitAll=function(e,t){for(var o in this.sockets){this.sockets[o].emit(e,t)}},e=O([Object(s.Service)(),j("design:paramtypes",[h])],e)}(),k=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),w=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},M=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},C=o(16),I=o(7).dataType,P=function(e){function t(t,o){var r=e.call(this)||this;return r.loggerService=t,r.settingSrv=o,r.loggerService.info("created StorageSrv"),r.dbname=r.settingSrv.getSystemDbName(),r}return k(t,e),t.prototype.init=function(){var e=this;return new Promise(function(t,o){e.connect(e.dbname).then(function(o){e.db=o,e.loggerService.info("Connected to the "+e.dbname+" database."),t()},function(e){o(e)})})},t.prototype.connect=function(e){var t=this;return this.loggerService.info("try load sqlite : "+e),this.loggerService.sql=this.sqlLogger.bind(this),new Promise(function(e,o){var r={mod:{log:t.loggerService,type:I},interfaces:{SeederInterface:{},MigratorInterfrace:{}}},n={driver:"sqlite3",filename:t.dbname};C.connect(n,r,function(t,r){t?o(t):(r.all("PRAGMA foreign_keys=ON"),e(r))})})},t.prototype.sqlLogger=function(){},t=w([Object(s.Service)(),M("design:paramtypes",[h,S])],t)}(g.EventEmitter),_=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},U=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},x=function(){function e(e){this.logSrv=e,this.userCache={}}return e.prototype.init=function(){this.logSrv.info("created UserService")},e.prototype.addUser=function(e,t){var o=this.getUserIdBySockId(t);return o?(this.logSrv.info("already logined user "+o),!1):this.getSockIdById(e)?(this.logSrv.info("already used user id"),!1):(this.userCache[e]=t,this.logSrv.info("Logined New User : "+e),!0)},e.prototype.removeUser=function(e){this.userCache[e]=null,this.logSrv.info("Logout User : "+e)},e.prototype.getSockIdById=function(e){return this.userCache[e]},e.prototype.getUserIdBySockId=function(e){for(var t in this.userCache)if(e===this.userCache[t])return t;return null},e.prototype.getUsers=function(){return this.userCache},e=_([Object(s.Service)(),U("design:paramtypes",[h])],e)}(),q=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},B=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},E=function(){function e(e,t){this.loggerService=e,this.userService=t,this.listCache={}}return e.prototype.init=function(){this.loggerService.info("created RoomService")},e.prototype.addRoom=function(e,t,o){var r;this.listCache[e]={name:t,creator:o,users:(r={},r[o]=null,r)}},e.prototype.getRooms=function(e){return e?this.getRoomByUserId(e):this.listCache},e.prototype.getRoomByUserId=function(e){var t;for(var o in this.listCache)for(var r in this.listCache[o].users)r===e&&(t||(t={}),t[o]=this.listCache[o]);return t},e.prototype.getRoom=function(e){for(var t in this.listCache)if(e===t)return this.listCache[t];return null},e.prototype.loginUser=function(e,t){var o=this.getRoom(e),r=this.userService.getSockIdById(t),n=this.getRoomByUserId(t);if(n)for(var i in n)this.logoutUser(i,t);return!(!t||!o)&&(o.users[t]=r,this.loggerService.info("["+o.name+"] Chat room login: "+t),!0)},e.prototype.loginUsers=function(e,t){for(var o=0,r=t;o<r.length;o++){var n=r[o];this.loginUser(e,n)}},e.prototype.logoutUser=function(e,t){var o=this.getRoom(e);return!(!t||!o)&&(o.users[t]=null,this.loggerService.info("["+o.name+"] Chat room logout: "+t),!0)},e.prototype.logoutRoom=function(e){var t=this.getRoomByUserId(e);for(var o in t)this.logoutUser(o,e)},e.prototype.isExistUser=function(e,t){var o=this.getRoom(e);if(o)for(var r in o.users)if(r===t)return!0;return!1},e=q([Object(s.Service)(),B("design:paramtypes",[h,x])],e)}(),D=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},T=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},F=(function(){function e(e){this.loggerSrv=e,this.loggerSrv.info("created RootController")}e.prototype.helloServer=function(){},D([Object(n.Get)("/"),Object(n.Render)("index.html"),T("design:type",Function),T("design:paramtypes",[]),T("design:returntype",void 0)],e.prototype,"helloServer",null),e=D([Object(n.Controller)(""),T("design:paramtypes",[h])],e)}(),function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s}),N=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},A=function(e,t){return function(o,r){t(o,r,e)}},L=o(17),G=function(){function e(e,t,o,r){this.sockMgrSrv=e,this.userSrv=t,this.roomSrv=o,this.loggerSrv=r,this.loggerSrv.info("created WsMessageController")}return e.prototype.connection=function(e){this.sockMgrSrv.addSocket(e),this.loggerSrv.info("new socket client connected")},e.prototype.disconnect=function(e){var t=e.id,o=this.userSrv.getUserIdBySockId(t);o&&(this.roomSrv.logoutRoom(o),this.userSrv.removeUser(o),this.sockMgrSrv.emitAll("users",this.userSrv.getUsers())),this.sockMgrSrv.delSocket(t)},e.prototype.addUser=function(e,t){var o=t.name,r=this.userSrv.addUser(o,e.id);r&&this.sockMgrSrv.emitAll("users",this.userSrv.getUsers()),e.emit("login",r?o:null),e.emit("room",this.roomSrv.getRooms(o))},e.prototype.getRoom=function(e,t){var o=this.userSrv.getUserIdBySockId(e.id);if(o){var r=t?this.roomSrv.getRoom(t.id):this.roomSrv.getRooms(o);e.emit("room",r)}else e.emit("room",null)},e.prototype.addRoom=function(e,t){var o=L(),r=this.userSrv.getUserIdBySockId(e.id);r=r||"Unknown",this.roomSrv.addRoom(o,t.name,r),e.emit("room",this.roomSrv.getRooms(r))},e.prototype.enterRoom=function(e,t){var o=this.userSrv.getUserIdBySockId(e.id);if(o&&t){var r=t.id;this.roomSrv.loginUser(r,o),e.emit("room/in",r)}else this.loggerSrv.info("user not found")},e.prototype.leaveRoom=function(e,t){var o=this.userSrv.getUserIdBySockId(e.id);if(o&&t){var r=t.id;this.roomSrv.logoutUser(r,o),e.emit("room/out",r)}else this.loggerSrv.info("user not found")},e.prototype.roomMessage=function(e,t){var o=t.roomId,r=t.type,n=t.message,i=this.roomSrv.getRoom(o),s=this.userSrv.getUserIdBySockId(e.id);if(i)for(var c in i.users){var a=i.users[c];if(a){var u={type:r,message:n,userId:s||"unknown",isMy:a===e.id,date:new Date};this.sockMgrSrv.getSocket(a).emit("room/message",u)}}},e.prototype.inviteUser=function(e){var t=this.userSrv.getUsers(),o=e.roomId,r=e.users,n=this.roomSrv.getRoom(o);if(n)for(var i in this.roomSrv.loginUsers(o,r),n.users){var s=t[i];s&&this.sockMgrSrv.getSocket(s).emit("room",this.roomSrv.getRooms(i))}},e.prototype.getUsers=function(e){var t=this.userSrv.getUserIdBySockId(e.id)?this.userSrv.getUsers():null;e.emit("users",t)},F([Object(i.OnConnect)(),A(0,Object(i.ConnectedSocket)()),N("design:type",Function),N("design:paramtypes",[Object]),N("design:returntype",void 0)],e.prototype,"connection",null),F([Object(i.OnDisconnect)(),A(0,Object(i.ConnectedSocket)()),N("design:type",Function),N("design:paramtypes",[Object]),N("design:returntype",void 0)],e.prototype,"disconnect",null),F([Object(i.OnMessage)("login"),A(0,Object(i.ConnectedSocket)()),A(1,Object(i.MessageBody)()),N("design:type",Function),N("design:paramtypes",[Object,Object]),N("design:returntype",void 0)],e.prototype,"addUser",null),F([Object(i.OnMessage)("room"),A(0,Object(i.ConnectedSocket)()),A(1,Object(i.MessageBody)()),N("design:type",Function),N("design:paramtypes",[Object,Object]),N("design:returntype",void 0)],e.prototype,"getRoom",null),F([Object(i.OnMessage)("room/new"),A(0,Object(i.ConnectedSocket)()),A(1,Object(i.MessageBody)()),N("design:type",Function),N("design:paramtypes",[Object,Object]),N("design:returntype",void 0)],e.prototype,"addRoom",null),F([Object(i.OnMessage)("room/in"),A(0,Object(i.ConnectedSocket)()),A(1,Object(i.MessageBody)()),N("design:type",Function),N("design:paramtypes",[Object,Object]),N("design:returntype",void 0)],e.prototype,"enterRoom",null),F([Object(i.OnMessage)("room/out"),A(0,Object(i.ConnectedSocket)()),A(1,Object(i.MessageBody)()),N("design:type",Function),N("design:paramtypes",[Object,Object]),N("design:returntype",void 0)],e.prototype,"leaveRoom",null),F([Object(i.OnMessage)("room/message"),A(0,Object(i.ConnectedSocket)()),A(1,Object(i.MessageBody)()),N("design:type",Function),N("design:paramtypes",[Object,Object]),N("design:returntype",void 0)],e.prototype,"roomMessage",null),F([Object(i.OnMessage)("room/invite"),A(0,Object(i.MessageBody)()),N("design:type",Function),N("design:paramtypes",[Object]),N("design:returntype",void 0)],e.prototype,"inviteUser",null),F([Object(i.OnMessage)("users"),A(0,Object(i.ConnectedSocket)()),N("design:type",Function),N("design:paramtypes",[Object]),N("design:returntype",void 0)],e.prototype,"getUsers",null),e=F([Object(i.SocketController)("/chat"),N("design:paramtypes",[R,x,E,h])],e)}(),Y=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},V=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},H=o(7).dataType,X=function(){function e(e,t){this.logger=e,this.storageSrv=t,this.tableName="migration_log",this.logger.info("created Migration_logRepository")}return e.prototype.init=function(){return Promise.resolve()},e.prototype.migrations=function(){var e=this;return[{migration_id:"create table migration_log",action:"createTable",args:[this.tableName,{id:{type:H.INTEGER,primaryKey:!0,autoIncrement:!0,notNull:!0},migration_id:{type:H.STRING,length:255},action:{type:H.STRING,notNull:!0,length:20},params:{type:H.TEXT,notNull:!0,defaultValue:""},success:{type:H.BOOLEAN,notNull:!0},error:{type:H.TEXT,defaultValue:""},timestamp:{type:H.DATE_TIME,defaultValue:new String("CURRENT_TIMESTAMP")}},function(t){t&&e.logger.error(t)}]}]},e.prototype.getMigrationLog=function(){var e=this;return new Promise(function(t){e.storageSrv.db.all("select * from migration_log",function(e,o){t(e?[]:o)})})},e=Y([Object(s.Service)(),V("design:paramtypes",[h,P])],e)}(),z=function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),J=function(e,t,o,r){var n,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(i<3?n(s):i>3?n(t,o,s):n(t,o))||s);return i>3&&s&&Object.defineProperty(t,o,s),s},K=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},W=function(e){function t(t,o,r){var n=e.call(this)||this;return n.logger=t,n.storageSrv=o,n.migrationLogRepository=r,n.migrations=[],n.logger.info("created StorageMigrationSrv"),n}return z(t,e),t.prototype.init=function(){var e=this,t={};return this.migrationLogRepository.getMigrationLog().then(function(e){for(var o=0,r=e;o<r.length;o++){var n=r[o];n.success&&(t[n.migration_id]=n)}return t}).then(function(t){e.addMigrations(),e.dbMigration(t)})},t.prototype.addMigration=function(e,t,o){this.migrations.push({migration_id:e,action:t,args:o})},t.prototype.addMigrations=function(){for(var e=0,t=[this.migrationLogRepository.migrations()];e<t.length;e++){var o=t[e];this.migrations=this.migrations.concat(o)}},t.prototype.dbMigration=function(e){for(var t=this,o=function(o,n,i){if(!e[o]){r.logger.info("execute "+o);var s=i[i.length-1];i[i.length-1]=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var c=e[0],a=!c,u=c?c.message.replace(/\"/gi,"'"):"",f=JSON.stringify(i.slice(0,i.length-1)).replace(/\"/gi,"'"),p=t.storageSrv.db;p.insert("migration_log",["migration_id","action","success","error","params"],[o,n,a,u,f],function(e){e&&t.logger.error(e)}),s.apply(t.storageSrv.db,e)};try{r.storageSrv.db[n].apply(r.storageSrv.db,i)}catch(e){r.logger.error(e)}}},r=this,n=0,i=this.migrations;n<i.length;n++){var s=i[n];o(s.migration_id,s.action,s.args)}},t=J([Object(s.Service)(),K("design:paramtypes",[h,P,X])],t)}(g.EventEmitter),Q=function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),Z=function(e,t,o,r){return new(o||(o=Promise))(function(n,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){e.done?n(e.value):new o(function(t){t(e.value)}).then(s,c)}a((r=r.apply(e,t||[])).next())})},$=function(e,t){var o,r,n,i,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,r&&(n=2&i[0]?r.return:i[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,i[1])).done)return n;switch(r=0,n&&(i=[2&i[0],n.value]),i[0]){case 0:case 1:n=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(n=(n=s.trys).length>0&&n[n.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!n||i[1]>n[0]&&i[1]<n[3])){s.label=i[1];break}if(6===i[0]&&s.label<n[1]){s.label=n[1],n=i;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(i);break}n[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{o=n=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},ee=o(10),te=o(11),oe=o(12),re=o(13);o(14);new(function(e){function t(t){var r=this,c=re.join("dist","public");r=e.call(this)||this,Object(n.useContainer)(s.Container),Object(i.useContainer)(s.Container),r.app=f()(),r.app.use(oe()),r.app.engine("html",o(18).renderFile),r.app.set("views",re.join(c)),r.app.set("view engine","html"),Object(n.useExpressServer)(r.app),r.server=a.a.createServer(r.app),r.app.use("/public",f.a.static(c)),r.io=l()(r.server),Object(i.useSocketServer)(r.io,{controllers:[G]});var u=s.Container.get(h);return u.info("\n"+te.textSync("Sample")),r.app.use(ee("combined",{stream:u})),r.addServices(),r.port=t?parseInt(t,10):s.Container.get(S).getPort(),r}return Q(t,e),t.prototype.addMiddleware=function(e){this.app.use(e)},t.prototype.addServices=function(){return Z(this,void 0,void 0,function(){var e,t,o,r,n,i,c,a,u,f,p;return $(this,function(l){switch(l.label){case 0:for(e=[{name:"socketIO",instance:this.io}],t=s.Container.get(h),o=0,r=e;o<r.length;o++)i=(n=r[o]).name,f=n.instance,s.Container.set(i,f),t.info("[init] DI Registered "+i);c=0,a=[S,P,W,x,E,R],l.label=1;case 1:if(!(c<a.length))return[3,6];u=a[c],l.label=2;case 2:return l.trys.push([2,4,,5]),[4,(f=s.Container.get(u)).init()];case 3:return l.sent(),t.info("[Serivce Initialize] DI Registered "+u.name),[3,5];case 4:return p=l.sent(),console.log(p.stack),t.error(p),[3,5];case 5:return c++,[3,1];case 6:return this.emit("ready"),[2]}})})},t.prototype.getApp=function(){return this.app},t.prototype.runServ=function(){var e=this,t=s.Container.get(h);return new Promise(function(o){e.once("ready",function(){return Z(e,void 0,void 0,function(){var e=this;return $(this,function(r){return o(this.server.listen(this.port,function(){return t.info("listening on port "+e.port)})),[2]})})})})},t}(g.EventEmitter))(process.env.PORT).runServ()}]);
//# sourceMappingURL=server.bundle.js.map