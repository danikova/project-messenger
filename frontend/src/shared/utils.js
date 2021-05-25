export const fileToBase64 = (inputFile) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(null);
        };
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(inputFile);
    });
};
