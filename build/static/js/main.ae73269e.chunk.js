(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),o=t(13),r=t.n(o),l=t(2),u=t(3),i=t.n(u),s="/api/persons",m=function(){return i.a.get(s).then((function(e){return e.data}))},d=function(e){return i.a.post(s,e).then((function(e){return e.data}))},h=function(e){var n=e.id;return i.a.delete("".concat(s,"/").concat(n)).then((function(e){return e}))},f=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e}))},g=(t(36),function(e){var n=e.handleSearchChange,t=e.search;return c.a.createElement("div",null,"Search",c.a.createElement("input",{onChange:n,value:t}))}),b=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,o=e.newNumber,r=e.handleNumberChange;return c.a.createElement("div",null,c.a.createElement("form",{onSubmit:n},c.a.createElement("div",null,"name: ",c.a.createElement("input",{value:t,onChange:a})),c.a.createElement("div",null,"number:"," ",c.a.createElement("input",{value:o,onChange:r})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add"))))},v=function(e){var n=e.persons,t=e.search,a=e.deletePerson,o=n?n.filter((function(e){return e.name.includes(t)})):n;return c.a.createElement("div",null,c.a.createElement("ul",null,o.map((function(e){return c.a.createElement("li",{key:e.name},e.name," ",e.number,c.a.createElement("button",{onClick:function(){!function(e){var n=window.confirm("Delete ".concat(e.name,"?"));console.log("clicked on",e),n?(console.log("delete"),a(e)):console.log("cancel")}(e)}},"Delete"))}))))},E=function(e){var n=e.message;return null===n?null:"error"===n.type?c.a.createElement("div",{className:"error"},n.text):c.a.createElement("div",{className:"success"},n.text)},p=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],r=Object(a.useState)(""),u=Object(l.a)(r,2),i=u[0],s=u[1],p=Object(a.useState)(""),w=Object(l.a)(p,2),j=w[0],N=w[1],O=Object(a.useState)(null),S=Object(l.a)(O,2),y=S[0],C=S[1],k=Object(a.useState)(""),P=Object(l.a)(k,2),x=P[0],D=P[1],W=m,B=d,J=h,A=f;Object(a.useEffect)((function(){W().then((function(e){console.log(e),o(e)}))}),[W]);var I=function(){W().then((function(e){o(e),console.log("fetched data after delete")}))},M=function(e,n){C({text:e,type:n}),setTimeout((function(){C(null)}),5e3)};return c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),c.a.createElement(E,{message:y}),c.a.createElement(g,{handleSearchChange:function(e){D(e.target.value)},search:x}),c.a.createElement("h2",null,"Add new contact"),c.a.createElement(b,{addPerson:function(e){e.preventDefault();var n={name:i,number:j},a=t.filter((function(e){return e.name===i}));(console.log("match",a),a.length>0)?window.confirm("".concat(i," is already on the list. Want to update their number?"))?(console.log("change"),function(e,n){A(e,n).then((function(e){console.log("update",e),M("Succesfully updated ".concat(e.data.name," number to ").concat(e.data.number),"success"),I()})).catch((function(e){console.log(e),M("".concat(n.name," cannot be edited. Person doesn't exist anymore"),"error"),I()}))}(a[0].id,n)):console.log("cancel"):(B(n).then((function(e){console.log("create:"),console.log(e),M("".concat(e.name," was added!"),"success"),o(t.concat(e))})),s(""),N(""))},newName:i,handleNameChange:function(e){s(e.target.value)},newNumber:j,handleNumberChange:function(e){N(e.target.value)}}),c.a.createElement("h2",null,"Numbers"),c.a.createElement(v,{persons:t,search:x,deletePerson:function(e){J(e).then((function(n){204===n.status&&(M("".concat(e.name," was deleted"),"success"),I())})).catch((function(n){console.log("error",n),M("".concat(e.name," has already been removed from the phonebook!"),"error")}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.ae73269e.chunk.js.map