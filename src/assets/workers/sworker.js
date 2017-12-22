(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

// importScripts('temp.js');
var connnections = 0;
console.log(self);
self.addEventListener("connect", function (evt) {
    var port = evt.ports[0];
    connnections++;
    port.addEventListener("message", function (e) {
        console.log(e.data);
    }, false);
    port.start();
    port.postMessage({ type: 'WORKER_CONNECTED' });
    console.log("Connections Count : " + connnections);
}, false);

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dvcmtlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vYXBwL3dvcmtlci1zZXJ2aWNlcy9zaGFyZWQtd29ya2VyLWdhdGV3YXkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0U2NyaXB0cygndGVtcC5qcycpO1xuXG52YXIgY29ubm5lY3Rpb25zID0gMDtcbmNvbnNvbGUubG9nKHNlbGYpO1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiY29ubmVjdFwiLCAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgdmFyIHBvcnQ6IE1lc3NhZ2VQb3J0ID0gZXZ0LnBvcnRzWzBdO1xuICBjb25ubmVjdGlvbnMrKztcbiAgcG9ydC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZS5kYXRhKTtcbiAgfSwgZmFsc2UpO1xuICBwb3J0LnN0YXJ0KCk7XG4gIHBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiAnV09SS0VSX0NPTk5FQ1RFRCcgfSk7XG4gIGNvbnNvbGUubG9nKGBDb25uZWN0aW9ucyBDb3VudCA6ICR7Y29ubm5lY3Rpb25zfWApO1xufSwgZmFsc2UpOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxHQUFpQjtJQUNqRCxJQUFJLElBQUksR0FBZ0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxZQUFZLEVBQUUsQ0FBQztJQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUFlO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDVixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF1QixZQUFjLENBQUMsQ0FBQztDQUNwRCxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7OyJ9
