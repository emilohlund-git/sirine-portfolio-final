import pb from "./pb.config";

const getImage = (media: any, url: string) => {
  return pb.files?.getUrl(media, url);
}

const getImageThumb = (media: any, url: string) => {
  return pb.files?.getUrl(media, url, {
    thumb: '250x250'
  })
}

export { getImage, getImageThumb };

