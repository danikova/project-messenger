exports.removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

exports.createNamingSuggestions = (fname, lname, len) => {
    return [
        lname,
        ...fname
            .split('')
            .map((it, i) =>
                (fname.substring(0, i + 1) + lname).substring(0, len),
            ),
    ];
};
