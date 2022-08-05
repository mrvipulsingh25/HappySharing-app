const File=require('./models/file');
const fs=require('fs');
const connectDB=require('./config/db');
connectDB();

async function fetchData() {
    //fetch 24 hrs old files
    const pastDate= new Date(Date.now()- (1000*60*60*24));
    const files=await File.find({ createdAt: {$lt: pastDate}});

    if(files.length)
    {
        for(const file of files)
        {
            try {
             fs.unlinkSync(file.path);
             await file.remove();
             console.log(`successfully deleted ${file.filename}`);
            }
            catch(err) 
            {
                console.log(`Error while deleting file ${err}`);
            }
        }
        console.log('Deletion Done!');
    }
}

fetchData().then( () => {
    //console.log("job done");
    process.exit();
});