user-storage
=====
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [Git repository](#git)
6. [Version](#version)

### <a name="description"></a>1. Description
`user-storage` is a service that gives access to the browser's `local` and `session` storage.
  
### <a name="installation"></a>2. Installation
There are two ways to "import" this service into your project:
1. Install it as a NPM module:
```
npm install user-storage --save-dev
```
  
2. Download and include it in your project as plain JS file:
```html
<!-- ./dist/storage.min.js is the path to the saved JS file -->
<script type="application/javascript" src="./dist/storage.min.js"></script>
```
  
### <a name="usage"></a>3. Usage
If the service is used as NPM module, then you have to import it in your project:
```typescript
import { Storage } from 'user-storage';
```
  
After importing the `Storage` service into your project, your'e ready to use 
its `static` properties `local` and `session`:
```typescript
// set and read a key-value pair into/from localStorage:  
Storage.local.set('testKeyName', 'testKeyValue');  
console.log(Storage.local.get('testKeyName'));  
// Result: testKeyValue  
  
// set and read a key-value pair into/from sessionStorage:  
Storage.session.set('testKeyName', 'testKeyValue');  
console.log(Storage.session.get('testKeyName'));  
// Result: testKeyValue  
```

### <a name="methods"></a>4. Methods  
#### set(key: string, value: string): void  
Method save a key/value pair in the browser's storage.  
Return: `void`.  
Example:
```typescript
// save value into localStorage:  
Storage.local.set('testKeyName', 'testKeyValue');  
  
// save value into sessionStorage:  
Storage.session.set('testKeyName', 'testKeyValue');  
```

#### get(key: string): string  
Method retrieves the value of a key from the browser's storage.  
Return: value of the key is the key exists or `null` in case if there is no such key.  
Example:
```typescript
// get the value of a key from localStorage:  
Storage.local.get('testKeyName');  
  
// get the value of a key from sessionStorage:  
Storage.session.get('testKeyName');  
```

#### remove(key: string): void  
Method removes the key/value pair from the browser's storage.  
Return: `void`  
Example:
```typescript
// remove the key/value from localStorage:  
Storage.local.remove('testKeyName');  
  
// remove the key/value from sessionStorage:  
Storage.session.remove('testKeyName');  
```

#### isSet(key: string): boolean  
Method determines if a key is set and is not `null` in the browser's storage.  
Return: `true` if the key exists and is not `null`. `false` - if there is no such key (or is `null`).  
Example:
```typescript
// check if the key exists in localStorage:  
Storage.local.isSet('testKeyName');  
  
// check if the key exists in sessionStorage:  
Storage.session.isSet('testKeyName');  
```

#### clear(): void  
Method clears completely the browser's storage.  
Return: `void`.  
Example:
```typescript
// clear the localStorage:  
Storage.local.clear();  
  
// clear the sessionStorage:  
Storage.session.clear();  
```
  
### <a name="git"></a>5. Git repository
[https://github.com/tvicpe/user-storage](https://github.com/tvicpe/user-storage)

### <a name="version"></a>6. Version
0.0.2