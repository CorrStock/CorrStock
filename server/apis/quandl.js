var Quandl = require("quandl");
var quandl = new Quandl({
    auth_token: "Lmzt-LAWzHDzykUrZYU8",
    api_version: 1,
    proxy: "http://myproxy:3128"
});

quandl.configure(options);


// 'https://www.quandl.com/api/v1/datasets/WIKI/' + query.toUpperCase() + '.csv?auth_token=Lmzt-LAWzHDzykUrZYU8&column=4&collapse=weekly&trim_start=2000-01-01&trim_end=2014-01-01&sort_order=asc&transformation=rdiff'
