var cheerio = require('cheerio')

function parseHn(gitHubHtml) {
  var $ = cheerio.load(gitHubHtml)
  var items = []
  $('.repo-list li').each(function (i, elem) {

    var item = $(this);
    var divs = item.children('div');
    var repo = getRepoInformation(divs.first(), divs.eq(2));

    var metaRow = divs.eq(3);
    var metaLinks = metaRow.children('a');

    var stars = toNumeric(metaLinks.first());
    var forks = toNumeric(metaLinks.eq(1));
    var todayStars = parseInt(metaRow.children('span').last().text().trim().split(' ')[0].replace(/,/g, ""));

    var resultObject = {
      repo,
      stars: {
        count: stars,
        link: metaLinks.first().attr('href').trim()
      },
      forks: {
        count: forks,
        link: metaLinks.eq(1).attr('href').trim()
      },
      todayStars,
    }
    items[i] = resultObject;
  });

  return items;
}

function toNumeric(item) {
  return parseInt(item.text().trim().replace(/,/g, ""));
}

function getRepoInformation(repo, descriptionDiv) {
  var repoName = repo.text().trim();
  var owner = repoName.split(' / ')[0].trim();
  var name = repoName.split(' / ')[1].trim();

  return {
    rawName: repoName,
    owner,
    name,
    link: repo.find('a').first().attr('href'),
    description: descriptionDiv.text().trim().replace(/\s\s+/g, ' ')
  }
}

exports.parse = function (gitHubHtml) {
  return parseHn(gitHubHtml)
}

exports.parseAsync = function (gitHubHtml, callback) {
  callback(parseHn(gitHubHtml))
}


