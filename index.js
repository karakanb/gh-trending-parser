var cheerio = require('cheerio')

function parseGh(gitHubHtml) {
  var $ = cheerio.load(gitHubHtml)
  var items = []
  $('article.Box-row').each(function (i) {
    var item = $(this);
    var divs = item.children('div');
    var h1 = item.children('h2').first();
    var repo = getRepoInformation(h1.first(), item.children('p').first());

    var metaRow = divs.last();
    var metaLinks = metaRow.children('a');

    var stars = toNumeric(metaLinks.first());
    var forks = toNumeric(metaLinks.eq(1));
    var todayStars = parseInt(metaRow.children('span').last().text().trim().split(' ')[0].replace(/,/g, ""));

    var language = metaRow.find('[itemprop="programmingLanguage"]').first();
    var languageFound = language && language.text().trim() !== '';
    var languageColor = languageFound ? language.siblings('.repo-language-color').first() : null;

    var resultObject = {
      repo,
      stars: {
        count: stars,
        link: metaLinks.first().attr('href').trim()
      },
      forks: {
        count: isNaN(forks) ? 0 : forks,
        link: metaLinks.eq(1).attr('href') ? metaLinks.eq(1).attr('href').trim() : ''
      },
      todayStars,
      ...(languageFound && {
        language: {
          is: language && language.text().trim() !== '' ? language.text().trim() : null,
          color: languageColor ? languageColor.css('background-color') : null,
        }
      }),
    };

    items[i] = resultObject;
  });

  return items;
}

function toNumeric(item) {
  return parseInt(item.text().trim().replace(/,/g, ""));
}

function getRepoInformation(repo, descriptionDiv) {
  var repoName = removeExtraSpaces(repo.text().trim());
  var owner = repoName.split(' / ')[0].trim();
  var name = repoName.split(' / ')[1].trim();

  return {
    rawName: repoName,
    owner,
    name,
    link: repo.find('a').first().attr('href'),
    description: removeExtraSpaces(descriptionDiv.text().trim())
  }
}

function removeExtraSpaces(str) {
  return str.replace(/\s\s+/g, ' ')
}

exports.parse = function (gitHubHtml) {
  return parseGh(gitHubHtml)
}

exports.parseAsync = function (gitHubHtml, callback) {
  callback(parseGh(gitHubHtml))
}


