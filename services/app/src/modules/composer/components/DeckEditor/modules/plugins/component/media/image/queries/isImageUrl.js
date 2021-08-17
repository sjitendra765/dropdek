const imagePattern = new RegExp('\.(gif|jpg|jpeg|tiff|png)$', 'i');
export const isImageUrl = (url) => imagePattern.test(url);
