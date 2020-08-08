# GitSearch
Github repository search application


# TODO - WebApi requests rate limiter using sliding window of fix window algorithm.

# TODO Cache favorite results 
 -Client cache options - http cache interceptor with custom http request header, window local session storage, angular cache service.
 -Server cache options - using LRU algorithm, Redis in memory cache and time expiration keys.

# TODO - Logging options
-Switch to SeriLogger/Log4Net and use its file appender.
-Configure the current Microsoft logging framework to use its available Event Source/Windows Event Log providers.


# TODO - Add favorite Api - Validate search result item hasn't changed.
-Solution 1
Compute and compare hash with MD5 algorithm.
Search query Api - computed hash field to any result item (server).
Add favorite Api - client sends result item and its computed hash, 			      
server compute result item hash and compare it with client's hash

-Solution 2
Add favorite Api - Client sends only the repository id of the result item,
Server fetch the original item from cache or from GitHub.
