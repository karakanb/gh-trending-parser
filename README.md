# hn-parser
An NPM module to parse given Hacker News HTML content. Generates an array of objects to consume. The JSON structure will be the same for every instance, with non-existing values presented as `null`.

```json
{
  "title": "Swedish Academy Won’t Award Nobel Prize in Literature This Year",
  "link": "https://www.wsj.com/articles/swedish-academy-wont-award-nobel-prize-in-literature-this-year-1525419104",
  "siteString": "wsj.com",
  "score": "19 points",
  "user": {
    "name": "dcgudeman",
    "link": "user?id=dcgudeman"
  },
  "age": "49 minutes ago",
  "commentCount": "14 comments",
  "threadLink": "item?id=16992852"
}
```

## Install
```
npm install hn-parser
```

## Usage
```js
const parser = require('hn-parser')
const items = parser.parse(HTMLString);
```

## Test
```
npm run test
```

## License
The project is under MIT license.