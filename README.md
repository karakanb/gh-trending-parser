# gh-trending-parser
An NPM module to parse given GitHub Trending HTML content. Generates an array of objects to consume. The JSON structure will be the same for every instance.

```json
{
  "repo": {
    "rawName": "InterviewMap / InterviewMap",
    "owner": "InterviewMap",
    "name": "InterviewMap",
    "link": "/InterviewMap/InterviewMap",
    "description": "Build the best interview map. The current content includes JS, network, browser related, performance optimization, security, framework, Git, data structure, algorithm, etc."
  },
  "stars": {
    "count": 3897,
    "link": "/InterviewMap/InterviewMap/stargazers"
  },
  "forks": {
    "count": 382,
    "link": "/InterviewMap/InterviewMap/network"
  },
  "todayStars": 652
}
```

## Install
```
npm install gh-trending-parser
```

## Usage
```js
const parser = require('gh-trending-parser')
const items = parser.parse(HTMLString);
```

## Test
```
npm run test
```

## License
The project is under MIT license.