//Dependencies
const fs = require('fs');
const path = require('path');

//module for expoort
const lib = {};
lib.baseDir = path.join(__dirname, '/../.data/')

//Write to a file
lib.create = function (dir, file, data, callback) {
    //open the file for writing 
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            //Convert data to string
            const stringData = JSON.stringify(data);
            //Write data to file
            fs.writeFile(fileDescriptor, stringData, function (err) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false)
                        } else {
                            callback('Error closing file')
                        }
                    })
                } else {
                    callback('Error writing to file')
                }
            });
        } else {
            console.log(err)
            callback('Could not create file, may exist already')
        }
    });


}

//Read from file 
lib.read = function (dir, file, callback) {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
        callback(err, data)
    })
};

//update file 
lib.update = function (dir, file, data, callback) {
    //open the file for writing 
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            //Convert data to string
            const stringData = JSON.stringify(data);
            //changed to ftruncate because truncate its deprecated
            fs.ftruncate(fileDescriptor, function (err) {
                if (!err) {
                    //Write data to file
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback(false)
                                } else {
                                    callback('Error closing file')
                                }
                            })
                        } else {
                            callback('Error writing to file')
                        }
                    });
                }
            })
        } else {
            console.log(err)
            callback('Could not create file, may exist already')
        }
    });
}

//Delete from file
lib.delete = function (dir, file, callback) {
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', function (err) {
        if (err) {
            callback("Error deleting file")
        } else {
            callback(false)
        }
    })
}


module.exports = lib;