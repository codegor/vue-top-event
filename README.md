Vue mixin for easy bubble event from sub components to this component.
And Vue mixin for hook event for component and for sub components.

How to use?

at top component:
```javascript
import top from "vue-top-event";
import events from "vue-top-event/event";
import hooks from "vue-top-event/hooks";

//[...]

  mixins: [top]
  // or
  // mixins: [events, hooks],
```

at sub components:
```javascript
   inject: ['topEvent', 'topHook'],
   // ...
   
   methods: {
     action(){
       this.topEvent('_name-of-top-event_', data);
       
       // ...
       
       this.topHook('_name-of-top-hook_', data).then(r => {
         // code for result of hook
       });
     }
   }
   
```
  


