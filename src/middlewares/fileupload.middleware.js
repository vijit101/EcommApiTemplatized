import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, './uploads/'); // the path is as per index as index is gonan call multer and save 
    },
    filename:(req, file, cb) =>{
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
      //Replace : with - (or _) when using toISOString() in Windows.Windows uses NTFS, FAT32, and exFAT, which do not permit : in filenames.
      /*  Breakdown of /:/g
/ and / → This denotes a regular expression in JavaScript.
: → This is the character we're searching for (colon).
g (Global flag) → This ensures all occurrences of : are replaced, not just the first one. */
    }
  })
  
  export const upload = multer({ storage: storage });