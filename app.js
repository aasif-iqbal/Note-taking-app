const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes');

// Customize yargs version
yargs.version('1.0.0');

// Add Notes
yargs.command({
    command: 'add',
    describe:'Adding a new Notes',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        // handler:a function which will be passed the parsed argv.
        notes.addNotes(argv.title, argv.body); //From notes.js
        console.log('in handler');
    }
})

// Remove single notes from notes.json
// 1. Setup the remove command to take a required "--title" option
// 2. Create and export removeNote function from notes.js
// 3. Call removeNote in remove command handler 
// 4. Have removeNote log the title  of the note to be removed
// 5. Test your work using: note app.js remove --title='some title'



yargs.command({
    command:'remove',
    describe:'removing title...',
    builder:{
        title: {
            describe:'note title..',
            demandOption: true,
            type:'string'
        }        
    },
    // handler:function(argv){        
    //     notes.removeNotes(argv.title);
    //     console.log('notes removed..from handler');
    // }
    handler(argv){        
        notes.removeNotes(argv.title);
        console.log('notes removed..from handler');
    }
})

// Task: Wire up list command
/*
 1. Create and export listNotes from notes.js
 -  show "Your Notes" title using chalk
 -  print note title for each note
 2. call listNotes from command handler
 3. Test Your Work!
*/

// Create list command
yargs.command({
    command: 'list',
    describe: "List your Notes",
    handler(){
        notes.listNotes();
    }
})

// Reading command
/*
Task:
1. Setup title option for read command
2. Create readNotes in notes.js
    - search for note by title
    - find note and print title (styled) and body (plan)
    - No note found? print error in red    
3. Have the command handler call the function
4. Test your work by running couple command
*/

yargs.command({
    command: 'read',
    describe: "Read your Notes",
    builder:{
        title: {
            describe:'note title..',
            demandOption: true,
            type:'string'
        }       
    },
    handler(argv){
        notes.readNotes(argv.title);
        console.log('reading notes ..from handler');
    }
});

yargs.parse();




// console.log('notes-taking-app');
/*
commands:
1. note init (it will create package.json)
2. npm i yargs@12.0.2  
3. node app.js add --title='List' --body='Jacket,boots,jeans';  
4. node app.js remove --title='List'
// Debugging command

// node inspect app.js add --title='t1' --body='b1'
//  https://nodejs.org/en/docs/guides/debugging-getting-started
*/