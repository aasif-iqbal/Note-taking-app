const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    
    const notes = loadNotes();

    const duplicateNotetitle = notes.filter((note_value) => {
        // it will match from notes.title(from notes.js) and user enter value ie.title
        return note_value.title === title; 
    });

    // debugger;
    

    if(duplicateNotetitle.length === 0){
        //No duplicate title
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New title added successfully'));
    }else{
        console.log(chalk.red.inverse('Title already exist..'));
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON, 'utf-8');
}

const removeNotes = (title) => {
    // console.log('title',title); 
    const notes = loadNotes();

    const notesToKeep = notes.filter((note_value) => {                            
        return note_value.title !== title;  // return all unmatched title           
    });        

    if(notes.length > notesToKeep.length){ // if title matched remove it
        console.log(chalk.green.inverse('Note removed!'))  
        //saveNotes will only save if Note title found  
        saveNotes(notesToKeep);          
    }else{
        console.log(chalk.red.inverse('No note found!'))
    }
}

const updateNotes = (title, updateTitle) => {
    // console.log(title);
    // console.log(updateTitle);
    const notes = loadNotes();

    notes.forEach((note)=>{
        if(note.title == title){
            note.title = updateTitle;
            console.log('title updated successfully');
        }else{
            return false;
        }
    });

    saveNotes(notes);
}

const loadNotes = () => {
    
    try {
        const databuffer = fs.readFileSync('notes.json');    // buffer <- json_file
        const dataString = databuffer.toString();           // string <- buffer
        const dataJson = JSON.parse(dataString);            // JsonObject <- string
        return dataJson;
    } catch (error) {
        // if file not Exist -or- Found
        return []; 
    }    
}

const listNotes = () => {
    const notes = loadNotes();
    
    console.log(chalk.inverse('list notes'));
    
    notes.forEach((note) => {
        console.log('Title:' + note.title); 
    });    
}

const readNotes = (title) => {
    
    const notes = loadNotes();

    const note = notes.find((note) => note.title === title);
    
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse('Note not found!'))
    }    
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    updateNotes: updateNotes,
    readNotes: readNotes
}