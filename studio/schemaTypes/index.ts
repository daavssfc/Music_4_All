import author from "./documents/author";
import artist from "./documents/artist";
import tag from "./documents/tag";
import album from "./documents/album";
import review from "./documents/review";
import post from "./documents/post";
import event from "./documents/event";
import blockContent from "./objects/blockContent";
import seo from "./objects/seo";
import externalLink from "./objects/externalLink";

export const schemaTypes = [
  blockContent,
  seo,
  externalLink,
  author,
  artist,
  tag,
  album,
  review,
  post,
  event
];
