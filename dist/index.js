function i(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}var n,r;r={},i.m=n=[function(e,t,n){"use strict";e.exports={Messenger:n(1)}},function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=(function(e,t,n){t&&i(e.prototype,t)}(s,[{key:"_installListener",value:function(){var e=this;this._listener=function(t){if(t.data&&"string"==typeof t.data){var n=void 0;try{if(!(n=JSON.parse(t.data)).channel||n.channel!==e.channelName)return;if("object"!==r(n.message))return}catch(n){return}if(void 0!==n.replyId){if("number"!=typeof n.replyId||n.replyId%1!=0)return;var i=e._requests.get(n.replyId);i&&(clearTimeout(i.timeout),e._requests.delete(n.replyId),i.resolve(n.message))}else{if("number"!=typeof n.id||n.id%1!=0)return;var o=e.channelName,s=n.id,u=t.origin;e.onMessage(n.message,t.origin,(function(e){var n={channel:o,replyId:s,message:e};t.source.postMessage(JSON.stringify(n),u)}))}}},window.addEventListener("message",this._listener)}},{key:"sendMessage",value:function(e,t,n,r){var i={channel:this.channelName,id:this.getNextId(),message:t};if(r&&r.waitForReply&&!this._listener){var o=this;return new Promise((function(t,s){var u=setTimeout((function(){o._requests.get(i.id)&&(o._requests.delete(i.id),s(new Error("Timeout expired for the message response")))}),r&&r.timeout?r.timeout:o._defaultTimeout);o._requests.set(i.id,{timeout:u,resolve:t}),e.postMessage(JSON.stringify(i),n)}))}e.postMessage(JSON.stringify(i),n)}},{key:"close",value:function(){window.removeEventListener("message",this._listener),this._listener=null,delete this._requests}},{key:"getNextId",value:function(){return this._nextId+=1,this._nextId}}]),s);function s(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),this.channelName=e,this.onMessage=t,this._installListener(),this._requests=new Map,this._nextId=0,this._defaultTimeout=4e3}e.exports=o}],i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i(i.s=0);