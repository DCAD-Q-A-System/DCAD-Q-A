const YOUTUBE_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
const PANOPTO_REGEX =
  /((http:\/\/(.*\.hosted\.panopto\.com\/.*|.*\.staging\.panopto\.com\/.*|.*\.cloud\.panopto\.eu\/.*))|(https:\/\/(.*\.hosted\.panopto\.com\/.*|.*\.staging\.panopto\.com\/.*|.*\.cloud\.panopto\.eu\/.*)))/i;

export { YOUTUBE_REGEX, PANOPTO_REGEX };
