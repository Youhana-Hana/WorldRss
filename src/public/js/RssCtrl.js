function RssCtrl($scope) {
  $scope.sources = [
    { rss: { channel: [ { title: "BBC", link: "http://www.bbc.co.uk/news/#sa-ns_mchannel=rss&ns_source=PublicRSS20-sa", image: [ { url:"http://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif" } ], item: [ { title: "BBC title 1", description:  "BBC description 1." }, { title: "BBC title2", description: "BBC description2" } ] } ] } } ,
    { rss: { channel: [ { title: "sky", link: "http://www.bbc.co.uk/news/#sa-ns_mchannel=rss&ns_source=PublicRSS20-sa", image: [ { url:"http://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif" } ], item: [ { title: "sky title 1", description:  " sky description 1" }, { title: "sky title2", description: "sky description2" } ] } ] } } ,
  ];
}
