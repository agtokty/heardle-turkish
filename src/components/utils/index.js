

function getDayQueryParam() {
    const params = new URLSearchParams(window.location.search)
    const dayParam = params.get('day');

    if (dayParam && dayParam.length == 8 && !isNaN(dayParam)) {
        return dayParam;
    }
    return null;
}

function getDayStr() {
    const now = new Date();

    const dayParam = getDayQueryParam();
    if (dayParam) {
        console.debug("dayParam found=", dayParam);
        return dayParam;
    }

    // let oldFormat = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
    // console.debug("getDayStr oldFormat=", oldFormat);

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? ("0" + month) : month;

    let day = now.getDate();
    day = day < 10 ? ("0" + day) : day;

    let newFormat = `${year}${month}${day}`;
    // console.debug("getDayStr newFormat=", newFormat);

    // return "20220312"
    return newFormat;
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength === 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = [];
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i === 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}


export { getDayStr, similarity }