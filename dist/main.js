"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id = Date.now();
    name;
    email;
    password;
    phone;
    _age;
    notebooks = [];
    constructor(name, email, password, phone, age) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this._age = 0;
        this.age = age;
    }
    get age() {
        return this._age;
    }
    set age(age) {
        if (18 > age || age > 60) {
            throw new Error("Age is not between 18 and 60");
        }
        this._age = age;
    }
    displayInfo() {
        console.log(`Id: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this.age}`);
    }
    addNoteBook(notebook) {
        this.notebooks.push(notebook);
    }
    showNoteBooks() {
        console.log(` ${this.name} owns ${this.notebooks.length} notebooks`);
        for (const notebook of this.notebooks) {
            notebook.showNotes();
        }
    }
}
const user1 = new User("Ahmed", "a@gmail.com", "pw", "01095160011", 25);
user1.displayInfo();
class Admin extends User {
    role;
    constructor(name, email, password, phone, age, role) {
        super(name, email, password, phone, age);
        this.role = role;
    }
    reviewNote(note) {
        console.log(`Notes Id: ${note.id}`);
        console.log(`Notes title: ${note.title}`);
        console.log(`Notes content: ${note.preview()}`);
        console.log(`Note owner name: ${note.userId.name}`);
        console.log(`Reviewed by ${this.name} as an ${this.role}`);
    }
}
const admin1 = new Admin("Ahmad", "ahmad@admin.com", "pwaa", "010951600111", 30, "administrator");
class Note {
    id = Date.now();
    title;
    content;
    userId;
    constructor(title, content, userId) {
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    preview() {
        if (this.content.length <= 20) {
            return this.content;
        }
        const previewContent = this.content.slice(0, 20);
        return `${previewContent}...`;
    }
}
const p = new Note("Title", "lorem ipsum dolor sit amet", user1);
console.log(p.preview());
admin1.reviewNote(p);
class NoteBook {
    collection = [];
    name;
    owner;
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
    }
    addNote(title, content, user) {
        const note = new Note(title, content, user);
        this.collection.push(note);
    }
    removeNote(title) {
        this.collection = this.collection.filter((note) => note.title !== title);
    }
    showNotes() {
        console.log(`Notebook: ${this.name} ${this.collection.length} notes`);
        for (const note of this.collection) {
            console.log(`${note.title} ${note.preview()} ${note.userId.name} `);
        }
    }
}
const user2 = new User("Ali", "ali@gmail.com", "pw2", "010951600134", 28);
const user3 = new User("Mahmoud", "mahmoud@gmail.com", "pw4", "010951600112", 30);
const notebook = new NoteBook("My Notebook", user3);
user3.addNoteBook(notebook);
notebook.addNote("My diary", "My life's content", user2);
notebook.addNote("My diary2", "My life's content2", user3);
notebook.removeNote("My diary2");
user3.showNoteBooks();
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(index) {
        if (index < 0 || index >= this.items.length) {
            throw new Error(`Invalid index: ${index}`);
        }
        this.items.splice(index, 1);
    }
    getAllItems() {
        return this.items.slice();
    }
}
const numberStorage = new Storage();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.addItem(30);
console.log(numberStorage.getAllItems());
numberStorage.removeItem(1);
console.log(numberStorage.getAllItems());
const noteStorage = new Storage();
noteStorage.addItem(new Note("Generic", "stored in Storage<Note>", user2));
console.log(noteStorage.getAllItems().map(n => n.title));
