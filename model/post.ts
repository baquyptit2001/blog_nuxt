import User from "~/model/user";

export default class Post {
  id: number| undefined;
  title: string| undefined;
  content: string| undefined;
  user: User| undefined;

  constructor() {
  }
}
