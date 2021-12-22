export function parseQuery(querystring) {
    if (querystring == '') { return {}; }
    return querystring.split('&').reduce((a, c) => {
        const [key, value] = c.split('=');
        a[key] = value;
        return a;
    }, {});
}
