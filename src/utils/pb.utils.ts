import pb from "./pb.config";

const getImage = (media: any, url: string) => {
  return pb.files.getUrl(media, url);
}

export { getImage };

