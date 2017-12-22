(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

// importScripts('temp.js');
debugger;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dvcmtlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vYXBwL3dvcmtlci1zZXJ2aWNlcy9zaGFyZWQtd29ya2VyLWdhdGV3YXkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0U2NyaXB0cygndGVtcC5qcycpO1xuZGVidWdnZXI7XG52YXIgY29ubm5lY3Rpb25zID0gMDtcbmNvbnNvbGUubG9nKHNlbGYpO1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiY29ubmVjdFwiLCAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgdmFyIHBvcnQ6IE1lc3NhZ2VQb3J0ID0gZXZ0LnBvcnRzWzBdO1xuICBjb25ubmVjdGlvbnMrKztcbiAgcG9ydC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZTogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coZS5kYXRhKTtcbiAgfSwgZmFsc2UpO1xuICBwb3J0LnN0YXJ0KCk7XG4gIHBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiAnV09SS0VSX0NPTk5FQ1RFRCcgfSk7XG4gIGNvbnNvbGUubG9nKGBDb25uZWN0aW9ucyBDb3VudCA6ICR7Y29ubm5lY3Rpb25zfWApO1xufSwgZmFsc2UpOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBLFNBQVM7QUFDVCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBaUI7SUFDakQsSUFBSSxJQUFJLEdBQWdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsWUFBWSxFQUFFLENBQUM7SUFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBZTtRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ1YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBdUIsWUFBYyxDQUFDLENBQUM7Q0FDcEQsRUFBRSxLQUFLLENBQUMsQ0FBQzs7OzsifQ==
