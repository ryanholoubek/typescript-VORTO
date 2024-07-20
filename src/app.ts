import * as fs from 'fs';

let file:string="";
let totalDayDriveMinutes:number = 12*60;
let addToTotalMinutes:number = 0;
let driverJobArray= new Array<any>();
let currentJobArray= new Array<Number>();
let arrayCounter:number = 0;

//get all the arguments passed into the program
process.argv.forEach(function (val, index, array) {
    
    file = val;
});


fs.readFile(file, 'utf8', function (err, data) {
    // Display the file content
    if (err) {
        if (err.code === 'ENOENT') {
          console.error('File not found:', err.path);
        } else {
          console.error('Error reading file:', err);
        }
        return;
      }
    //console.log('File content:', data);
    //seperate by line
    var array = data.toString().split("\n");
    parseFile(array);
    
    buildRoutes();
     
});

/*
    This function adds the minutes current driver and sets up a new driver
*/
function addNewDriverReset(minutes:number){
    addMinutesForTotalTrip(minutes);
    //console.log("Total Minutes : " + addToTotalMinutes);
    if(currentJobArray.length > 0){
        process.stdout.write("[" + currentJobArray.toString() + "]\n" );
    }
   
    arrayCounter = 0;
    addToTotalMinutes = 0;
    currentJobArray = new Array<Number>();
}

/*
    This function adds minutes to the current driver 
*/
function addMinutesForTotalTrip(minutes:number){
    addToTotalMinutes = addToTotalMinutes + minutes;
    //console.log("Total Minutes : " + addToTotalMinutes);
    return;
}

/*
    This function the minutes between two points
*/
function calculateMinutes(x1: number, y1 : number, x2: number, y2: number): number {

    let calculateX:number = x1 - x2;//(x2-x1)^2;
    let calculateY:number = y1 - y2;//(y2-y1)^2;
    let addTogether = ((calculateX * calculateX)  + (calculateY * calculateY));

    const minutes:number =  Math.sqrt(addTogether);
    
    return minutes
    
}

/*
    This helper function remove commas from the string and extracts the number
*/
function removeComma(str: string): number[] {
    let arr = new Array<number>();
    var partsOfStr = str.split(',');
    
    let x = parseFloat(partsOfStr[0]);
    let y = parseFloat(partsOfStr[1]);
    
    arr.push(x)
    arr.push(y)
    return arr
    
}

/*
    This function parses the data from the file passed in and puts it into an array of an array
*/
function parseFile(arr: string[]){
    
    for(const i in arr) {     

        const regex = /\d/;
        const regex2 = /\(([^\)]+)\)/;

        // Check if string contians numbers
        const doesItHaveNumber = regex.test(arr[i]);
        
        if(doesItHaveNumber){

            const str = arr[i];
            
            //gets number
            const arrayOfJobs = str.slice(0, 3).split('(');
            //get contents of inside the parenthensis 
            const jobsString = str.split('(');
            
            let arrayOfArray = new Array();
            arrayOfArray.push(parseInt(arrayOfJobs[0]));
            arrayOfArray.push(jobsString[1]);
            arrayOfArray.push(jobsString[2]);
            driverJobArray.push(arrayOfArray);
        
        }
    }
}


/*
    This function builds routes for each driver at the maximum time to produce the lowest costs
*/
function buildRoutes(){

    let lastDropOff = new Array<number>();
    let lastMinutesHome: number = 0;
    for(const i in driverJobArray){   
        let pickup = new Array<number>();
        let dropOff = new Array<number>();
        let minutesForTrip: number = 0;
        let minutesHome: number = 0;
        let minutesBetweenJobs: number = 0;
        
        pickup = removeComma(driverJobArray[i][1]);
        dropOff = removeComma(driverJobArray[i][2]);

        //new driver add from home depot
        if(arrayCounter == 0){
            addMinutesForTotalTrip(calculateMinutes(0,0,pickup[0], pickup[1] ));
        }
        if(lastDropOff != undefined){
            minutesBetweenJobs= calculateMinutes(lastDropOff[0],lastDropOff[1],pickup[0], pickup[1] );
        }
        
        minutesForTrip = calculateMinutes(pickup[0],pickup[1],dropOff[0], dropOff[1] );
        minutesHome = calculateMinutes(dropOff[0],dropOff[1],0, 0 );
        let currentTotalMinutes = addToTotalMinutes + minutesBetweenJobs +  minutesForTrip + minutesHome;
        
        //current trip is below our daily total so we can add the trip
        if(currentTotalMinutes <  totalDayDriveMinutes){
            addMinutesForTotalTrip(minutesBetweenJobs + minutesForTrip); 
        }else{
            //add new driver starting from the home depot
            addNewDriverReset(lastMinutesHome);
            addMinutesForTotalTrip(calculateMinutes(0,0,pickup[0], pickup[1] ));
            addMinutesForTotalTrip(minutesForTrip);            
        }

        currentJobArray.push(driverJobArray[i][0]);

        //if we are at the end of the file clean up and log
        if(driverJobArray.length == driverJobArray[i][0]){            
            addMinutesForTotalTrip(minutesForTrip); 
            if(currentJobArray.length > 0){
                process.stdout.write("[" + currentJobArray.toString() + "]\n" );
            }
        }

        
        lastMinutesHome = minutesHome
        lastDropOff = dropOff;
        arrayCounter++;
    }  
}

