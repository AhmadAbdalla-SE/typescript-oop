
class User {
    public readonly id:number = Date.now()
    public name:string;
    public email:string;
    private password:string;
    public phone:string;
    protected _age:number;
    private notebooks: NoteBook[] = [];
     
    constructor( name:string, email:string, password:string, phone:string, age:number){
        this.name = name;
        this.email = email;
        this.password = password
        this.phone = phone;
        this._age = 0;
        this.age = age;
    }
    
    // public get password() : string {
    //     return this._password
    // }
    
    // public set password(password : string) {
    //     this._password = password;
    // }
    
    
    
    get age() : number {
        return this._age
    }
    set age(age : number) {
        if (18 > age || age > 60) {
            throw new Error("Age is not between 18 and 60");
        }
        this._age = age;
    }
    public displayInfo(): void {
        console.log(`Id: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this.age}`);
    }
    public addNoteBook(notebook:NoteBook): void {
        this.notebooks.push(notebook)
    }
    public showNoteBooks(): void {
        console.log(  ` ${this.name} owns ${this.notebooks.length} notebooks` )

        for (const notebook of this.notebooks) {
            notebook.showNotes();
        }
    }
    
}
const user1 = new User("Ahmed", "a@gmail.com","pw","01095160011",25);
user1.displayInfo();

 class Admin extends User {
    public role:string;
    constructor(name:string, email:string, password:string, phone:string,  age:number, role:string){
        super(name, email, password, phone, age);
        this.role = role;
    }
    public reviewNote(note:Note):void {
        console.log(`Notes Id: ${note.id}`);
        console.log(`Notes title: ${note.title}`);
        console.log(`Notes content: ${note.preview()}`);
        console.log(`Note owner name: ${note.userId.name}`);
        console.log(`Reviewed by ${this.name} as an ${this.role}`);
    }
}
const admin1 = new Admin("Ahmad" , "ahmad@admin.com", "pwaa", "010951600111", 30, "administrator");

 class Note {
    public readonly id:number = Date.now()
    public title:string;
    public content:string;
    public userId: User;
    constructor(title:string, content:string, userId:User){
        this.title = title
        this.content = content
        this.userId = userId
    }
    public preview():string {
        if (this.content.length <= 20){
            return this.content
        }
        const previewContent = this.content.slice(0, 20);
        return `${previewContent}...`;
    }
 }
 const p = new Note("Title","lorem ipsum dolor sit amet", user1 )
 console.log(p.preview());

admin1.reviewNote(p)


class NoteBook {
    private collection: Note[] = [];
    public name: string;
    public owner: User;
    constructor( name:string, owner:User){
        this.name = name
        this.owner = owner
    }
    public addNote(title:string, content:string, user:User) :void {
        const note = new Note(title, content, user)
        this.collection.push(note)
    }
    public removeNote(title:string):void {
        this.collection = this.collection.filter((note)=>note.title !== title)
    }
    public showNotes():void{
        console.log(`Notebook: ${this.name} ${this.collection.length} notes`)
        for (const note of this.collection) {
            console.log(`${note.title} ${note.preview()} ${note.userId.name} `);
        }
    }
}
const user2= new User("Ali", "ali@gmail.com", "pw2", "010951600134", 28);
const user3= new User("Mahmoud", "mahmoud@gmail.com", "pw4", "010951600112", 30);
const notebook = new NoteBook("My Notebook", user3);
user3.addNoteBook(notebook)
notebook.addNote("My diary", "My life's content", user2);
notebook.addNote("My diary2", "My life's content2", user3);
notebook.removeNote("My diary2");
user3.showNoteBooks();

class Storage<T> {
    private items: T[] = [];

    addItem(item: T): void {
        this.items.push(item);
    }

    removeItem(index: number): void {
    if (index < 0 || index >= this.items.length) {
        throw new Error(`Invalid index: ${index}`);
    }
    this.items.splice(index, 1);
}

    getAllItems(): T[] {
        return this.items.slice();
    }
}
const numberStorage = new Storage<number>();

numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.addItem(30);

console.log(numberStorage.getAllItems()); 

numberStorage.removeItem(1);

console.log(numberStorage.getAllItems()); 

const noteStorage = new Storage<Note>();
noteStorage.addItem(new Note("Generic", "stored in Storage<Note>", user2));
console.log(noteStorage.getAllItems().map(n => n.title));