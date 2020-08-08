# GitSearch
Github repository search application

# Open issues

1. **Api requests rate limiter** using sliding window of fix window algorithm.

2. **Cache api results**
 - Client cache options - Http cache interceptor with custom http request header, window local session storage, Angular cache service.
 - Server cache options - using LRU algorithm, Redis in memory cache and time expiration keys.

3. **Logging options**
- Switch to SeriLogger/Log4Net and use its file appender.
- Configure the current Microsoft logging framework to use its available Event Source/Windows Event Log providers.

4. **Add favorite Api, Validate search result item hasn't changed.**
- **Solution A** - Compute and compare hash with MD5 algorithm.  
Search query Api - Computed hash field to any result item (server).  
Add favorite Api - Client sends result item and its computed hash, server compute result item hash and compare it with client's hash.

- **Solution B**
- Add favorite Api - Client repository id, server fetch the original result item by the id from local cache or Git search servce.  
