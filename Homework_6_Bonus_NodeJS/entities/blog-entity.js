
export class Blog {
    constructor(id, title, body, author, tags){
        this.id = id;
        this.title = title;
        this.body = body;
        this.author = author;
        this.date = new Date();
        this.tags = tags
    }
}