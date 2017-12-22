(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var WorkerAgent = (function () {
    function WorkerAgent() {
        if (WorkerAgent._instance) {
            throw new Error("Error: Instantiation failed: Use WorkerAgent.instance instead of new.");
        }
        WorkerAgent._instance = this;
    }
    Object.defineProperty(WorkerAgent, "instance", {
        get: function () {
            return WorkerAgent._instance;
        },
        enumerable: true,
        configurable: true
    });
    WorkerAgent.prototype.setContext = function (context) {
        debugger;
        this.context = context;
    };
    WorkerAgent.prototype.onMessage = function (message) {
    };
    WorkerAgent._instance = new WorkerAgent();
    return WorkerAgent;
}());

WorkerAgent.instance.setContext(self);
self.addEventListener('message', function (evt) {
    console.log('Hi There', evt);
});
self.addEventListener('messageerror', function (evt) {
    debugger;
    console.error(evt);
});

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHdvcmtlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vYXBwL3dvcmtlci1zZXJ2aWNlcy93b3JrZXItYWdlbnQudHMiLCIuLi8uLi9hcHAvd29ya2VyLXNlcnZpY2VzL2RlZGljYXRlZC13b3JrZXItZ2F0ZXdheS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXb3JrZXJNZXNzYWdlIH0gZnJvbSBcIi4uL2NvbmZpZy1tb2RlbHMvaW5kZXhcIjtcblxuXG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJBZ2VudCB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBXb3JrZXJBZ2VudCA9IG5ldyBXb3JrZXJBZ2VudCgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGlmIChXb3JrZXJBZ2VudC5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiBJbnN0YW50aWF0aW9uIGZhaWxlZDogVXNlIFdvcmtlckFnZW50Lmluc3RhbmNlIGluc3RlYWQgb2YgbmV3LlwiKTtcbiAgICAgICAgfVxuICAgICAgICBXb3JrZXJBZ2VudC5faW5zdGFuY2UgPSB0aGlzO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogV29ya2VyQWdlbnQge1xuICAgICAgICByZXR1cm4gV29ya2VyQWdlbnQuX2luc3RhbmNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29udGV4dCA6IGFueTtcblxuICAgIHNldENvbnRleHQoY29udGV4dDogYW55KSB7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cbiAgICBvbk1lc3NhZ2UobWVzc2FnZTogV29ya2VyTWVzc2FnZSkge1xuICAgIH1cbn0iLCJpbXBvcnQgeyBXb3JrZXJBZ2VudCB9IGZyb20gJy4vd29ya2VyLWFnZW50JztcblxuV29ya2VyQWdlbnQuaW5zdGFuY2Uuc2V0Q29udGV4dChzZWxmKTtcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdIaSBUaGVyZScsIGV2dCk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlZXJyb3InLCAoZXZ0OiBFcnJvckV2ZW50KSA9PiB7XG4gICAgZGVidWdnZXI7XG4gICAgY29uc29sZS5lcnJvcihldnQpO1xufSk7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlPO0lBR0g7UUFDSSxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1NBQzVGO1FBQ0QsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7S0FDaEM7SUFFRCxzQkFBVyx1QkFBUTthQUFuQjtZQUNJLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQztTQUNoQzs7O09BQUE7SUFJRCxnQ0FBVSxHQUFWLFVBQVcsT0FBWTtRQUNuQixTQUFTO1FBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7SUFDRCwrQkFBUyxHQUFULFVBQVUsT0FBc0I7S0FDL0I7SUFwQmMscUJBQVMsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQXFCOUQsa0JBQUM7Q0FBQTs7QUN4QkQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLEdBQWlCO0lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ2hDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsVUFBQyxHQUFlO0lBQ2xELFNBQVM7SUFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3RCLENBQUMsQ0FBQzs7OzsifQ==
